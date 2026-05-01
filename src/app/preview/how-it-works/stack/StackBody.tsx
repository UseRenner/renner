"use client";

import Link from "next/link";
import { useState } from "react";
import { Card, CLIENT_KINDS, RENNER_KINDS } from "../_illustrations";

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

const CLIENT_STEPS = [
  { number: "01", title: "Post a task.", body: "Describe what you need — sign install, lockbox swap, courier run, property prep, guest check-in. Set the location, the time window, and the price.", proof: "Under 2 min" },
  { number: "02", title: "Pick a Renner.", body: "Vetted Renners apply with bios, ratings, and tenure on the platform. Read the file. Book the right hand for the work.", proof: "Checkr-vetted" },
  { number: "03", title: "Get it done.", body: "Photos and a written note arrive on completion. You confirm; Stripe releases the funds in full.", proof: "Stripe escrow" },
];
const RENNER_STEPS = [
  { number: "01", title: "Get verified.", body: "Sign up, confirm identity, clear a Checkr background check. Pick the categories you run, set a service area, name your rate.", proof: "Same-day" },
  { number: "02", title: "Pick a task.", body: "Briefs come in from agents, brokers, and managers nearby. Apply to the ones that fit. Decline anything that doesn't.", proof: "Local" },
  { number: "03", title: "Get it done.", body: "Run the task, upload completion photos, get paid through the platform — 100% of the task pay is yours.", proof: "100% of pay" },
];

export function StackBody({ showCta }: { showCta: boolean }) {
  const [tab, setTab] = useState<"client" | "renner">("client");
  const isClient = tab === "client";
  const dek = isClient ? CLIENT_DEK : RENNER_DEK;
  const steps = isClient ? CLIENT_STEPS : RENNER_STEPS;
  const kinds = isClient ? CLIENT_KINDS : RENNER_KINDS;
  const cta = isClient ? { label: "Sign up", href: "/signup" } : { label: "Become a Renner", href: "/become-a-renner" };

  return (
    <>
      <div role="tablist" aria-label="Audience" style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: "clamp(40px, 5vw, 56px)", fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 16 }}>
        <Tab label="For clients" active={isClient} onClick={() => setTab("client")} />
        <span aria-hidden style={{ color: STEEL_300, fontStyle: "normal" }}>·</span>
        <Tab label="For Renners" active={!isClient} onClick={() => setTab("renner")} />
      </div>

      <p
        style={{
          fontFamily: SERIF,
          fontWeight: 400,
          fontSize: "clamp(28px, 3.5vw, 44px)",
          lineHeight: 1.25,
          letterSpacing: "-0.012em",
          color: INK,
          margin: 0,
          marginBottom: "clamp(72px, 9vw, 112px)",
          maxWidth: "32ch",
          fontVariationSettings: '"opsz" 60',
        }}
      >
        {dek}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: "clamp(64px, 8vw, 96px)" }}>
        {steps.map((s, i) => (
          <article
            key={s.number}
            className="stack-row"
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr) minmax(360px, 480px)",
              gap: "clamp(36px, 5vw, 80px)",
              padding: "clamp(48px, 6vw, 80px) 0",
              borderTop: i === 0 ? `1px solid ${INK}` : `1px solid ${RULE}`,
              borderBottom: i === steps.length - 1 ? `1px solid ${INK}` : "none",
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: "0.24em", color: STEEL_500, marginBottom: 16 }}>
                {s.number} · {s.proof}
              </div>
              <h3
                style={{
                  fontFamily: SERIF,
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: "clamp(32px, 4vw, 56px)",
                  lineHeight: 1.0,
                  letterSpacing: "-0.025em",
                  color: INK,
                  margin: 0,
                  marginBottom: 18,
                  fontVariationSettings: '"opsz" 96',
                }}
              >
                {s.title}
              </h3>
              <p style={{ fontFamily: SERIF, fontSize: "clamp(16px, 1.4vw, 18px)", lineHeight: 1.6, color: STEEL_700, margin: 0, maxWidth: "44ch", fontVariationSettings: '"opsz" 14' }}>
                {s.body}
              </p>
            </div>
            <div className="stack-illustration">
              <Card kind={kinds[i]} />
            </div>
          </article>
        ))}
      </div>

      {showCta && (
        <section style={{ display: "flex", justifyContent: "flex-start" }}>
          <Link href={cta.href} style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: SANS, fontSize: 14, fontWeight: 500, color: PAPER, backgroundColor: INK, border: `1px solid ${INK}`, borderRadius: 4, padding: "14px 22px", textDecoration: "none" }}>
            {cta.label}
            <span aria-hidden style={{ opacity: 0.7 }}>→</span>
          </Link>
        </section>
      )}

      <style jsx>{`
        @media (max-width: 880px) {
          .stack-row {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
        }
      `}</style>
    </>
  );
}

function Tab({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button type="button" role="tab" aria-selected={active} onClick={onClick} style={{ background: "none", border: "none", padding: 0, fontFamily: "inherit", fontStyle: "inherit", fontSize: "inherit", fontWeight: "inherit", color: active ? INK : STEEL_500, cursor: "pointer" }}>
      {label}
    </button>
  );
}
