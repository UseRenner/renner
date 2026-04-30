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

type Step = { title: string; body: string; proof: string };

const CLIENT_DEK =
  "A marketplace for real-estate work. Three steps. Both sides are screened to join.";
const RENNER_DEK =
  "Real-estate work, paid through the platform. Three steps. Both sides are screened to join.";

const CLIENT_STEPS: Step[] = [
  { title: "Post a task.", body: "Where, when, what, how much. Two minutes.", proof: "Under 2 min" },
  { title: "Pick a Renner.", body: "Vetted Renners apply. Read the file. Book one.", proof: "Checkr-vetted" },
  { title: "Get it done.", body: "Photos arrive. You confirm. Stripe pays.", proof: "Stripe escrow" },
];

const RENNER_STEPS: Step[] = [
  { title: "Get verified.", body: "ID, background check, area, rate. Same day.", proof: "Same-day" },
  { title: "Pick a task.", body: "Briefs from agents and managers nearby. Apply.", proof: "Local" },
  { title: "Get it done.", body: "Run the task. Send photos. Get paid.", proof: "100% of pay" },
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

export function ListBody({ showCta }: { showCta: boolean }) {
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
      {/* Audience switch */}
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

      {/* Lede — quiet, the list does the work */}
      <p
        style={{
          fontFamily: SERIF,
          fontWeight: 400,
          fontSize: "clamp(20px, 1.9vw, 24px)",
          lineHeight: 1.4,
          color: STEEL_700,
          margin: 0,
          marginBottom: "clamp(56px, 7vw, 96px)",
          maxWidth: "44ch",
          fontVariationSettings: '"opsz" 14',
        }}
      >
        {dek}
      </p>

      {/* The list */}
      <ol
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          marginBottom: "clamp(72px, 9vw, 112px)",
        }}
      >
        {steps.map((s, i) => (
          <li
            key={i}
            className="list-item"
            style={{
              padding: "clamp(28px, 3.5vw, 48px) 0",
              borderBottom: `1px solid ${RULE}`,
            }}
          >
            <span
              aria-hidden
              className="list-numeral"
              style={{
                fontFamily: SERIF,
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "clamp(72px, 11vw, 160px)",
                lineHeight: 0.85,
                letterSpacing: "-0.04em",
                color: INK,
                fontVariationSettings: '"opsz" 144',
              }}
            >
              {i + 1}
            </span>
            <div className="list-content">
              <h3
                style={{
                  fontFamily: SERIF,
                  fontWeight: 400,
                  fontSize: "clamp(28px, 3.4vw, 44px)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.025em",
                  color: INK,
                  margin: 0,
                  marginBottom: 14,
                  fontVariationSettings: '"opsz" 96',
                }}
              >
                {s.title}
              </h3>
              <p
                style={{
                  fontFamily: SERIF,
                  fontSize: 17,
                  lineHeight: 1.55,
                  color: STEEL_700,
                  margin: 0,
                  marginBottom: 16,
                  maxWidth: "48ch",
                  fontVariationSettings: '"opsz" 14',
                }}
              >
                {s.body}
              </p>
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 10,
                  fontWeight: 500,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: STEEL_600,
                }}
              >
                {s.proof}
              </div>
            </div>
          </li>
        ))}
      </ol>

      {/* Trust as three more list items, smaller */}
      <ul
        className="list-trust"
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          marginBottom: showCta ? "clamp(48px, 6vw, 72px)" : 0,
        }}
      >
        {trust.map(([label, body]) => (
          <li
            key={label}
            style={{
              padding: "16px 0",
              borderBottom: `1px solid ${RULE}`,
              display: "flex",
              alignItems: "baseline",
              gap: "clamp(16px, 2.4vw, 32px)",
              flexWrap: "wrap",
            }}
          >
            <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 18, color: INK, minWidth: 200, fontVariationSettings: '"opsz" 36' }}>
              {label}.
            </span>
            <span style={{ fontFamily: SERIF, fontSize: 15, lineHeight: 1.55, color: STEEL_700, fontVariationSettings: '"opsz" 14' }}>
              {body}
            </span>
          </li>
        ))}
      </ul>

      {showCta && (
        <section style={{ paddingTop: "clamp(40px, 5vw, 64px)" }}>
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
        .list-item {
          display: grid;
          grid-template-columns: minmax(120px, 200px) minmax(0, 1fr);
          gap: clamp(20px, 3vw, 48px);
          align-items: start;
        }
        @media (max-width: 720px) {
          .list-item {
            grid-template-columns: 1fr;
            gap: 8px;
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
