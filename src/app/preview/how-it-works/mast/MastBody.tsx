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
const STEEL_400 = "#9aa6b4";
const STEEL_300 = "#cad1d8";
const STEEL_200 = "#dfe4e9";
const RULE = "#eaedf0";
const PAPER = "#fbfbfc";

type Step = {
  number: string;
  title: React.ReactNode;
  body: React.ReactNode;
  proof: string;
};

const CLIENT_DEK =
  "A marketplace built only for real-estate task work. You post the brief, a Renner applies, the work gets done. Both parties — clients and Renners — are ID-verified and background-checked.";

const RENNER_DEK =
  "Real-estate work, brief by brief. Run tasks for the agents, brokers, and property managers who keep listings moving. The clients you book with are ID-verified and background-checked, the same as you.";

const CLIENT_STEPS: Step[] = [
  {
    number: "01",
    title: "Post a task.",
    body: (
      <>
        Address, window, price. Posts go live to background-checked
        Renners in your area in under two minutes.
      </>
    ),
    proof: "Avg. post · under 2 minutes",
  },
  {
    number: "02",
    title: "Pick a Renner.",
    body: (
      <>
        Renners apply with bios, ratings, and tenure. Read the file,
        book the right hand for the work.
      </>
    ),
    proof: "Every Renner · Checkr-verified",
  },
  {
    number: "03",
    title: "Get it done.",
    body: (
      <>
        Photos and a written confirmation arrive. You confirm; Stripe
        releases the funds from escrow.
      </>
    ),
    proof: "Funds held · escrow until confirmed",
  },
];

const RENNER_STEPS: Step[] = [
  {
    number: "01",
    title: "Get verified.",
    body: (
      <>
        Identity, background check, categories, service area, rate.
        Onboarding usually clears the same day.
      </>
    ),
    proof: "Onboarding · same-day in most states",
  },
  {
    number: "02",
    title: "Pick a task.",
    body: (
      <>
        Briefs come in from agents, brokers, and managers nearby.
        Apply to what fits your schedule.
      </>
    ),
    proof: "Marketplace · live in your area",
  },
  {
    number: "03",
    title: "Get it done.",
    body: (
      <>
        Run the task, upload photos, get paid through the platform.
        Build a reputation that earns repeat clients.
      </>
    ),
    proof: "Reputation · built task by task",
  },
];

export function MastBody({ showCta }: { showCta: boolean }) {
  const [tab, setTab] = useState<"client" | "renner">("client");
  const isClient = tab === "client";
  const dek = isClient ? CLIENT_DEK : RENNER_DEK;
  const steps = isClient ? CLIENT_STEPS : RENNER_STEPS;
  const ctaButton = isClient
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

      {/* Lede — kept small so the counters carry the page */}
      <div style={{ marginBottom: "clamp(80px, 10vw, 128px)", maxWidth: 720 }}>
        <p
          style={{
            fontFamily: SERIF,
            fontWeight: 400,
            fontSize: "clamp(20px, 1.9vw, 24px)",
            lineHeight: 1.5,
            color: INK,
            margin: 0,
            fontVariationSettings: '"opsz" 14',
          }}
        >
          {dek}
        </p>
      </div>

      {/* The counters */}
      <ol
        className="counter-list"
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          marginBottom: "clamp(80px, 10vw, 128px)",
        }}
      >
        {steps.map((step, idx) => (
          <li
            key={step.number}
            className="counter-row"
            style={{
              borderTop: `1px solid ${INK}`,
              borderBottom:
                idx === steps.length - 1 ? `1px solid ${INK}` : "none",
              padding: "clamp(40px, 5vw, 72px) 0",
              alignItems: "baseline",
            }}
          >
            <div
              className="counter-numeral"
              aria-hidden
              style={{
                fontFamily: MONO,
                fontWeight: 400,
                fontSize: "clamp(96px, 16vw, 200px)",
                lineHeight: 0.95,
                letterSpacing: "-0.04em",
                color: STEEL_200,
                userSelect: "none",
              }}
            >
              {step.number}
            </div>
            <div className="counter-content">
              <h3
                style={{
                  fontFamily: SERIF,
                  fontWeight: 400,
                  fontSize: "clamp(28px, 3.2vw, 40px)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  color: INK,
                  margin: 0,
                  marginBottom: 18,
                  fontVariationSettings: '"opsz" 60',
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontFamily: SERIF,
                  fontSize: 17,
                  lineHeight: 1.6,
                  color: STEEL_700,
                  margin: 0,
                  marginBottom: 24,
                  maxWidth: "52ch",
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
                {step.proof}
              </div>
            </div>
          </li>
        ))}
      </ol>

      {/* Trust — three quiet lines, no boxes */}
      <section
        className="counter-trust"
        style={{
          marginBottom: showCta ? "clamp(64px, 8vw, 96px)" : 0,
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
            marginBottom: 24,
          }}
        >
          {isClient ? "Why Renner" : "What you get"}
        </div>
        <dl style={{ margin: 0 }}>
          {(isClient
            ? [
                ["Both sides verified", "Clients and Renners are ID-checked and background-checked before any booking."],
                ["Stripe escrow", "Funds held until you confirm the work, or 48 hours pass."],
                ["On the record", "Completion photos and a written confirmation on every task."],
              ]
            : [
                ["Real-estate work", "Tasks come from agents, brokers, and property managers — the people who keep listings moving."],
                ["Both sides verified", "The clients who book you are ID-checked and background-checked, the same as you."],
                ["A real reputation", "Repeat clients find their way back to the Renners they trust."],
              ]
          ).map(([label, body], idx, arr) => (
            <div
              key={label}
              className="counter-trust-row"
              style={{
                padding: "20px 0",
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
                  color: INK,
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
                  fontVariationSettings: '"opsz" 14',
                }}
              >
                {body}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* CTA */}
      {showCta && (
        <section
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 24,
            flexWrap: "wrap",
            paddingTop: "clamp(48px, 6vw, 80px)",
            borderTop: `1px solid ${INK}`,
            justifyContent: "space-between",
          }}
        >
          <h2
            style={{
              fontFamily: SERIF,
              fontWeight: 400,
              fontSize: "clamp(28px, 3.2vw, 40px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: INK,
              margin: 0,
              maxWidth: "20ch",
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
        .counter-row {
          display: grid;
          grid-template-columns: minmax(160px, 280px) minmax(0, 1fr);
          gap: clamp(24px, 4vw, 64px);
        }
        .counter-trust-row {
          display: grid;
          grid-template-columns: minmax(180px, 280px) minmax(0, 1fr);
          gap: clamp(24px, 4vw, 64px);
        }
        @media (max-width: 720px) {
          .counter-row {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          .counter-trust-row {
            grid-template-columns: 1fr;
            gap: 4px;
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
