"use client";

import Link from "next/link";
import { useState } from "react";

type Step = { number: string; title: string; body: React.ReactNode; spec: string };

const CLIENT_DEK =
  "A marketplace for real-estate task work — sign installs, lockbox swaps, showings, courier runs, property prep — handled by background-checked Renners and paid through escrow.";

const RENNER_DEK =
  "Independent contractors running short real-estate tasks for agents, brokers, and managers — on your schedule, in your area, paid through escrow.";

const CLIENT_STEPS: Step[] = [
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
    spec: "Avg. post · under 2 minutes",
  },
  {
    number: "02",
    title: "Pick a vetted Renner.",
    body: (
      <>
        Background-checked Renners in your area apply. Read their bio,
        ratings, and tenure. Book the right hand for the work.
      </>
    ),
    spec: "Every Renner · Checkr-verified",
  },
  {
    number: "03",
    title: "Get it done.",
    body: (
      <>
        Your Renner finishes the task and submits completion photos.
        You confirm. Funds release through Stripe.
      </>
    ),
    spec: "Funds held · escrow until confirmed",
  },
];

const RENNER_STEPS: Step[] = [
  {
    number: "01",
    title: "Get verified.",
    body: (
      <>
        Sign up, verify your identity, clear a Checkr background check.
        Pick your categories, set your service area, name your rate.
      </>
    ),
    spec: "Onboarding · same-day in most states",
  },
  {
    number: "02",
    title: "Pick a task.",
    body: (
      <>
        See briefs posted by agents, brokers, and managers nearby.
        Apply to the ones that fit your schedule and skills.
      </>
    ),
    spec: "Marketplace · live in your area",
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
    spec: "Payout · 100% of task pay",
  },
];

const CLIENT_TRUST: Array<[string, string]> = [
  ["Vetting", "Checkr background check before any booking."],
  ["Custody", "Funds held by Stripe until you confirm."],
  ["Record", "Completion photos and a written confirmation on every task."],
];

const RENNER_TRUST: Array<[string, string]> = [
  ["Independence", "Set your own schedule. Pick the work."],
  ["Local", "Tasks come from agents, brokers, and managers in your area."],
  ["Payout", "Renners keep 100 percent. Escrow releases through Stripe."],
];

const SERIF = "var(--font-source-serif), ui-serif, Georgia, serif";
const SANS =
  "var(--font-source-sans), ui-sans-serif, system-ui, sans-serif";
const MONO =
  "var(--font-source-code), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const INK = "#0d0f12";
const STEEL_800 = "#38414d";
const STEEL_700 = "#4d5b6a";
const STEEL_600 = "#647589";
const STEEL_500 = "#7d8da0";
const STEEL_300 = "#cad1d8";
const PAPER = "#fbfbfc";

export function AtelierBody({ showCta }: { showCta: boolean }) {
  const [tab, setTab] = useState<"client" | "renner">("client");
  const isClient = tab === "client";
  const dek = isClient ? CLIENT_DEK : RENNER_DEK;
  const steps = isClient ? CLIENT_STEPS : RENNER_STEPS;
  const trust = isClient ? CLIENT_TRUST : RENNER_TRUST;
  const ctaButton = isClient
    ? { label: "Sign up", href: "/signup" }
    : { label: "Become a Renner", href: "/become-a-renner" };

  // The italic-display statement is the page's typographic moment —
  // all three clauses set in italic-300, lit in steel-800 instead of
  // pure ink so the editorial register reads cooler.
  const clauses: string[] = isClient
    ? ["Post a task.", "Pick a vetted Renner.", "Get it done."]
    : ["Get verified.", "Pick a task.", "Get it done."];

  return (
    <>
      <div className="atelier-grid">
        {/* ─── Left ─── italic-display statement, sticky on desktop */}
        <aside className="atelier-left">
          <h1
            style={{
              fontFamily: SERIF,
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(40px, 5.5vw, 72px)",
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: STEEL_800,
              margin: 0,
              maxWidth: "12ch",
              fontVariationSettings: '"opsz" 144',
            }}
          >
            {clauses.map((c, i) => (
              <span key={i} style={{ display: "block" }}>
                {c}
              </span>
            ))}
          </h1>
        </aside>

        {/* ─── Right ─── upright content column */}
        <div className="atelier-right">
          <div
            role="tablist"
            aria-label="Audience"
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 14,
              marginBottom: 48,
              fontFamily: SERIF,
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: 16,
              letterSpacing: 0,
            }}
          >
            <TabButton label="For clients" active={isClient} onClick={() => setTab("client")} />
            <span aria-hidden style={{ color: STEEL_300, fontStyle: "normal" }}>·</span>
            <TabButton label="For Renners" active={!isClient} onClick={() => setTab("renner")} />
          </div>

          <p
            style={{
              fontFamily: SERIF,
              fontWeight: 400,
              fontSize: "clamp(18px, 1.7vw, 22px)",
              lineHeight: 1.5,
              color: INK,
              margin: 0,
              marginBottom: "clamp(48px, 6vw, 72px)",
              maxWidth: "44ch",
              fontVariationSettings: '"opsz" 14',
            }}
          >
            {dek}
          </p>

          {/* Numbered steps */}
          <ol
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              marginBottom: "clamp(56px, 7vw, 88px)",
            }}
          >
            {steps.map((step, idx) => (
              <li
                key={step.number}
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(56px, 64px) 1fr",
                  columnGap: 24,
                  rowGap: 8,
                  padding: "28px 0",
                  borderTop: `1px solid ${STEEL_300}`,
                  borderBottom: idx === steps.length - 1 ? `1px solid ${STEEL_300}` : "none",
                  alignItems: "baseline",
                }}
              >
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: "0.22em",
                    color: STEEL_500,
                  }}
                >
                  {step.number}
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: SERIF,
                      fontWeight: 400,
                      fontSize: "clamp(20px, 1.9vw, 24px)",
                      lineHeight: 1.2,
                      letterSpacing: "-0.014em",
                      color: INK,
                      margin: 0,
                      marginBottom: 10,
                      fontVariationSettings: '"opsz" 36',
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: SERIF,
                      fontSize: 16,
                      lineHeight: 1.6,
                      color: STEEL_700,
                      margin: 0,
                      marginBottom: 14,
                      maxWidth: "56ch",
                      fontVariationSettings: '"opsz" 14',
                    }}
                  >
                    {step.body}
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
                    {step.spec}
                  </div>
                </div>
              </li>
            ))}
          </ol>

          {/* Trust — label-led pairs, no kicker */}
          <section
            style={{
              marginBottom: showCta ? "clamp(56px, 7vw, 88px)" : 0,
            }}
          >
            <dl style={{ margin: 0 }}>
              {trust.map(([label, body], idx) => (
                <div
                  key={label}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "minmax(120px, 160px) 1fr",
                    gap: 24,
                    padding: "20px 0",
                    borderTop: `1px solid ${STEEL_300}`,
                    borderBottom:
                      idx === trust.length - 1 ? `1px solid ${STEEL_300}` : "none",
                    alignItems: "baseline",
                  }}
                  className="atelier-trust-row"
                >
                  <dt
                    style={{
                      fontFamily: SERIF,
                      fontStyle: "italic",
                      fontWeight: 300,
                      fontSize: 19,
                      color: STEEL_600,
                      letterSpacing: "-0.005em",
                      fontVariationSettings: '"opsz" 36',
                    }}
                  >
                    {label}.
                  </dt>
                  <dd
                    style={{
                      fontFamily: SERIF,
                      fontSize: 16,
                      lineHeight: 1.55,
                      color: STEEL_700,
                      margin: 0,
                      maxWidth: "52ch",
                      fontVariationSettings: '"opsz" 14',
                    }}
                  >
                    {body}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          {showCta && (
            <section
              style={{
                paddingTop: "clamp(40px, 5vw, 64px)",
                borderTop: `1px solid ${STEEL_300}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 24,
                flexWrap: "wrap",
              }}
            >
              <h2
                style={{
                  fontFamily: SERIF,
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: "clamp(28px, 3.4vw, 40px)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  color: STEEL_800,
                  margin: 0,
                  maxWidth: "16ch",
                  fontVariationSettings: '"opsz" 60',
                }}
              >
                {isClient ? "Get something done." : "Start running."}
              </h2>
              <Link
                href={ctaButton.href}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  fontFamily: SANS,
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: PAPER,
                  backgroundColor: INK,
                  border: `1px solid ${INK}`,
                  borderRadius: 0,
                  padding: "14px 28px",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                {ctaButton.label}
              </Link>
            </section>
          )}
        </div>
      </div>

      <style jsx>{`
        .atelier-grid {
          display: grid;
          grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
          gap: clamp(48px, 6vw, 96px);
          align-items: start;
        }
        .atelier-left {
          position: sticky;
          top: clamp(56px, 7vw, 96px);
          align-self: start;
        }
        @media (max-width: 880px) {
          .atelier-grid {
            grid-template-columns: 1fr;
            gap: clamp(48px, 8vw, 80px);
          }
          .atelier-left {
            position: static;
          }
        }
        @media (max-width: 640px) {
          :global(.atelier-trust-row) {
            grid-template-columns: 1fr !important;
            gap: 6px !important;
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
        letterSpacing: "inherit",
        textTransform: "inherit",
        color: active ? INK : STEEL_500,
        cursor: "pointer",
        transition: "color 150ms ease",
      }}
    >
      {label}
    </button>
  );
}
