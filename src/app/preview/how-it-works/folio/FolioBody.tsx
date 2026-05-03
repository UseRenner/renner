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
  { title: "Post a task", body: "Set the location, time, task, and price.", proof: "Specifics" },
  { title: "Pick a Renner", body: "Local Renners apply. Select one for your task.", proof: "Vetted" },
  { title: "It's taken care of", body: "Receive photos and confirm completion. Payment is released.", proof: "Escrow" },
];
const RENNER_STEPS = [
  { title: "Get verified", body: "Verify your ID, clear a background check, and set your service area.", proof: "Onboarded" },
  { title: "Pick a task", body: "See tasks in your area. Apply to what fits your skills and schedule.", proof: "Local" },
  { title: "Take care of it", body: "Complete the task. Send photo confirmation. Receive payment.", proof: "100% of pay" },
];

const CLIENT_TRUST = "Clients and Renners pass ID and background checks before posting or booking. Tasks that require a license go only to licensed Renners. Save Renners you like and invite them to your tasks.";
const RENNER_TRUST = "The work is real-estate tasks — sign installs, lockboxes, showings, property prep. Clients and Renners pass ID and background checks. Clients can save you as a favorite and invite you directly to their next task.";

// Folio — "Descent".
// Three full Cards stacked vertically, each centered on the page.
// Between cards, a large display chevron (↓) in italic serif —
// the chevron's shape is the eye-guide. No numerals; the kicker
// is the proof word, which carries semantic weight without
// counting. The vertical descent reads as one continuous downward
// motion: card → chevron → card → chevron → card.

export function FolioBody({ showCta }: { showCta: boolean }) {
  const [tab, setTab] = useState<"client" | "renner">("client");
  const isClient = tab === "client";
  const dek = isClient ? CLIENT_DEK : RENNER_DEK;
  const steps = isClient ? CLIENT_STEPS : RENNER_STEPS;
  const kinds = isClient ? CLIENT_KINDS : RENNER_KINDS;
  const trust = isClient ? CLIENT_TRUST : RENNER_TRUST;
  const trustKicker = isClient ? "Why Renner" : "What you get";
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
          marginBottom: "clamp(56px, 7vw, 80px)",
          maxWidth: "32ch",
          fontVariationSettings: '"opsz" 60',
        }}
      >
        {dek}
      </p>

      {/* Descent: vertical column of cards interleaved with
          downward chevrons. Each step is a centered Card with its
          caption sitting just below; the chevron between two
          steps is the only piece of pure-direction content on the
          page, which is what makes it work as an eye-guide. */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "clamp(64px, 8vw, 96px)" }}>
        {kinds.map((kind, i) => (
          <Fragment key={kind}>
            <article style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: 540 }}>
              <Card kind={kind} />
              <div style={{ marginTop: "clamp(20px, 2.4vw, 28px)", maxWidth: "34ch", paddingLeft: 16, paddingRight: 16 }}>
                <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: STEEL_500, marginBottom: 10 }}>
                  {steps[i].proof}
                </div>
                <h3
                  style={{
                    fontFamily: SERIF,
                    fontStyle: "italic",
                    fontWeight: 300,
                    fontSize: "clamp(24px, 2.6vw, 30px)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.012em",
                    color: INK,
                    margin: 0,
                    marginBottom: 10,
                    fontVariationSettings: '"opsz" 36',
                  }}
                >
                  {steps[i].title}
                </h3>
                <p style={{ fontFamily: SERIF, fontSize: "clamp(15px, 1.45vw, 17px)", lineHeight: 1.6, color: STEEL_700, margin: 0, fontVariationSettings: '"opsz" 14' }}>
                  {steps[i].body}
                </p>
              </div>
            </article>

            {i < kinds.length - 1 && (
              <span
                aria-hidden
                style={{
                  display: "block",
                  width: 1,
                  height: "clamp(48px, 6vw, 72px)",
                  marginTop: "clamp(36px, 4.5vw, 56px)",
                  marginBottom: "clamp(36px, 4.5vw, 56px)",
                  backgroundColor: STEEL_300,
                }}
              />
            )}
          </Fragment>
        ))}
      </div>

      {/* Trust — Brief's editorial paragraph, mono-kickered. */}
      <section
        style={{
          paddingTop: "clamp(40px, 5vw, 56px)",
          borderTop: `1px solid ${INK}`,
          marginBottom: showCta ? "clamp(48px, 6vw, 72px)" : 0,
          maxWidth: "60ch",
          margin: "0 auto",
        }}
      >
        <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: STEEL_500, marginBottom: "clamp(20px, 2.5vw, 28px)" }}>
          {trustKicker}
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
