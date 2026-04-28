"use client";

import { useState } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Logo } from "@/components/Logo";

const TOPICS = [
  "General inquiry",
  "Account help",
  "Task issue",
  "Feedback",
  "Partnership",
  "Press",
  "Other",
] as const;

type Topic = (typeof TOPICS)[number];

const INITIAL_TOPIC: Topic = "General inquiry";

export function ContactForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState<Topic>(INITIAL_TOPIC);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  function reset() {
    setFirstName("");
    setLastName("");
    setEmail("");
    setTopic(INITIAL_TOPIC);
    setMessage("");
    setError(null);
    setSent(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, topic, message }),
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
          textAlign: "center",
          paddingTop: "16px",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            opacity: 0.12,
            marginBottom: "20px",
          }}
        >
          <Logo size={40} fill="#0d0f12" slotColor="#fbfbfc" />
        </div>
        <h2 className="page-title" style={{ marginBottom: "8px" }}>
          Message received.
        </h2>
        <p
          style={{
            fontFamily: "var(--font-work-sans), ui-sans-serif, system-ui",
            fontSize: "14px",
            color: "#647589",
            margin: "0 0 24px",
            lineHeight: 1.55,
          }}
        >
          We&rsquo;ll get back to you soon.
        </p>
        <button
          type="button"
          onClick={reset}
          className="text-link"
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            fontFamily: "var(--font-work-sans), ui-sans-serif, system-ui",
            fontSize: "13px",
            fontWeight: 500,
            color: "#0d0f12",
          }}
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex gap-3">
        <div className="flex-1">
          <label className="input-label" htmlFor="contact-first">
            First name
          </label>
          <input
            id="contact-first"
            className="input"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            autoComplete="given-name"
          />
        </div>
        <div className="flex-1">
          <label className="input-label" htmlFor="contact-last">
            Last name
          </label>
          <input
            id="contact-last"
            className="input"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            autoComplete="family-name"
          />
        </div>
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
        <label className="input-label" htmlFor="contact-topic">
          Topic
        </label>
        <select
          id="contact-topic"
          className="input"
          value={topic}
          onChange={(e) => setTopic(e.target.value as Topic)}
        >
          {TOPICS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
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
        {submitting ? <LoadingSpinner size={18} tone="light" /> : "Send"}
      </button>
    </form>
  );
}
