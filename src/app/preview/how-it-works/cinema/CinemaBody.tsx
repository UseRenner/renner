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
// Callout tokens — for the dark hero / credits panels that need to
// flip polarity cleanly on every tone.
const CALLOUT_BG = "var(--c-callout-bg, #0d0f12)";
const CALLOUT_FG = "var(--c-callout-text, #fbfbfc)";
const CALLOUT_DIM = "var(--c-callout-dim, rgba(251,251,252,0.78))";
const CALLOUT_FOG = "var(--c-callout-fog, rgba(251,251,252,0.6))";

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

export function CinemaBody({ showCta }: { showCta: boolean }) {
  const [tab, setTab] = useState<"client" | "renner">("client");
  const isClient = tab === "client";
  const dek = isClient ? CLIENT_DEK : RENNER_DEK;
  const steps = isClient ? CLIENT_STEPS : RENNER_STEPS;
  const cta = isClient ? { label: "Sign up", href: "/signup" } : { label: "Become a Renner", href: "/become-a-renner" };

  return (
    <>
      {/* Audience switch — sets context before the hero */}
      <div role="tablist" aria-label="Audience" style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: "clamp(32px, 4vw, 44px)", fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 16 }}>
        <Tab label="For clients" active={isClient} onClick={() => setTab("client")} />
        <span aria-hidden style={{ color: STEEL_300, fontStyle: "normal" }}>·</span>
        <Tab label="For Renners" active={!isClient} onClick={() => setTab("renner")} />
      </div>

      {/* Letterbox hero */}
      <section
        style={{
          backgroundColor: CALLOUT_BG,
          color: CALLOUT_FG,
          aspectRatio: "2.39 / 1",
          minHeight: 320,
          padding: "clamp(40px, 5vw, 72px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          marginBottom: "clamp(72px, 9vw, 112px)",
        }}
      >
        <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: CALLOUT_FOG }}>
          How it works
        </div>

        <p
          style={{
            fontFamily: SERIF,
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(22px, 2.6vw, 32px)",
            lineHeight: 1.35,
            color: CALLOUT_FG,
            margin: 0,
            maxWidth: "44ch",
            fontVariationSettings: '"opsz" 36',
          }}
        >
          {dek}
        </p>
      </section>

      {/* See-before-read — three product cards directly below the hero */}
      <div className="cinema-cards" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "clamp(20px, 2.4vw, 32px)", marginBottom: "clamp(72px, 9vw, 112px)" }}>
        {(isClient ? CLIENT_KINDS : RENNER_KINDS).map((kind) => (
          <div key={kind} style={{ display: "flex" }}>
            <div style={{ flex: 1 }}>
              <Card kind={kind} />
            </div>
          </div>
        ))}
      </div>

      {/* Step rows */}
      <div style={{ marginBottom: "clamp(72px, 9vw, 112px)" }}>
        {steps.map((s, i) => (
          <article
            key={s.number}
            style={{
              padding: "clamp(32px, 4vw, 52px) 0",
              borderTop: i === 0 ? `1px solid ${INK}` : "none",
              borderBottom: i === steps.length - 1 ? `1px solid ${INK}` : `1px solid ${RULE}`,
              display: "grid",
              gridTemplateColumns: "80px minmax(0, 1fr) minmax(140px, 180px)",
              gap: "clamp(28px, 4vw, 64px)",
              alignItems: "baseline",
            }}
            className="cinema-row"
          >
            <div style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: "0.24em", textTransform: "uppercase", color: STEEL_500 }}>
              {s.number}
            </div>
            <div>
              <h3 style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(26px, 3vw, 36px)", lineHeight: 1.1, letterSpacing: "-0.018em", color: INK, margin: 0, marginBottom: 12, fontVariationSettings: '"opsz" 60' }}>
                {s.title}
              </h3>
              <p style={{ fontFamily: SERIF, fontSize: 16, lineHeight: 1.6, color: STEEL_700, margin: 0, maxWidth: "52ch", fontVariationSettings: '"opsz" 14' }}>
                {s.body}
              </p>
            </div>
            <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: STEEL_600, textAlign: "right" }}>
              {s.proof}
            </div>
          </article>
        ))}
      </div>

      {/* Closing credits — trust + CTA in one callout panel */}
      <section
        className="cinema-credits"
        style={{
          backgroundColor: CALLOUT_BG,
          color: CALLOUT_FG,
          padding: "clamp(40px, 5vw, 64px) clamp(36px, 4.5vw, 64px)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "clamp(28px, 3.5vw, 56px)",
            marginBottom: showCta ? "clamp(36px, 4.5vw, 56px)" : 0,
          }}
          className="cinema-credits-grid"
        >
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
              <div style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 18, color: CALLOUT_FG, marginBottom: 8, fontVariationSettings: '"opsz" 36' }}>
                {label}.
              </div>
              <div style={{ fontFamily: SERIF, fontSize: 14, lineHeight: 1.55, color: CALLOUT_DIM, fontVariationSettings: '"opsz" 14' }}>
                {body}
              </div>
            </div>
          ))}
        </div>

        {showCta && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, paddingTop: "clamp(28px, 3.5vw, 40px)", borderTop: `1px solid rgba(127,127,127,0.18)`, flexWrap: "wrap" }}>
            <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: CALLOUT_FOG }}>
              Both sides screened to join
            </span>
            <Link
              href={cta.href}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                fontFamily: SANS,
                fontSize: 14,
                fontWeight: 500,
                color: CALLOUT_BG,
                backgroundColor: CALLOUT_FG,
                border: `1px solid ${CALLOUT_FG}`,
                borderRadius: 4,
                padding: "12px 20px",
                textDecoration: "none",
              }}
            >
              {cta.label}
              <span aria-hidden style={{ opacity: 0.7 }}>→</span>
            </Link>
          </div>
        )}
      </section>

      <style jsx>{`
        @media (max-width: 880px) {
          .cinema-cards {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
        @media (max-width: 720px) {
          .cinema-row {
            grid-template-columns: 56px 1fr !important;
            gap: 12px 18px !important;
          }
          .cinema-row > :nth-child(3) {
            grid-column: 2;
            text-align: left !important;
          }
          .cinema-credits-grid {
            grid-template-columns: 1fr !important;
            gap: 22px !important;
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
