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

export function SpreadBody({ showCta }: { showCta: boolean }) {
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

      {/* The book spread — two pages with a visible inked gutter between */}
      <div
        className="spread"
        style={{
          border: `1px solid ${INK}`,
          marginBottom: "clamp(64px, 8vw, 96px)",
        }}
      >
        {/* Left page — title, dek, page-number */}
        <section className="spread-page spread-left">
          <div
            style={{
              fontFamily: MONO,
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: STEEL_500,
              marginBottom: 32,
            }}
          >
            Renner — how it works
          </div>
          <h1
            style={{
              fontFamily: SERIF,
              fontWeight: 400,
              fontSize: "clamp(40px, 5.5vw, 80px)",
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              color: INK,
              margin: 0,
              marginBottom: 28,
              fontVariationSettings: '"opsz" 144',
            }}
          >
            {isClient ? "For clients." : "For Renners."}
          </h1>
          <p
            style={{
              fontFamily: SERIF,
              fontWeight: 400,
              fontSize: "clamp(17px, 1.6vw, 20px)",
              lineHeight: 1.55,
              color: STEEL_700,
              margin: 0,
              maxWidth: "36ch",
              fontVariationSettings: '"opsz" 14',
            }}
          >
            {dek}
          </p>

          <div
            style={{
              marginTop: "auto",
              paddingTop: "clamp(40px, 5vw, 64px)",
              fontFamily: MONO,
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.2em",
              color: STEEL_500,
            }}
          >
            i
          </div>
        </section>

        {/* Right page — three steps as a numbered list */}
        <section className="spread-page spread-right">
          <ol style={{ listStyle: "none", margin: 0, padding: 0, flex: 1 }}>
            {steps.map((s, i) => (
              <li
                key={s.number}
                style={{
                  paddingTop: i === 0 ? 0 : "clamp(28px, 3vw, 40px)",
                  paddingBottom: "clamp(28px, 3vw, 40px)",
                  borderBottom: i === steps.length - 1 ? "none" : `1px solid ${RULE}`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    gap: 16,
                    marginBottom: 12,
                    fontFamily: MONO,
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: STEEL_500,
                  }}
                >
                  <span>{s.number}</span>
                  <span>{s.proof}</span>
                </div>
                <h3
                  style={{
                    fontFamily: SERIF,
                    fontWeight: 400,
                    fontSize: "clamp(26px, 3vw, 36px)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                    color: INK,
                    margin: 0,
                    marginBottom: 10,
                    fontVariationSettings: '"opsz" 60',
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    fontFamily: SERIF,
                    fontSize: 16,
                    lineHeight: 1.55,
                    color: STEEL_700,
                    margin: 0,
                    maxWidth: "42ch",
                    fontVariationSettings: '"opsz" 14',
                  }}
                >
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
          <div
            style={{
              paddingTop: "clamp(40px, 5vw, 64px)",
              textAlign: "right",
              fontFamily: MONO,
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.2em",
              color: STEEL_500,
            }}
          >
            ii
          </div>
        </section>
      </div>

      {/* Trust as a single horizontal band */}
      <section
        className="spread-trust"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "clamp(24px, 3vw, 48px)",
          marginBottom: showCta ? "clamp(56px, 7vw, 88px)" : 0,
        }}
      >
        {trust.map(([label, body]) => (
          <div key={label} style={{ paddingTop: 20, borderTop: `1px solid ${RULE}` }}>
            <div style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 18, color: INK, marginBottom: 6, fontVariationSettings: '"opsz" 36' }}>
              {label}.
            </div>
            <div style={{ fontFamily: SERIF, fontSize: 14, lineHeight: 1.55, color: STEEL_700, fontVariationSettings: '"opsz" 14' }}>
              {body}
            </div>
          </div>
        ))}
      </section>

      {showCta && (
        <section style={{ display: "flex", justifyContent: "center", paddingTop: "clamp(40px, 5vw, 64px)", borderTop: `1px solid ${RULE}` }}>
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
        .spread {
          display: grid;
          grid-template-columns: 1fr 1px 1fr;
          background: ${PAPER};
        }
        .spread > :nth-child(2) {
          background: ${INK};
        }
        .spread-page {
          padding: clamp(36px, 5vw, 72px) clamp(32px, 5vw, 64px);
          display: flex;
          flex-direction: column;
          min-height: clamp(420px, 50vw, 640px);
        }
        @media (max-width: 720px) {
          .spread {
            grid-template-columns: 1fr;
          }
          .spread > :nth-child(2) {
            height: 1px;
            width: 100%;
          }
          .spread-trust {
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
