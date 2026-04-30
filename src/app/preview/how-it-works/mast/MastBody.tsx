"use client";

// Mast — sticky horizontal top mast bar holds renner, audience switch,
// and CTA. Below the mast, the page is full-width with a single big
// statement + dek lede, then a structured horizontal step flow with
// hairline separators between numbered cells. Stripe-marketing /
// Vercel-feature-page register.

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
  number: string;
  title: React.ReactNode;
  body: React.ReactNode;
  proof: string;
};

const CLIENT_DEK =
  "A marketplace built only for real-estate task work. You post the brief, a Renner applies, the work gets done. Both parties — clients and Renners — are ID-verified and background-checked.";

const RENNER_DEK =
  "Real-estate work, brief by brief. Run tasks for the agents, brokers, and property managers who keep listings moving. The clients you book with are ID-verified and background-checked, the same as you.";

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
    number: "01",
    title: "Post a task.",
    body: (
      <>
        Address, window, price. Posts go live to Renners in
        under two minutes.
      </>
    ),
    proof: "Avg. post · under 2 minutes",
  },
  {
    number: "02",
    title: "Pick a Renner.",
    body: (
      <>
        Background-checked Renners apply with bios, ratings, and
        tenure. Book the right hand for the work.
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
      {/* Audience switch — sits inside the body, just under the mast */}
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

      {/* Statement + dek — wide, full-width, anchored left */}
      <h1
        style={{
          fontFamily: SERIF,
          fontWeight: 400,
          fontSize: "clamp(44px, 6.5vw, 88px)",
          lineHeight: 1.02,
          letterSpacing: "-0.03em",
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
          fontSize: "clamp(17px, 1.6vw, 20px)",
          lineHeight: 1.55,
          color: SLATE,
          margin: 0,
          marginBottom: "clamp(96px, 12vw, 144px)",
          maxWidth: "60ch",
          fontVariationSettings: '"opsz" 14',
        }}
      >
        {dek}
      </p>

      {/* Step flow — three numbered cells separated by vertical hairlines */}
      <div
        className="mast-steps"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          borderTop: `1px solid ${INK}`,
          borderBottom: `1px solid ${INK}`,
          marginBottom: "clamp(72px, 9vw, 112px)",
        }}
      >
        {steps.map((step, idx) => (
          <article
            key={step.number}
            className="mast-step"
            style={{
              padding: "clamp(28px, 3vw, 40px) clamp(20px, 2.5vw, 32px)",
              borderRight: idx === steps.length - 1 ? "none" : `1px solid ${RULE}`,
              display: "flex",
              flexDirection: "column",
              gap: 16,
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
            <h3
              style={{
                fontFamily: SERIF,
                fontWeight: 400,
                fontSize: "clamp(22px, 2.4vw, 28px)",
                lineHeight: 1.15,
                letterSpacing: "-0.018em",
                color: INK,
                margin: 0,
                fontVariationSettings: '"opsz" 36',
              }}
            >
              {step.title}
            </h3>
            <p
              style={{
                fontFamily: SERIF,
                fontSize: 15,
                lineHeight: 1.65,
                color: STEEL_700,
                margin: 0,
                fontVariationSettings: '"opsz" 14',
              }}
            >
              {step.body}
            </p>
            <div
              style={{
                marginTop: "auto",
                paddingTop: 14,
                borderTop: `1px solid ${RULE}`,
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
          </article>
        ))}
      </div>

      {/* Trust */}
      <section
        style={{
          marginBottom: showCta ? "clamp(56px, 7vw, 88px)" : 0,
          paddingTop: 28,
          borderTop: `1px solid ${RULE}`,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "clamp(20px, 3vw, 48px)",
        }}
        className="mast-trust"
      >
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
        ).map(([label, body]) => (
          <div key={label}>
            <div
              style={{
                fontFamily: SERIF,
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: 22,
                color: STEEL_700,
                marginBottom: 10,
                fontVariationSettings: '"opsz" 36',
              }}
            >
              {label}.
            </div>
            <div
              style={{
                fontFamily: SERIF,
                fontSize: 15,
                lineHeight: 1.6,
                color: INK,
                fontVariationSettings: '"opsz" 14',
              }}
            >
              {body}
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      {showCta && (
        <section
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 32,
            flexWrap: "wrap",
            paddingTop: "clamp(48px, 6vw, 80px)",
            borderTop: `1px solid ${RULE}`,
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
        @media (max-width: 880px) {
          .mast-steps {
            grid-template-columns: 1fr !important;
          }
          .mast-step {
            border-right: none !important;
            border-bottom: 1px solid ${RULE};
          }
          .mast-step:last-child {
            border-bottom: none;
          }
          .mast-trust {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
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
