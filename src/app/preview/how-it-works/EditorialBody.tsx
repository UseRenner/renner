"use client";

import Link from "next/link";
import { useState } from "react";

type Step = {
  number: string;
  title: React.ReactNode;
  body: React.ReactNode;
  proof: string;
};

const CLIENT_DEK =
  "A marketplace for real-estate task work — sign installs, lockbox swaps, showings, courier runs, property prep — handled by background-checked Renners and paid through escrow.";

const RENNER_DEK =
  "Independent contractors running short real-estate tasks for agents, brokers, and property managers — on your schedule, in your area, paid through escrow.";

const CLIENT_STEPS: Step[] = [
  {
    number: "01",
    title: "Post the task.",
    body: (
      <>
        Describe what you need — a sign install, a lockbox swap, property
        visuals, a guest check-in. Set the location, the window, and the
        price.
      </>
    ),
    proof: "Avg. post time · under 2 minutes",
  },
  {
    number: "02",
    title: "Pick a vetted Renner.",
    body: (
      <>
        Background-checked Renners in your area apply. Read their bio,
        ratings, and tenure. Book the right fit for the work.
      </>
    ),
    proof: "Every Renner · Checkr-verified",
  },
  {
    number: "03",
    title: (
      <>
        It gets <Italic>done.</Italic>
      </>
    ),
    body: (
      <>
        Your Renner finishes the task and submits completion photos. You
        confirm. Funds release through Stripe.
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
        Sign up, verify your identity, clear a Checkr background check.
        Pick your categories, set your service area, name your rate.
      </>
    ),
    proof: "Onboarding · same-day in most states",
  },
  {
    number: "02",
    title: "Browse and apply.",
    body: (
      <>
        See tasks posted by agents, brokers, and property managers nearby.
        Apply to the ones that fit your schedule and skills.
      </>
    ),
    proof: "Marketplace · live in your area",
  },
  {
    number: "03",
    title: (
      <>
        Get it <Italic>done.</Italic>
      </>
    ),
    body: (
      <>
        Run the task, upload completion photos, get paid through the
        platform. Build a reputation that earns repeat clients.
      </>
    ),
    proof: "Payout · 90% of task pay",
  },
];

const CLIENT_BENEFITS: Array<{ label: string; body: string }> = [
  {
    label: "Vetted",
    body: "Every Renner clears a Checkr background check before booking any task.",
  },
  {
    label: "Escrowed",
    body: "Funds are held by Stripe until you confirm completion or 48 hours pass.",
  },
  {
    label: "Documented",
    body: "Completion photos and a written confirmation arrive with every task.",
  },
];

const RENNER_BENEFITS: Array<{ label: string; body: string }> = [
  {
    label: "Independent",
    body: "Set your own schedule. Pick the work that fits. Decline anything that doesn't.",
  },
  {
    label: "Local",
    body: "Tasks come to you — only from agents, brokers, and managers in your area.",
  },
  {
    label: "Paid",
    body: "Renners keep 90% of the task pay. Escrow releases through Stripe on confirmation.",
  },
];

const SERIF = "var(--font-source-serif), ui-serif, Georgia, serif";
const SANS =
  "var(--font-source-sans), ui-sans-serif, system-ui, sans-serif";
const MONO =
  "var(--font-source-code), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const INK = "#0d0f12";
const SLATE = "#2a2f36";
const STEEL = "#647589";
const FOG = "#7d8da0";
const MIST = "#cad1d8";
const RULE = "#eaedf0";
const PAPER = "#fbfbfc";

function Italic({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontStyle: "italic",
        fontWeight: 300,
        color: STEEL,
      }}
    >
      {children}
    </span>
  );
}

export function EditorialBody({ showCta }: { showCta: boolean }) {
  const [tab, setTab] = useState<"client" | "renner">("client");
  const isClient = tab === "client";
  const steps = isClient ? CLIENT_STEPS : RENNER_STEPS;
  const benefits = isClient ? CLIENT_BENEFITS : RENNER_BENEFITS;
  const dek = isClient ? CLIENT_DEK : RENNER_DEK;
  const ctaHeading: React.ReactNode = isClient ? (
    <>
      Ready to get something <Italic>done?</Italic>
    </>
  ) : (
    <>
      Ready to <Italic>run?</Italic>
    </>
  );
  const ctaButton = isClient
    ? { label: "Sign up", href: "/signup" }
    : { label: "Become a Renner", href: "/become-a-renner" };

  return (
    <>
      {/* ─── Audience switch ─── inline mono, hairline-thin */}
      <div
        role="tablist"
        aria-label="Audience"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginBottom: 56,
          fontFamily: MONO,
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
        }}
      >
        <TabButton
          label="For Clients"
          active={isClient}
          onClick={() => setTab("client")}
        />
        <span aria-hidden style={{ color: MIST }}>
          /
        </span>
        <TabButton
          label="For Renners"
          active={!isClient}
          onClick={() => setTab("renner")}
        />
      </div>

      {/* ─── Lede ─── headline + one-sentence dek, the answer arrives now */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 1fr)",
          gap: "clamp(40px, 6vw, 96px)",
          alignItems: "end",
          marginBottom: "clamp(72px, 10vw, 120px)",
        }}
        className="ed-lede"
      >
        <h1
          style={{
            fontFamily: SERIF,
            fontWeight: 400,
            fontSize: "clamp(48px, 7vw, 88px)",
            lineHeight: 0.98,
            letterSpacing: "-0.03em",
            color: INK,
            margin: 0,
            maxWidth: "10ch",
            fontVariationSettings: '"opsz" 144',
          }}
        >
          How Renner <Italic>works</Italic>
        </h1>
        <p
          style={{
            fontFamily: SERIF,
            fontWeight: 400,
            fontSize: "clamp(17px, 1.5vw, 20px)",
            lineHeight: 1.55,
            color: SLATE,
            margin: 0,
            maxWidth: "44ch",
            fontVariationSettings: '"opsz" 14',
          }}
        >
          {dek}
        </p>
      </div>

      {/* ─── Steps ─── three columns, mono numeral inline above title */}
      <div
        className="ed-steps"
        style={{ marginBottom: "clamp(96px, 12vw, 144px)" }}
      >
        {steps.map((step, idx) => (
          <article
            key={step.number}
            className="ed-step"
            style={{
              borderTop: `1px solid ${RULE}`,
              paddingTop: 28,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                marginBottom: 24,
                fontFamily: MONO,
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: FOG,
              }}
            >
              <span>Step {step.number}</span>
              <span aria-hidden style={{ color: MIST }}>
                {String(idx + 1).padStart(2, "0")} / {steps.length.toString().padStart(2, "0")}
              </span>
            </div>
            <h3
              style={{
                fontFamily: SERIF,
                fontWeight: 400,
                fontSize: "clamp(28px, 3vw, 36px)",
                lineHeight: 1.1,
                letterSpacing: "-0.022em",
                color: INK,
                margin: 0,
                marginBottom: 16,
                fontVariationSettings: '"opsz" 60',
              }}
            >
              {step.title}
            </h3>
            <p
              style={{
                fontFamily: SERIF,
                fontWeight: 400,
                fontSize: 16,
                lineHeight: 1.6,
                color: SLATE,
                margin: 0,
                marginBottom: 24,
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
                color: STEEL,
              }}
            >
              {step.proof}
            </div>
          </article>
        ))}
      </div>

      {/* ─── Why Renner ─── label-led pairs, sharp not poetic */}
      <section
        style={{
          marginBottom: showCta ? "clamp(96px, 12vw, 144px)" : 0,
        }}
      >
        <div
          style={{
            fontFamily: MONO,
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: FOG,
            marginBottom: 32,
          }}
        >
          {isClient ? "Why Renner" : "What you get"}
        </div>
        <dl
          className="ed-benefits"
          style={{
            margin: 0,
            display: "grid",
            gap: 0,
          }}
        >
          {benefits.map((b, idx) => (
            <div
              key={b.label}
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(160px, 200px) 1fr",
                gap: 32,
                padding: "24px 0",
                borderTop: `1px solid ${RULE}`,
                borderBottom:
                  idx === benefits.length - 1
                    ? `1px solid ${RULE}`
                    : "none",
                alignItems: "baseline",
              }}
            >
              <dt
                style={{
                  fontFamily: SERIF,
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: 22,
                  color: STEEL,
                  letterSpacing: "-0.005em",
                  fontVariationSettings: '"opsz" 36',
                }}
              >
                {b.label}.
              </dt>
              <dd
                style={{
                  fontFamily: SERIF,
                  fontSize: 17,
                  lineHeight: 1.55,
                  color: INK,
                  margin: 0,
                  maxWidth: "60ch",
                  fontVariationSettings: '"opsz" 14',
                }}
              >
                {b.body}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ─── CTA ─── hairline rule + heading + single button */}
      {showCta && (
        <section>
          <h2
            style={{
              fontFamily: SERIF,
              fontWeight: 400,
              fontSize: "clamp(36px, 5vw, 56px)",
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: INK,
              margin: 0,
              marginBottom: 32,
              maxWidth: "16ch",
              fontVariationSettings: '"opsz" 144',
            }}
          >
            {ctaHeading}
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
              transition:
                "background-color 150ms ease, border-color 150ms ease",
            }}
          >
            {ctaButton.label}
            <span aria-hidden style={{ opacity: 0.7 }}>
              →
            </span>
          </Link>
        </section>
      )}

      <style jsx>{`
        .ed-steps {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: clamp(32px, 4vw, 64px);
        }
        @media (max-width: 880px) {
          .ed-lede {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
        @media (max-width: 760px) {
          .ed-steps {
            grid-template-columns: 1fr;
            gap: 56px;
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
        fontSize: "inherit",
        fontWeight: "inherit",
        letterSpacing: "inherit",
        textTransform: "inherit",
        color: active ? "#0d0f12" : "#7d8da0",
        cursor: "pointer",
        transition: "color 150ms ease",
      }}
    >
      {label}
    </button>
  );
}
