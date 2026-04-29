"use client";

import Link from "next/link";
import { useState } from "react";

type Step = { number: string; title: React.ReactNode; body: React.ReactNode };

const CLIENT_STEPS: Step[] = [
  {
    number: "01",
    title: "Post a task.",
    body: (
      <>
        Describe what you need — sign installation, lockbox swap, property
        visuals, guest check-in, courier run, or anything real estate. Set
        the location, time window, and price.
      </>
    ),
  },
  {
    number: "02",
    title: "A vetted Renner applies.",
    body: (
      <>
        Background-checked Renners in your area see your task and apply.
        Review their profile, ratings, and experience. Pick the right fit.
      </>
    ),
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
        Your Renner handles it. You get confirmation with completion
        photos. Pay securely through the platform. That&rsquo;s it.
      </>
    ),
  },
];

const RENNER_STEPS: Step[] = [
  {
    number: "01",
    title: "Create your profile.",
    body: (
      <>
        Sign up, verify your identity, and pass a background check. Add
        your categories — signs, lockbox, courier, visuals, guest access,
        showings, and more. Set your service area.
      </>
    ),
  },
  {
    number: "02",
    title: "Browse and apply.",
    body: (
      <>
        See tasks posted by agents, brokers, property managers, leasing
        agents, and landlords in your area. Apply to the ones that fit
        your schedule and skills.
      </>
    ),
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
        Complete the task, upload confirmation photos, and get paid
        securely through the platform. Build your reputation with ratings
        and reviews.
      </>
    ),
  },
];

const CLIENT_BENEFITS = [
  "Every Renner is background-checked.",
  "Secure payments through the platform.",
  "Rate and review after every task.",
];

const RENNER_BENEFITS = [
  "Set your own schedule.",
  "Work in your area.",
  "Get paid for every completed task.",
  "Build a reputation that earns repeat clients.",
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
const RULE_BLACK = "#0d0f12";
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

export function ArchitectBody({ showCta }: { showCta: boolean }) {
  const [tab, setTab] = useState<"client" | "renner">("client");
  const isClient = tab === "client";
  const steps = isClient ? CLIENT_STEPS : RENNER_STEPS;
  const benefits = isClient ? CLIENT_BENEFITS : RENNER_BENEFITS;
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
      {/* ─── Frame: title + tabs sandwiched between thin black rules ─── */}
      <div
        style={{
          borderTop: `1px solid ${RULE_BLACK}`,
          borderBottom: `1px solid ${RULE_BLACK}`,
          padding: "clamp(48px, 6vw, 96px) 0",
          marginBottom: "clamp(64px, 8vw, 112px)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(180px, 220px) 1fr auto",
            gap: "clamp(24px, 4vw, 56px)",
            alignItems: "baseline",
          }}
          className="arch-title-row"
        >
          <div
            style={{
              fontFamily: MONO,
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: FOG,
            }}
          >
            Renner / Procedure
          </div>
          <h1
            style={{
              fontFamily: SERIF,
              fontWeight: 400,
              fontSize: "clamp(48px, 6.5vw, 88px)",
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              color: INK,
              margin: 0,
              fontVariationSettings: '"opsz" 144',
            }}
          >
            How Renner <Italic>works</Italic>
          </h1>
          <div
            role="tablist"
            aria-label="Audience"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontFamily: MONO,
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            <ATab
              label="Client"
              active={isClient}
              onClick={() => setTab("client")}
            />
            <span aria-hidden style={{ color: MIST }}>
              /
            </span>
            <ATab
              label="Renner"
              active={!isClient}
              onClick={() => setTab("renner")}
            />
          </div>
        </div>
      </div>

      {/* ─── Steps ─── three columns separated by vertical hairlines ─── */}
      <div className="arch-steps">
        {steps.map((step, idx) => (
          <article
            key={step.number}
            className="arch-step"
            data-first={idx === 0 ? "true" : "false"}
          >
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                marginBottom: 32,
              }}
            >
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.22em",
                  color: FOG,
                }}
              >
                {step.number}
              </span>
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.22em",
                  color: FOG,
                }}
              >
                / 03
              </span>
            </div>
            <h3
              style={{
                fontFamily: SERIF,
                fontWeight: 400,
                fontSize: 26,
                lineHeight: 1.15,
                letterSpacing: "-0.018em",
                color: INK,
                margin: 0,
                marginBottom: 18,
                fontVariationSettings: '"opsz" 36',
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
                fontVariationSettings: '"opsz" 14',
              }}
            >
              {step.body}
            </p>
          </article>
        ))}
      </div>

      {/* ─── Benefits ─── frame: thin black rules above and below ─── */}
      <div
        style={{
          marginTop: "clamp(80px, 10vw, 144px)",
          borderTop: `1px solid ${RULE_BLACK}`,
          borderBottom: `1px solid ${RULE_BLACK}`,
          padding: "clamp(40px, 5vw, 64px) 0",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(180px, 220px) 1fr",
            gap: "clamp(24px, 4vw, 56px)",
            alignItems: "baseline",
          }}
          className="arch-benefits-row"
        >
          <div
            style={{
              fontFamily: MONO,
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: FOG,
            }}
          >
            {isClient ? "Why Renner" : "What you get"}
          </div>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            {benefits.map((b) => (
              <li
                key={b}
                style={{
                  fontFamily: SERIF,
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: "clamp(20px, 2.2vw, 26px)",
                  lineHeight: 1.35,
                  letterSpacing: "-0.012em",
                  color: INK,
                  fontVariationSettings: '"opsz" 36',
                }}
              >
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ─── CTA ─── architectural anchor row ─── */}
      {showCta && (
        <div
          style={{
            marginTop: "clamp(80px, 10vw, 144px)",
            borderTop: `1px solid ${RULE_BLACK}`,
            paddingTop: "clamp(40px, 5vw, 64px)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(180px, 220px) 1fr auto",
              gap: "clamp(24px, 4vw, 56px)",
              alignItems: "baseline",
            }}
            className="arch-cta-row"
          >
            <div
              style={{
                fontFamily: MONO,
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: FOG,
              }}
            >
              Begin
            </div>
            <h2
              style={{
                fontFamily: SERIF,
                fontWeight: 400,
                fontSize: "clamp(28px, 3.5vw, 44px)",
                lineHeight: 1.1,
                letterSpacing: "-0.022em",
                color: INK,
                margin: 0,
                fontVariationSettings: '"opsz" 72',
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
                fontSize: 14,
                fontWeight: 500,
                letterSpacing: "0.01em",
                color: PAPER,
                backgroundColor: INK,
                border: `1px solid ${INK}`,
                borderRadius: 4,
                padding: "13px 22px",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              {ctaButton.label}
              <span aria-hidden style={{ opacity: 0.7 }}>
                →
              </span>
            </Link>
          </div>
        </div>
      )}

      <style jsx>{`
        .arch-steps {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 0;
        }
        .arch-step {
          padding: 0 clamp(24px, 3vw, 40px);
        }
        .arch-step[data-first="false"] {
          border-left: 1px solid ${RULE};
        }
        @media (max-width: 880px) {
          .arch-steps {
            grid-template-columns: 1fr;
          }
          .arch-step {
            padding: 32px 0;
          }
          .arch-step[data-first="false"] {
            border-left: none;
            border-top: 1px solid ${RULE};
          }
          .arch-title-row {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .arch-benefits-row,
          .arch-cta-row {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
      `}</style>
    </>
  );
}

function ATab({
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
        color: active ? INK : FOG,
        cursor: "pointer",
        transition: "color 150ms ease",
      }}
    >
      {label}
    </button>
  );
}
