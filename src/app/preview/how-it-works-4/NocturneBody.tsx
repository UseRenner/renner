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
const PAPER = "#fbfbfc";
const BODY = "#cad1d8";
const STEEL = "#7d8da0";
const FOG = "#647589";
const GHOST = "#38414d";
const RULE_DARK = "#272d35";
const ACCENT_LIGHT = "#a7b2be";
const GREEN = "#2d8a4e";
const GREEN_HOVER = "#246e3e";

function Italic({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontStyle: "italic",
        fontWeight: 300,
        color: ACCENT_LIGHT,
      }}
    >
      {children}
    </span>
  );
}

export function NocturneBody({ showCta }: { showCta: boolean }) {
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
      {/* ─── Tab strip ─── */}
      <div
        role="tablist"
        aria-label="Audience"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 96,
          fontFamily: MONO,
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
        }}
      >
        <NTab
          label="For Clients"
          active={isClient}
          onClick={() => setTab("client")}
        />
        <span aria-hidden style={{ color: GHOST }}>
          /
        </span>
        <NTab
          label="For Renners"
          active={!isClient}
          onClick={() => setTab("renner")}
        />
      </div>

      {/* ─── Page title ─── */}
      <h1
        style={{
          fontFamily: SERIF,
          fontWeight: 400,
          fontSize: "clamp(56px, 9vw, 120px)",
          lineHeight: 0.95,
          letterSpacing: "-0.035em",
          color: PAPER,
          margin: 0,
          marginBottom: "clamp(96px, 14vw, 168px)",
          maxWidth: "14ch",
          fontVariationSettings: '"opsz" 144',
        }}
      >
        How Renner <Italic>works</Italic>
      </h1>

      {/* ─── Steps ─── three columns, ghost numerals ─── */}
      <div className="noc-steps" style={{ marginBottom: "clamp(96px, 14vw, 168px)" }}>
        {steps.map((step) => (
          <div key={step.number} className="noc-step">
            <div
              style={{
                fontFamily: SERIF,
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "clamp(96px, 11vw, 160px)",
                lineHeight: 0.85,
                letterSpacing: "-0.05em",
                color: GHOST,
                marginBottom: 32,
                fontVariationSettings: '"opsz" 144',
              }}
            >
              {step.number}
            </div>
            <h3
              style={{
                fontFamily: SERIF,
                fontWeight: 400,
                fontSize: 24,
                lineHeight: 1.2,
                letterSpacing: "-0.012em",
                color: PAPER,
                margin: 0,
                marginBottom: 16,
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
                color: BODY,
                margin: 0,
                fontVariationSettings: '"opsz" 14',
              }}
            >
              {step.body}
            </p>
          </div>
        ))}
      </div>

      {/* ─── Benefits ─── italic stack ─── */}
      <div style={{ marginBottom: showCta ? "clamp(96px, 14vw, 160px)" : 0 }}>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: 24,
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
                color: PAPER,
                fontVariationSettings: '"opsz" 36',
              }}
            >
              {b}
            </li>
          ))}
        </ul>
      </div>

      {/* ─── CTA ─── green button on dark ─── */}
      {showCta && (
        <div>
          <h2
            style={{
              fontFamily: SERIF,
              fontWeight: 400,
              fontSize: "clamp(40px, 6vw, 72px)",
              lineHeight: 1.05,
              letterSpacing: "-0.028em",
              color: PAPER,
              margin: 0,
              marginBottom: 40,
              maxWidth: "16ch",
              fontVariationSettings: '"opsz" 144',
            }}
          >
            {ctaHeading}
          </h2>
          <Link
            href={ctaButton.href}
            className="noc-cta-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              fontFamily: SANS,
              fontSize: 14,
              fontWeight: 500,
              letterSpacing: "0.01em",
              color: PAPER,
              backgroundColor: GREEN,
              border: `1px solid ${GREEN}`,
              borderRadius: 4,
              padding: "14px 26px",
              textDecoration: "none",
              whiteSpace: "nowrap",
              transition:
                "background-color 150ms ease, border-color 150ms ease",
            }}
          >
            {ctaButton.label}
            <span aria-hidden style={{ opacity: 0.85 }}>
              →
            </span>
          </Link>
        </div>
      )}

      <style jsx>{`
        .noc-cta-btn:hover {
          background-color: ${GREEN_HOVER};
          border-color: ${GREEN_HOVER};
        }
        .noc-steps {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: clamp(48px, 6vw, 96px);
        }
        @media (max-width: 760px) {
          .noc-steps {
            grid-template-columns: 1fr;
            gap: 80px;
          }
        }
      `}</style>
    </>
  );
}

function NTab({
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
        color: active ? PAPER : FOG,
        cursor: "pointer",
        transition: "color 150ms ease",
      }}
    >
      {label}
    </button>
  );
}
