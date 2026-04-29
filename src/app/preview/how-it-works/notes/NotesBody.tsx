"use client";

import Link from "next/link";
import { useState } from "react";

type Note = {
  number: string;
  title: React.ReactNode;
  caption: React.ReactNode;
  proof: string;
};

const CLIENT_DEK =
  "A marketplace for real-estate task work, handled by background-checked Renners and paid through escrow.";

const RENNER_DEK =
  "A marketplace where you run short real-estate tasks for agents, brokers, and property managers — on your schedule.";

const CLIENT_NOTES: Note[] = [
  {
    number: "01",
    title: "Post a task.",
    caption: <>Address, window, price. Live in two minutes.</>,
    proof: "Under 2 min",
  },
  {
    number: "02",
    title: "Pick a vetted Renner.",
    caption: <>Read the bio, the ratings, the tenure. Book.</>,
    proof: "Checkr-verified",
  },
  {
    number: "03",
    title: "Get it done.",
    caption: <>Photos arrive. You confirm. Stripe releases the funds.</>,
    proof: "Escrow until confirmed",
  },
];

const RENNER_NOTES: Note[] = [
  {
    number: "01",
    title: "Get verified.",
    caption: <>Identity, background check, categories, area, rate.</>,
    proof: "Same-day in most states",
  },
  {
    number: "02",
    title: "Pick a task.",
    caption: <>Briefs nearby. Apply to what fits, decline what doesn&rsquo;t.</>,
    proof: "Local only",
  },
  {
    number: "03",
    title: "Get it done.",
    caption: <>Run it, upload photos, get paid through Stripe.</>,
    proof: "90% payout",
  },
];

const CLIENT_TRUST = "Vetted by Checkr · Stripe escrow · Photo confirmation";
const RENNER_TRUST = "Local tasks only · 90% payout · Repeat clients";

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

export function NotesBody({ showCta }: { showCta: boolean }) {
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
    <>
      {/* ─── Audience switch ─── inline mono */}
      <div
        role="tablist"
        aria-label="Audience"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginBottom: 48,
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

      {/* ─── Statement + dek + notes ─── two columns, the answer first */}
      <div
        className="notes-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.05fr)",
          gap: "clamp(40px, 6vw, 96px)",
          alignItems: "start",
          marginBottom: showCta ? "clamp(72px, 9vw, 112px)" : "clamp(56px, 7vw, 88px)",
        }}
      >
        {/* Left — statement + dek */}
        <div>
          <h1
            style={{
              fontFamily: SERIF,
              fontWeight: 400,
              fontSize: "clamp(40px, 5.5vw, 72px)",
              lineHeight: 1.05,
              letterSpacing: "-0.028em",
              color: INK,
              margin: 0,
              marginBottom: 32,
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
              lineHeight: 1.55,
              color: SLATE,
              margin: 0,
              maxWidth: "44ch",
              fontVariationSettings: '"opsz" 14',
            }}
          >
            {dek}
          </p>
        </div>

        {/* Right — three tight notes */}
        <ol
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {notes.map((note, idx) => (
            <li
              key={note.number}
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(40px, 48px) minmax(0, 1fr) auto",
                columnGap: 20,
                rowGap: 6,
                padding: "18px 0",
                borderTop: idx === 0 ? `1px solid ${RULE}` : "none",
                borderBottom: `1px solid ${RULE}`,
                alignItems: "baseline",
              }}
              className="notes-row"
            >
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.2em",
                  color: FOG,
                }}
              >
                {note.number}
              </span>
              <h3
                style={{
                  fontFamily: SERIF,
                  fontWeight: 400,
                  fontSize: "clamp(20px, 1.9vw, 24px)",
                  lineHeight: 1.2,
                  letterSpacing: "-0.014em",
                  color: INK,
                  margin: 0,
                  fontVariationSettings: '"opsz" 36',
                }}
              >
                {note.title}
              </h3>
              <span
                className="notes-proof"
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
                {note.proof}
              </span>
              <span aria-hidden />
              <p
                style={{
                  fontFamily: SERIF,
                  fontSize: 15,
                  lineHeight: 1.55,
                  color: SLATE,
                  margin: 0,
                  gridColumn: "2 / -1",
                  fontVariationSettings: '"opsz" 14',
                }}
              >
                {note.caption}
              </p>
            </li>
          ))}
        </ol>
      </div>

      {/* ─── Trust + CTA ─── inline footer-style row */}
      {showCta ? (
        <section
          style={{
            paddingTop: 24,
            borderTop: `1px solid ${RULE}`,
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) auto",
            gap: 32,
            alignItems: "center",
          }}
          className="notes-cta"
        >
          <div
            style={{
              fontFamily: MONO,
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: STEEL,
            }}
          >
            <span style={{ color: FOG, marginRight: 16 }}>
              {isClient ? "Why Renner" : "What you get"}
            </span>
            {trust}
          </div>
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
              padding: "12px 22px",
              textDecoration: "none",
              whiteSpace: "nowrap",
              transition:
                "background-color 150ms ease, border-color 150ms ease",
            }}
          >
            {isClient ? "Get something done" : "Start running"}
            <span aria-hidden style={{ opacity: 0.7 }}>→</span>
          </Link>
        </section>
      ) : (
        <div
          style={{
            paddingTop: 24,
            borderTop: `1px solid ${RULE}`,
            fontFamily: MONO,
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: STEEL,
          }}
        >
          <span style={{ color: FOG, marginRight: 16 }}>
            {isClient ? "Why Renner" : "What you get"}
          </span>
          {trust}
        </div>
      )}

      <style jsx>{`
        @media (max-width: 880px) {
          .notes-grid {
            grid-template-columns: 1fr !important;
            gap: 56px !important;
          }
        }
        @media (max-width: 640px) {
          .notes-row {
            grid-template-columns: minmax(40px, 48px) minmax(0, 1fr) !important;
          }
          .notes-proof {
            grid-column: 2 / -1 !important;
            text-align: left !important;
            white-space: normal !important;
          }
          .notes-cta {
            grid-template-columns: 1fr !important;
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
