"use client";

// Ledger — main reading column on the left at ~720px, marginalia rail
// on the right at ~200px holding mono section IDs and annotation
// proofs. Editorial-meets-spec-sheet. The marginalia is the rail's
// soul: small, in mono, doing technical work next to the prose.

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

type Step = {
  id: string;
  number: string;
  title: React.ReactNode;
  body: React.ReactNode;
  margin: { label: string; value: string }[];
};

const CLIENT_DEK =
  "A marketplace for real-estate task work — sign installs, lockbox swaps, showings, courier runs, property prep — handled by background-checked Renners and paid through escrow.";

const RENNER_DEK =
  "Real-estate work, brief by brief. Run tasks for the agents, brokers, and property managers who keep listings moving. Both parties are ID-verified and background-checked.";

function Em({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontStyle: "italic",
        fontWeight: 300,
        color: STEEL_600,
      }}
    >
      {children}
    </span>
  );
}

const CLIENT_STEPS: Step[] = [
  {
    id: "post",
    number: "§ 01",
    title: "Post a task.",
    body: (
      <>
        Describe what you need — sign install, lockbox swap, property
        visuals, guest check-in. Set the location, the time window, and
        the price. Posts go live to Renners only.
      </>
    ),
    margin: [
      { label: "Time", value: "Under 2 minutes" },
      { label: "Audience", value: "Vetted Renners" },
    ],
  },
  {
    id: "pick",
    number: "§ 02",
    title: "Pick a Renner.",
    body: (
      <>
        Background-checked Renners in your area apply. Read their bio,
        ratings, and tenure. Book the right hand for the work.
      </>
    ),
    margin: [
      { label: "Vetting", value: "Checkr-verified" },
      { label: "Booking", value: "Single Renner" },
    ],
  },
  {
    id: "done",
    number: "§ 03",
    title: "Get it done.",
    body: (
      <>
        Your Renner finishes the task and submits completion photos
        with a written confirmation. You confirm. Funds release through
        Stripe. If 48 hours pass without action, payment auto-releases.
      </>
    ),
    margin: [
      { label: "Custody", value: "Stripe escrow" },
      { label: "Window", value: "48 hours" },
    ],
  },
];

const RENNER_STEPS: Step[] = [
  {
    id: "post",
    number: "§ 01",
    title: "Get verified.",
    body: (
      <>
        Sign up, confirm your identity, clear a Checkr background check.
        Pick the categories you run, set your service area, name your
        rate.
      </>
    ),
    margin: [
      { label: "Vetting", value: "Checkr" },
      { label: "Onboarding", value: "Same-day in most states" },
    ],
  },
  {
    id: "pick",
    number: "§ 02",
    title: "Pick a task.",
    body: (
      <>
        Briefs come in from agents, brokers, and managers nearby. Apply
        to what fits your schedule and skills. Decline anything that
        doesn&rsquo;t.
      </>
    ),
    margin: [
      { label: "Marketplace", value: "Local" },
      { label: "Discretion", value: "Yours" },
    ],
  },
  {
    id: "done",
    number: "§ 03",
    title: "Get it done.",
    body: (
      <>
        Run the task, upload completion photos, get paid through the
        platform. Build a reputation that earns repeat clients in an
        industry that remembers.
      </>
    ),
    margin: [
      { label: "Settlement", value: "Stripe" },
      { label: "Reputation", value: "Ratings · reviews" },
    ],
  },
];

export function LedgerBody({ showCta }: { showCta: boolean }) {
  const [tab, setTab] = useState<"client" | "renner">("client");
  const isClient = tab === "client";
  const dek = isClient ? CLIENT_DEK : RENNER_DEK;
  const steps = isClient ? CLIENT_STEPS : RENNER_STEPS;
  const ctaButton = isClient
    ? { label: "Sign up", href: "/signup" }
    : { label: "Become a Renner", href: "/become-a-renner" };

  const clauses: string[] = isClient
    ? [
        "Post a task.",
        "Pick a Renner.",
        "Get it done.",
      ]
    : [
        "Get verified.",
        "Pick a task.",
        "Get it done.",
      ];

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
          marginBottom: 56,
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

      {/* Lede with marginalia */}
      <article className="ledger-row" style={{ marginBottom: "clamp(56px, 7vw, 88px)" }}>
        <div className="ledger-main">
          <h1
            style={{
              fontFamily: SERIF,
              fontWeight: 400,
              fontSize: "clamp(40px, 5.5vw, 72px)",
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: INK,
              margin: 0,
              marginBottom: 32,
              maxWidth: "26ch",
              fontVariationSettings: '"opsz" 144',
            }}
          >
            {clauses.map((c, i) => (
              <span key={i}>{i > 0 ? " " : ""}{c}</span>
            ))}
          </h1>
          <p
            style={{
              fontFamily: SERIF,
              fontWeight: 400,
              fontSize: "clamp(17px, 1.5vw, 19px)",
              lineHeight: 1.55,
              color: SLATE,
              margin: 0,
              maxWidth: "56ch",
              fontVariationSettings: '"opsz" 14',
            }}
          >
            {dek}
          </p>
        </div>
        <aside className="ledger-margin">
          <div
            style={{
              fontFamily: MONO,
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: STEEL_500,
              marginBottom: 8,
            }}
          >
            Issued
          </div>
          <div
            style={{
              fontFamily: SERIF,
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: 16,
              color: STEEL_700,
              lineHeight: 1.5,
              fontVariationSettings: '"opsz" 36',
            }}
          >
            renner protocol — for both parties of a real-estate task
          </div>
        </aside>
      </article>

      {/* Step articles */}
      {steps.map((step, idx) => (
        <article
          key={step.id}
          id={step.id}
          className="ledger-row"
          style={{
            scrollMarginTop: "80px",
            paddingTop: 32,
            paddingBottom: 32,
            borderTop: `1px solid ${RULE}`,
            borderBottom:
              idx === steps.length - 1 ? `1px solid ${RULE}` : "none",
          }}
        >
          <div className="ledger-main">
            <div
              style={{
                fontFamily: MONO,
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.22em",
                color: STEEL_600,
                marginBottom: 16,
              }}
            >
              {step.number}
            </div>
            <h2
              style={{
                fontFamily: SERIF,
                fontWeight: 400,
                fontSize: "clamp(24px, 2.6vw, 32px)",
                lineHeight: 1.15,
                letterSpacing: "-0.018em",
                color: INK,
                margin: 0,
                marginBottom: 14,
                fontVariationSettings: '"opsz" 60',
              }}
            >
              {step.title}
            </h2>
            <p
              style={{
                fontFamily: SERIF,
                fontSize: 16,
                lineHeight: 1.65,
                color: STEEL_700,
                margin: 0,
                maxWidth: "56ch",
                fontVariationSettings: '"opsz" 14',
              }}
            >
              {step.body}
            </p>
          </div>
          <aside className="ledger-margin">
            <dl style={{ margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
              {step.margin.map((m) => (
                <div key={m.label}>
                  <dt
                    style={{
                      fontFamily: MONO,
                      fontSize: 10,
                      fontWeight: 500,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: STEEL_500,
                      marginBottom: 4,
                    }}
                  >
                    {m.label}
                  </dt>
                  <dd
                    style={{
                      fontFamily: SERIF,
                      fontSize: 14,
                      lineHeight: 1.45,
                      color: INK,
                      margin: 0,
                      fontVariationSettings: '"opsz" 14',
                    }}
                  >
                    {m.value}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        </article>
      ))}

      {/* CTA */}
      {showCta && (
        <section
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 32,
            flexWrap: "wrap",
            paddingTop: "clamp(64px, 8vw, 96px)",
            marginTop: "clamp(64px, 8vw, 96px)",
            borderTop: `1px solid ${INK}`,
          }}
        >
          <h2
            style={{
              fontFamily: SERIF,
              fontWeight: 400,
              fontSize: "clamp(28px, 3.5vw, 44px)",
              lineHeight: 1.1,
              letterSpacing: "-0.022em",
              color: INK,
              margin: 0,
              maxWidth: "20ch",
              fontVariationSettings: '"opsz" 144',
            }}
          >
            {isClient ? (
              "Get something done."
            ) : (
              "Start running."
            )}
          </h2>
          <Link
            href={ctaButton.href}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              fontFamily: SANS,
              fontSize: 15,
              fontWeight: 500,
              letterSpacing: "0.01em",
              color: PAPER,
              backgroundColor: INK,
              border: `1px solid ${INK}`,
              borderRadius: 4,
              padding: "16px 28px",
              textDecoration: "none",
              whiteSpace: "nowrap",
              transition: "background-color 150ms ease, border-color 150ms ease",
            }}
          >
            {ctaButton.label}
            <span aria-hidden style={{ opacity: 0.7 }}>→</span>
          </Link>
        </section>
      )}

      <style jsx>{`
        .ledger-row {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(180px, 220px);
          gap: clamp(24px, 4vw, 64px);
          align-items: start;
        }
        @media (max-width: 880px) {
          .ledger-row {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
          .ledger-margin {
            order: -1;
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
