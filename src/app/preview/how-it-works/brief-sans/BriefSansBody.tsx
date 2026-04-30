"use client";

// Brief Sans — clone of Brief with the H1 statement set in Source Sans
// instead of Source Serif. Everything else (dek, detail rows, trust,
// FAQ, footer chrome) stays in serif so the test isolates the
// statement's typographic register. The wordmark above the page is
// still italic Source Serif, so the page reads: italic-serif brand,
// sans headline, serif body.

import Link from "next/link";
import { useState } from "react";

type Detail = {
  number: string;
  title: React.ReactNode;
  body: React.ReactNode;
  proof: string;
};

const CLIENT_DEK =
  "A marketplace for real-estate task work — sign installs, lockbox swaps, showings, courier runs, property prep — handled by background-checked Renners and paid through escrow.";

const RENNER_DEK =
  "Independent contractors running short real-estate tasks for agents, brokers, and property managers — on your schedule, in your area, paid through escrow.";

const CLIENT_DETAILS: Detail[] = [
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
    title: "Pick a Renner.",
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

const RENNER_DETAILS: Detail[] = [
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
    proof: "Reputation · built task by task",
  },
];

const CLIENT_TRUST: Array<[string, string]> = [
  ["Vetted", "Every Renner clears a Checkr background check before booking."],
  ["Escrowed", "Funds held by Stripe until you confirm or 48 hours pass."],
  ["Documented", "Completion photos and a written confirmation on every task."],
];

const RENNER_TRUST: Array<[string, string]> = [
  ["Independent", "Set your own schedule. Pick the work. Decline anything that doesn't fit."],
  ["Local", "Tasks come from agents, brokers, and managers in your area."],
  ["Paid", "Through Stripe escrow on confirmation. No surprise fees."],
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

export function BriefSansBody({ showCta }: { showCta: boolean }) {
  const [tab, setTab] = useState<"client" | "renner">("client");
  const isClient = tab === "client";
  const dek = isClient ? CLIENT_DEK : RENNER_DEK;
  const details = isClient ? CLIENT_DETAILS : RENNER_DETAILS;
  const trust = isClient ? CLIENT_TRUST : RENNER_TRUST;
  const ctaButton = isClient
    ? { label: "Sign up", href: "/signup" }
    : { label: "Become a Renner", href: "/become-a-renner" };

  const clauses: string[] = isClient
    ? ["Post a task.", "Pick a Renner.", "Get it done."]
    : ["Get verified.", "Pick a task.", "Get it done."];

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

      {/* ─── Statement ─── sans, single register, the whole sentence */}
      <h1
        style={{
          fontFamily: SANS,
          fontWeight: 400,
          fontSize: "clamp(40px, 6vw, 80px)",
          lineHeight: 1.05,
          letterSpacing: "-0.025em",
          color: INK,
          margin: 0,
          marginBottom: "clamp(40px, 5vw, 64px)",
          maxWidth: "26ch",
        }}
      >
        {clauses.map((clause, i) => (
          <span key={i}>{i > 0 ? " " : ""}{clause}</span>
        ))}
      </h1>

      {/* ─── Dek ─── one sentence framing the platform */}
      <p
        style={{
          fontFamily: SERIF,
          fontWeight: 400,
          fontSize: "clamp(17px, 1.5vw, 19px)",
          lineHeight: 1.55,
          color: SLATE,
          margin: 0,
          marginBottom: "clamp(72px, 9vw, 112px)",
          maxWidth: "56ch",
          fontVariationSettings: '"opsz" 14',
        }}
      >
        {dek}
      </p>

      {/* ─── Detail rows ─── one row per clause, vertical, expansive */}
      <div style={{ marginBottom: "clamp(72px, 9vw, 112px)" }}>
        {details.map((d, idx) => (
          <article
            key={d.number}
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(80px, 96px) minmax(0, 1fr) minmax(0, auto)",
              gap: "clamp(20px, 3vw, 48px)",
              padding: "32px 0",
              borderTop: `1px solid ${RULE}`,
              borderBottom:
                idx === details.length - 1 ? `1px solid ${RULE}` : "none",
              alignItems: "baseline",
            }}
            className="brief-row"
          >
            <div
              style={{
                fontFamily: MONO,
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: FOG,
              }}
            >
              {d.number}
            </div>
            <div>
              <h3
                style={{
                  fontFamily: SERIF,
                  fontWeight: 400,
                  fontSize: "clamp(22px, 2.2vw, 28px)",
                  lineHeight: 1.2,
                  letterSpacing: "-0.018em",
                  color: INK,
                  margin: 0,
                  marginBottom: 12,
                  fontVariationSettings: '"opsz" 36',
                }}
              >
                {d.title}
              </h3>
              <p
                style={{
                  fontFamily: SERIF,
                  fontSize: 16,
                  lineHeight: 1.6,
                  color: SLATE,
                  margin: 0,
                  maxWidth: "62ch",
                  fontVariationSettings: '"opsz" 14',
                }}
              >
                {d.body}
              </p>
            </div>
            <div
              className="brief-proof"
              style={{
                fontFamily: MONO,
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: STEEL,
                whiteSpace: "nowrap",
                textAlign: "right",
              }}
            >
              {d.proof}
            </div>
          </article>
        ))}
      </div>

      {/* ─── Trust strip ─── three columns */}
      <section
        style={{
          marginBottom: showCta ? "clamp(72px, 9vw, 112px)" : 0,
        }}
      >
        <div
          style={{
            fontFamily: MONO,
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: FOG,
            marginBottom: 32,
          }}
        >
          {isClient ? "Why Renner" : "What you get"}
        </div>
        <dl
          className="brief-trust"
          style={{
            margin: 0,
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "clamp(24px, 3vw, 56px)",
            paddingTop: 24,
            borderTop: `1px solid ${RULE}`,
          }}
        >
          {trust.map(([label, body]) => (
            <div key={label}>
              <dt
                style={{
                  fontFamily: SERIF,
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: 22,
                  color: STEEL,
                  letterSpacing: "-0.005em",
                  marginBottom: 12,
                  fontVariationSettings: '"opsz" 36',
                }}
              >
                {label}.
              </dt>
              <dd
                style={{
                  fontFamily: SERIF,
                  fontSize: 16,
                  lineHeight: 1.55,
                  color: INK,
                  margin: 0,
                  fontVariationSettings: '"opsz" 14',
                }}
              >
                {body}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ─── CTA ─── single-line line + button */}
      {showCta && (
        <section
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 32,
            flexWrap: "wrap",
            paddingTop: "clamp(48px, 6vw, 80px)",
            borderTop: `1px solid ${RULE}`,
          }}
        >
          <h2
            style={{
              fontFamily: SANS,
              fontWeight: 400,
              fontSize: "clamp(28px, 3.5vw, 44px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: INK,
              margin: 0,
              maxWidth: "20ch",
            }}
          >
            {isClient ? "Get something done." : "Start running."}
          </h2>
          <Link
            href={ctaButton.href}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              fontFamily: SANS,
              fontSize: 15,
              fontWeight: 500,
              letterSpacing: "0.01em",
              color: PAPER,
              backgroundColor: INK,
              border: `1px solid ${INK}`,
              borderRadius: 4,
              padding: "16px 28px",
              textDecoration: "none",
              whiteSpace: "nowrap",
              transition: "background-color 150ms ease, border-color 150ms ease",
            }}
          >
            {ctaButton.label}
            <span aria-hidden style={{ opacity: 0.7 }}>→</span>
          </Link>
        </section>
      )}

      <style jsx>{`
        @media (max-width: 720px) {
          .brief-row {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          .brief-proof {
            text-align: left !important;
          }
          .brief-trust {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
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
