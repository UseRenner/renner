"use client";

import Link from "next/link";
import { useState } from "react";

type Note = { numeral: string; title: string; body: React.ReactNode };

const CLIENT_DEK =
  "A marketplace for real-estate task work, handled by background-checked Renners and paid through escrow.";

const RENNER_DEK =
  "Independent contractors running short real-estate tasks for agents, brokers, and managers — on your schedule, in your area.";

const CLIENT_NOTES: Note[] = [
  {
    numeral: "I",
    title: "Post a task.",
    body: (
      <>
        Describe what you need — sign install, lockbox swap, property
        visuals, guest check-in. Set the location, the window, and the
        price.
      </>
    ),
  },
  {
    numeral: "II",
    title: "Pick a vetted Renner.",
    body: (
      <>
        Background-checked Renners in your area apply. Read their bio,
        ratings, and tenure. Book the right hand for the work.
      </>
    ),
  },
  {
    numeral: "III",
    title: "Get it done.",
    body: (
      <>
        Your Renner finishes the task and submits completion photos.
        You confirm. Funds release through Stripe.
      </>
    ),
  },
];

const RENNER_NOTES: Note[] = [
  {
    numeral: "I",
    title: "Get verified.",
    body: (
      <>
        Sign up, verify your identity, clear a Checkr background check.
        Pick your categories, set your service area, name your rate.
      </>
    ),
  },
  {
    numeral: "II",
    title: "Pick a task.",
    body: (
      <>
        See briefs posted by agents, brokers, and managers nearby.
        Apply to the ones that fit your schedule and skills.
      </>
    ),
  },
  {
    numeral: "III",
    title: "Get it done.",
    body: (
      <>
        Run the task, upload completion photos, get paid through the
        platform. Build a reputation that earns repeat clients.
      </>
    ),
  },
];

const CLIENT_TRUST: string[] = [
  "Vetted by Checkr",
  "Held in Stripe escrow",
  "Closed by photo confirmation",
];

const RENNER_TRUST: string[] = [
  "Local tasks only",
  "Ninety percent payout",
  "Repeat clients earn back",
];

const SERIF = "var(--font-source-serif), ui-serif, Georgia, serif";
const SANS =
  "var(--font-source-sans), ui-sans-serif, system-ui, sans-serif";
const MONO =
  "var(--font-source-code), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

// Steel hierarchy — deeper hairlines, body in steel-700 instead of
// slate so the page reads cooler and more material than Brief.
const INK = "#0d0f12";
const STEEL_800 = "#38414d";
const STEEL_700 = "#4d5b6a";
const STEEL_600 = "#647589";
const STEEL_500 = "#7d8da0";
const STEEL_300 = "#cad1d8";
const PAPER = "#fbfbfc";

function Em({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontStyle: "italic",
        fontWeight: 300,
        color: STEEL_600,
      }}
    >
      {children}
    </span>
  );
}

export function SuiteBody({ showCta }: { showCta: boolean }) {
  const [tab, setTab] = useState<"client" | "renner">("client");
  const isClient = tab === "client";
  const dek = isClient ? CLIENT_DEK : RENNER_DEK;
  const notes = isClient ? CLIENT_NOTES : RENNER_NOTES;
  const trust = isClient ? CLIENT_TRUST : RENNER_TRUST;
  const ctaButton = isClient
    ? { label: "Sign up", href: "/signup" }
    : { label: "Become a Renner", href: "/become-a-renner" };

  const clauses: React.ReactNode[] = isClient
    ? [
        <>Post a <Em>task.</Em></>,
        <>Pick a vetted <Em>Renner.</Em></>,
        <>Get it <Em>done.</Em></>,
      ]
    : [
        <>Get <Em>verified.</Em></>,
        <>Pick a <Em>task.</Em></>,
        <>Get it <Em>done.</Em></>,
      ];

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
      {/* ─── Audience switch ─── italic, centered, restrained */}
      <div
        role="tablist"
        aria-label="Audience"
        style={{
          display: "inline-flex",
          alignItems: "baseline",
          gap: 14,
          marginBottom: 72,
          fontFamily: SERIF,
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: 16,
          letterSpacing: 0,
        }}
      >
        <TabButton label="For clients" active={isClient} onClick={() => setTab("client")} />
        <span aria-hidden style={{ color: STEEL_300, fontStyle: "normal" }}>·</span>
        <TabButton label="For renners" active={!isClient} onClick={() => setTab("renner")} />
      </div>

      {/* ─── Statement ─── smaller, centered, three lines */}
      <h1
        style={{
          fontFamily: SERIF,
          fontWeight: 400,
          fontSize: "clamp(32px, 4.5vw, 56px)",
          lineHeight: 1.1,
          letterSpacing: "-0.022em",
          color: INK,
          margin: "0 auto",
          marginBottom: 32,
          maxWidth: "20ch",
          fontVariationSettings: '"opsz" 60',
        }}
      >
        {clauses.map((c, i) => (
          <span key={i} style={{ display: "block" }}>
            {c}
          </span>
        ))}
      </h1>

      {/* ─── Dek ─── upright, regular, calm */}
      <p
        style={{
          fontFamily: SERIF,
          fontWeight: 400,
          fontSize: "clamp(16px, 1.4vw, 18px)",
          lineHeight: 1.6,
          color: STEEL_700,
          margin: "0 auto",
          marginBottom: "clamp(72px, 9vw, 112px)",
          maxWidth: "44ch",
          fontVariationSettings: '"opsz" 14',
        }}
      >
        {dek}
      </p>

      {/* ─── Notes ─── numbered paragraphs, left-aligned in centered column */}
      <div
        style={{
          textAlign: "left",
          margin: "0 auto",
          maxWidth: 540,
          marginBottom: "clamp(56px, 7vw, 80px)",
        }}
      >
        {notes.map((note, idx) => (
          <article
            key={note.numeral}
            style={{
              padding: idx === 0 ? "0 0 32px" : "32px 0",
              borderTop: idx === 0 ? "none" : `1px solid ${STEEL_300}`,
              display: "grid",
              gridTemplateColumns: "minmax(56px, 64px) 1fr",
              gap: 24,
              alignItems: "baseline",
            }}
          >
            <div
              style={{
                fontFamily: MONO,
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.22em",
                color: STEEL_500,
              }}
            >
              {note.numeral}.
            </div>
            <div>
              <h3
                style={{
                  fontFamily: SERIF,
                  fontWeight: 400,
                  fontSize: "clamp(19px, 1.7vw, 22px)",
                  lineHeight: 1.25,
                  letterSpacing: "-0.012em",
                  color: INK,
                  margin: 0,
                  marginBottom: 10,
                  fontVariationSettings: '"opsz" 36',
                }}
              >
                {note.title}
              </h3>
              <p
                style={{
                  fontFamily: SERIF,
                  fontSize: 16,
                  lineHeight: 1.65,
                  color: STEEL_700,
                  margin: 0,
                  fontVariationSettings: '"opsz" 14',
                }}
              >
                {note.body}
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* ─── Trust ─── italic-300 stack, centered, larger than the dek */}
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          marginBottom: showCta ? "clamp(56px, 7vw, 80px)" : 0,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {trust.map((t) => (
          <li
            key={t}
            style={{
              fontFamily: SERIF,
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(18px, 1.7vw, 22px)",
              lineHeight: 1.4,
              color: STEEL_700,
              letterSpacing: "-0.005em",
              fontVariationSettings: '"opsz" 36',
            }}
          >
            {t}
          </li>
        ))}
      </ul>

      {/* ─── CTA ─── small centered closer */}
      {showCta && (
        <div style={{ marginTop: "clamp(72px, 9vw, 112px)" }}>
          <h2
            style={{
              fontFamily: SERIF,
              fontWeight: 400,
              fontSize: "clamp(26px, 3.2vw, 36px)",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              color: INK,
              margin: "0 auto",
              marginBottom: 28,
              maxWidth: "16ch",
              fontVariationSettings: '"opsz" 60',
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
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: PAPER,
              backgroundColor: INK,
              border: `1px solid ${INK}`,
              borderRadius: 0,
              padding: "14px 28px",
              textDecoration: "none",
              whiteSpace: "nowrap",
              transition:
                "background-color 150ms ease, border-color 150ms ease",
            }}
          >
            {ctaButton.label}
          </Link>
        </div>
      )}
    </div>
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
        fontStyle: "inherit",
        fontSize: "inherit",
        fontWeight: "inherit",
        letterSpacing: "inherit",
        textTransform: "inherit",
        color: active ? INK : STEEL_500,
        cursor: "pointer",
        transition: "color 150ms ease",
      }}
    >
      {label}
    </button>
  );
}
