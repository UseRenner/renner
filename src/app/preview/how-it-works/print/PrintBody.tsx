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

type Step = { number: string; title: string; lede: string; body: string; proof: string };

const CLIENT_DEK =
  "A marketplace for real-estate work. Post a task, pick a Renner, get it done. Both sides are screened to join.";
const RENNER_DEK =
  "Real-estate work, paid through the platform. Set your area, set your rate, pick what you take. Both sides are screened to join.";

const CLIENT_STEPS: Step[] = [
  {
    number: "I",
    title: "Post a task.",
    lede: "Where, when, what, how much.",
    body: "Two minutes to set the brief. Posts go live to vetted Renners only. You decide the price and the window. No outside listing — the work is private to the platform.",
    proof: "Under 2 min",
  },
  {
    number: "II",
    title: "Pick a Renner.",
    lede: "Vetted Renners apply. Read the file. Book one.",
    body: "Each applicant has a bio, ratings, and tenure on the platform. Every Renner has cleared ID and a Checkr background check. You pick the right hand for the work.",
    proof: "Checkr-vetted",
  },
  {
    number: "III",
    title: "Get it done.",
    lede: "Photos arrive. You confirm. Stripe pays.",
    body: "On completion, photos and a written note land in the thread. Confirm and Stripe releases the funds from escrow. After 48 hours without a response, payment auto-releases.",
    proof: "Stripe escrow",
  },
];

const RENNER_STEPS: Step[] = [
  {
    number: "I",
    title: "Get verified.",
    lede: "ID, background check, area, rate.",
    body: "Sign up, clear the checks, set the categories you run. Pick a service area. Name your rate. Onboarding usually clears the same day in most states.",
    proof: "Same-day",
  },
  {
    number: "II",
    title: "Pick a task.",
    lede: "Briefs from agents and managers nearby.",
    body: "Briefs come in from agents, brokers, and property managers in your area. Apply to what fits your schedule. Decline anything that does not.",
    proof: "Local",
  },
  {
    number: "III",
    title: "Get it done.",
    lede: "Run the task. Send photos. Get paid.",
    body: "Run the task, upload completion photos, write a short note. Get paid through Stripe. Build a reputation that earns repeat clients in an industry that remembers.",
    proof: "100% of pay",
  },
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

export function PrintBody({ showCta }: { showCta: boolean }) {
  const [tab, setTab] = useState<"client" | "renner">("client");
  const isClient = tab === "client";
  const dek = isClient ? CLIENT_DEK : RENNER_DEK;
  const steps = isClient ? CLIENT_STEPS : RENNER_STEPS;
  const trust = isClient ? CLIENT_TRUST : RENNER_TRUST;
  const cta = isClient
    ? { label: "Sign up", href: "/signup" }
    : { label: "Become a Renner", href: "/become-a-renner" };

  return (
    <>
      {/* Masthead — thick rule, dateline, edition */}
      <div
        style={{
          borderTop: `4px solid ${INK}`,
          borderBottom: `1px solid ${INK}`,
          padding: "10px 0",
          marginBottom: "clamp(28px, 3.5vw, 48px)",
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 16,
          fontFamily: MONO,
          fontSize: 10,
          fontWeight: 500,
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: STEEL_600,
          flexWrap: "wrap",
        }}
      >
        <span>How it works</span>
        <span>Both sides screened to join</span>
      </div>

      {/* Audience switch */}
      <div
        role="tablist"
        aria-label="Audience"
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "center",
          gap: 14,
          marginBottom: "clamp(20px, 2.4vw, 32px)",
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

      {/* Centered headline */}
      <h1
        style={{
          fontFamily: SERIF,
          fontWeight: 400,
          fontSize: "clamp(40px, 6vw, 88px)",
          lineHeight: 1.0,
          letterSpacing: "-0.03em",
          color: INK,
          margin: 0,
          marginBottom: 18,
          textAlign: "center",
          fontVariationSettings: '"opsz" 144',
        }}
      >
        {isClient ? "Post. Pick. Done." : "Verify. Pick. Done."}
      </h1>
      <p
        style={{
          fontFamily: SERIF,
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "clamp(17px, 1.6vw, 20px)",
          lineHeight: 1.5,
          color: STEEL_700,
          margin: 0,
          marginBottom: "clamp(40px, 5vw, 64px)",
          textAlign: "center",
          maxWidth: "44ch",
          marginLeft: "auto",
          marginRight: "auto",
          fontVariationSettings: '"opsz" 36',
        }}
      >
        {dek}
      </p>

      {/* Section rule */}
      <div style={{ borderTop: `1px solid ${INK}`, marginBottom: "clamp(24px, 3vw, 32px)" }} />

      {/* Three justified columns */}
      <div className="print-cols">
        {steps.map((s) => (
          <article key={s.number} className="print-col">
            <div
              style={{
                fontFamily: MONO,
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: STEEL_500,
                marginBottom: 14,
              }}
            >
              {s.number} · {s.proof}
            </div>
            <h2
              style={{
                fontFamily: SERIF,
                fontWeight: 400,
                fontSize: "clamp(26px, 2.4vw, 32px)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: INK,
                margin: 0,
                marginBottom: 14,
                fontVariationSettings: '"opsz" 60',
              }}
            >
              {s.title}
            </h2>
            <p
              style={{
                fontFamily: SERIF,
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: 17,
                lineHeight: 1.45,
                color: INK,
                margin: 0,
                marginBottom: 14,
                fontVariationSettings: '"opsz" 36',
              }}
            >
              {s.lede}
            </p>
            <p
              style={{
                fontFamily: SERIF,
                fontSize: 15,
                lineHeight: 1.65,
                color: STEEL_700,
                margin: 0,
                textAlign: "justify",
                hyphens: "auto",
                fontVariationSettings: '"opsz" 14',
              }}
            >
              {s.body}
            </p>
          </article>
        ))}
      </div>

      {/* Footer matter — trust */}
      <div
        style={{
          marginTop: "clamp(48px, 6vw, 80px)",
          paddingTop: "clamp(20px, 2.5vw, 28px)",
          borderTop: `1px solid ${INK}`,
        }}
      >
        <div
          className="print-trust"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "clamp(20px, 3vw, 40px)",
            textAlign: "center",
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
      </div>

      {showCta && (
        <div
          style={{
            marginTop: "clamp(48px, 6vw, 80px)",
            paddingTop: "clamp(24px, 3vw, 32px)",
            borderTop: `4px solid ${INK}`,
            display: "flex",
            justifyContent: "center",
          }}
        >
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

      <style jsx>{`
        .print-cols {
          column-count: 3;
          column-gap: clamp(24px, 3vw, 40px);
          column-rule: 1px solid ${RULE};
        }
        .print-col {
          break-inside: avoid;
          padding-bottom: 4px;
        }
        .print-col + .print-col {
          margin-top: 0;
        }
        @media (max-width: 880px) {
          .print-cols {
            column-count: 1;
          }
          .print-col + .print-col {
            margin-top: clamp(28px, 4vw, 40px);
            padding-top: clamp(20px, 2.5vw, 28px);
            border-top: 1px solid ${RULE};
          }
          .print-trust {
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
