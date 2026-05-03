"use client";

import Link from "next/link";
import { useState } from "react";
import { FAQS, RennerMark } from "../how-it-works/_shared";
import { Card, CLIENT_KINDS, RENNER_KINDS } from "../how-it-works/_illustrations";

type Step = { number: string; title: React.ReactNode; body: React.ReactNode };

const CLIENT_STEPS: Step[] = [
  {
    number: "01",
    title: "Post a task",
    body: <>Set the location, time, task, and price.</>,
  },
  {
    number: "02",
    title: "Pick a Renner",
    body: <>Local Renners apply. Select one for your task.</>,
  },
  {
    number: "03",
    title: "It's taken care of",
    body: <>Receive photos and confirm completion. Payment is released.</>,
  },
];

const RENNER_STEPS: Step[] = [
  {
    number: "01",
    title: "Get verified",
    body: <>Verify your ID, clear a background check, and set your service area.</>,
  },
  {
    number: "02",
    title: "Pick a task",
    body: <>See tasks in your area. Apply to what fits your skills and schedule.</>,
  },
  {
    number: "03",
    title: "Take care of it",
    body: <>Complete the task. Send photo confirmation. Receive payment.</>,
  },
];

// Trust copy mirrors Brief's exactly so the variants speak with
// one voice: a single editorial paragraph keyed by audience,
// kickered by "Why Renner" / "What you get".
const CLIENT_TRUST =
  "Clients and Renners pass ID and background checks before posting or booking. Tasks that require a license go only to licensed Renners. Save Renners you like and invite them to your tasks.";
const RENNER_TRUST =
  "The work is real-estate tasks — sign installs, lockboxes, showings, property prep. Clients and Renners pass ID and background checks. Clients can save you as a favorite and invite you directly to their next task.";

const SERIF = "var(--font-source-serif), ui-serif, Georgia, serif";
const SANS =
  "var(--font-source-sans), ui-sans-serif, system-ui, sans-serif";
const MONO =
  "var(--font-source-code), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const INK = "var(--c-text, #0d0f12)";
const SLATE = "var(--c-700, #2a2f36)";
const STEEL = "var(--c-600, #647589)";
const FOG = "var(--c-500, #7d8da0)";
const MIST = "var(--c-300, #cad1d8)";
const PAPER = "var(--c-bg, #fbfbfc)";
const BONE = "var(--ill-bg, #f6f7f9)";
const RULE = "var(--c-rule, #eaedf0)";

export function RailBody({ showCta }: { showCta: boolean }) {
  const [tab, setTab] = useState<"client" | "renner">("client");
  const isClient = tab === "client";
  const steps = isClient ? CLIENT_STEPS : RENNER_STEPS;
  const trust = isClient ? CLIENT_TRUST : RENNER_TRUST;
  const trustKicker = isClient ? "Why Renner" : "What you get";
  const ctaButton = isClient
    ? { label: "Sign up", href: "/signup" }
    : { label: "Become a Renner", href: "/become-a-renner" };

  return (
    <>
      <div className="rail-page">
        {/* ─── Sticky left rail ─── */}
        <aside className="rail">
          <div>
            <RennerMark />
          </div>

          <div style={{ marginTop: 80 }}>
            <h1
              style={{
                fontFamily: SERIF,
                fontWeight: 400,
                fontSize: "clamp(36px, 3.4vw, 48px)",
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
                color: INK,
                margin: 0,
                marginBottom: 32,
                fontVariationSettings: '"opsz" 144',
              }}
            >
              {isClient ? "What do you need taken care of?" : "What can you take care of?"}
            </h1>

            <div
              role="tablist"
              aria-label="Audience"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 0,
                borderTop: `1px solid ${RULE}`,
                borderBottom: `1px solid ${RULE}`,
              }}
            >
              <RailTab
                label="Hire a Renner"
                active={isClient}
                onClick={() => setTab("client")}
              />
              <RailTab
                label="Become a Renner"
                active={!isClient}
                onClick={() => setTab("renner")}
              />
            </div>
          </div>

          <div style={{ marginTop: "auto" }}>
            {showCta && (
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
                  padding: "14px 24px",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  marginBottom: 24,
                }}
              >
                {ctaButton.label}
                <span aria-hidden style={{ opacity: 0.7 }}>
                  →
                </span>
              </Link>
            )}
            <div
              style={{
                fontFamily: MONO,
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: FOG,
                display: "flex",
                gap: 16,
                flexWrap: "wrap",
              }}
            >
              <Link
                href={showCta ? "/signin" : "/dashboard"}
                style={{ color: STEEL, textDecoration: "none" }}
              >
                {showCta ? "Sign in" : "Dashboard"}
              </Link>
              <span style={{ color: MIST }}>·</span>
              <Link
                href="/contact"
                style={{ color: STEEL, textDecoration: "none" }}
              >
                Contact
              </Link>
              <span style={{ color: MIST }}>·</span>
              <Link
                href="/terms"
                style={{ color: STEEL, textDecoration: "none" }}
              >
                Terms
              </Link>
            </div>
          </div>
        </aside>

        {/* ─── Right content ─── */}
        <main className="rail-main">
          {/* Steps as full-width vertical blocks, hairlines between */}
          <div>
            {steps.map((step, idx) => (
              <article
                key={step.number}
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(120px, 160px) 1fr",
                  gap: "clamp(24px, 4vw, 56px)",
                  padding: "clamp(48px, 6vw, 72px) 0",
                  borderTop:
                    idx === 0 ? `1px solid ${RULE}` : "none",
                  borderBottom: `1px solid ${RULE}`,
                  alignItems: "baseline",
                }}
              >
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: 12,
                    fontWeight: 500,
                    letterSpacing: "0.18em",
                    color: FOG,
                  }}
                >
                  {step.number}
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: SERIF,
                      fontStyle: "italic",
                      fontWeight: 300,
                      fontSize: "clamp(28px, 3vw, 36px)",
                      lineHeight: 1.1,
                      letterSpacing: "-0.018em",
                      color: INK,
                      margin: 0,
                      marginBottom: 20,
                      fontVariationSettings: '"opsz" 72',
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: SERIF,
                      fontWeight: 400,
                      fontSize: 17,
                      lineHeight: 1.6,
                      color: SLATE,
                      margin: 0,
                      marginBottom: 24,
                      maxWidth: 640,
                      fontVariationSettings: '"opsz" 14',
                    }}
                  >
                    {step.body}
                  </p>
                  <Card kind={(isClient ? CLIENT_KINDS : RENNER_KINDS)[idx]} />
                </div>
              </article>
            ))}
          </div>

          {/* Trust — Brief's editorial paragraph, mono-kickered.
              Replaces the previous bulleted benefits list so the
              copy lines up with Center / Folio / Brief. */}
          <div
            style={{
              padding: "clamp(64px, 8vw, 112px) 0",
              maxWidth: 640,
            }}
          >
            <div
              style={{
                fontFamily: MONO,
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: FOG,
                marginBottom: "clamp(20px, 2.5vw, 28px)",
              }}
            >
              {trustKicker}
            </div>
            <p
              style={{
                fontFamily: SERIF,
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "clamp(22px, 2.4vw, 28px)",
                lineHeight: 1.5,
                letterSpacing: "-0.005em",
                color: INK,
                margin: 0,
                fontVariationSettings: '"opsz" 36',
              }}
            >
              {trust}
            </p>
          </div>

          {/* FAQ */}
          <div
            style={{
              borderTop: `1px solid ${RULE}`,
              paddingTop: "clamp(48px, 6vw, 80px)",
              paddingBottom: "clamp(64px, 8vw, 112px)",
            }}
          >
            <div
              style={{
                fontFamily: MONO,
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: FOG,
                marginBottom: 40,
              }}
            >
              Common questions
            </div>
            {FAQS.map((item, idx) => (
              <details
                key={item.q}
                className="faq-item"
                style={{
                  padding: "24px 0",
                  borderBottom: `1px solid ${RULE}`,
                  borderTop: idx === 0 ? `1px solid ${RULE}` : "none",
                }}
              >
                <summary
                  style={{
                    cursor: "pointer",
                    listStyle: "none",
                    display: "grid",
                    gridTemplateColumns: "minmax(48px, 56px) 1fr auto",
                    gap: 20,
                    alignItems: "baseline",
                  }}
                >
                  <span
                    style={{
                      fontFamily: MONO,
                      fontSize: 11,
                      fontWeight: 500,
                      letterSpacing: "0.16em",
                      color: FOG,
                    }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span
                    style={{
                      fontFamily: SERIF,
                      fontWeight: 400,
                      fontSize: 19,
                      lineHeight: 1.3,
                      color: INK,
                      letterSpacing: "-0.005em",
                      fontVariationSettings: '"opsz" 14',
                    }}
                  >
                    {item.q}
                  </span>
                  <span
                    className="faq-toggle"
                    style={{
                      fontFamily: SANS,
                      fontSize: 18,
                      color: FOG,
                      transition: "transform 120ms ease",
                    }}
                    aria-hidden
                  >
                    +
                  </span>
                </summary>
                <p
                  style={{
                    fontFamily: SERIF,
                    fontSize: 16,
                    color: SLATE,
                    lineHeight: 1.6,
                    marginTop: 16,
                    marginLeft: 76,
                    marginBottom: 0,
                    maxWidth: 640,
                    fontVariationSettings: '"opsz" 14',
                  }}
                >
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </main>
      </div>

      <style jsx>{`
        .rail-page {
          display: grid;
          grid-template-columns: 380px 1fr;
          min-height: 100vh;
          background-color: ${PAPER};
        }
        .rail {
          position: sticky;
          top: 0;
          height: 100vh;
          background-color: ${BONE};
          border-right: 1px solid ${RULE};
          padding: 48px 40px;
          display: flex;
          flex-direction: column;
        }
        .rail-main {
          padding: 80px clamp(40px, 6vw, 96px);
          max-width: 1100px;
        }
        @media (max-width: 900px) {
          .rail-page {
            grid-template-columns: 1fr;
          }
          .rail {
            position: static;
            height: auto;
            border-right: none;
            border-bottom: 1px solid ${RULE};
            padding: 32px 28px 48px;
          }
          .rail-main {
            padding: 48px 28px 80px;
          }
        }
      `}</style>
    </>
  );
}

function RailTab({
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
        textAlign: "left",
        padding: "16px 0",
        fontFamily: MONO,
        fontSize: 12,
        fontWeight: 500,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: active ? INK : FOG,
        cursor: "pointer",
        transition: "color 150ms ease",
        borderBottom: "1px solid",
        borderBottomColor: active ? INK : RULE,
      }}
    >
      {active ? "→ " : "  "}
      {label}
    </button>
  );
}
