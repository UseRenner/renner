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
  "A marketplace for real-estate task work — sign installs, lockbox swaps, showings, courier runs, property prep — handled by background-checked Renners.";

const RENNER_DEK =
  "Independent contractors running short real-estate tasks for agents, brokers, and property managers — on your schedule, in your area.";

const CLIENT_STEPS: Step[] = [
  {
    number: "01",
    title: "Post the task.",
    body: (
      <>
        Describe what you need — sign install, lockbox swap, property
        visuals, guest check-in. Set the location, the window, and the
        price.
      </>
    ),
    proof: "Avg. post · under 2 minutes",
  },
  {
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
    number: "03",
    title: "It gets done.",
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
        See tasks posted by agents, brokers, and property managers
        nearby. Apply to the ones that fit your schedule and skills.
      </>
    ),
    proof: "Marketplace · live in your area",
  },
  {
    number: "03",
    title: "Get it done.",
    body: (
      <>
        Run the task, upload completion photos, get paid through the
        platform. Build a reputation that earns repeat clients.
      </>
    ),
    proof: "Payout · 90% of task pay",
  },
];

const CLIENT_TRUST: string[] = [
  "Vetted by Checkr",
  "Stripe escrow",
  "Photo confirmation",
  "Rate after every task",
];

const RENNER_TRUST: string[] = [
  "Set your own schedule",
  "Local tasks only",
  "90% payout",
  "Repeat clients",
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

function Em({ children }: { children: React.ReactNode }) {
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

export function FrameBody({ showCta }: { showCta: boolean }) {
  const [tab, setTab] = useState<"client" | "renner">("client");
  const isClient = tab === "client";
  const dek = isClient ? CLIENT_DEK : RENNER_DEK;
  const steps = isClient ? CLIENT_STEPS : RENNER_STEPS;
  const trust = isClient ? CLIENT_TRUST : RENNER_TRUST;
  const ctaButton = isClient
    ? { label: "Sign up", href: "/signup" }
    : { label: "Become a Renner", href: "/become-a-renner" };

  return (
    <>
      {/* ─── Audience switch ─── inline mono */}
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
        <TabButton label="For Clients" active={isClient} onClick={() => setTab("client")} />
        <span aria-hidden style={{ color: MIST }}>/</span>
        <TabButton label="For Renners" active={!isClient} onClick={() => setTab("renner")} />
      </div>

      {/* ─── Two-pane frame ─── left: anchored masthead; right: scrolling steps */}
      <div
        className="frame-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 5fr) minmax(0, 7fr)",
          gap: "clamp(40px, 6vw, 96px)",
          alignItems: "start",
        }}
      >
        {/* ─── Left pane ─── sticky masthead */}
        <aside
          className="frame-left"
          style={{
            position: "sticky",
            top: "calc(40px + env(safe-area-inset-top, 0px))",
            display: "flex",
            flexDirection: "column",
            gap: "clamp(28px, 3vw, 40px)",
          }}
        >
          <h1
            style={{
              fontFamily: SERIF,
              fontWeight: 400,
              fontSize: "clamp(48px, 6.5vw, 88px)",
              lineHeight: 0.98,
              letterSpacing: "-0.032em",
              color: INK,
              margin: 0,
              maxWidth: "10ch",
              fontVariationSettings: '"opsz" 144',
            }}
          >
            How Renner <Em>works.</Em>
          </h1>
          <p
            style={{
              fontFamily: SERIF,
              fontWeight: 400,
              fontSize: "clamp(16px, 1.4vw, 18px)",
              lineHeight: 1.55,
              color: SLATE,
              margin: 0,
              maxWidth: "40ch",
              fontVariationSettings: '"opsz" 14',
            }}
          >
            {dek}
          </p>

          {/* Trust list — short bullet-less lines */}
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: "20px 0 0",
              borderTop: `1px solid ${RULE}`,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {trust.map((t) => (
              <li
                key={t}
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto 1fr",
                  gap: 12,
                  alignItems: "baseline",
                  fontFamily: MONO,
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: STEEL,
                }}
              >
                <span aria-hidden style={{ color: MIST }}>+</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>

          {/* CTA — only for signed-out viewers */}
          {showCta && (
            <Link
              href={ctaButton.href}
              style={{
                display: "inline-flex",
                alignSelf: "flex-start",
                alignItems: "center",
                gap: 10,
                marginTop: 8,
                fontFamily: SANS,
                fontSize: 14,
                fontWeight: 500,
                letterSpacing: "0.01em",
                color: PAPER,
                backgroundColor: INK,
                border: `1px solid ${INK}`,
                borderRadius: 4,
                padding: "14px 24px",
                textDecoration: "none",
                whiteSpace: "nowrap",
                transition:
                  "background-color 150ms ease, border-color 150ms ease",
              }}
            >
              {ctaButton.label}
              <span aria-hidden style={{ opacity: 0.7 }}>→</span>
            </Link>
          )}
        </aside>

        {/* ─── Right pane ─── three steps, hairline-stacked */}
        <div className="frame-right">
          {steps.map((step, idx) => (
            <article
              key={step.number}
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(56px, 72px) minmax(0, 1fr)",
                gap: "clamp(20px, 2.5vw, 32px)",
                padding: "clamp(28px, 3.5vw, 44px) 0",
                borderTop: `1px solid ${RULE}`,
                borderBottom:
                  idx === steps.length - 1 ? `1px solid ${RULE}` : "none",
                alignItems: "baseline",
              }}
            >
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: FOG,
                  paddingTop: 4,
                }}
              >
                {step.number}
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: SERIF,
                    fontWeight: 400,
                    fontSize: "clamp(24px, 2.4vw, 30px)",
                    lineHeight: 1.15,
                    letterSpacing: "-0.02em",
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
                    fontSize: 16,
                    lineHeight: 1.6,
                    color: SLATE,
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
                    color: STEEL,
                  }}
                >
                  {step.proof}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 880px) {
          .frame-grid {
            grid-template-columns: 1fr !important;
            gap: clamp(48px, 8vw, 80px) !important;
          }
          .frame-left {
            position: static !important;
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
