"use client";

import Link from "next/link";
import { useState } from "react";

type Step = { number: string; title: React.ReactNode; body: string };

const CLIENT_STEPS: Step[] = [
  {
    number: "I",
    title: "Post a task.",
    body: "Describe what you need — sign installation, lockbox swap, property visuals, guest check-in, courier run, or anything real estate. Set the location, time window, and price.",
  },
  {
    number: "II",
    title: "A vetted Renner applies.",
    body: "Background-checked Renners in your area see your task and apply. Review their profile, ratings, and experience. Pick the right fit.",
  },
  {
    number: "III",
    title: "It gets done.",
    body: "Your Renner handles it. You get confirmation with completion photos. Pay securely through the platform. That's it.",
  },
];

const RENNER_STEPS: Step[] = [
  {
    number: "I",
    title: "Create your profile.",
    body: "Sign up, verify your identity, and pass a background check. Add your categories — signs, lockbox, courier, visuals, guest access, showings, and more. Set your service area.",
  },
  {
    number: "II",
    title: "Browse and apply.",
    body: "See tasks posted by agents, brokers, property managers, leasing agents, and landlords in your area. Apply to the ones that fit your schedule and skills.",
  },
  {
    number: "III",
    title: "Get it done.",
    body: "Complete the task, upload confirmation photos, and get paid securely through the platform. Build your reputation with ratings and reviews.",
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

export function DocumentBody({ showCta }: { showCta: boolean }) {
  const [tab, setTab] = useState<"client" | "renner">("client");
  const isClient = tab === "client";
  const steps = isClient ? CLIENT_STEPS : RENNER_STEPS;
  const benefits = isClient ? CLIENT_BENEFITS : RENNER_BENEFITS;
  const ctaButton = isClient
    ? { label: "Sign up", href: "/signup" }
    : { label: "Become a Renner", href: "/become-a-renner" };

  return (
    <article
      style={{
        maxWidth: 680,
        margin: "0 auto",
      }}
    >
      {/* ─── Tab strip ─── centered, minimal ─── */}
      <div
        role="tablist"
        aria-label="Audience"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 14,
          fontFamily: MONO,
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          marginBottom: 56,
        }}
      >
        <DocTab
          label="For Clients"
          active={isClient}
          onClick={() => setTab("client")}
        />
        <span aria-hidden style={{ color: MIST }}>
          /
        </span>
        <DocTab
          label="For Renners"
          active={!isClient}
          onClick={() => setTab("renner")}
        />
      </div>

      {/* ─── Title ─── centered editorial ─── */}
      <h1
        style={{
          fontFamily: SERIF,
          fontWeight: 400,
          fontSize: "clamp(48px, 6vw, 80px)",
          lineHeight: 1.05,
          letterSpacing: "-0.03em",
          color: INK,
          margin: 0,
          marginBottom: 64,
          textAlign: "center",
          fontVariationSettings: '"opsz" 144',
        }}
      >
        How Renner{" "}
        <span
          style={{
            fontStyle: "italic",
            fontWeight: 300,
            color: STEEL,
          }}
        >
          works
        </span>
      </h1>

      <Asterism />

      {/* ─── Document body ─── inline numbered paragraphs ─── */}
      <div style={{ marginTop: 64 }}>
        {steps.map((step, idx) => (
          <section
            key={step.number}
            style={{
              marginBottom: 56,
              position: "relative",
            }}
          >
            <div
              style={{
                fontFamily: SERIF,
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: 18,
                color: STEEL,
                marginBottom: 12,
                fontVariationSettings: '"opsz" 36',
              }}
            >
              {step.number}.
            </div>
            <h3
              style={{
                fontFamily: SERIF,
                fontWeight: 400,
                fontSize: 28,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                color: INK,
                margin: 0,
                marginBottom: 16,
                fontVariationSettings: '"opsz" 36',
              }}
            >
              {step.title}
            </h3>
            <p
              className={
                idx === 0 ? "doc-lead" : undefined
              }
              style={{
                fontFamily: SERIF,
                fontWeight: 400,
                fontSize: 17,
                lineHeight: 1.65,
                color: SLATE,
                margin: 0,
                textAlign: "justify",
                hyphens: "auto",
                fontVariationSettings: '"opsz" 14',
              }}
            >
              {step.body}
            </p>
          </section>
        ))}
      </div>

      <Asterism />

      {/* ─── Benefits as a postscript stack ─── */}
      <div style={{ marginTop: 64, marginBottom: showCta ? 64 : 0 }}>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: 16,
            textAlign: "center",
          }}
        >
          {benefits.map((b) => (
            <li
              key={b}
              style={{
                fontFamily: SERIF,
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: 22,
                lineHeight: 1.4,
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

      {showCta && <Asterism />}

      {/* ─── CTA ─── refined dark button ─── */}
      {showCta && (
        <div style={{ marginTop: 64, textAlign: "center" }}>
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
        .doc-lead::first-letter {
          font-family: ${SERIF};
          font-weight: 400;
          font-style: italic;
          font-size: 4.5em;
          line-height: 0.85;
          float: left;
          margin: 0.05em 0.08em 0 0;
          color: ${INK};
          font-variation-settings: "opsz" 144;
        }
      `}</style>
    </article>
  );
}

function DocTab({
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

function Asterism() {
  return (
    <div
      aria-hidden
      style={{
        textAlign: "center",
        fontFamily: SERIF,
        fontSize: 16,
        color: MIST,
        letterSpacing: "0.6em",
        margin: "0 auto",
        fontWeight: 400,
        fontVariationSettings: '"opsz" 36',
      }}
    >
      ✻ ✻ ✻
    </div>
  );
}
