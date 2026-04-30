"use client";

import Link from "next/link";
import { useState } from "react";

const SERIF = "var(--font-source-serif), ui-serif, Georgia, serif";
const SANS =
  "var(--font-source-sans), ui-sans-serif, system-ui, sans-serif";
const MONO =
  "var(--font-source-code), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const INK = "#0d0f12";
const SLATE = "#2a2f36";
const STEEL_700 = "#4d5b6a";
const STEEL_600 = "#647589";
const STEEL_500 = "#7d8da0";
const STEEL_300 = "#cad1d8";
const RULE = "#eaedf0";
const PAPER = "#fbfbfc";

type Row = {
  number: string;
  title: string;
  body: React.ReactNode;
  detail: string;
  proof: string;
};

const CLIENT_DEK =
  "A marketplace for real-estate task work — sign installs, lockbox swaps, showings, courier runs, property prep — handled by background-checked Renners and paid through escrow.";

const RENNER_DEK =
  "Real-estate work, brief by brief. Run tasks for the agents, brokers, and property managers who keep listings moving. Both parties are ID-verified and background-checked.";

const CLIENT_ROWS: Row[] = [
  {
    number: "01",
    title: "Post a task.",
    body: (
      <>
        Describe what you need — sign install, lockbox swap, property
        visuals, guest check-in. Set the location, the window, and the
        price.
      </>
    ),
    detail: "Under 2 minutes",
    proof: "Live to vetted Renners",
  },
  {
    number: "02",
    title: "Pick a Renner.",
    body: (
      <>
        Background-checked Renners in your area apply with bios,
        ratings, and tenure. Book the right hand for the work.
      </>
    ),
    detail: "Checkr-verified",
    proof: "Single-Renner booking",
  },
  {
    number: "03",
    title: "Get it done.",
    body: (
      <>
        Your Renner finishes the task and submits completion photos.
        You confirm. Funds release through Stripe escrow.
      </>
    ),
    detail: "48-hour window",
    proof: "Auto-release on time-out",
  },
];

const RENNER_ROWS: Row[] = [
  {
    number: "01",
    title: "Get verified.",
    body: (
      <>
        Sign up, confirm your identity, clear a Checkr background
        check. Pick categories, set service area, name your rate.
      </>
    ),
    detail: "Same-day in most states",
    proof: "Identity + background",
  },
  {
    number: "02",
    title: "Pick a task.",
    body: (
      <>
        Briefs come in from agents, brokers, and managers nearby.
        Apply to what fits your schedule and skills.
      </>
    ),
    detail: "Local marketplace",
    proof: "Apply and decline at will",
  },
  {
    number: "03",
    title: "Get it done.",
    body: (
      <>
        Run the task, upload completion photos, get paid through the
        platform. Build a reputation that earns repeat clients.
      </>
    ),
    detail: "Stripe payout",
    proof: "100% of task pay",
  },
];

const CLIENT_TRUST: Array<[string, string, string]> = [
  ["Vetting", "ID + Checkr background", "Both sides"],
  ["Custody", "Stripe escrow", "Held until confirmed"],
  ["Record", "Photos + written confirmation", "On every task"],
];

const RENNER_TRUST: Array<[string, string, string]> = [
  ["Source", "Real-estate work", "Agents · brokers · managers"],
  ["Vetting", "Clients ID + background-checked", "Same as you"],
  ["Reputation", "Ratings + reviews", "Repeat clients return"],
];

export function ConsoleBody({ showCta }: { showCta: boolean }) {
  const [tab, setTab] = useState<"client" | "renner">("client");
  const isClient = tab === "client";
  const dek = isClient ? CLIENT_DEK : RENNER_DEK;
  const rows = isClient ? CLIENT_ROWS : RENNER_ROWS;
  const trust = isClient ? CLIENT_TRUST : RENNER_TRUST;
  const ctaButton = isClient
    ? { label: "Sign up", href: "/signup" }
    : { label: "Become a Renner", href: "/become-a-renner" };

  return (
    <>
      {/* Lede — small kicker, settled headline, dek */}
      <div style={{ marginBottom: "clamp(56px, 7vw, 88px)", maxWidth: 880 }}>
        <div
          role="tablist"
          aria-label="Audience"
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 14,
            marginBottom: 40,
            fontFamily: SERIF,
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: 16,
          }}
        >
          <TabButton label="For clients" active={isClient} onClick={() => setTab("client")} />
          <span aria-hidden style={{ color: STEEL_300, fontStyle: "normal" }}>·</span>
          <TabButton label="For Renners" active={!isClient} onClick={() => setTab("renner")} />
        </div>

        <div
          style={{
            fontFamily: MONO,
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: STEEL_500,
            marginBottom: 28,
          }}
        >
          Specification · v.2026
        </div>

        <h1
          style={{
            fontFamily: SERIF,
            fontWeight: 400,
            fontSize: "clamp(32px, 3.6vw, 48px)",
            lineHeight: 1.1,
            letterSpacing: "-0.018em",
            color: INK,
            margin: 0,
            marginBottom: 28,
            maxWidth: "22ch",
            fontVariationSettings: '"opsz" 60',
          }}
        >
          {isClient ? "Post a task. Pick a Renner. Get it done." : "Get verified. Pick a task. Get it done."}
        </h1>

        <p
          style={{
            fontFamily: SERIF,
            fontWeight: 400,
            fontSize: "clamp(16px, 1.4vw, 18px)",
            lineHeight: 1.6,
            color: STEEL_700,
            margin: 0,
            maxWidth: "60ch",
            fontVariationSettings: '"opsz" 14',
          }}
        >
          {dek}
        </p>
      </div>

      {/* Specification table */}
      <div
        className="tabular"
        role="table"
        aria-label="How it works"
        style={{
          borderTop: `1px solid ${INK}`,
          borderBottom: `1px solid ${INK}`,
          marginBottom: "clamp(64px, 8vw, 96px)",
        }}
      >
        {/* Column header */}
        <div
          role="row"
          className="tabular-row tabular-head"
          style={{
            fontFamily: MONO,
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: STEEL_500,
            padding: "16px 0",
            borderBottom: `1px solid ${RULE}`,
          }}
        >
          <div role="columnheader">Step</div>
          <div role="columnheader">Action</div>
          <div role="columnheader">What it looks like</div>
          <div role="columnheader">Detail</div>
          <div role="columnheader" style={{ textAlign: "right" }}>Proof</div>
        </div>

        {rows.map((row, idx) => (
          <div
            role="row"
            key={row.number}
            className="tabular-row tabular-body"
            style={{
              padding: "clamp(28px, 3vw, 40px) 0",
              borderBottom:
                idx === rows.length - 1 ? "none" : `1px solid ${RULE}`,
              alignItems: "baseline",
            }}
          >
            <div
              role="cell"
              style={{
                fontFamily: MONO,
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: "0.22em",
                color: STEEL_500,
              }}
            >
              {row.number}
            </div>
            <div
              role="cell"
              style={{
                fontFamily: SERIF,
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "clamp(20px, 2vw, 24px)",
                lineHeight: 1.2,
                letterSpacing: "-0.012em",
                color: INK,
                fontVariationSettings: '"opsz" 36',
              }}
            >
              {row.title}
            </div>
            <div
              role="cell"
              style={{
                fontFamily: SERIF,
                fontSize: 15,
                lineHeight: 1.6,
                color: STEEL_700,
                fontVariationSettings: '"opsz" 14',
              }}
            >
              {row.body}
            </div>
            <div
              role="cell"
              style={{
                fontFamily: SERIF,
                fontSize: 14,
                color: SLATE,
                lineHeight: 1.45,
                fontVariationSettings: '"opsz" 14',
              }}
            >
              {row.detail}
            </div>
            <div
              role="cell"
              style={{
                fontFamily: MONO,
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: STEEL_600,
                textAlign: "right",
              }}
            >
              {row.proof}
            </div>
          </div>
        ))}
      </div>

      {/* Trust — continuation table, same column logic at smaller scale */}
      <section style={{ marginBottom: showCta ? "clamp(64px, 8vw, 96px)" : 0 }}>
        <div
          style={{
            fontFamily: MONO,
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: STEEL_500,
            marginBottom: 20,
          }}
        >
          {isClient ? "Why Renner" : "What you get"}
        </div>

        <div
          className="tabular-trust"
          style={{
            borderTop: `1px solid ${RULE}`,
            borderBottom: `1px solid ${RULE}`,
          }}
        >
          {trust.map(([label, value, foot], idx) => (
            <div
              key={label}
              className="tabular-trust-row"
              style={{
                padding: "20px 0",
                borderBottom:
                  idx === trust.length - 1 ? "none" : `1px solid ${RULE}`,
                alignItems: "baseline",
              }}
            >
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 10,
                  fontWeight: 500,
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  color: STEEL_500,
                }}
              >
                {label}
              </div>
              <div
                style={{
                  fontFamily: SERIF,
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: 19,
                  color: INK,
                  fontVariationSettings: '"opsz" 36',
                }}
              >
                {value}.
              </div>
              <div
                style={{
                  fontFamily: SERIF,
                  fontSize: 14,
                  lineHeight: 1.5,
                  color: STEEL_700,
                  textAlign: "right",
                  fontVariationSettings: '"opsz" 14',
                }}
              >
                {foot}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA — final row in the same logic */}
      {showCta && (
        <section
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: 24,
            flexWrap: "wrap",
            paddingTop: "clamp(40px, 5vw, 64px)",
            borderTop: `1px solid ${INK}`,
          }}
        >
          <div
            style={{
              fontFamily: SERIF,
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(22px, 2.4vw, 28px)",
              color: INK,
              maxWidth: "26ch",
              lineHeight: 1.2,
              fontVariationSettings: '"opsz" 36',
            }}
          >
            {isClient ? "Ready when you are." : "Ready to run."}
          </div>
          <Link
            href={ctaButton.href}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              fontFamily: SANS,
              fontSize: 14,
              fontWeight: 500,
              letterSpacing: "0.01em",
              color: PAPER,
              backgroundColor: INK,
              border: `1px solid ${INK}`,
              borderRadius: 4,
              padding: "14px 22px",
              textDecoration: "none",
              whiteSpace: "nowrap",
              transition:
                "background-color 150ms ease, border-color 150ms ease",
            }}
          >
            {ctaButton.label}
            <span aria-hidden style={{ opacity: 0.7 }}>→</span>
          </Link>
        </section>
      )}

      <style jsx>{`
        .tabular-row {
          display: grid;
          grid-template-columns: 56px minmax(160px, 1.1fr) minmax(0, 2.2fr) minmax(120px, 1fr) minmax(140px, 1.1fr);
          gap: clamp(20px, 2.5vw, 40px);
        }
        .tabular-trust-row {
          display: grid;
          grid-template-columns: minmax(120px, 0.9fr) minmax(0, 1.4fr) minmax(0, 1fr);
          gap: clamp(20px, 2.5vw, 40px);
        }
        @media (max-width: 880px) {
          .tabular-row {
            grid-template-columns: 40px 1fr;
            gap: 12px 20px;
          }
          .tabular-row > :nth-child(3),
          .tabular-row > :nth-child(4),
          .tabular-row > :nth-child(5) {
            grid-column: 2;
          }
          .tabular-head {
            display: none !important;
          }
          .tabular-row > :nth-child(5) {
            text-align: left !important;
          }
          .tabular-trust-row {
            grid-template-columns: 1fr;
            gap: 6px;
          }
          .tabular-trust-row > :nth-child(3) {
            text-align: left !important;
          }
        }
      `}</style>
    </>
  );
}

function TabButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
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
        transition: "color 150ms ease",
      }}
    >
      {label}
    </button>
  );
}
