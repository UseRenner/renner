"use client";

import Link from "next/link";
import { useState } from "react";
import { Mini, CLIENT_KINDS, RENNER_KINDS } from "../_illustrations";

const SERIF = "var(--font-source-serif), ui-serif, Georgia, serif";
const SANS = "var(--font-source-sans), ui-sans-serif, system-ui, sans-serif";
const MONO = "var(--font-source-code), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const INK = "var(--c-text, #0d0f12)";
const STEEL_700 = "var(--c-700, #38414d)";
const STEEL_500 = "var(--c-500, #7d8da0)";
const STEEL_300 = "var(--c-300, #cad1d8)";
const PAPER = "var(--c-bg, #fbfbfc)";

const CLIENT_DEK = "What do you need taken care of?";
const RENNER_DEK = "What can you take care of?";

const CLIENT_STEPS = [
  { number: "01", title: "Post a task", body: "Set the location, time, task, and price.", proof: "Specifics" },
  { number: "02", title: "Pick a Renner", body: "Local Renners apply. Select one for your task.", proof: "Vetted" },
  { number: "03", title: "It's taken care of", body: "Receive photos and confirm completion. Payment is released.", proof: "Escrow" },
];
const RENNER_STEPS = [
  { number: "01", title: "Get verified", body: "Verify your ID, clear a background check, and set your service area.", proof: "Onboarded" },
  { number: "02", title: "Pick a task", body: "See tasks in your area. Apply to what fits your skills and schedule.", proof: "Local" },
  { number: "03", title: "Take care of it", body: "Complete the task. Send photo confirmation. Receive payment.", proof: "100% of pay" },
];

const CLIENT_TRUST = "Clients and Renners pass ID and background checks before posting or booking. Tasks that require a license go only to licensed Renners. Save Renners you like and invite them to your tasks.";
const RENNER_TRUST = "The work is real-estate tasks — sign installs, lockboxes, showings, property prep. Clients and Renners pass ID and background checks. Clients can save you as a favorite and invite you directly to their next task.";

// Brief — "Margin".
// A reading-column layout. The three Minis are pinned in the left
// margin, one per row. The body steps live in the right reading
// column. Between the two columns runs a continuous vertical
// hairline; on it, a numbered disc sits at the start of each row.
// The hairline + disc functions as a reading rail — the eye
// descends the rail in order, and at every disc it dispatches:
// look left to the Mini, then read right across the body, drop
// to the next disc, repeat.
//
// Rail continuity: each row hosts its own rail segment that fills
// the cell from top to bottom (including the trailing padding
// that creates breathing room between rows). Because adjacent
// segments touch end-to-end with row-gap:0, the rail reads as one
// unbroken hairline without needing absolute positioning.

export function BriefBody({ showCta }: { showCta: boolean }) {
  const [tab, setTab] = useState<"client" | "renner">("client");
  const isClient = tab === "client";
  const dek = isClient ? CLIENT_DEK : RENNER_DEK;
  const steps = isClient ? CLIENT_STEPS : RENNER_STEPS;
  const kinds = isClient ? CLIENT_KINDS : RENNER_KINDS;
  const trust = isClient ? CLIENT_TRUST : RENNER_TRUST;
  const cta = isClient ? { label: "Sign up", href: "/signup" } : { label: "Become a Renner", href: "/become-a-renner" };

  return (
    <div>
      <div role="tablist" aria-label="Audience" style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 14, marginBottom: "clamp(40px, 5vw, 56px)", fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 16 }}>
        <Tab label="Hire a Renner" active={isClient} onClick={() => setTab("client")} />
        <span aria-hidden style={{ color: STEEL_300, fontStyle: "normal" }}>·</span>
        <Tab label="Become a Renner" active={!isClient} onClick={() => setTab("renner")} />
      </div>

      <p
        style={{
          fontFamily: SERIF,
          fontWeight: 400,
          fontSize: "clamp(28px, 3.5vw, 44px)",
          lineHeight: 1.3,
          letterSpacing: "-0.012em",
          color: INK,
          margin: "0 auto",
          marginBottom: "clamp(56px, 7vw, 80px)",
          maxWidth: "32ch",
          textAlign: "center",
          fontVariationSettings: '"opsz" 60',
        }}
      >
        {dek}
      </p>

      {/* Three rows of Mini | rail | body. The rail is built
          row-by-row: each rail cell hosts its own segment plus a
          numbered disc at its top. With zero row-gap, segments
          meet end-to-end and visually become one continuous
          hairline running the full height of the section. */}
      <div
        className="brief-rail"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(220px, 280px) 64px minmax(0, 1fr)",
          columnGap: 0,
          rowGap: 0,
          marginBottom: "clamp(64px, 8vw, 96px)",
        }}
      >
        {kinds.map((kind, i) => (
          <Row
            key={kind}
            number={steps[i].number}
            proof={steps[i].proof}
            title={steps[i].title}
            body={steps[i].body}
            kind={kind}
            isLast={i === kinds.length - 1}
          />
        ))}
      </div>

      {/* Trust — a single editorial paragraph, centered, mono-
          kickered. The cascade of rows above ends in this brief
          statement, capping the rail. */}
      <section
        style={{
          paddingTop: "clamp(40px, 5vw, 56px)",
          borderTop: `1px solid ${INK}`,
          marginBottom: showCta ? "clamp(48px, 6vw, 72px)" : 0,
          maxWidth: "60ch",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: STEEL_500, marginBottom: "clamp(20px, 2.5vw, 28px)" }}>
          {isClient ? "Why Renner" : "What you get"}
        </div>
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(20px, 2.2vw, 26px)", lineHeight: 1.5, letterSpacing: "-0.005em", color: INK, margin: 0, fontVariationSettings: '"opsz" 36' }}>
          {trust}
        </p>
      </section>

      {showCta && (
        <section style={{ display: "flex", justifyContent: "center", marginTop: "clamp(48px, 6vw, 72px)" }}>
          <Link href={cta.href} style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: SANS, fontSize: 14, fontWeight: 500, color: PAPER, backgroundColor: INK, border: `1px solid ${INK}`, borderRadius: 4, padding: "14px 22px", textDecoration: "none" }}>
            {cta.label}
            <span aria-hidden style={{ opacity: 0.7 }}>→</span>
          </Link>
        </section>
      )}

      <style jsx>{`
        @media (max-width: 880px) {
          .brief-rail {
            grid-template-columns: 1fr !important;
          }
          /* Row's JSX comes from a helper fn so its className
             tokens don't pick up the styled-jsx scope hash;
             reach them with :global(). */
          .brief-rail :global(.brief-rail-cell) {
            display: none !important;
          }
          .brief-rail :global(.brief-mini) {
            justify-content: flex-start !important;
            padding-right: 0 !important;
          }
          .brief-rail :global(.brief-body) {
            padding-left: 0 !important;
            padding-bottom: 48px !important;
          }
        }
      `}</style>
    </div>
  );
}

function Row({
  number,
  proof,
  title,
  body,
  kind,
  isLast,
}: {
  number: string;
  proof: string;
  title: string;
  body: string;
  kind: "task" | "applicant" | "completion" | "profile" | "inbox" | "payout";
  isLast: boolean;
}) {
  // Trailing padding inside each row creates the gap between
  // rows. Because the rail segment fills its cell (including this
  // padding), it carries straight through to the next row.
  const rowPad = isLast ? 0 : "clamp(36px, 4.5vw, 56px)";

  return (
    <>
      {/* Mini in the left margin column, right-aligned so its
          right edge hugs the rail. Top-aligned with the body. */}
      <div
        className="brief-mini"
        style={{
          gridColumn: "1 / 2",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-start",
          paddingBottom: rowPad,
          paddingRight: 16,
        }}
      >
        <Mini kind={kind} maxWidth={280} />
      </div>

      {/* Rail cell — its own hairline segment plus a numbered
          disc at the top. The cell fills full row height so its
          segment runs uninterrupted into the next row's
          segment. */}
      <div
        className="brief-rail-cell"
        style={{
          gridColumn: "2 / 3",
          position: "relative",
          paddingBottom: rowPad,
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: "50%",
            width: 1,
            backgroundColor: STEEL_300,
            transform: "translateX(-0.5px)",
          }}
        />
        <div style={{ position: "relative", display: "flex", justifyContent: "center", marginTop: 4 }}>
          <Disc number={number} />
        </div>
      </div>

      {/* Body text in the right reading column. Kicker, italic
          title, body — the order the eye expects after the
          numbered disc has set the step. */}
      <div
        className="brief-body"
        style={{
          gridColumn: "3 / 4",
          paddingLeft: "clamp(20px, 2.4vw, 32px)",
          paddingRight: "clamp(0px, 1vw, 8px)",
          paddingBottom: rowPad,
        }}
      >
        <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: STEEL_500, marginBottom: 10 }}>
          {proof}
        </div>
        <h3
          style={{
            fontFamily: SERIF,
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(24px, 2.6vw, 32px)",
            lineHeight: 1.05,
            letterSpacing: "-0.014em",
            color: INK,
            margin: 0,
            marginBottom: 12,
            fontVariationSettings: '"opsz" 60',
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontFamily: SERIF,
            fontSize: "clamp(15px, 1.45vw, 17px)",
            lineHeight: 1.6,
            color: STEEL_700,
            margin: 0,
            maxWidth: "44ch",
            fontVariationSettings: '"opsz" 14',
          }}
        >
          {body}
        </p>
      </div>
    </>
  );
}

function Disc({ number }: { number: string }) {
  // Mini disc (smaller than Center's, since Brief is a reading
  // layout where the rail dominates and the disc is just a
  // marker). Paper bg masks the rail line behind it.
  const size = 36;
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: PAPER,
        border: `1px solid ${INK}`,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: MONO,
        fontSize: 10,
        fontWeight: 500,
        letterSpacing: "0.14em",
        color: INK,
      }}
    >
      {number}
    </div>
  );
}

function Tab({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button type="button" role="tab" aria-selected={active} onClick={onClick} style={{ background: "none", border: "none", padding: 0, fontFamily: "inherit", fontStyle: "inherit", fontSize: "inherit", fontWeight: "inherit", color: active ? INK : STEEL_500, cursor: "pointer" }}>
      {label}
    </button>
  );
}
