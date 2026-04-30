"use client";

import Link from "next/link";
import { useState } from "react";

const SERIF = "var(--font-source-serif), ui-serif, Georgia, serif";
const SANS =
  "var(--font-source-sans), ui-sans-serif, system-ui, sans-serif";
const MONO =
  "var(--font-source-code), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const INK = "#0d0f12";
const STEEL_700 = "#4d5b6a";
const STEEL_600 = "#647589";
const STEEL_500 = "#7d8da0";
const STEEL_300 = "#cad1d8";
const RULE = "#eaedf0";
const PAPER = "#fbfbfc";

type Step = { number: string; title: string; body: string; proof: string };

const CLIENT_DEK =
  "A marketplace for real-estate work. Post a task, pick a Renner, get it done. Both sides are screened to join.";
const RENNER_DEK =
  "Real-estate work, paid through the platform. Set your area, set your rate, pick what you take. Both sides are screened to join.";

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

const CLIENT_TRUST = [
  ["Both sides vetted", "ID and Checkr before any booking."],
  ["Funds in escrow", "Held by Stripe until you confirm."],
  ["On the record", "Photos and a note on every task."],
] as const;

const RENNER_TRUST = [
  ["Real work", "From agents, brokers, managers."],
  ["Vetted clients", "ID and Checkr, same as you."],
  ["Repeat work", "A reputation paid in repeat clients."],
] as const;

export function WindowBody({ showCta }: { showCta: boolean }) {
  const [tab, setTab] = useState<"client" | "renner">("client");
  const isClient = tab === "client";
  const dek = isClient ? CLIENT_DEK : RENNER_DEK;
  const steps = isClient ? CLIENT_STEPS : RENNER_STEPS;
  const trust = isClient ? CLIENT_TRUST : RENNER_TRUST;
  const cta = isClient
    ? { label: "Sign up", href: "/signup" }
    : { label: "Become a Renner", href: "/become-a-renner" };

  return (
    <div
      style={{
        border: `1px solid ${INK}`,
        padding: "clamp(28px, 4vw, 56px)",
      }}
    >
      {/* Header strip inside the window */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 16,
          paddingBottom: "clamp(20px, 2.5vw, 28px)",
          borderBottom: `1px solid ${RULE}`,
          marginBottom: "clamp(28px, 3.5vw, 48px)",
          fontFamily: MONO,
          fontSize: 10,
          fontWeight: 500,
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: STEEL_500,
          flexWrap: "wrap",
        }}
      >
        <span>How it works</span>
        <span>2026</span>
      </div>

      {/* Audience switch */}
      <div
        role="tablist"
        aria-label="Audience"
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 14,
          marginBottom: "clamp(28px, 3vw, 40px)",
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

      {/* Statement + dek */}
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
      <p
        style={{
          fontFamily: SERIF,
          fontSize: "clamp(17px, 1.5vw, 19px)",
          lineHeight: 1.55,
          color: STEEL_700,
          margin: 0,
          marginBottom: "clamp(40px, 5vw, 64px)",
          maxWidth: "52ch",
          fontVariationSettings: '"opsz" 14',
        }}
      >
        {dek}
      </p>

      {/* Step rows — hairlines stretch to the window edges */}
      <div
        style={{
          marginLeft: "calc(-1 * clamp(28px, 4vw, 56px))",
          marginRight: "calc(-1 * clamp(28px, 4vw, 56px))",
          marginBottom: "clamp(40px, 5vw, 64px)",
        }}
      >
        {steps.map((s, i) => (
          <div
            key={s.number}
            className="window-row"
            style={{
              padding: "clamp(20px, 2.4vw, 32px) clamp(28px, 4vw, 56px)",
              borderTop: `1px solid ${RULE}`,
              borderBottom: i === steps.length - 1 ? `1px solid ${RULE}` : "none",
              alignItems: "baseline",
            }}
          >
            <span style={{ fontFamily: MONO, fontSize: 12, fontWeight: 500, letterSpacing: "0.22em", color: STEEL_500 }}>
              {s.number}
            </span>
            <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(20px, 2vw, 24px)", color: INK, fontVariationSettings: '"opsz" 36' }}>
              {s.title}
            </span>
            <span style={{ fontFamily: SERIF, fontSize: 15, lineHeight: 1.55, color: STEEL_700, fontVariationSettings: '"opsz" 14' }}>
              {s.body}
            </span>
            <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: STEEL_600, textAlign: "right" }}>
              {s.proof}
            </span>
          </div>
        ))}
      </div>

      {/* Trust */}
      <div
        className="window-trust"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "clamp(20px, 3vw, 40px)",
          marginBottom: showCta ? "clamp(40px, 5vw, 64px)" : 0,
        }}
      >
        {trust.map(([label, body]) => (
          <div key={label}>
            <div style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 18, color: INK, marginBottom: 6, fontVariationSettings: '"opsz" 36' }}>
              {label}.
            </div>
            <div style={{ fontFamily: SERIF, fontSize: 14, lineHeight: 1.55, color: STEEL_700, fontVariationSettings: '"opsz" 14' }}>
              {body}
            </div>
          </div>
        ))}
      </div>

      {/* CTA pinned to the bottom edge of the window */}
      {showCta && (
        <div
          style={{
            marginLeft: "calc(-1 * clamp(28px, 4vw, 56px))",
            marginRight: "calc(-1 * clamp(28px, 4vw, 56px))",
            marginBottom: "calc(-1 * clamp(28px, 4vw, 56px))",
            padding: "clamp(20px, 2.5vw, 28px) clamp(28px, 4vw, 56px)",
            borderTop: `1px solid ${INK}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(18px, 1.6vw, 20px)", color: INK, fontVariationSettings: '"opsz" 36' }}>
            {isClient ? "Get something done." : "Start running."}
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
              color: PAPER,
              backgroundColor: INK,
              border: `1px solid ${INK}`,
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

      <style jsx>{`
        .window-row {
          display: grid;
          grid-template-columns: 56px minmax(160px, 1fr) minmax(0, 2.4fr) minmax(120px, 1fr);
          gap: clamp(16px, 2.4vw, 32px);
        }
        @media (max-width: 720px) {
          .window-row {
            grid-template-columns: 40px 1fr;
            gap: 8px 16px;
          }
          .window-row > :nth-child(3),
          .window-row > :nth-child(4) {
            grid-column: 2;
          }
          .window-row > :nth-child(4) {
            text-align: left !important;
          }
          .window-trust {
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
