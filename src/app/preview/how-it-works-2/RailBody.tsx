"use client";

import Link from "next/link";
import { useState } from "react";
import { RennerMark } from "../how-it-works/_shared";
import { Mini, CLIENT_KINDS, RENNER_KINDS } from "../how-it-works/_illustrations";

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
    title: "Pick a Renner.",
    body: (
      <>
        Background-checked Renners in your area see your task and apply.
        Review their profile, ratings, and experience. Pick the right fit.
      </>
    ),
  },
  {
    number: "03",
    title: "Get it done.",
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
    title: "Get it done.",
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

const FAQS = [
  {
    q: "What is Renner?",
    a: "Renner is a marketplace built specifically for real-estate task work. Clients post short jobs — sign placement, document delivery, property prep, guest check-ins, showings — and background-checked Renners apply, get booked, and get paid through the platform.",
  },
  {
    q: "How much does it cost?",
    a: "Renner adds a 10% service fee for clients. Renners keep 90% of the task pay. Both numbers are shown to both parties before a booking is confirmed — no hidden charges.",
  },
  {
    q: "Who can become a Renner?",
    a: "Independent contractors who can pass a background check. Every Renner clears a Checkr background check before booking any task — licensed or not. Showings and other license-required tasks additionally require a verified real-estate license.",
  },
  {
    q: "Are Renners employees?",
    a: "No. Renner is a marketplace and Renners are independent contractors. They set their own schedule, choose which tasks to apply to, and aren't directed in how the work gets done.",
  },
  {
    q: "What types of tasks can I post?",
    a: "Anything real estate — sign installs, lockbox swaps, courier runs, property prep, photo-ready setup, guest check-ins, host assistance, property access for inspectors and contractors, showings, open houses, and more. If it's a short, location-based job tied to a listing or property, it fits.",
  },
  {
    q: "How do payments work?",
    a: "When you book a Renner, your card is charged and the funds are held in escrow by Stripe. After the Renner submits proof of completion, you have 48 hours to confirm or open a dispute. Confirmed funds release immediately to the Renner; if the 48 hours pass with no action, payment auto-releases.",
  },
  {
    q: "What if something is damaged or stolen during a task?",
    a: "Document the damage with photos and file a report within 48 hours. The Renner has 48 hours to accept, counter, or dispute the claim. We facilitate resolution using completion photos and the message thread as evidence; unresolved claims escalate to Renner support.",
  },
  {
    q: "What if I need to cancel a task?",
    a: "Clients can cancel before the Renner starts — full refund, task reopens. After the Renner starts, the task pay is split 50/50. Renners can cancel before starting with no penalty; after starting the same 50/50 split applies regardless of reason.",
  },
];

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
  const benefits = isClient ? CLIENT_BENEFITS : RENNER_BENEFITS;
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
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
                color: INK,
                margin: 0,
                marginBottom: 32,
                fontVariationSettings: '"opsz" 144',
              }}
            >
              How Renner works
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
                label="For Clients"
                active={isClient}
                onClick={() => setTab("client")}
              />
              <RailTab
                label="For Renners"
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
                  <Mini kind={(isClient ? CLIENT_KINDS : RENNER_KINDS)[idx]} />
                </div>
              </article>
            ))}
          </div>

          {/* Benefits — italic serif stack */}
          <div
            style={{
              padding: "clamp(64px, 8vw, 112px) 0",
            }}
          >
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              {benefits.map((b) => (
                <li
                  key={b}
                  style={{
                    fontFamily: SERIF,
                    fontStyle: "italic",
                    fontWeight: 300,
                    fontSize: "clamp(22px, 2.4vw, 30px)",
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
