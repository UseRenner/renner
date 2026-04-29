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
const RULE_STRONG = "#dce0e5";
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

export function EditorialTabs({ showCta }: { showCta: boolean }) {
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
        style={{
          display: "flex",
          gap: 32,
          borderBottom: `1px solid ${RULE_STRONG}`,
          marginBottom: 64,
        }}
        role="tablist"
        aria-label="Audience"
      >
        <TabButton
          label="For Clients"
          active={isClient}
          onClick={() => setTab("client")}
        />
        <TabButton
          label="For Renners"
          active={!isClient}
          onClick={() => setTab("renner")}
        />
      </div>

      {/* ─── Hero heading ─── */}
      <div
        style={{
          textAlign: "center",
          marginBottom: 80,
          padding: "0 16px",
        }}
      >
        <h1
          style={{
            fontFamily: SERIF,
            fontWeight: 400,
            fontSize: "clamp(44px, 6vw, 72px)",
            lineHeight: 1.05,
            letterSpacing: "-0.028em",
            color: INK,
            margin: 0,
            fontVariationSettings: '"opsz" 144',
          }}
        >
          How Renner <Italic>works</Italic>
        </h1>
      </div>

      {/* ─── Three-step horizontal grid ─── */}
      <div className="ed-steps-grid" style={{ marginBottom: 96 }}>
        {steps.map((step, idx) => (
          <div
            key={step.number}
            className="ed-step-col"
            data-first={idx === 0 ? "true" : "false"}
          >
            <div
              style={{
                fontFamily: SERIF,
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "clamp(64px, 7vw, 88px)",
                lineHeight: 0.9,
                letterSpacing: "-0.04em",
                color: MIST,
                marginBottom: 24,
                fontVariationSettings: '"opsz" 144',
              }}
            >
              {step.number}
            </div>
            <h3
              style={{
                fontFamily: SERIF,
                fontWeight: 400,
                fontSize: 22,
                lineHeight: 1.2,
                letterSpacing: "-0.012em",
                color: INK,
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
                color: SLATE,
                margin: 0,
                fontVariationSettings: '"opsz" 14',
              }}
            >
              {step.body}
            </p>
          </div>
        ))}
      </div>

      {/* ─── Benefits row ─── */}
      <div style={{ marginBottom: showCta ? 96 : 0 }}>
        <SectionRule label={isClient ? "Why Renner" : "What you get"} />
        <div
          className="ed-benefits-grid"
          data-count={benefits.length}
          style={{
            borderTop: `1px solid ${RULE}`,
            borderBottom: `1px solid ${RULE}`,
          }}
        >
          {benefits.map((b, i) => (
            <div
              key={b}
              className="ed-benefit-cell"
              data-first={i === 0 ? "true" : "false"}
              style={{
                padding: "28px 24px",
              }}
            >
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.16em",
                  color: FOG,
                  display: "block",
                  marginBottom: 10,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p
                style={{
                  fontFamily: SERIF,
                  fontWeight: 400,
                  fontSize: 16,
                  lineHeight: 1.4,
                  color: INK,
                  margin: 0,
                  fontVariationSettings: '"opsz" 14',
                }}
              >
                {b}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ─── CTA — ink band ─── */}
      {showCta && (
        <div
          style={{
            backgroundColor: INK,
            color: PAPER,
            padding: "56px clamp(28px, 4vw, 64px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 32,
            flexWrap: "wrap",
          }}
        >
          <h2
            style={{
              fontFamily: SERIF,
              fontWeight: 400,
              fontSize: "clamp(24px, 3vw, 32px)",
              lineHeight: 1.15,
              letterSpacing: "-0.018em",
              color: PAPER,
              margin: 0,
              fontVariationSettings: '"opsz" 36',
            }}
          >
            {ctaHeading}
          </h2>
          <Link
            href={ctaButton.href}
            style={{
              fontFamily: SANS,
              fontSize: 14,
              fontWeight: 500,
              letterSpacing: "0.01em",
              color: PAPER,
              backgroundColor: "transparent",
              border: `1px solid ${PAPER}`,
              borderRadius: 6,
              padding: "13px 28px",
              textDecoration: "none",
              whiteSpace: "nowrap",
              transition:
                "background-color 150ms ease, color 150ms ease",
            }}
          >
            {ctaButton.label}
          </Link>
        </div>
      )}

      <style jsx>{`
        .ed-steps-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 0;
        }
        .ed-step-col {
          padding: 0 32px;
          position: relative;
        }
        .ed-step-col[data-first="false"] {
          border-left: 1px solid ${RULE};
        }
        .ed-benefits-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
        }
        .ed-benefits-grid[data-count="4"] {
          grid-template-columns: 1fr 1fr 1fr 1fr;
        }
        .ed-benefit-cell[data-first="false"] {
          border-left: 1px solid ${RULE};
        }
        @media (max-width: 760px) {
          .ed-steps-grid {
            grid-template-columns: 1fr;
          }
          .ed-step-col {
            padding: 32px 0;
          }
          .ed-step-col[data-first="false"] {
            border-left: none;
            border-top: 1px solid ${RULE};
          }
          .ed-benefits-grid,
          .ed-benefits-grid[data-count="4"] {
            grid-template-columns: 1fr;
          }
          .ed-benefit-cell[data-first="false"] {
            border-left: none;
            border-top: 1px solid ${RULE};
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
        padding: "16px 0",
        marginBottom: -1,
        fontFamily: MONO,
        fontSize: 12,
        fontWeight: 500,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: active ? INK : FOG,
        borderBottom: active
          ? `2px solid ${INK}`
          : "2px solid transparent",
        cursor: "pointer",
        transition: "color 150ms ease, border-color 150ms ease",
      }}
    >
      {label}
    </button>
  );
}

export function SectionRule({ label }: { label: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 20,
        marginBottom: 0,
        paddingBottom: 16,
      }}
    >
      <span
        style={{
          fontFamily: MONO,
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: FOG,
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
      <span
        aria-hidden
        style={{ flex: 1, height: 1, backgroundColor: RULE }}
      />
    </div>
  );
}
