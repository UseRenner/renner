"use client";

import Link from "next/link";
import { useState } from "react";

const SERIF = "var(--font-source-serif), ui-serif, Georgia, serif";
const SANS = "var(--font-source-sans), ui-sans-serif, system-ui, sans-serif";
const MONO = "var(--font-source-code), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const INK = "#0d0f12";
const STEEL_700 = "#4d5b6a";
const STEEL_600 = "#647589";
const STEEL_500 = "#7d8da0";
const STEEL_300 = "#cad1d8";
const RULE = "#eaedf0";
const PAPER = "#fbfbfc";

const CLIENT_DEK = "A marketplace for real-estate work. Post a task, pick a Renner, get it done. Both sides are screened to join.";
const RENNER_DEK = "Real-estate work, paid through the platform. Set your area, set your rate, pick what you take. Both sides are screened to join.";

const CLIENT_LINES: Array<[string, string, string, string]> = [
  ["01", "Post a task.", "Where, when, what, how much. Two minutes.", "Under 2 min"],
  ["02", "Pick a Renner.", "Vetted Renners apply. Read the file. Book one.", "Checkr-vetted"],
  ["03", "Get it done.", "Photos arrive. You confirm. Stripe pays.", "Stripe escrow"],
];
const RENNER_LINES: Array<[string, string, string, string]> = [
  ["01", "Get verified.", "ID, background check, area, rate. Same day.", "Same-day"],
  ["02", "Pick a task.", "Briefs from agents and managers nearby. Apply.", "Local"],
  ["03", "Get it done.", "Run the task. Send photos. Get paid.", "100% of pay"],
];

export function ReceiptBody({ showCta }: { showCta: boolean }) {
  const [tab, setTab] = useState<"client" | "renner">("client");
  const isClient = tab === "client";
  const dek = isClient ? CLIENT_DEK : RENNER_DEK;
  const lines = isClient ? CLIENT_LINES : RENNER_LINES;
  const cta = isClient ? { label: "Sign up", href: "/signup" } : { label: "Become a Renner", href: "/become-a-renner" };

  return (
    <div style={{ maxWidth: 460, margin: "0 auto" }}>
      <div role="tablist" aria-label="Audience" style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 14, marginBottom: "clamp(40px, 5vw, 56px)", fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 16 }}>
        <Tab label="For clients" active={isClient} onClick={() => setTab("client")} />
        <span aria-hidden style={{ color: STEEL_300, fontStyle: "normal" }}>·</span>
        <Tab label="For Renners" active={!isClient} onClick={() => setTab("renner")} />
      </div>

      <h1
        style={{
          fontFamily: SERIF,
          fontWeight: 400,
          fontSize: "clamp(28px, 3.5vw, 40px)",
          lineHeight: 1.1,
          letterSpacing: "-0.018em",
          color: INK,
          margin: 0,
          marginBottom: 20,
          textAlign: "center",
          fontVariationSettings: '"opsz" 60',
        }}
      >
        {isClient ? "Post a task. Pick a Renner. Get it done." : "Get verified. Pick a task. Get it done."}
      </h1>

      <p style={{ fontFamily: SERIF, fontSize: 15, lineHeight: 1.55, color: STEEL_700, margin: 0, marginBottom: "clamp(40px, 5vw, 56px)", textAlign: "center", fontVariationSettings: '"opsz" 14' }}>
        {dek}
      </p>

      {/* Steps in a tight tabular column with leader gaps */}
      <div style={{ borderTop: `1px solid ${INK}`, borderBottom: `1px solid ${INK}`, marginBottom: showCta ? "clamp(40px, 5vw, 56px)" : 0 }}>
        {lines.map(([num, name, body, proof], i) => (
          <div
            key={num}
            style={{
              padding: "18px 0",
              borderBottom: i === lines.length - 1 ? "none" : `1px solid ${RULE}`,
            }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: 12, justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: "0.22em", color: STEEL_500 }}>{num}</span>
                <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 18, color: INK, fontVariationSettings: '"opsz" 36' }}>{name}</span>
              </span>
              <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: STEEL_600 }}>{proof}</span>
            </div>
            <p style={{ fontFamily: SERIF, fontSize: 14, lineHeight: 1.55, color: STEEL_700, margin: 0, marginLeft: 32, fontVariationSettings: '"opsz" 14' }}>
              {body}
            </p>
          </div>
        ))}
      </div>

      {showCta && (
        <div style={{ display: "flex", justifyContent: "center" }}>
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
