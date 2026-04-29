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

export function ManifestoBody({ showCta }: { showCta: boolean }) {
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
      {/* ─── Hero band — title + tabs, no chrome ─── */}
      <section className="manifesto-hero">
        <h1
          className="manifesto-title"
          style={{
            fontFamily: SERIF,
            fontWeight: 400,
            fontSize: "clamp(56px, 9vw, 128px)",
            lineHeight: 0.92,
            letterSpacing: "-0.04em",
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
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginTop: 24,
          }}
        >
          <ManTab
            label="For Clients"
            active={isClient}
            onClick={() => setTab("client")}
          />
          <span aria-hidden style={{ color: MIST }}>
            /
          </span>
          <ManTab
            label="For Renners"
            active={!isClient}
            onClick={() => setTab("renner")}
          />
        </div>
      </section>

      {/* ─── Three steps — tight grid ─── */}
      <section className="manifesto-steps">
        {steps.map((step, idx) => (
          <article
            key={step.number}
            className="manifesto-step"
            data-first={idx === 0 ? "true" : "false"}
          >
            <div
              style={{
                fontFamily: MONO,
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.18em",
                color: FOG,
                marginBottom: 16,
              }}
            >
              {step.number}
            </div>
            <h3
              style={{
                fontFamily: SERIF,
                fontWeight: 400,
                fontSize: 22,
                lineHeight: 1.15,
                letterSpacing: "-0.012em",
                color: INK,
                margin: 0,
                marginBottom: 14,
                fontVariationSettings: '"opsz" 36',
              }}
            >
              {step.title}
            </h3>
            <p
              style={{
                fontFamily: SERIF,
                fontWeight: 400,
                fontSize: 15,
                lineHeight: 1.55,
                color: SLATE,
                margin: 0,
                fontVariationSettings: '"opsz" 14',
              }}
            >
              {step.body}
            </p>
          </article>
        ))}
      </section>

      {/* ─── Benefits + CTA — single tight row ─── */}
      <section className="manifesto-foot">
        <ul
          className="manifesto-benefits"
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
          }}
        >
          {benefits.map((b, i) => (
            <li
              key={b}
              style={{
                fontFamily: SERIF,
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: 17,
                lineHeight: 1.4,
                letterSpacing: "-0.005em",
                color: INK,
                paddingRight: 20,
                paddingLeft: i === 0 ? 0 : 20,
                borderLeft:
                  i === 0 ? "none" : `1px solid ${MIST}`,
                fontVariationSettings: '"opsz" 36',
              }}
            >
              {b}
            </li>
          ))}
        </ul>

        {showCta && (
          <div className="manifesto-cta">
            <h2
              style={{
                fontFamily: SERIF,
                fontWeight: 400,
                fontSize: "clamp(22px, 2.6vw, 30px)",
                lineHeight: 1.15,
                letterSpacing: "-0.018em",
                color: INK,
                margin: 0,
                fontVariationSettings: '"opsz" 36',
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
        )}
      </section>

      <style jsx>{`
        .manifesto-hero {
          padding-bottom: clamp(40px, 5vw, 64px);
        }
        .manifesto-steps {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 0;
          padding: clamp(40px, 5vw, 56px) 0;
          border-top: 1px solid ${MIST};
          border-bottom: 1px solid ${MIST};
        }
        .manifesto-step {
          padding: 0 clamp(20px, 3vw, 40px);
        }
        .manifesto-step[data-first="false"] {
          border-left: 1px solid ${MIST};
        }
        .manifesto-foot {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          flex-wrap: wrap;
          padding-top: clamp(32px, 4vw, 48px);
        }
        .manifesto-benefits {
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
          row-gap: 8px;
        }
        .manifesto-cta {
          display: flex;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
        }
        @media (max-width: 880px) {
          .manifesto-steps {
            grid-template-columns: 1fr;
          }
          .manifesto-step {
            padding: 32px 0;
          }
          .manifesto-step[data-first="false"] {
            border-left: none;
            border-top: 1px solid ${MIST};
          }
          .manifesto-benefits li {
            border-left: none !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
            width: 100%;
          }
          .manifesto-foot {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </>
  );
}

function ManTab({
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
