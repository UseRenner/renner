"use client";

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
    title: "Post a task.",
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
    title: "Get it done.",
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
    title: "Pick a task.",
    body: (
      <>
        See briefs posted by agents, brokers, and property managers
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
];

const RENNER_TRUST: string[] = [
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

export function SpreadBody({ showCta }: { showCta: boolean }) {
  const [tab, setTab] = useState<"client" | "renner">("client");
  const isClient = tab === "client";
  const dek = isClient ? CLIENT_DEK : RENNER_DEK;
  const details = isClient ? CLIENT_DETAILS : RENNER_DETAILS;
  const trust = isClient ? CLIENT_TRUST : RENNER_TRUST;
  const ctaButton = isClient
    ? { label: "Sign up", href: "/signup" }
    : { label: "Become a Renner", href: "/become-a-renner" };

  // Statement clauses — imperative voice, the closer carries the italic.
  const clauses: React.ReactNode[] = isClient
    ? [
        <>Post a <Em>task.</Em></>,
        <>Pick a <Em>vetted Renner.</Em></>,
        <>Get it <Em>done.</Em></>,
      ]
    : [
        <>Get <Em>verified.</Em></>,
        <>Pick a <Em>task.</Em></>,
        <>Get it <Em>done.</Em></>,
      ];

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

      {/* ─── Statement + dek ─── side-by-side at the top */}
      <div
        className="spread-lede"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 1fr)",
          gap: "clamp(40px, 6vw, 96px)",
          alignItems: "end",
          marginBottom: "clamp(72px, 9vw, 120px)",
        }}
      >
        <h1
          style={{
            fontFamily: SERIF,
            fontWeight: 400,
            fontSize: "clamp(40px, 6vw, 80px)",
            lineHeight: 1.05,
            letterSpacing: "-0.028em",
            color: INK,
            margin: 0,
            maxWidth: "26ch",
            fontVariationSettings: '"opsz" 144',
          }}
        >
          {clauses.map((c, i) => (
            <span key={i} style={{ display: "block" }}>
              {c}
            </span>
          ))}
        </h1>
        <p
          style={{
            fontFamily: SERIF,
            fontWeight: 400,
            fontSize: "clamp(16px, 1.4vw, 18px)",
            lineHeight: 1.6,
            color: SLATE,
            margin: 0,
            maxWidth: "44ch",
            fontVariationSettings: '"opsz" 14',
          }}
        >
          {dek}
        </p>
      </div>

      {/* ─── Spread ─── three columns of detail under the statement */}
      <div
        className="spread-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: "clamp(24px, 3vw, 48px)",
          paddingTop: 32,
          borderTop: `1px solid ${RULE}`,
          marginBottom: "clamp(72px, 9vw, 112px)",
        }}
      >
        {details.map((d) => (
          <article key={d.number} className="spread-col">
            <div
              style={{
                fontFamily: MONO,
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: FOG,
                marginBottom: 24,
              }}
            >
              {d.number}
            </div>
            <h3
              style={{
                fontFamily: SERIF,
                fontWeight: 400,
                fontSize: "clamp(22px, 2.2vw, 28px)",
                lineHeight: 1.15,
                letterSpacing: "-0.018em",
                color: INK,
                margin: 0,
                marginBottom: 14,
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
                marginBottom: 20,
                fontVariationSettings: '"opsz" 14',
              }}
            >
              {d.body}
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
              {d.proof}
            </div>
          </article>
        ))}
      </div>

      {/* ─── Trust ─── single horizontal mono strip */}
      <section
        style={{
          marginBottom: showCta ? "clamp(56px, 7vw, 88px)" : 0,
          paddingTop: 24,
          borderTop: `1px solid ${RULE}`,
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 24,
          fontFamily: MONO,
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: STEEL,
        }}
      >
        <span style={{ color: FOG }}>{isClient ? "Why Renner" : "What you get"}</span>
        <div style={{ display: "inline-flex", alignItems: "baseline", gap: 24, flexWrap: "wrap" }}>
          {trust.map((t, i) => (
            <span key={t} style={{ display: "inline-flex", alignItems: "baseline", gap: 24 }}>
              {i > 0 && <span aria-hidden style={{ color: MIST }}>·</span>}
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* ─── CTA ─── single-line heading + button */}
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
              fontFamily: SERIF,
              fontWeight: 400,
              fontSize: "clamp(28px, 3.5vw, 44px)",
              lineHeight: 1.1,
              letterSpacing: "-0.022em",
              color: INK,
              margin: 0,
              maxWidth: "20ch",
              fontVariationSettings: '"opsz" 144',
            }}
          >
            {isClient ? (
              <>
                Get something <Em>done.</Em>
              </>
            ) : (
              <>
                Start <Em>running.</Em>
              </>
            )}
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
        @media (max-width: 880px) {
          .spread-lede {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
            align-items: start !important;
          }
        }
        @media (max-width: 720px) {
          .spread-grid {
            grid-template-columns: 1fr !important;
            gap: 56px !important;
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
