import { NextResponse } from "next/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Payload =
  | { event: "dispute_filed"; disputeId: string }
  | { event: "dispute_escalated"; disputeId: string; explanation?: string }
  | { event: "safety_flag"; taskId: string }
  | { event: "cancellation_threshold"; userId: string; count: number };

type ProfileLite = {
  id: string;
  display_name: string | null;
  first_name: string | null;
  last_name: string | null;
};

function nameFor(p: ProfileLite | null | undefined) {
  if (!p) return "Unknown";
  return (
    p.display_name ||
    [p.first_name, p.last_name].filter(Boolean).join(" ") ||
    "Unknown"
  );
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function paragraph(label: string, value: string | number | null | undefined) {
  if (value == null || value === "") return "";
  return `<p style="margin:0 0 8px;font-family:Inter,Helvetica,Arial,sans-serif;font-size:14px;color:#0d0f12;"><strong style="color:#647589;font-weight:500;">${escapeHtml(label)}:</strong> ${escapeHtml(String(value))}</p>`;
}

function photosBlock(urls: string[] | null | undefined) {
  if (!urls || urls.length === 0) return "";
  const items = urls
    .map(
      (u) =>
        `<a href="${escapeHtml(u)}" style="display:inline-block;margin:0 6px 6px 0;"><img src="${escapeHtml(u)}" alt="" style="width:120px;height:120px;object-fit:cover;border-radius:8px;border:1px solid #dce0e5;display:block;" /></a>`,
    )
    .join("");
  return `<div style="margin-top:12px;">${items}</div>`;
}

function makeEmail(opts: {
  heading: string;
  intro: string;
  rows: string[];
  taskId?: string;
  baseUrl: string;
  photos?: string[] | null;
}) {
  const link = opts.taskId
    ? `<p style="margin-top:24px;"><a href="${opts.baseUrl}/tasks/${opts.taskId}" style="display:inline-block;background:#0d0f12;color:#fbfbfc;padding:10px 18px;border-radius:6px;text-decoration:none;font-family:Inter,Helvetica,Arial,sans-serif;font-size:14px;font-weight:500;">Open task in Renner →</a></p>`
    : "";
  return `<!doctype html><html><body style="margin:0;padding:24px;background:#f6f7f9;font-family:Inter,Helvetica,Arial,sans-serif;">
    <div style="max-width:560px;margin:0 auto;background:#fbfbfc;border:1px solid #dce0e5;border-radius:12px;padding:28px;">
      <h1 style="margin:0 0 8px;font-size:22px;color:#0d0f12;font-weight:600;">${escapeHtml(opts.heading)}</h1>
      <p style="margin:0 0 18px;color:#647589;font-size:14px;line-height:1.55;">${escapeHtml(opts.intro)}</p>
      ${opts.rows.join("\n")}
      ${photosBlock(opts.photos)}
      ${link}
    </div>
  </body></html>`;
}

function originFor(req: Request) {
  const proto = req.headers.get("x-forwarded-proto") ?? "https";
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  if (host) return `${proto}://${host}`;
  try {
    return new URL(req.url).origin;
  } catch {
    return "https://renner.app";
  }
}

function adminClientOrNull() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createServiceClient(url, key);
}

// Calling createServiceClient(url, key) at runtime produces a client whose
// generic parameters are inferred separately from `ReturnType<typeof
// createServiceClient>`. Across @supabase/supabase-js versions those two
// don't always line up (postgrest-js v2 added stricter generics), which
// fails the Vercel typecheck. The helpers below only use a small, well-
// known surface of the admin client, so we accept it as `any` to keep the
// build green without introducing a heavy generic ceremony.
type AdminClient = any;

async function fetchEmail(
  admin: AdminClient | null,
  userId: string | null | undefined,
) {
  if (!admin || !userId) return null;
  const { data, error } = await admin.auth.admin.getUserById(userId);
  if (error) return null;
  return data.user?.email ?? null;
}

async function fetchProfile(
  admin: AdminClient | null,
  userId: string | null | undefined,
) {
  if (!admin || !userId) return null;
  const { data } = await admin
    .from("users")
    .select("id, display_name, first_name, last_name")
    .eq("id", userId)
    .maybeSingle();
  return (data as ProfileLite | null) ?? null;
}

export async function POST(req: Request) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  const resendKey = process.env.RESEND_API_KEY;
  if (!adminEmail || !resendKey) {
    return NextResponse.json({ skipped: "notifications not configured" });
  }

  const admin = adminClientOrNull();
  const resend = new Resend(resendKey);
  const baseUrl = originFor(req);
  const body = (await req.json()) as Payload;

  let subject = "";
  let html = "";
  let allowed = false;

  if (body.event === "dispute_filed" || body.event === "dispute_escalated") {
    if (!admin) {
      return NextResponse.json(
        { skipped: "service role key missing" },
        { status: 200 },
      );
    }
    const { data: dispute } = await admin
      .from("disputes")
      .select(
        "id, task_id, raised_by, against, reason, status, damage_amount, damage_counter_amount, damage_response, damage_photos, admin_notes",
      )
      .eq("id", body.disputeId)
      .maybeSingle();
    if (!dispute) {
      return NextResponse.json({ error: "dispute not found" }, { status: 404 });
    }
    allowed =
      dispute.raised_by === user.id || dispute.against === user.id;
    if (!allowed) {
      return NextResponse.json({ error: "forbidden" }, { status: 403 });
    }

    const [task, raised, against] = await Promise.all([
      dispute.task_id
        ? admin
            .from("tasks")
            .select("id, title")
            .eq("id", dispute.task_id)
            .maybeSingle()
            .then((r) => r.data as { id: string; title: string } | null)
        : Promise.resolve(null),
      fetchProfile(admin, dispute.raised_by),
      fetchProfile(admin, dispute.against),
    ]);
    const [raisedEmail, againstEmail] = await Promise.all([
      fetchEmail(admin, dispute.raised_by),
      fetchEmail(admin, dispute.against),
    ]);

    const isDamage = dispute.damage_amount != null;
    const heading =
      body.event === "dispute_escalated"
        ? "Damage claim escalated to platform review"
        : isDamage
          ? "New damage claim filed"
          : "New dispute filed";
    const intro =
      body.event === "dispute_escalated"
        ? "The Renner has formally disputed this claim. Time to step in."
        : isDamage
          ? "A client filed a damage or theft claim against a Renner."
          : "A new dispute was filed on the marketplace.";

    subject = `[Renner] ${heading}${task ? ` — ${task.title}` : ""}`;
    html = makeEmail({
      heading,
      intro,
      taskId: task?.id,
      baseUrl,
      photos: dispute.damage_photos as string[] | null,
      rows: [
        paragraph("Task", task?.title ?? "—"),
        paragraph(
          "Raised by",
          raisedEmail
            ? `${nameFor(raised)} <${raisedEmail}>`
            : nameFor(raised),
        ),
        paragraph(
          "Against",
          againstEmail
            ? `${nameFor(against)} <${againstEmail}>`
            : nameFor(against),
        ),
        paragraph("Reason", dispute.reason),
        isDamage
          ? paragraph(
              "Claim amount",
              `$${Number(dispute.damage_amount ?? 0).toLocaleString("en-US")}`,
            )
          : "",
        dispute.damage_counter_amount != null
          ? paragraph(
              "Renner counter offer",
              `$${Number(dispute.damage_counter_amount).toLocaleString("en-US")}`,
            )
          : "",
        dispute.damage_response
          ? paragraph("Renner response", dispute.damage_response)
          : "",
        dispute.admin_notes
          ? paragraph("Renner explanation", dispute.admin_notes)
          : "",
      ],
    });
  } else if (body.event === "safety_flag") {
    if (!admin) {
      return NextResponse.json(
        { skipped: "service role key missing" },
        { status: 200 },
      );
    }
    const { data: task } = await admin
      .from("tasks")
      .select(
        "id, title, posted_by, booked_runner, dispute_reason, safety_flag",
      )
      .eq("id", body.taskId)
      .maybeSingle();
    if (!task) {
      return NextResponse.json({ error: "task not found" }, { status: 404 });
    }
    if (task.booked_runner !== user.id) {
      return NextResponse.json({ error: "forbidden" }, { status: 403 });
    }

    const [poster, runner, posterEmail, runnerEmail] = await Promise.all([
      fetchProfile(admin, task.posted_by),
      fetchProfile(admin, task.booked_runner),
      fetchEmail(admin, task.posted_by),
      fetchEmail(admin, task.booked_runner),
    ]);
    const heading = "Safety concern reported on a task";
    subject = `[Renner] ${heading} — ${task.title}`;
    html = makeEmail({
      heading,
      intro:
        "A Renner cancelled a task in progress and flagged it as a safety concern. Review immediately.",
      taskId: task.id,
      baseUrl,
      rows: [
        paragraph("Task", task.title),
        paragraph(
          "Client",
          posterEmail ? `${nameFor(poster)} <${posterEmail}>` : nameFor(poster),
        ),
        paragraph(
          "Renner",
          runnerEmail ? `${nameFor(runner)} <${runnerEmail}>` : nameFor(runner),
        ),
        paragraph("Renner explanation", task.dispute_reason),
      ],
    });
  } else if (body.event === "cancellation_threshold") {
    if (body.userId !== user.id) {
      return NextResponse.json({ error: "forbidden" }, { status: 403 });
    }
    const profile = await fetchProfile(admin, user.id);
    const email = await fetchEmail(admin, user.id);
    const heading = "User exceeded cancellation threshold";
    subject = `[Renner] ${heading} — ${nameFor(profile)}`;
    html = makeEmail({
      heading,
      intro:
        "This user just cancelled a task and now exceeds 5 lifetime cancellations. Flagging for account review.",
      baseUrl,
      rows: [
        paragraph(
          "User",
          email ? `${nameFor(profile)} <${email}>` : nameFor(profile),
        ),
        paragraph("Cancellation count", body.count),
      ],
    });
  } else {
    return NextResponse.json({ error: "unknown event" }, { status: 400 });
  }

  const fromAddress =
    process.env.RESEND_FROM_ADDRESS ?? "Renner Alerts <noreply@renner.app>";

  try {
    await resend.emails.send({
      from: fromAddress,
      to: adminEmail,
      subject,
      html,
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: "send_failed",
        details: err instanceof Error ? err.message : String(err),
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
