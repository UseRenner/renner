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

export function CinematicBody({ showCta }: { showCta: boolean }) {
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
      {/* ─── Hero section — viewport-sized opening ─── */}
      <section
        style={{
          minHeight: "calc(100vh - 80px)",
          padding: "clamp(40px, 6vw, 96px) clamp(28px, 4vw, 64px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
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
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: 56,
          }}
        >
          <CinTab
            label="For Clients"
            active={isClient}
            onClick={() => setTab("client")}
          />
          <span aria-hidden style={{ color: MIST }}>
            /
          </span>
          <CinTab
            label="For Renners"
            active={!isClient}
            onClick={() => setTab("renner")}
          />
        </div>

        <h1
          style={{
            fontFamily: SERIF,
            fontWeight: 400,
            fontSize: "clamp(64px, 11vw, 168px)",
            lineHeight: 0.9,
            letterSpacing: "-0.045em",
            color: INK,
            margin: 0,
            maxWidth: "14ch",
            fontVariationSettings: '"opsz" 144',
          }}
        >
          How Renner <Italic>works</Italic>
        </h1>

        <div
          aria-hidden
          style={{
            marginTop: 80,
            fontFamily: MONO,
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: FOG,
          }}
        >
          Scroll ↓
        </div>
      </section>

      {/* ─── Steps — each its own chapter ─── */}
      {steps.map((step, idx) => (
        <section
          key={step.number}
          className="cin-step"
          style={{
            minHeight: "min(820px, 95vh)",
            padding: "clamp(80px, 10vw, 160px) clamp(28px, 4vw, 64px)",
            borderTop: `1px solid #eaedf0`,
            display: "grid",
            gridTemplateColumns: "5fr 7fr",
            gap: "clamp(32px, 5vw, 80px)",
            alignItems: "center",
            maxWidth: 1400,
            margin: "0 auto",
            width: "100%",
          }}
        >
          <div
            style={{
              fontFamily: SERIF,
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(140px, 22vw, 320px)",
              lineHeight: 0.85,
              letterSpacing: "-0.05em",
              color: MIST,
              textAlign: "right",
              fontVariationSettings: '"opsz" 144',
            }}
          >
            {step.number}
          </div>
          <div style={{ maxWidth: 560 }}>
            <h2
              style={{
                fontFamily: SERIF,
                fontWeight: 400,
                fontSize: "clamp(36px, 4.5vw, 56px)",
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
                color: INK,
                margin: 0,
                marginBottom: 28,
                fontVariationSettings: '"opsz" 72',
              }}
            >
              {step.title}
            </h2>
            <p
              style={{
                fontFamily: SERIF,
                fontWeight: 400,
                fontSize: 19,
                lineHeight: 1.6,
                color: SLATE,
                margin: 0,
                fontVariationSettings: '"opsz" 14',
              }}
            >
              {step.body}
            </p>
          </div>
        </section>
      ))}

      {/* ─── Benefits — italic stack, centered chapter ─── */}
      <section
        style={{
          minHeight: "min(640px, 80vh)",
          padding: "clamp(96px, 10vw, 160px) clamp(28px, 4vw, 64px)",
          borderTop: `1px solid #eaedf0`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
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
            gap: 24,
            maxWidth: 880,
          }}
        >
          {benefits.map((b) => (
            <li
              key={b}
              style={{
                fontFamily: SERIF,
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "clamp(28px, 3.4vw, 44px)",
                lineHeight: 1.25,
                letterSpacing: "-0.018em",
                color: INK,
                fontVariationSettings: '"opsz" 36',
              }}
            >
              {b}
            </li>
          ))}
        </ul>
      </section>

      {/* ─── CTA — climax chapter ─── */}
      {showCta && (
        <section
          style={{
            minHeight: "min(560px, 70vh)",
            padding: "clamp(80px, 10vw, 144px) clamp(28px, 4vw, 64px)",
            borderTop: `1px solid #eaedf0`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontFamily: SERIF,
              fontWeight: 400,
              fontSize: "clamp(40px, 6vw, 80px)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: INK,
              margin: 0,
              marginBottom: 48,
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
              gap: 12,
              fontFamily: SANS,
              fontSize: 15,
              fontWeight: 500,
              letterSpacing: "0.01em",
              color: PAPER,
              backgroundColor: INK,
              border: `1px solid ${INK}`,
              borderRadius: 4,
              padding: "16px 32px",
              textDecoration: "none",
              whiteSpace: "nowrap",
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
        @media (max-width: 760px) {
          .cin-step {
            grid-template-columns: 1fr !important;
            text-align: left !important;
          }
          .cin-step > :first-child {
            text-align: left !important;
            font-size: clamp(120px, 36vw, 200px) !important;
          }
        }
      `}</style>
    </>
  );
}

function CinTab({
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
