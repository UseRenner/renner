"use client";

import Link from "next/link";
import { useState } from "react";

const SERIF = "var(--font-source-serif), ui-serif, Georgia, serif";
const SANS = "var(--font-source-sans), ui-sans-serif, system-ui, sans-serif";
const MONO = "var(--font-source-code), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const INK = "#0d0f12";
const STEEL_700 = "#4d5b6a";
const STEEL_500 = "#7d8da0";
const STEEL_300 = "#cad1d8";
const RULE = "#eaedf0";
const PAPER = "#fbfbfc";

const CLIENT_DEK = "A marketplace for real-estate work. Post a task, pick a Renner, get it done. Both sides are screened to join.";
const RENNER_DEK = "Real-estate work, paid through the platform. Set your area, set your rate, pick what you take. Both sides are screened to join.";

const CLIENT_FIELDS: Array<[string, string, string]> = [
  ["01", "Post a task.", "Where, when, what, how much. Two minutes."],
  ["02", "Pick a Renner.", "Vetted Renners apply. Read the file. Book one."],
  ["03", "Get it done.", "Photos arrive. You confirm. Stripe pays."],
];
const RENNER_FIELDS: Array<[string, string, string]> = [
  ["01", "Get verified.", "ID, background check, area, rate. Same day."],
  ["02", "Pick a task.", "Briefs from agents and managers nearby. Apply."],
  ["03", "Get it done.", "Run the task. Send photos. Get paid."],
];

const CLIENT_STATEMENTS: Array<[string, string]> = [
  ["Vetting", "ID and Checkr — both sides"],
  ["Custody", "Stripe escrow"],
  ["Record", "Photos and a written note"],
];
const RENNER_STATEMENTS: Array<[string, string]> = [
  ["Source", "Real-estate work — agents, brokers, managers"],
  ["Vetting", "ID and Checkr — both sides"],
  ["Reputation", "Built task by task"],
];

function Field({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.24em", textTransform: "uppercase", color: STEEL_500, marginBottom: 8 }}>
        {label}
      </div>
      <div style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 22, color: INK, lineHeight: 1.2, paddingBottom: 8, borderBottom: `1px solid ${INK}`, fontVariationSettings: '"opsz" 36' }}>
        {value}
      </div>
      {note && (
        <div style={{ fontFamily: SERIF, fontSize: 14, color: STEEL_700, lineHeight: 1.55, marginTop: 8, fontVariationSettings: '"opsz" 14' }}>
          {note}
        </div>
      )}
    </div>
  );
}

export function FormBody({ showCta }: { showCta: boolean }) {
  const [tab, setTab] = useState<"client" | "renner">("client");
  const isClient = tab === "client";
  const dek = isClient ? CLIENT_DEK : RENNER_DEK;
  const fields = isClient ? CLIENT_FIELDS : RENNER_FIELDS;
  const statements = isClient ? CLIENT_STATEMENTS : RENNER_STATEMENTS;
  const cta = isClient ? { label: "Sign up", href: "/signup" } : { label: "Become a Renner", href: "/become-a-renner" };

  return (
    <>
      <div role="tablist" aria-label="Audience" style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: "clamp(40px, 5vw, 56px)", fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 16 }}>
        <Tab label="For clients" active={isClient} onClick={() => setTab("client")} />
        <span aria-hidden style={{ color: STEEL_300, fontStyle: "normal" }}>·</span>
        <Tab label="For Renners" active={!isClient} onClick={() => setTab("renner")} />
      </div>

      <h1
        style={{
          fontFamily: SERIF,
          fontWeight: 400,
          fontSize: "clamp(36px, 5vw, 64px)",
          lineHeight: 1.05,
          letterSpacing: "-0.025em",
          color: INK,
          margin: 0,
          marginBottom: 24,
          maxWidth: "20ch",
          fontVariationSettings: '"opsz" 96',
        }}
      >
        {isClient ? "Post a task. Pick a Renner. Get it done." : "Get verified. Pick a task. Get it done."}
      </h1>
      <p style={{ fontFamily: SERIF, fontSize: "clamp(17px, 1.5vw, 19px)", lineHeight: 1.55, color: STEEL_700, margin: 0, marginBottom: "clamp(56px, 7vw, 88px)", maxWidth: "52ch", fontVariationSettings: '"opsz" 14' }}>
        {dek}
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: "clamp(24px, 4vw, 64px)" }} className="form-grid">
        <div>
          {fields.map(([label, value, note]) => (
            <Field key={label} label={label} value={value} note={note} />
          ))}
        </div>
        <div>
          {statements.map(([label, value]) => (
            <Field key={label} label={label} value={value} />
          ))}
          {showCta && (
            <div style={{ marginTop: "clamp(16px, 2vw, 24px)" }}>
              <Link
                href={cta.href}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  fontFamily: SANS,
                  fontSize: 14,
                  fontWeight: 500,
                  color: PAPER,
                  backgroundColor: INK,
                  border: `1px solid ${INK}`,
                  borderRadius: 4,
                  padding: "14px 22px",
                  textDecoration: "none",
                }}
              >
                {cta.label}
                <span aria-hidden style={{ opacity: 0.7 }}>→</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 720px) {
          .form-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}

function Tab({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      style={{ background: "none", border: "none", padding: 0, fontFamily: "inherit", fontStyle: "inherit", fontSize: "inherit", fontWeight: "inherit", color: active ? INK : STEEL_500, cursor: "pointer" }}
    >
      {label}
    </button>
  );
}
