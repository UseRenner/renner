"use client";

// Console — sticky left sidebar holds renner, audience switch, table
// of contents (jump-links), and CTA. Right column is the scrolling
// reading content. Stripe-docs / Linear-marketing feel — workspace
// structure under the lowercase italic wordmark.

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
  proof: string;
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
    number: "01",
    title: "Post a task.",
    body: (
      <>
        Describe what you need — sign install, lockbox swap, property
        visuals, guest check-in. Set the location, the window, and the
        price. Posts go live in under two minutes.
      </>
    ),
    proof: "Avg. post · under 2 minutes",
  },
  {
    id: "pick",
    number: "02",
    title: "Pick a vetted Renner.",
    body: (
      <>
        Background-checked Renners in your area apply. Read their bio,
        ratings, and tenure. Book the right hand for the work.
      </>
    ),
    proof: "Every Renner · Checkr-verified",
  },
  {
    id: "done",
    number: "03",
    title: "Get it done.",
    body: (
      <>
        Your Renner finishes the task and submits completion photos.
        You confirm. Funds release through Stripe.
      </>
    ),
    proof: "Funds held · escrow until confirmed",
  },
];

const RENNER_STEPS: Step[] = [
  {
    id: "post",
    number: "01",
    title: "Get verified.",
    body: (
      <>
        Sign up, verify your identity, clear a Checkr background check.
        Pick your categories, set your service area, name your rate.
      </>
    ),
    proof: "Onboarding · same-day in most states",
  },
  {
    id: "pick",
    number: "02",
    title: "Pick a task.",
    body: (
      <>
        Briefs come in from agents, brokers, and managers nearby.
        Apply to the ones that fit your schedule and skills.
      </>
    ),
    proof: "Marketplace · live in your area",
  },
  {
    id: "done",
    number: "03",
    title: "Get it done.",
    body: (
      <>
        Run the task, upload completion photos, get paid through the
        platform. Build a reputation that earns repeat clients.
      </>
    ),
    proof: "Reputation · built task by task",
  },
];

export function ConsoleBody({ showCta }: { showCta: boolean }) {
  const [tab, setTab] = useState<"client" | "renner">("client");
  const isClient = tab === "client";
  const dek = isClient ? CLIENT_DEK : RENNER_DEK;
  const steps = isClient ? CLIENT_STEPS : RENNER_STEPS;
  const ctaButton = isClient
    ? { label: "Sign up", href: "/signup" }
    : { label: "Become a Renner", href: "/become-a-renner" };

  const clauses: React.ReactNode[] = isClient
    ? [
        <>Post a <Em>task.</Em></>,
        <>Pick a <Em>vetted Renner.</Em></>,
        <>Get it <Em>done.</Em></>,
      ]
    : [
        <>Get <Em>verified.</Em></>,
        <>Pick a <Em>task.</Em></>,
        <>Get it <Em>done.</Em></>,
      ];

  return (
    <>
      {/* Sidebar: TOC, audience switch, CTA */}
      <aside className="console-side">
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
            paddingTop: 20,
            borderTop: `1px solid ${RULE}`,
            fontFamily: MONO,
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: STEEL_500,
            marginBottom: 14,
          }}
        >
          On this page
        </div>

        <ol
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: 12,
            marginBottom: 40,
          }}
        >
          {steps.map((s) => (
            <li key={s.id}>
              <Link
                href={`#${s.id}`}
                style={{
                  display: "flex",
                  gap: 12,
                  alignItems: "baseline",
                  fontFamily: SANS,
                  fontSize: 14,
                  color: STEEL_700,
                  textDecoration: "none",
                  transition: "color 150ms ease",
                }}
              >
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: 10,
                    fontWeight: 500,
                    letterSpacing: "0.18em",
                    color: STEEL_500,
                  }}
                >
                  {s.number}
                </span>
                <span>{s.title}</span>
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="#trust"
              style={{
                display: "flex",
                gap: 12,
                alignItems: "baseline",
                fontFamily: SANS,
                fontSize: 14,
                color: STEEL_700,
                textDecoration: "none",
              }}
            >
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 10,
                  fontWeight: 500,
                  letterSpacing: "0.18em",
                  color: STEEL_500,
                }}
              >
                §
              </span>
              <span>{isClient ? "Why Renner" : "What you get"}</span>
            </Link>
          </li>
          <li>
            <Link
              href="#faq"
              style={{
                display: "flex",
                gap: 12,
                alignItems: "baseline",
                fontFamily: SANS,
                fontSize: 14,
                color: STEEL_700,
                textDecoration: "none",
              }}
            >
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 10,
                  fontWeight: 500,
                  letterSpacing: "0.18em",
                  color: STEEL_500,
                }}
              >
                §
              </span>
              <span>Common questions</span>
            </Link>
          </li>
        </ol>

        {showCta && (
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
              padding: "12px 20px",
              textDecoration: "none",
              whiteSpace: "nowrap",
              alignSelf: "flex-start",
              transition:
                "background-color 150ms ease, border-color 150ms ease",
            }}
          >
            {ctaButton.label}
            <span aria-hidden style={{ opacity: 0.7 }}>→</span>
          </Link>
        )}
      </aside>

      {/* Main column: statement, dek, steps, trust */}
      <div className="console-main">
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
            marginBottom: "clamp(72px, 9vw, 112px)",
            maxWidth: "56ch",
            fontVariationSettings: '"opsz" 14',
          }}
        >
          {dek}
        </p>

        {/* Step sections, anchored */}
        {steps.map((step, idx) => (
          <article
            id={step.id}
            key={step.id}
            style={{
              scrollMarginTop: "80px",
              paddingTop: 32,
              paddingBottom: 32,
              borderTop: `1px solid ${RULE}`,
              borderBottom:
                idx === steps.length - 1 ? `1px solid ${RULE}` : "none",
              display: "grid",
              gridTemplateColumns: "minmax(60px, 80px) 1fr",
              gap: "clamp(20px, 3vw, 40px)",
              alignItems: "baseline",
            }}
            className="console-step"
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
              <h2
                style={{
                  fontFamily: SERIF,
                  fontWeight: 400,
                  fontSize: "clamp(24px, 2.6vw, 32px)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.018em",
                  color: INK,
                  margin: 0,
                  marginBottom: 12,
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
                  marginBottom: 20,
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
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: STEEL_600,
                }}
              >
                {step.proof}
              </div>
            </div>
          </article>
        ))}

        {/* Trust */}
        <section
          id="trust"
          style={{
            scrollMarginTop: "80px",
            marginTop: "clamp(64px, 8vw, 96px)",
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
              marginBottom: 28,
            }}
          >
            {isClient ? "Why Renner" : "What you get"}
          </div>
          <dl style={{ margin: 0 }}>
            {(isClient
              ? [
                  ["Both sides verified", "Clients and Renners are ID-checked and background-checked before any booking."],
                  ["Stripe escrow", "Funds held until you confirm the work, or 48 hours pass."],
                  ["On the record", "Completion photos and a written confirmation arrive with every task."],
                ]
              : [
                  ["Real-estate work", "Tasks come from agents, brokers, and property managers — the people who keep listings moving."],
                  ["Both sides verified", "The clients who book you are ID-checked and background-checked, the same as you."],
                  ["A real reputation", "Repeat clients find their way back to the Renners they trust."],
                ]
            ).map(([label, body], idx, arr) => (
              <div
                key={label}
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(160px, 200px) 1fr",
                  gap: 32,
                  padding: "22px 0",
                  borderTop: `1px solid ${RULE}`,
                  borderBottom:
                    idx === arr.length - 1 ? `1px solid ${RULE}` : "none",
                  alignItems: "baseline",
                }}
              >
                <dt
                  style={{
                    fontFamily: SERIF,
                    fontStyle: "italic",
                    fontWeight: 300,
                    fontSize: 20,
                    color: STEEL_700,
                    fontVariationSettings: '"opsz" 36',
                  }}
                >
                  {label}.
                </dt>
                <dd
                  style={{
                    fontFamily: SERIF,
                    fontSize: 16,
                    lineHeight: 1.6,
                    color: INK,
                    margin: 0,
                    maxWidth: "60ch",
                    fontVariationSettings: '"opsz" 14',
                  }}
                >
                  {body}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
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
