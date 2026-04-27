import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Inbound contact-form endpoint. Forwards the message to ADMIN_EMAIL
// via Resend when the env is wired; otherwise treats the submission
// as a soft-success so the form still confirms in dev environments.
//
// Server-side validation is intentionally light — the form is
// public, so we accept anything that has a non-empty name + email +
// message and rely on Resend / downstream to filter abuse later.

type Payload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message =
    typeof body.message === "string" ? body.message.trim() : "";

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 },
    );
  }
  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }
  if (message.length > 5000) {
    return NextResponse.json(
      { error: "Message is too long." },
      { status: 400 },
    );
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  const resendKey = process.env.RESEND_API_KEY;
  if (!adminEmail || !resendKey) {
    // Soft-success when notifications aren't configured. The form
    // still confirms; the message is dropped.
    return NextResponse.json({ ok: true, delivered: false });
  }

  const resend = new Resend(resendKey);
  const html = `<!doctype html><html><body style="margin:0;padding:24px;background:#f6f7f9;font-family:Inter,Helvetica,Arial,sans-serif;">
    <div style="max-width:560px;margin:0 auto;background:#fbfbfc;border:1px solid #dce0e5;border-radius:12px;padding:28px;">
      <h1 style="margin:0 0 8px;font-size:22px;color:#0d0f12;font-weight:600;">New contact message</h1>
      <p style="margin:0 0 4px;font-size:14px;color:#0d0f12;"><strong style="color:#647589;font-weight:500;">Name:</strong> ${escapeHtml(name)}</p>
      <p style="margin:0 0 4px;font-size:14px;color:#0d0f12;"><strong style="color:#647589;font-weight:500;">Email:</strong> ${escapeHtml(email)}</p>
      <p style="margin:16px 0 8px;font-size:12px;color:#647589;text-transform:uppercase;letter-spacing:0.12em;">Message</p>
      <p style="margin:0;font-size:14px;color:#0d0f12;white-space:pre-wrap;line-height:1.6;">${escapeHtml(message)}</p>
    </div>
  </body></html>`;

  try {
    await resend.emails.send({
      from: `Renner <${adminEmail}>`,
      to: adminEmail,
      replyTo: email,
      subject: `Contact form — ${name}`,
      html,
    });
    return NextResponse.json({ ok: true, delivered: true });
  } catch {
    return NextResponse.json(
      { error: "Couldn't send your message. Please try again." },
      { status: 502 },
    );
  }
}
