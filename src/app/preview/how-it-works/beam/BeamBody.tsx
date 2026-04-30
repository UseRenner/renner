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
  { number: "01", title: "Post a task.", body: "Where, when, what, how much. Two minutes.", proof: "Under 2 min" },
  { number: "02", title: "Pick a Renner.", body: "Vetted Renners apply. Read the file. Book one.", proof: "Checkr-vetted" },
  { number: "03", title: "Get it done.", body: "Photos arrive. You confirm. Stripe pays.", proof: "Stripe escrow" },
];
const RENNER_STEPS: Step[] = [
  { number: "01", title: "Get verified.", body: "ID, background check, area, rate. Same day.", proof: "Same-day" },
  { number: "02", title: "Pick a task.", body: "Briefs from agents and managers nearby. Apply.", proof: "Local" },
  { number: "03", title: "Get it done.", body: "Run the task. Send photos. Get paid.", proof: "100% of pay" },
];

export function BeamBody({ showCta }: { showCta: boolean }) {
  const [tab, setTab] = useState<"client" | "renner">("client");
  const isClient = tab === "client";
  const dek = isClient ? CLIENT_DEK : RENNER_DEK;
  const steps = isClient ? CLIENT_STEPS : RENNER_STEPS;
  const cta = isClient ? { label: "Sign up", href: "/signup" } : { label: "Become a Renner", href: "/become-a-renner" };

  return (
    <div className="beam" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(360px, 56%)", gap: "clamp(40px, 6vw, 96px)" }}>
      <div aria-hidden />
      <div style={{ borderLeft: `1px solid ${INK}`, paddingLeft: "clamp(24px, 3vw, 48px)" }}>
        <div role="tablist" aria-label="Audience" style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: "clamp(40px, 5vw, 56px)", fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 16 }}>
          <Tab label="For clients" active={isClient} onClick={() => setTab("client")} />
          <span aria-hidden style={{ color: STEEL_300, fontStyle: "normal" }}>·</span>
          <Tab label="For Renners" active={!isClient} onClick={() => setTab("renner")} />
        </div>

        <h1
          style={{
            fontFamily: SERIF,
            fontWeight: 400,
            fontSize: "clamp(40px, 6vw, 88px)",
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
            color: INK,
            margin: 0,
            marginBottom: 24,
            fontVariationSettings: '"opsz" 144',
          }}
        >
          {isClient ? "Post a task. Pick a Renner. Get it done." : "Get verified. Pick a task. Get it done."}
        </h1>
        <p
          style={{
            fontFamily: SERIF,
            fontSize: "clamp(17px, 1.6vw, 20px)",
            lineHeight: 1.5,
            color: STEEL_700,
            margin: 0,
            marginBottom: "clamp(56px, 7vw, 96px)",
            maxWidth: "44ch",
            fontVariationSettings: '"opsz" 14',
          }}
        >
          {dek}
        </p>

        {steps.map((s, i) => (
          <section
            key={s.number}
            style={{
              padding: "clamp(24px, 3vw, 36px) 0",
              borderTop: i === 0 ? `1px solid ${INK}` : "none",
              borderBottom: `1px solid ${RULE}`,
              display: "grid",
              gridTemplateColumns: "minmax(60px, 80px) minmax(0, 1fr)",
              gap: "clamp(16px, 2vw, 24px)",
              alignItems: "baseline",
            }}
          >
            <div style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: "0.22em", color: STEEL_500 }}>{s.number}</div>
            <div>
              <h3 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(22px, 2.2vw, 28px)", lineHeight: 1.1, letterSpacing: "-0.018em", color: INK, margin: 0, marginBottom: 10, fontVariationSettings: '"opsz" 60' }}>
                {s.title}
              </h3>
              <p style={{ fontFamily: SERIF, fontSize: 15, lineHeight: 1.6, color: STEEL_700, margin: 0, marginBottom: 10, fontVariationSettings: '"opsz" 14' }}>
                {s.body}
              </p>
              <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: STEEL_600 }}>
                {s.proof}
              </div>
            </div>
          </section>
        ))}

        {showCta && (
          <div style={{ paddingTop: "clamp(40px, 5vw, 64px)" }}>
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

      <style jsx>{`
        @media (max-width: 720px) {
          .beam {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
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
