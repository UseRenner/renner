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

type Step = { id: string; number: string; title: string; body: string; proof: string };

const CLIENT_DEK =
  "A marketplace for real-estate work. Post a task, pick a Renner, get it done. Both sides are screened to join.";
const RENNER_DEK =
  "Real-estate work, paid through the platform. Set your area, set your rate, pick what you take. Both sides are screened to join.";

const CLIENT_STEPS: Step[] = [
  { id: "post", number: "01", title: "Post a task.", body: "Describe what you need — sign install, lockbox swap, courier run, property prep, guest check-in. Set the location, the time window, and the price. Posts go live to vetted Renners only.", proof: "Under 2 min" },
  { id: "pick", number: "02", title: "Pick a Renner.", body: "Background-checked Renners in your area apply with bios, ratings, and tenure on the platform. Read the file, book the right hand for the work.", proof: "Checkr-vetted" },
  { id: "done", number: "03", title: "Get it done.", body: "Photos and a written note arrive on completion. You confirm; Stripe releases the funds from escrow. After 48 hours without a response, payment auto-releases.", proof: "Stripe escrow" },
];

const RENNER_STEPS: Step[] = [
  { id: "verify", number: "01", title: "Get verified.", body: "Sign up, confirm your identity, clear a Checkr background check. Pick the categories you run. Set a service area and a rate. Onboarding usually clears the same day.", proof: "Same-day" },
  { id: "pick", number: "02", title: "Pick a task.", body: "Briefs come in from agents, brokers, and property managers nearby. Apply to the ones that fit your schedule and skills. Decline anything that doesn't.", proof: "Local" },
  { id: "done", number: "03", title: "Get it done.", body: "Run the task, upload completion photos, and get paid through the platform. Build a reputation that earns repeat clients in an industry that remembers.", proof: "100% of pay" },
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

export function TapeBody({ showCta }: { showCta: boolean }) {
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
      <div
        role="tablist"
        aria-label="Audience"
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 14,
          marginBottom: "clamp(40px, 5vw, 56px)",
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

      {/* The tape — three cells in a single horizontal strip, top and bottom inked */}
      <div
        className="tape"
        style={{
          borderTop: `2px solid ${INK}`,
          borderBottom: `2px solid ${INK}`,
          marginBottom: "clamp(72px, 9vw, 112px)",
        }}
      >
        {steps.map((s) => (
          <Link
            key={s.id}
            href={`#${s.id}`}
            className="tape-cell"
            style={{
              padding: "clamp(20px, 2.4vw, 32px) clamp(20px, 2.5vw, 32px)",
              textDecoration: "none",
              color: INK,
            }}
          >
            <div
              style={{
                fontFamily: MONO,
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.24em",
                color: STEEL_500,
                marginBottom: 10,
              }}
            >
              {s.number}
            </div>
            <div
              style={{
                fontFamily: SERIF,
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "clamp(20px, 2.2vw, 26px)",
                lineHeight: 1.1,
                color: INK,
                fontVariationSettings: '"opsz" 36',
              }}
            >
              {s.title}
            </div>
          </Link>
        ))}
      </div>

      {/* Below the tape — a settled reading column. The tape was the snap;
          this is the depth. Single column, hanging numerals, generous leading. */}
      <div className="tape-column" style={{ maxWidth: 720, margin: "0 auto", marginBottom: "clamp(72px, 9vw, 112px)" }}>
        <p
          style={{
            fontFamily: SERIF,
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(22px, 2.2vw, 28px)",
            lineHeight: 1.4,
            color: INK,
            margin: 0,
            marginBottom: "clamp(48px, 6vw, 72px)",
            fontVariationSettings: '"opsz" 36',
          }}
        >
          {dek}
        </p>

        {steps.map((s, i) => (
          <article
            id={s.id}
            key={s.id}
            style={{
              scrollMarginTop: "80px",
              display: "grid",
              gridTemplateColumns: "minmax(56px, 64px) minmax(0, 1fr)",
              columnGap: "clamp(20px, 2.5vw, 32px)",
              padding: "clamp(28px, 3.5vw, 44px) 0",
              borderTop: `1px solid ${RULE}`,
              borderBottom: i === steps.length - 1 ? `1px solid ${RULE}` : "none",
            }}
          >
            <div style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: "0.24em", color: STEEL_500, paddingTop: 4 }}>
              {s.number}
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, marginBottom: 10, flexWrap: "wrap" }}>
                <h3 style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(24px, 2.6vw, 30px)", lineHeight: 1.1, color: INK, margin: 0, fontVariationSettings: '"opsz" 60' }}>
                  {s.title}
                </h3>
                <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: STEEL_600 }}>
                  {s.proof}
                </span>
              </div>
              <p style={{ fontFamily: SERIF, fontSize: 17, lineHeight: 1.65, color: STEEL_700, margin: 0, fontVariationSettings: '"opsz" 14' }}>
                {s.body}
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* Trust as an inline mono row — quiet, in keeping with the column above */}
      <div
        className="tape-trust"
        style={{
          maxWidth: 720,
          margin: "0 auto",
          marginBottom: showCta ? "clamp(40px, 5vw, 64px)" : 0,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {trust.map(([label, body]) => (
          <div key={label} style={{ display: "flex", alignItems: "baseline", gap: 14, flexWrap: "wrap" }}>
            <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 17, color: INK, minWidth: 180, fontVariationSettings: '"opsz" 36' }}>
              {label}.
            </span>
            <span style={{ fontFamily: SERIF, fontSize: 15, lineHeight: 1.55, color: STEEL_700, fontVariationSettings: '"opsz" 14' }}>
              {body}
            </span>
          </div>
        ))}
      </div>

      {showCta && (
        <section style={{ maxWidth: 720, margin: "0 auto", display: "flex", justifyContent: "flex-start", paddingTop: "clamp(32px, 4vw, 48px)" }}>
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
        </section>
      )}

      <style jsx>{`
        .tape {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
        }
        .tape-cell {
          border-right: 1px solid ${RULE};
          transition: background 120ms ease;
        }
        .tape-cell:last-child {
          border-right: none;
        }
        .tape-cell:hover {
          background: rgba(13, 15, 18, 0.03);
        }
        @media (max-width: 720px) {
          .tape {
            grid-template-columns: 1fr;
          }
          .tape-cell {
            border-right: none;
            border-bottom: 1px solid ${RULE};
          }
          .tape-cell:last-child {
            border-bottom: none;
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
