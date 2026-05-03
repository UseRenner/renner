"use client";

import Link from "next/link";
import { Fragment, useState } from "react";
import { Card, CLIENT_KINDS, RENNER_KINDS } from "../_illustrations";

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

// Center — "Spine".
// All three illustrations live on a single vertical centerline.
// A continuous hairline runs the full length of the section,
// punctuated by numbered discs that sit ahead of each card. The
// reader's eye follows the spine top-to-bottom: disc → card →
// caption → disc → card → caption. The spine is the navigation;
// every step is a stop on the same line.

export function CenterBody({ showCta }: { showCta: boolean }) {
  const [tab, setTab] = useState<"client" | "renner">("client");
  const isClient = tab === "client";
  const dek = isClient ? CLIENT_DEK : RENNER_DEK;
  const steps = isClient ? CLIENT_STEPS : RENNER_STEPS;
  const kinds = isClient ? CLIENT_KINDS : RENNER_KINDS;
  const cta = isClient ? { label: "Sign up", href: "/signup" } : { label: "Become a Renner", href: "/become-a-renner" };

  return (
    <div style={{ textAlign: "center" }}>
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
          marginBottom: "clamp(48px, 6vw, 64px)",
          maxWidth: "32ch",
          fontVariationSettings: '"opsz" 60',
        }}
      >
        {dek}
      </p>

      {/* Spine: numbered discs strung along a single centerline.
          The line begins at the dek and ends at the trust rule, so
          the entire section reads as one continuous path. */}
      <div className="center-spine" style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", paddingBottom: "clamp(48px, 6vw, 72px)" }}>
        {/* Continuous vertical hairline, behind everything */}
        <div
          aria-hidden
          className="center-spine-line"
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
        {kinds.map((kind, i) => (
          <Fragment key={kind}>
            {/* Numbered disc — eye anchor on the spine */}
            <SpineDisc number={steps[i].number} first={i === 0} />

            {/* Card, centered on the spine */}
            <div style={{ position: "relative", marginTop: "clamp(24px, 3vw, 32px)", display: "flex", justifyContent: "center", width: "100%" }}>
              <div style={{ width: "100%", maxWidth: 480, display: "flex", justifyContent: "center" }}>
                <Card kind={kind} />
              </div>
            </div>

            {/* Caption below the card, centered, narrow */}
            <div style={{ position: "relative", marginTop: "clamp(20px, 2.4vw, 28px)", maxWidth: "30ch", paddingLeft: 24, paddingRight: 24, backgroundColor: PAPER }}>
              <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: STEEL_500, marginBottom: 10 }}>
                {steps[i].proof}
              </div>
              <div style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(22px, 2.2vw, 26px)", lineHeight: 1.15, letterSpacing: "-0.012em", color: INK, marginBottom: 8, fontVariationSettings: '"opsz" 36' }}>
                {steps[i].title}
              </div>
              <p style={{ fontFamily: SERIF, fontSize: 15, lineHeight: 1.55, color: STEEL_700, margin: 0, fontVariationSettings: '"opsz" 14' }}>
                {steps[i].body}
              </p>
            </div>

            {/* Spacer so the spine has room to breathe between
                steps. Last step gets less because the trust rule
                seals the spine. */}
            {i < kinds.length - 1 && <div style={{ height: "clamp(56px, 7vw, 88px)" }} />}
          </Fragment>
        ))}
      </div>

      {/* Trust rule — the spine terminates here. The hairline
          becomes ink-weight to signal "end of process". */}
      <p
        style={{
          fontFamily: SERIF,
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "clamp(18px, 1.7vw, 22px)",
          lineHeight: 1.5,
          color: INK,
          margin: "0 auto",
          marginBottom: showCta ? "clamp(40px, 5vw, 56px)" : 0,
          maxWidth: "52ch",
          paddingTop: "clamp(28px, 3.5vw, 36px)",
          borderTop: `1px solid ${INK}`,
          fontVariationSettings: '"opsz" 36',
        }}
      >
        Both sides — clients and Renners — are ID-verified and background-checked before any booking.
      </p>

      {showCta && (
        <section style={{ display: "flex", justifyContent: "center" }}>
          <Link href={cta.href} style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: SANS, fontSize: 14, fontWeight: 500, color: PAPER, backgroundColor: INK, border: `1px solid ${INK}`, borderRadius: 4, padding: "14px 22px", textDecoration: "none" }}>
            {cta.label}
            <span aria-hidden style={{ opacity: 0.7 }}>→</span>
          </Link>
        </section>
      )}
    </div>
  );
}

function SpineDisc({ number, first }: { number: string; first: boolean }) {
  // Disc punctuates the spine. The first disc has a slightly
  // taller cap of breathing room above it; subsequent discs sit
  // closer because the eye is already moving.
  const size = 44;
  return (
    <div
      style={{
        position: "relative",
        marginTop: first ? 0 : 0,
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: PAPER,
        border: `1px solid ${INK}`,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: MONO,
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: "0.16em",
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
