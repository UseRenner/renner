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

const INK = "#0d0f12";
const SLATE = "#2a2f36";
const STEEL = "#647589";
const FOG = "#7d8da0";
const MIST = "#cad1d8";
const RULE = "#eaedf0";
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

export function SpreadBody({ showCta }: { showCta: boolean }) {
  const [tab, setTab] = useState<"client" | "renner">("client");
  const isClient = tab === "client";
  const steps = isClient ? CLIENT_STEPS : RENNER_STEPS;
  const benefits = isClient ? CLIENT_BENEFITS : RENNER_BENEFITS;
  const ctaButton = isClient
    ? { label: "Sign up", href: "/signup" }
    : { label: "Become a Renner", href: "/become-a-renner" };

  return (
    <>
      <div className="spread-grid">
        {/* ─── Left page ─── title, tab, CTA ─── */}
        <div className="spread-left">
          <div>
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
                marginBottom: 40,
              }}
            >
              <STab
                label="For Clients"
                active={isClient}
                onClick={() => setTab("client")}
              />
              <span aria-hidden style={{ color: MIST }}>
                /
              </span>
              <STab
                label="For Renners"
                active={!isClient}
                onClick={() => setTab("renner")}
              />
            </div>

            <h1
              style={{
                fontFamily: SERIF,
                fontWeight: 400,
                fontSize: "clamp(48px, 6.5vw, 96px)",
                lineHeight: 0.95,
                letterSpacing: "-0.035em",
                color: INK,
                margin: 0,
                marginBottom: 48,
                fontVariationSettings: '"opsz" 144',
              }}
            >
              How Renner <Italic>works</Italic>
            </h1>

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
                }}
              >
                {ctaButton.label}
                <span aria-hidden style={{ opacity: 0.7 }}>
                  →
                </span>
              </Link>
            )}
          </div>
        </div>

        {/* ─── Right page ─── steps, benefits ─── */}
        <div className="spread-right">
          {/* Steps */}
          <div>
            {steps.map((step, idx) => (
              <article
                key={step.number}
                style={{
                  paddingTop: idx === 0 ? 0 : 32,
                  paddingBottom: 32,
                  borderBottom:
                    idx === steps.length - 1 ? "none" : `1px solid ${RULE}`,
                  display: "grid",
                  gridTemplateColumns: "minmax(56px, 64px) 1fr",
                  gap: 24,
                }}
              >
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: "0.22em",
                    color: FOG,
                    paddingTop: 6,
                  }}
                >
                  {step.number}
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: SERIF,
                      fontWeight: 400,
                      fontSize: 24,
                      lineHeight: 1.15,
                      letterSpacing: "-0.015em",
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
                      fontSize: 16,
                      lineHeight: 1.6,
                      color: SLATE,
                      margin: 0,
                      maxWidth: 540,
                      fontVariationSettings: '"opsz" 14',
                    }}
                  >
                    {step.body}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* Benefits */}
          <div
            style={{
              marginTop: 64,
              paddingTop: 32,
              borderTop: `1px solid ${RULE}`,
            }}
          >
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: 16,
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
      </div>

      {/* ─── FAQ — full-width below the spread ─── */}
      <section
        className="spread-faq"
        style={{
          marginTop: "clamp(96px, 12vw, 144px)",
          paddingTop: "clamp(48px, 6vw, 80px)",
          borderTop: `1px solid ${MIST}`,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(280px, 1fr) 1.5fr",
            gap: "clamp(40px, 6vw, 96px)",
            alignItems: "baseline",
            marginBottom: 48,
          }}
          className="spread-faq-header"
        >
          <div>
            <div
              style={{
                fontFamily: MONO,
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: FOG,
                marginBottom: 16,
              }}
            >
              Common questions
            </div>
            <h2
              style={{
                fontFamily: SERIF,
                fontWeight: 400,
                fontSize: "clamp(28px, 3.5vw, 44px)",
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
                color: INK,
                margin: 0,
                fontVariationSettings: '"opsz" 72',
              }}
            >
              Everything else.
            </h2>
          </div>
          <div aria-hidden />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 280px) 1fr",
            gap: "clamp(40px, 6vw, 96px)",
            alignItems: "start",
          }}
          className="spread-faq-body"
        >
          <div aria-hidden />
          <div>
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
                      letterSpacing: "0.22em",
                      color: FOG,
                    }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span
                    style={{
                      fontFamily: SERIF,
                      fontWeight: 400,
                      fontSize: 18,
                      lineHeight: 1.35,
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
                      fontSize: 16,
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
                    marginTop: 14,
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
        </div>
      </section>

      <style jsx>{`
        .spread-grid {
          display: grid;
          grid-template-columns: 5fr 7fr;
          gap: clamp(48px, 6vw, 96px);
          align-items: start;
        }
        .spread-left {
          position: sticky;
          top: clamp(40px, 5vw, 80px);
          align-self: start;
        }
        @media (max-width: 900px) {
          .spread-grid {
            grid-template-columns: 1fr;
            gap: 64px;
          }
          .spread-left {
            position: static;
          }
          .spread-faq-body {
            grid-template-columns: 1fr !important;
          }
          .spread-faq-body > :first-child {
            display: none;
          }
        }
      `}</style>
    </>
  );
}

function STab({
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
