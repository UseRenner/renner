"use client";

// Font-agnostic Brief body. Mirrors the structure and copy of the
// canonical /brief variant exactly — the only difference is that
// every typeface comes from the FontStack passed in by the parent
// page. Used by the 8 font test variants.

import Link from "next/link";
import { useState } from "react";

export type FontStack = {
  // Used for the H1 statement (and CTA heading). For most families
  // this matches `body`.
  display: string;
  // Used for the dek, detail body, FAQ, footer, audience tabs, button
  // labels, mono-style labels, and proof lines — i.e. everything that
  // isn't the H1.
  body: string;
  // Italic weight for the closer emphasis ("done.", "vetted Renner.").
  // 300 where the family ships a light italic, 400 elsewhere.
  italicWeight: number;
  // Optional weight overrides. Defaults: 400 / 400 / 500. Variants
  // pass lighter values where the family has the range.
  displayWeight?: number; // H1, detail row titles, CTA heading
  bodyWeight?: number;    // dek, detail body, FAQ answer, button text
  labelWeight?: number;   // small uppercase labels, FAQ question, footer
  // Optional H1 size override. Default is clamp(40px, 6vw, 80px).
  // Heavy faces (DM Serif at 400 is the only weight available) read
  // visually lighter when the H1 is shrunk.
  displaySize?: string;
};

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
    proof: "Reputation · built task by task",
  },
];

const CLIENT_TRUST: Array<{ label: string; body: string }> = [
  {
    label: "Vetted",
    body: "Every Renner clears a Checkr background check before booking.",
  },
  {
    label: "Escrowed",
    body: "Funds held by Stripe until you confirm or 48 hours pass.",
  },
  {
    label: "Documented",
    body: "Completion photos and a written confirmation on every task.",
  },
];

const RENNER_TRUST: Array<{ label: string; body: string }> = [
  {
    label: "Independent",
    body: "Set your own schedule. Pick the work. Decline anything that doesn't fit.",
  },
  {
    label: "Local",
    body: "Tasks come from agents, brokers, and managers in your area.",
  },
  {
    label: "Paid",
    body: "Through Stripe escrow on confirmation. No surprise fees.",
  },
];

const INK = "#0d0f12";
const SLATE = "#2a2f36";
const STEEL = "#647589";
const FOG = "#7d8da0";
const MIST = "#cad1d8";
const RULE = "#eaedf0";
const PAPER = "#fbfbfc";

export function FontBriefBody({
  showCta,
  font,
}: {
  showCta: boolean;
  font: FontStack;
}) {
  const [tab, setTab] = useState<"client" | "renner">("client");
  const isClient = tab === "client";
  const dek = isClient ? CLIENT_DEK : RENNER_DEK;
  const details = isClient ? CLIENT_DETAILS : RENNER_DETAILS;
  const trust = isClient ? CLIENT_TRUST : RENNER_TRUST;
  const ctaButton = isClient
    ? { label: "Sign up", href: "/signup" }
    : { label: "Become a Renner", href: "/become-a-renner" };

  const displayWeight = font.displayWeight ?? 400;
  const bodyWeight = font.bodyWeight ?? 400;
  const labelWeight = font.labelWeight ?? 500;
  const displaySize = font.displaySize ?? "clamp(40px, 6vw, 80px)";

  // Closer-italic emphasis. Always uses font.body so families that
  // pair a display cut without italic (e.g. Castoro Titling) still
  // get a real italic from their text cut on the closer word.
  const emStyle = {
    fontFamily: font.body,
    fontStyle: "italic" as const,
    fontWeight: font.italicWeight,
    color: STEEL,
  };
  const Em = ({ children }: { children: React.ReactNode }) => (
    <span style={emStyle}>{children}</span>
  );

  // Statement clauses — imperative voice, italic on the closer.
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
      {/* ─── Audience switch ─── small uppercase labels, family's own letters */}
      <div
        role="tablist"
        aria-label="Audience"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginBottom: 56,
          fontFamily: font.body,
          fontSize: 11,
          fontWeight: labelWeight,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
        }}
      >
        <TabButton label="For Clients" active={isClient} onClick={() => setTab("client")} />
        <span aria-hidden style={{ color: MIST }}>/</span>
        <TabButton label="For Renners" active={!isClient} onClick={() => setTab("renner")} />
      </div>

      {/* ─── Statement ─── three clauses, each on its own line */}
      <h1
        style={{
          fontFamily: font.display,
          fontWeight: displayWeight,
          fontSize: displaySize,
          lineHeight: 1.05,
          letterSpacing: "-0.028em",
          color: INK,
          margin: 0,
          marginBottom: "clamp(32px, 4vw, 48px)",
          maxWidth: "26ch",
        }}
      >
        {clauses.map((c, i) => (
          <span key={i} style={{ display: "block" }}>
            {c}
          </span>
        ))}
      </h1>

      {/* ─── Dek ─── one-sentence platform description */}
      <p
        style={{
          fontFamily: font.body,
          fontWeight: bodyWeight,
          fontSize: "clamp(17px, 1.5vw, 19px)",
          lineHeight: 1.55,
          color: SLATE,
          margin: 0,
          marginBottom: "clamp(72px, 9vw, 112px)",
          maxWidth: "56ch",
        }}
      >
        {dek}
      </p>

      {/* ─── Detail rows ─── one per clause, vertical, expansive */}
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
                fontFamily: font.body,
                fontSize: 11,
                fontWeight: labelWeight,
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
                  fontFamily: font.display,
                  fontWeight: displayWeight,
                  fontSize: "clamp(22px, 2.2vw, 28px)",
                  lineHeight: 1.2,
                  letterSpacing: "-0.018em",
                  color: INK,
                  margin: 0,
                  marginBottom: 12,
                }}
              >
                {d.title}
              </h3>
              <p
                style={{
                  fontFamily: font.body,
                  fontWeight: bodyWeight,
                  fontSize: 16,
                  lineHeight: 1.6,
                  color: SLATE,
                  margin: 0,
                  maxWidth: "62ch",
                }}
              >
                {d.body}
              </p>
            </div>
            <div
              className="brief-proof"
              style={{
                fontFamily: font.body,
                fontSize: 10,
                fontWeight: labelWeight,
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

      {/* ─── Trust ─── label-led pairs, sharp not poetic */}
      <section
        style={{
          marginBottom: showCta ? "clamp(72px, 9vw, 112px)" : 0,
        }}
      >
        <div
          style={{
            fontFamily: font.body,
            fontSize: 10,
            fontWeight: labelWeight,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: FOG,
            marginBottom: 32,
          }}
        >
          {isClient ? "Why Renner" : "What you get"}
        </div>
        <dl
          style={{
            margin: 0,
            display: "grid",
            gap: 0,
          }}
        >
          {trust.map((b, idx) => (
            <div
              key={b.label}
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(160px, 200px) 1fr",
                gap: 32,
                padding: "24px 0",
                borderTop: `1px solid ${RULE}`,
                borderBottom:
                  idx === trust.length - 1 ? `1px solid ${RULE}` : "none",
                alignItems: "baseline",
              }}
            >
              <dt
                style={{
                  fontFamily: font.body,
                  fontStyle: "italic",
                  fontWeight: font.italicWeight,
                  fontSize: 22,
                  color: STEEL,
                  letterSpacing: "-0.005em",
                }}
              >
                {b.label}.
              </dt>
              <dd
                style={{
                  fontFamily: font.body,
                  fontSize: 17,
                  lineHeight: 1.55,
                  color: INK,
                  margin: 0,
                  maxWidth: "60ch",
                }}
              >
                {b.body}
              </dd>
            </div>
          ))}
        </dl>
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
              fontFamily: font.display,
              fontWeight: displayWeight,
              fontSize: "clamp(28px, 3.5vw, 44px)",
              lineHeight: 1.1,
              letterSpacing: "-0.022em",
              color: INK,
              margin: 0,
              maxWidth: "20ch",
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
              fontFamily: font.body,
              fontSize: 15,
              fontWeight: bodyWeight,
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
        color: active ? INK : FOG,
        cursor: "pointer",
        transition: "color 150ms ease",
      }}
    >
      {label}
    </button>
  );
}
