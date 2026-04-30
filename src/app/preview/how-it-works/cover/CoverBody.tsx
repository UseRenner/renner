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

type Step = { number: string; title: string; body: string; proof: string };

const CLIENT_DEK = "A marketplace for real-estate work. Post a task, pick a Renner, get it done. Both sides are screened to join.";
const RENNER_DEK = "Real-estate work, paid through the platform. Set your area, set your rate, pick what you take. Both sides are screened to join.";

const CLIENT_STEPS: Step[] = [
  { number: "I", title: "Post a task.", body: "Where, when, what, how much.", proof: "Under 2 min" },
  { number: "II", title: "Pick a Renner.", body: "Vetted Renners apply. Read the file.", proof: "Checkr-vetted" },
  { number: "III", title: "Get it done.", body: "Photos arrive. You confirm. Stripe pays.", proof: "Stripe escrow" },
];
const RENNER_STEPS: Step[] = [
  { number: "I", title: "Get verified.", body: "ID, background check, area, rate.", proof: "Same-day" },
  { number: "II", title: "Pick a task.", body: "Briefs from agents and managers nearby.", proof: "Local" },
  { number: "III", title: "Get it done.", body: "Run the task. Send photos. Get paid.", proof: "100% of pay" },
];

export function CoverBody({ showCta }: { showCta: boolean }) {
  const [tab, setTab] = useState<"client" | "renner">("client");
  const isClient = tab === "client";
  const dek = isClient ? CLIENT_DEK : RENNER_DEK;
  const steps = isClient ? CLIENT_STEPS : RENNER_STEPS;
  const cta = isClient ? { label: "Sign up", href: "/signup" } : { label: "Become a Renner", href: "/become-a-renner" };

  return (
    <div
      style={{
        border: `1px solid ${INK}`,
        padding: "clamp(40px, 6vw, 96px) clamp(28px, 5vw, 80px)",
        textAlign: "center",
        minHeight: "min(900px, 90vh)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ width: 80, height: 1, backgroundColor: INK, marginBottom: "clamp(32px, 4vw, 48px)" }} />

      <h1
        style={{
          fontFamily: SERIF,
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "clamp(48px, 9vw, 144px)",
          lineHeight: 0.95,
          letterSpacing: "-0.035em",
          color: INK,
          margin: 0,
          marginBottom: 20,
          maxWidth: "12ch",
          fontVariationSettings: '"opsz" 144',
        }}
      >
        How Renner works.
      </h1>

      <p
        style={{
          fontFamily: SERIF,
          fontWeight: 400,
          fontSize: "clamp(17px, 1.6vw, 20px)",
          lineHeight: 1.5,
          color: STEEL_700,
          margin: 0,
          marginBottom: "clamp(40px, 5vw, 64px)",
          maxWidth: "44ch",
          fontVariationSettings: '"opsz" 14',
        }}
      >
        {dek}
      </p>

      <div
        role="tablist"
        aria-label="Audience"
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 14,
          marginBottom: "clamp(40px, 5vw, 64px)",
          fontFamily: SERIF,
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: 16,
        }}
      >
        <Tab label="For clients" active={isClient} onClick={() => setTab("client")} />
        <span aria-hidden style={{ color: STEEL_300, fontStyle: "normal" }}>·</span>
        <Tab label="For Renners" active={!isClient} onClick={() => setTab("renner")} />
      </div>

      <div style={{ width: 80, height: 1, backgroundColor: INK, marginBottom: "clamp(32px, 4vw, 48px)" }} />

      {/* Chapters as a centered TOC */}
      <ol style={{ listStyle: "none", margin: 0, padding: 0, marginBottom: "clamp(40px, 5vw, 64px)", display: "flex", flexDirection: "column", gap: 18 }}>
        {steps.map((s) => (
          <li key={s.number} style={{ display: "flex", alignItems: "baseline", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: "0.22em", color: STEEL_500, minWidth: 32 }}>
              {s.number}.
            </span>
            <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(20px, 2vw, 24px)", color: INK, fontVariationSettings: '"opsz" 36' }}>
              {s.title}
            </span>
            <span style={{ fontFamily: SERIF, fontSize: 15, color: STEEL_700, fontVariationSettings: '"opsz" 14' }}>
              {s.body}
            </span>
          </li>
        ))}
      </ol>

      <div style={{ flex: 1 }} />

      <div style={{ width: 80, height: 1, backgroundColor: INK, marginBottom: "clamp(20px, 2.5vw, 28px)" }} />

      <div style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 17, color: INK, marginBottom: showCta ? "clamp(28px, 3.5vw, 40px)" : 0, fontVariationSettings: '"opsz" 36' }}>
        Both sides are screened to join.
      </div>

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
          }}
        >
          {cta.label}
          <span aria-hidden style={{ opacity: 0.7 }}>→</span>
        </Link>
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
      style={{
        background: "none",
        border: "none",
        padding: 0,
        fontFamily: "inherit",
        fontStyle: "inherit",
        fontSize: "inherit",
        fontWeight: "inherit",
        color: active ? INK : STEEL_500,
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}
