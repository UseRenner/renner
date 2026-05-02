"use client";

import Link from "next/link";
import { useState } from "react";
import { Card, CLIENT_KINDS, RENNER_KINDS } from "../_illustrations";

const SERIF = "var(--font-source-serif), ui-serif, Georgia, serif";
const SANS = "var(--font-source-sans), ui-sans-serif, system-ui, sans-serif";
const MONO = "var(--font-source-code), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const INK = "var(--c-text, #0d0f12)";
const STEEL_700 = "var(--c-700, #38414d)";
const STEEL_600 = "var(--c-600, #647589)";
const STEEL_500 = "var(--c-500, #7d8da0)";
const STEEL_300 = "var(--c-300, #cad1d8)";
const RULE = "var(--c-rule, #eaedf0)";
const PAPER = "var(--c-bg, #fbfbfc)";

const CLIENT_DEK = "A marketplace for real-estate work. Post a task, pick a Renner, get it done. Verified on both sides.";
const RENNER_DEK = "Real-estate work, paid through the platform. Set your area, apply to tasks. Verified on both sides.";

const CLIENT_STEPS = [
  { number: "01", title: "Post a task.", body: "Set the location, time, task, and price. Takes about two minutes.", proof: "Under 2 min" },
  { number: "02", title: "Pick a Renner.", body: "Renners apply. Read their profiles and book one.", proof: "Vetted" },
  { number: "03", title: "Get it done.", body: "The Renner sends photo confirmation. You confirm. Done.", proof: "Escrow" },
];
const RENNER_STEPS = [
  { number: "01", title: "Get verified.", body: "Verify your ID, clear a background check, and set your service area. Done in a day.", proof: "Same-day" },
  { number: "02", title: "Pick a task.", body: "See tasks posted in your area. Apply to the ones that fit your skills and schedule.", proof: "Local" },
  { number: "03", title: "Get it done.", body: "Complete the task. Send photo confirmation. Done.", proof: "100% of pay" },
];

export function LeadBody({ showCta }: { showCta: boolean }) {
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

      <div className="lead-hero" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: "clamp(40px, 5vw, 80px)", alignItems: "start", marginBottom: "clamp(72px, 9vw, 112px)" }}>
        <p
          style={{
            fontFamily: SERIF,
            fontWeight: 400,
            fontSize: "clamp(28px, 3.5vw, 44px)",
            lineHeight: 1.25,
            letterSpacing: "-0.012em",
            color: INK,
            margin: 0,
            maxWidth: "26ch",
            fontVariationSettings: '"opsz" 60',
          }}
        >
          {dek}
        </p>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Card kind={kinds[0]} />
        </div>
      </div>

      <div style={{ marginBottom: "clamp(56px, 7vw, 88px)" }}>
        {steps.map((s, i) => (
          <article
            key={s.number}
            className="lead-row"
            style={{
              display: "grid",
              gridTemplateColumns: "60px minmax(0, 1.2fr) minmax(0, 2fr) minmax(140px, auto)",
              gap: "clamp(20px, 2.5vw, 36px)",
              padding: "clamp(24px, 3vw, 36px) 0",
              borderTop: i === 0 ? `1px solid ${INK}` : `1px solid ${RULE}`,
              borderBottom: i === steps.length - 1 ? `1px solid ${INK}` : "none",
              alignItems: "baseline",
            }}
          >
            <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: "0.22em", color: STEEL_500 }}>{s.number}</span>
            <h3 style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(20px, 2.2vw, 26px)", lineHeight: 1.1, color: INK, margin: 0, fontVariationSettings: '"opsz" 36' }}>
              {s.title}
            </h3>
            <p style={{ fontFamily: SERIF, fontSize: 16, lineHeight: 1.6, color: STEEL_700, margin: 0, fontVariationSettings: '"opsz" 14' }}>
              {s.body}
            </p>
            <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: STEEL_600, textAlign: "right" }}>
              {s.proof}
            </span>
          </article>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(24px, 3vw, 48px)", marginBottom: showCta ? "clamp(48px, 6vw, 72px)" : 0, textAlign: "center", justifyItems: "center" }} className="lead-trust">
        {(isClient
          ? [
              ["Both sides vetted", "ID verified and background checked before any booking."],
              ["Funds in escrow", "Held by Stripe until you confirm."],
              ["Photos on every task", "A photo and a note when it's done."],
            ]
          : [
              ["Real work", "Real-estate tasks."],
              ["Vetted clients", "ID verified and background checked, same as you."],
              ["Repeat work", "Good work earns repeat clients."],
            ]
        ).map(([label, body]) => (
          <div key={label} style={{ maxWidth: "32ch" }}>
            <div style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400, fontSize: 18, color: INK, marginBottom: 8, fontVariationSettings: '"opsz" 36' }}>
              {label}.
            </div>
            <div style={{ fontFamily: SERIF, fontSize: 14, lineHeight: 1.55, color: STEEL_700, fontVariationSettings: '"opsz" 14' }}>
              {body}
            </div>
          </div>
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
          .lead-hero {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .lead-row {
            grid-template-columns: 40px 1fr !important;
            gap: 8px 16px !important;
          }
          .lead-row > :nth-child(3),
          .lead-row > :nth-child(4) {
            grid-column: 2;
          }
          .lead-row > :nth-child(4) {
            text-align: left !important;
          }
          .lead-trust {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
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
