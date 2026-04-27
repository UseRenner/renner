"use client";

import { useState } from "react";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        setError(body.error ?? "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }
      setSent(true);
      setSubmitting(false);
    } catch {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div
        style={{
          padding: "32px",
          border: "1px solid #eaedf0",
          borderRadius: "12px",
          backgroundColor: "#fbfbfc",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
            fontSize: "15px",
            color: "#0d0f12",
            margin: 0,
          }}
        >
          Message sent. We&rsquo;ll be in touch.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="input-label" htmlFor="contact-name">
          Name
        </label>
        <input
          id="contact-name"
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoComplete="name"
        />
      </div>
      <div>
        <label className="input-label" htmlFor="contact-email">
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
      </div>
      <div>
        <label className="input-label" htmlFor="contact-message">
          Message
        </label>
        <textarea
          id="contact-message"
          className="input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          style={{ minHeight: "150px", resize: "vertical" }}
        />
      </div>
      {error && (
        <p style={{ color: "#c0392b", fontSize: "13px", margin: 0 }}>
          {error}
        </p>
      )}
      <button
        type="submit"
        className="btn-dark"
        disabled={submitting}
        style={{ marginTop: "8px" }}
      >
        {submitting ? "Sending…" : "Send"}
      </button>
    </form>
  );
}
