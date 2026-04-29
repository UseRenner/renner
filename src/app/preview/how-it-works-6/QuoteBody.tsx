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
const RULE = "#dce0e5";
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

export function QuoteBody({ showCta }: { showCta: boolean }) {
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
      {/* ─── Tab strip ─── centered ─── */}
      <div
        role="tablist"
        aria-label="Audience"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 14,
          marginBottom: 56,
          fontFamily: MONO,
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
        }}
      >
        <QTab
          label="For Clients"
          active={isClient}
          onClick={() => setTab("client")}
        />
        <span aria-hidden style={{ color: MIST }}>
          /
        </span>
        <QTab
          label="For Renners"
          active={!isClient}
          onClick={() => setTab("renner")}
        />
      </div>

      {/* ─── Page title ─── centered ─── */}
      <h1
        style={{
          fontFamily: SERIF,
          fontWeight: 400,
          fontSize: "clamp(48px, 7vw, 88px)",
          lineHeight: 0.98,
          letterSpacing: "-0.03em",
          color: INK,
          margin: 0,
          marginBottom: "clamp(96px, 12vw, 144px)",
          textAlign: "center",
          fontVariationSettings: '"opsz" 144',
        }}
      >
        How Renner <Italic>works</Italic>
      </h1>

      {/* ─── Steps as bracketed pulls ─── */}
      <div className="qt-stack">
        {steps.map((step) => (
          <article key={step.number} className="qt-pull">
            <span aria-hidden className="qt-rule-top" />
            <div
              style={{
                fontFamily: MONO,
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.22em",
                color: FOG,
                marginBottom: 24,
              }}
            >
              {step.number}
            </div>
            <h3
              style={{
                fontFamily: SERIF,
                fontWeight: 400,
                fontSize: "clamp(28px, 3.6vw, 44px)",
                lineHeight: 1.1,
                letterSpacing: "-0.024em",
                color: INK,
                margin: 0,
                marginBottom: 24,
                fontVariationSettings: '"opsz" 72',
              }}
            >
              {step.title}
            </h3>
            <p
              style={{
                fontFamily: SERIF,
                fontWeight: 400,
                fontSize: 18,
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
        <span aria-hidden className="qt-rule-bottom" />
      </div>

      {/* ─── Benefits ─── italic stack, centered ─── */}
      <div
        style={{
          marginTop: "clamp(96px, 12vw, 144px)",
          marginBottom: showCta ? "clamp(96px, 12vw, 144px)" : 0,
          textAlign: "center",
        }}
      >
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          {benefits.map((b) => (
            <li
              key={b}
              style={{
                fontFamily: SERIF,
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "clamp(22px, 2.6vw, 32px)",
                lineHeight: 1.3,
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

      {/* ─── CTA ─── centered ─── */}
      {showCta && (
        <div style={{ textAlign: "center" }}>
          <h2
            style={{
              fontFamily: SERIF,
              fontWeight: 400,
              fontSize: "clamp(36px, 5vw, 56px)",
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
              color: INK,
              margin: 0,
              marginBottom: 40,
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
              fontSize: 14,
              fontWeight: 500,
              letterSpacing: "0.01em",
              color: PAPER,
              backgroundColor: INK,
              border: `1px solid ${INK}`,
              borderRadius: 4,
              padding: "14px 26px",
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

      <style jsx>{`
        .qt-stack {
          max-width: 720px;
          margin: 0 auto;
        }
        .qt-pull {
          padding: clamp(48px, 6vw, 72px) 0;
          text-align: left;
        }
        .qt-rule-top,
        .qt-rule-bottom {
          display: block;
          height: 1px;
          background-color: ${RULE};
        }
        .qt-pull:not(:first-child) .qt-rule-top {
          display: none;
        }
        .qt-pull:not(:last-child) {
          border-bottom: 1px solid ${RULE};
        }
        .qt-rule-bottom {
          display: none;
        }
      `}</style>
    </>
  );
}

function QTab({
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
