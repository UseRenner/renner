"use client";

import Link from "next/link";
import { useState } from "react";

type Chapter = {
  number: string;
  theme: string;
  heading: React.ReactNode;
  body: React.ReactNode;
  proof: string;
};

const CLIENT_DEK =
  "A marketplace for real-estate task work — sign installs, lockbox swaps, showings, courier runs, property prep — handled by background-checked Renners and paid through escrow.";

const RENNER_DEK =
  "Independent contractors running short real-estate tasks for agents, brokers, and property managers — on your schedule, in your area, paid through escrow.";

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

const CLIENT_CHAPTERS: Chapter[] = [
  {
    number: "01",
    theme: "Posting",
    heading: (
      <>
        Post a <Em>task.</Em>
      </>
    ),
    body: (
      <>
        Describe what you need — sign install, lockbox swap, property
        visuals, guest check-in, courier run. Set the location, the
        window, and the price. Posts go live in under two minutes and
        only background-checked Renners can see them.
      </>
    ),
    proof: "Post · under 2 minutes",
  },
  {
    number: "02",
    theme: "Selection",
    heading: (
      <>
        Pick a <Em>vetted Renner.</Em>
      </>
    ),
    body: (
      <>
        Renners in your area apply with their bio, ratings, and tenure.
        Read what they&rsquo;ve done. Book the right hand for the work.
        Every applicant has cleared a Checkr background check before
        they could ever see your task.
      </>
    ),
    proof: "Every Renner · Checkr-verified",
  },
  {
    number: "03",
    theme: "Completion",
    heading: (
      <>
        Get it <Em>done.</Em>
      </>
    ),
    body: (
      <>
        Your Renner finishes the task and submits completion photos with
        a written confirmation. You confirm; Stripe releases the funds
        from escrow. If forty-eight hours pass without action, payment
        auto-releases. The rating posts and the next one is up.
      </>
    ),
    proof: "Funds held · escrow until confirmed",
  },
];

const RENNER_CHAPTERS: Chapter[] = [
  {
    number: "01",
    theme: "Verification",
    heading: (
      <>
        Get <Em>verified.</Em>
      </>
    ),
    body: (
      <>
        Sign up, confirm your identity, clear a Checkr background check.
        Pick the categories you run — signs, lockbox, courier, visuals,
        guest access, showings. Set your service area and your rate.
        Verification typically clears the same day.
      </>
    ),
    proof: "Onboarding · same-day in most states",
  },
  {
    number: "02",
    theme: "Selection",
    heading: (
      <>
        Pick a <Em>task.</Em>
      </>
    ),
    body: (
      <>
        Briefs come in from agents, brokers, and property managers
        nearby. Apply to what fits your schedule and skills. Decline
        anything that doesn&rsquo;t. You&rsquo;re an independent
        contractor — you set the schedule, you choose the work.
      </>
    ),
    proof: "Marketplace · live in your area",
  },
  {
    number: "03",
    theme: "Completion",
    heading: (
      <>
        Get it <Em>done.</Em>
      </>
    ),
    body: (
      <>
        Run the task. Upload completion photos. The client confirms;
        Stripe releases the funds. Renners keep ninety percent of task
        pay. Repeat clients find their way back to the Renners they
        trust through the My Renners directory.
      </>
    ),
    proof: "Reputation · built task by task",
  },
];

const CLIENT_TRUST = [
  "Vetted by Checkr",
  "Stripe escrow",
  "Photo confirmation",
];

const RENNER_TRUST = [
  "Local tasks only",
  "Repeat clients",
  "A real reputation",
];

export function ChapterBody({ showCta }: { showCta: boolean }) {
  const [tab, setTab] = useState<"client" | "renner">("client");
  const isClient = tab === "client";
  const dek = isClient ? CLIENT_DEK : RENNER_DEK;
  const chapters = isClient ? CLIENT_CHAPTERS : RENNER_CHAPTERS;
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
        <TabButton
          label="For Clients"
          active={isClient}
          onClick={() => setTab("client")}
        />
        <span aria-hidden style={{ color: MIST }}>/</span>
        <TabButton
          label="For Renners"
          active={!isClient}
          onClick={() => setTab("renner")}
        />
      </div>

      {/* ─── Statement ─── prominent, three rows */}
      <h1
        style={{
          fontFamily: SERIF,
          fontWeight: 400,
          fontSize: "clamp(40px, 6vw, 80px)",
          lineHeight: 1.05,
          letterSpacing: "-0.028em",
          color: INK,
          margin: 0,
          marginBottom: "clamp(32px, 4vw, 48px)",
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

      {/* ─── Dek ─── one-sentence platform description */}
      <p
        style={{
          fontFamily: SERIF,
          fontWeight: 400,
          fontSize: "clamp(17px, 1.5vw, 19px)",
          lineHeight: 1.55,
          color: SLATE,
          margin: 0,
          marginBottom: "clamp(112px, 14vw, 168px)",
          maxWidth: "56ch",
          fontVariationSettings: '"opsz" 14',
        }}
      >
        {dek}
      </p>

      {/* ─── Chapters ─── three tall ceremonial sections, two-column
          inside each chapter (theme + numeral on the left, the
          clause + body + proof on the right) */}
      <div>
        {chapters.map((chapter, idx) => (
          <article
            key={chapter.number}
            className="chapter-row"
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(160px, 220px) minmax(0, 1fr)",
              gap: "clamp(32px, 5vw, 80px)",
              padding: "clamp(72px, 9vw, 112px) 0",
              borderTop: `1px solid ${RULE}`,
              borderBottom:
                idx === chapters.length - 1 ? `1px solid ${RULE}` : "none",
              alignItems: "start",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 10,
                  fontWeight: 500,
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  color: FOG,
                  marginBottom: 16,
                }}
              >
                Chapter {chapter.number}
              </div>
              <div
                style={{
                  fontFamily: SERIF,
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: "clamp(22px, 2.4vw, 30px)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.012em",
                  color: STEEL,
                  fontVariationSettings: '"opsz" 36',
                }}
              >
                {chapter.theme}.
              </div>
            </div>

            <div>
              <h2
                style={{
                  fontFamily: SERIF,
                  fontWeight: 400,
                  fontSize: "clamp(36px, 5vw, 64px)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.025em",
                  color: INK,
                  margin: 0,
                  marginBottom: "clamp(24px, 3vw, 40px)",
                  fontVariationSettings: '"opsz" 144',
                }}
              >
                {chapter.heading}
              </h2>
              <p
                style={{
                  fontFamily: SERIF,
                  fontWeight: 400,
                  fontSize: "clamp(17px, 1.6vw, 19px)",
                  lineHeight: 1.65,
                  color: SLATE,
                  margin: 0,
                  marginBottom: 32,
                  maxWidth: "60ch",
                  fontVariationSettings: '"opsz" 14',
                }}
              >
                {chapter.body}
              </p>
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: STEEL,
                  paddingTop: 20,
                  borderTop: `1px solid ${RULE}`,
                  display: "inline-block",
                  minWidth: "min(360px, 100%)",
                }}
              >
                {chapter.proof}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* ─── Trust ─── italic stack closing the body */}
      <section
        style={{
          marginTop: "clamp(96px, 12vw, 144px)",
          marginBottom: showCta ? "clamp(96px, 12vw, 144px)" : 0,
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
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          {trust.map((t) => (
            <li
              key={t}
              style={{
                fontFamily: SERIF,
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "clamp(24px, 3vw, 36px)",
                lineHeight: 1.2,
                letterSpacing: "-0.012em",
                color: INK,
                fontVariationSettings: '"opsz" 36',
              }}
            >
              {t}.
            </li>
          ))}
        </ul>
      </section>

      {/* ─── CTA ─── single-line heading + button */}
      {showCta && (
        <section
          style={{
            paddingTop: "clamp(48px, 6vw, 80px)",
            borderTop: `1px solid ${RULE}`,
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
              fontSize: "clamp(36px, 5vw, 56px)",
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
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
              transition:
                "background-color 150ms ease, border-color 150ms ease",
            }}
          >
            {ctaButton.label}
            <span aria-hidden style={{ opacity: 0.7 }}>→</span>
          </Link>
        </section>
      )}

      <style jsx>{`
        @media (max-width: 760px) {
          .chapter-row {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
            padding: 56px 0 !important;
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
