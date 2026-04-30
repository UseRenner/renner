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

export function AnchorBody({ showCta }: { showCta: boolean }) {
  const [tab, setTab] = useState<"client" | "renner">("client");
  const isClient = tab === "client";
  const dek = isClient ? CLIENT_DEK : RENNER_DEK;
  const steps = isClient ? CLIENT_STEPS : RENNER_STEPS;
  const cta = isClient ? { label: "Sign up", href: "/signup" } : { label: "Become a Renner", href: "/become-a-renner" };

  return (
    <div style={{ minHeight: "min(900px, 80vh)", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
      {/* Top — quiet meta line floating in space */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: STEEL_500, paddingBottom: "clamp(40px, 5vw, 56px)", flexWrap: "wrap" }}>
        <span>How it works</span>
        <span>Both sides screened to join</span>
      </div>

      <div style={{ flex: 1 }} />

      {/* Steps stack — bottom-up */}
      <ol style={{ listStyle: "none", margin: 0, padding: 0, marginBottom: "clamp(32px, 4vw, 48px)" }}>
        {steps.map((s, i) => (
          <li
            key={s.number}
            style={{
              display: "grid",
              gridTemplateColumns: "44px minmax(140px, 1fr) minmax(0, 2fr) minmax(110px, 0.8fr)",
              gap: "clamp(12px, 1.6vw, 24px)",
              padding: "14px 0",
              borderBottom: `1px solid ${RULE}`,
              borderTop: i === 0 ? `1px solid ${RULE}` : "none",
              alignItems: "baseline",
            }}
          >
            <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: "0.22em", color: STEEL_500 }}>{s.number}</span>
            <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 18, color: INK, fontVariationSettings: '"opsz" 36' }}>{s.title}</span>
            <span style={{ fontFamily: SERIF, fontSize: 14, lineHeight: 1.55, color: STEEL_700, fontVariationSettings: '"opsz" 14' }}>{s.body}</span>
            <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: STEEL_600, textAlign: "right" }}>{s.proof}</span>
          </li>
        ))}
      </ol>

      {/* Dek — sits above the headline */}
      <p style={{ fontFamily: SERIF, fontSize: "clamp(17px, 1.6vw, 20px)", lineHeight: 1.55, color: STEEL_700, margin: 0, marginBottom: 24, maxWidth: "52ch", fontVariationSettings: '"opsz" 14' }}>
        {dek}
      </p>

      {/* Audience switch */}
      <div role="tablist" aria-label="Audience" style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 28, fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 16 }}>
        <Tab label="For clients" active={isClient} onClick={() => setTab("client")} />
        <span aria-hidden style={{ color: STEEL_300, fontStyle: "normal" }}>·</span>
        <Tab label="For Renners" active={!isClient} onClick={() => setTab("renner")} />
      </div>

      {/* Headline — anchored at the bottom */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 32, flexWrap: "wrap", paddingTop: "clamp(20px, 2.5vw, 28px)", borderTop: `1px solid ${INK}` }}>
        <h1
          style={{
            fontFamily: SERIF,
            fontWeight: 400,
            fontSize: "clamp(48px, 8vw, 128px)",
            lineHeight: 0.95,
            letterSpacing: "-0.035em",
            color: INK,
            margin: 0,
            maxWidth: "16ch",
            fontVariationSettings: '"opsz" 144',
          }}
        >
          {isClient ? "Post. Pick. Done." : "Verify. Pick. Done."}
        </h1>
        {showCta && (
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
              alignSelf: "flex-end",
            }}
          >
            {cta.label}
            <span aria-hidden style={{ opacity: 0.7 }}>→</span>
          </Link>
        )}
      </div>
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
