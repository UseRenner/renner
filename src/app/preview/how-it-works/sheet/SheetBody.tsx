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

const CLIENT_STEPS = [
  { number: "01", title: "Post a task.", body: "Where, when, what, how much. Two minutes.", proof: "Under 2 min" },
  { number: "02", title: "Pick a Renner.", body: "Vetted Renners apply. Read the file. Book one.", proof: "Checkr-vetted" },
  { number: "03", title: "Get it done.", body: "Photos arrive. You confirm. Stripe pays.", proof: "Stripe escrow" },
];
const RENNER_STEPS = [
  { number: "01", title: "Get verified.", body: "ID, background check, area, rate. Same day.", proof: "Same-day" },
  { number: "02", title: "Pick a task.", body: "Briefs from agents and managers nearby. Apply.", proof: "Local" },
  { number: "03", title: "Get it done.", body: "Run the task. Send photos. Get paid.", proof: "100% of pay" },
];

export function SheetBody({ showCta }: { showCta: boolean }) {
  const [tab, setTab] = useState<"client" | "renner">("client");
  const isClient = tab === "client";
  const dek = isClient ? CLIENT_DEK : RENNER_DEK;
  const steps = isClient ? CLIENT_STEPS : RENNER_STEPS;
  const cta = isClient ? { label: "Sign up", href: "/signup" } : { label: "Become a Renner", href: "/become-a-renner" };

  return (
    <div style={{ aspectRatio: "1 / 1.414", maxWidth: 880, margin: "0 auto", border: `1px solid ${INK}`, padding: "clamp(28px, 4vw, 56px)", display: "flex", flexDirection: "column", backgroundColor: PAPER }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.24em", textTransform: "uppercase", color: STEEL_500, paddingBottom: 16, borderBottom: `1px solid ${INK}`, marginBottom: "clamp(20px, 2.5vw, 28px)" }}>
        <span>How it works</span>
        <span>Both sides screened to join</span>
      </div>

      <div role="tablist" aria-label="Audience" style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: "clamp(20px, 2.5vw, 28px)", fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 15 }}>
        <Tab label="For clients" active={isClient} onClick={() => setTab("client")} />
        <span aria-hidden style={{ color: STEEL_300, fontStyle: "normal" }}>·</span>
        <Tab label="For Renners" active={!isClient} onClick={() => setTab("renner")} />
      </div>

      <h1
        style={{
          fontFamily: SERIF,
          fontWeight: 400,
          fontSize: "clamp(32px, 5vw, 64px)",
          lineHeight: 1.0,
          letterSpacing: "-0.025em",
          color: INK,
          margin: 0,
          marginBottom: 16,
          maxWidth: "16ch",
          fontVariationSettings: '"opsz" 144',
        }}
      >
        {isClient ? "Post a task. Pick a Renner. Get it done." : "Get verified. Pick a task. Get it done."}
      </h1>
      <p style={{ fontFamily: SERIF, fontSize: "clamp(15px, 1.4vw, 17px)", lineHeight: 1.5, color: STEEL_700, margin: 0, marginBottom: "clamp(28px, 3.5vw, 40px)", maxWidth: "56ch", fontVariationSettings: '"opsz" 14' }}>
        {dek}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: "clamp(20px, 2.5vw, 28px)" }}>
        {steps.map((s, i) => (
          <div key={s.number} style={{ display: "grid", gridTemplateColumns: "44px minmax(140px, 1fr) minmax(0, 2fr) minmax(110px, 0.8fr)", gap: "clamp(12px, 1.6vw, 20px)", padding: "14px 0", borderTop: i === 0 ? `1px solid ${INK}` : `1px solid ${RULE}`, borderBottom: i === steps.length - 1 ? `1px solid ${INK}` : "none", alignItems: "baseline" }}>
            <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: "0.22em", color: STEEL_500 }}>{s.number}</span>
            <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 18, color: INK, fontVariationSettings: '"opsz" 36' }}>{s.title}</span>
            <span style={{ fontFamily: SERIF, fontSize: 14, lineHeight: 1.55, color: STEEL_700, fontVariationSettings: '"opsz" 14' }}>{s.body}</span>
            <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: STEEL_600, textAlign: "right" }}>{s.proof}</span>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(16px, 2.4vw, 32px)", marginBottom: "auto" }}>
        {(isClient
          ? [
              ["Both sides vetted", "ID and Checkr before any booking."],
              ["Funds in escrow", "Held by Stripe until you confirm."],
              ["On the record", "Photos and a note on every task."],
            ]
          : [
              ["Real work", "From agents, brokers, managers."],
              ["Vetted clients", "ID and Checkr, same as you."],
              ["Repeat work", "A reputation paid in repeat clients."],
            ]
        ).map(([label, body]) => (
          <div key={label}>
            <div style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 15, color: INK, marginBottom: 4, fontVariationSettings: '"opsz" 36' }}>
              {label}.
            </div>
            <div style={{ fontFamily: SERIF, fontSize: 13, lineHeight: 1.5, color: STEEL_700, fontVariationSettings: '"opsz" 14' }}>
              {body}
            </div>
          </div>
        ))}
      </div>

      {showCta && (
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, paddingTop: "clamp(20px, 2.5vw, 28px)", borderTop: `1px solid ${INK}`, marginTop: "clamp(20px, 2.5vw, 28px)", flexWrap: "wrap" }}>
          <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(16px, 1.5vw, 20px)", color: INK, fontVariationSettings: '"opsz" 36' }}>
            {isClient ? "Get something done." : "Start running."}
          </span>
          <Link href={cta.href} style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: SANS, fontSize: 13, fontWeight: 500, color: PAPER, backgroundColor: INK, border: `1px solid ${INK}`, borderRadius: 4, padding: "10px 18px", textDecoration: "none" }}>
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
