"use client";

import Link from "next/link";
import { useState } from "react";

type Note = {
  label: string;
  body: React.ReactNode;
};

const CLIENT_DEK =
  "A marketplace for real-estate task work, handled by background-checked Renners and paid through escrow.";

const RENNER_DEK =
  "A marketplace where you run short real-estate tasks for agents, brokers, and property managers — on your schedule.";

const CLIENT_NOTES: Note[] = [
  {
    label: "On posting",
    body: (
      <>
        Describe the work — sign install, lockbox swap, property visuals,
        guest check-in. Set the location, the window, the price. Posts
        go live in under two minutes.
      </>
    ),
  },
  {
    label: "On selection",
    body: (
      <>
        Background-checked Renners in your area apply with their bio,
        ratings, and tenure. Read what they&rsquo;ve done. Book the right
        hand for the work.
      </>
    ),
  },
  {
    label: "On completion",
    body: (
      <>
        Your Renner finishes the task and submits photos with a written
        confirmation. You confirm; Stripe releases the funds from
        escrow. The rating posts and the next one is up.
      </>
    ),
  },
];

const RENNER_NOTES: Note[] = [
  {
    label: "On verification",
    body: (
      <>
        Sign up, confirm your identity, clear a Checkr background check.
        Pick your categories, set your service area, name your rate.
        Verification typically clears the same day.
      </>
    ),
  },
  {
    label: "On selection",
    body: (
      <>
        Tasks come from agents, brokers, and property managers nearby.
        Apply to what fits your schedule and skills. Decline anything
        that doesn&rsquo;t.
      </>
    ),
  },
  {
    label: "On completion",
    body: (
      <>
        Run the task, upload completion photos, get paid through the
        platform. Build a reputation that earns repeat clients in an
        industry that remembers.
      </>
    ),
  },
];

const CLIENT_TRUST: string[] = [
  "Vetted by Checkr",
  "Stripe escrow",
  "Photo confirmation",
];

const RENNER_TRUST: string[] = [
  "Local tasks only",
  "Repeat clients",
  "A real reputation",
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

export function VerseBody({ showCta }: { showCta: boolean }) {
  const [tab, setTab] = useState<"client" | "renner">("client");
  const isClient = tab === "client";
  const dek = isClient ? CLIENT_DEK : RENNER_DEK;
  const notes = isClient ? CLIENT_NOTES : RENNER_NOTES;
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
    <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
      {/* ─── Audience switch ─── centered mono */}
      <div
        role="tablist"
        aria-label="Audience"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 14,
          marginBottom: 64,
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

      {/* ─── Statement ─── centered, oversized, three rows */}
      <h1
        style={{
          fontFamily: SERIF,
          fontWeight: 400,
          fontSize: "clamp(44px, 7vw, 92px)",
          lineHeight: 1.02,
          letterSpacing: "-0.03em",
          color: INK,
          margin: "0 auto",
          marginBottom: 40,
          maxWidth: "20ch",
          fontVariationSettings: '"opsz" 144',
        }}
      >
        {clauses.map((c, i) => (
          <span key={i}>{i > 0 ? " " : ""}{c}</span>
        ))}
      </h1>

      {/* ─── Dek ─── centered one-sentence platform description */}
      <p
        style={{
          fontFamily: SERIF,
          fontWeight: 400,
          fontSize: "clamp(17px, 1.6vw, 20px)",
          lineHeight: 1.55,
          color: SLATE,
          margin: "0 auto",
          marginBottom: "clamp(72px, 9vw, 112px)",
          maxWidth: "44ch",
          fontVariationSettings: '"opsz" 14',
        }}
      >
        {dek}
      </p>

      {/* ─── Asterism rule ─── three small dots, centered */}
      <div
        aria-hidden
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          marginBottom: "clamp(56px, 7vw, 88px)",
          color: MIST,
          fontFamily: SERIF,
          fontSize: 14,
        }}
      >
        <span>•</span>
        <span>•</span>
        <span>•</span>
      </div>

      {/* ─── Notes ─── centered reading flow, one paragraph per clause */}
      <div
        style={{
          textAlign: "left",
          margin: "0 auto",
          maxWidth: 600,
          marginBottom: "clamp(72px, 9vw, 112px)",
        }}
      >
        {notes.map((note, idx) => (
          <article
            key={note.label}
            style={{
              padding: idx === 0 ? "0 0 36px" : "36px 0",
              borderTop: idx === 0 ? "none" : `1px solid ${RULE}`,
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
                marginBottom: 12,
              }}
            >
              {note.label}
            </div>
            <p
              style={{
                fontFamily: SERIF,
                fontSize: "clamp(17px, 1.5vw, 19px)",
                lineHeight: 1.65,
                color: INK,
                margin: 0,
                fontVariationSettings: '"opsz" 14',
              }}
            >
              {note.body}
            </p>
          </article>
        ))}
      </div>

      {/* ─── Trust ─── centered italic line */}
      <div
        style={{
          marginBottom: showCta ? "clamp(72px, 9vw, 112px)" : 0,
          paddingTop: 40,
          borderTop: `1px solid ${RULE}`,
          fontFamily: SERIF,
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "clamp(18px, 1.8vw, 22px)",
          lineHeight: 1.5,
          color: STEEL,
          fontVariationSettings: '"opsz" 36',
        }}
      >
        {trust.map((t, i) => (
          <span key={t}>
            {i > 0 && (
              <span
                aria-hidden
                style={{ color: MIST, margin: "0 14px", fontStyle: "normal" }}
              >
                ·
              </span>
            )}
            {t}
          </span>
        ))}
      </div>

      {/* ─── CTA ─── centered closer */}
      {showCta && (
        <div>
          <h2
            style={{
              fontFamily: SERIF,
              fontWeight: 400,
              fontSize: "clamp(32px, 4vw, 52px)",
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: INK,
              margin: "0 auto",
              marginBottom: 32,
              maxWidth: "16ch",
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
