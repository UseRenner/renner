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

// Center — "Procession".
// A horizontal procession of three full Cards interleaved with
// large display chevrons. The chevrons are the eye-guide: their
// shape is direction itself, and at display scale they pull the
// eye left across the row without any need for numerals. Each
// card's caption sits directly below it, with the proof word as
// the kicker. The trust paragraph below echoes Brief's copy so
// the variants speak with one voice.

export function CenterBody({ showCta }: { showCta: boolean }) {
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

      {/* Procession row: cards interleaved with display chevrons.
          The flex row keeps each card-cell at equal width while
          letting chevrons collapse to their content size. */}
      <div
        className="procession"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "clamp(16px, 2vw, 28px)",
          marginBottom: "clamp(28px, 3.5vw, 40px)",
        }}
      >
        {kinds.map((kind, i) => (
          <Fragment key={kind}>
            <div className="procession-card" style={{ flex: 1, display: "flex", justifyContent: "center", minWidth: 0 }}>
              <Card kind={kind} />
            </div>
            {i < kinds.length - 1 && (
              <span
                aria-hidden
                className="procession-chevron"
                style={{
                  flex: "0 0 auto",
                  fontFamily: SERIF,
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: "clamp(36px, 4.5vw, 56px)",
                  lineHeight: 1,
                  color: INK,
                  fontVariationSettings: '"opsz" 60',
                  userSelect: "none",
                }}
              >
                →
              </span>
            )}
          </Fragment>
        ))}
      </div>

      {/* Captions row aligned to the cards above. Mirrors the
          procession's column rhythm: caption cells take the same
          flex unit as the card cells; chevron-width spacers keep
          them locked to each card. */}
      <div
        className="procession-captions"
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "clamp(16px, 2vw, 28px)",
          marginBottom: "clamp(64px, 8vw, 96px)",
          textAlign: "center",
        }}
      >
        {steps.map((s, i) => (
          <Fragment key={s.title}>
            <div style={{ flex: 1, minWidth: 0, paddingLeft: 8, paddingRight: 8 }}>
              <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: STEEL_500, marginBottom: 12 }}>
                {s.proof}
              </div>
              <h3
                style={{
                  fontFamily: SERIF,
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: "clamp(22px, 2.4vw, 28px)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.012em",
                  color: INK,
                  margin: 0,
                  marginBottom: 10,
                  fontVariationSettings: '"opsz" 36',
                }}
              >
                {s.title}
              </h3>
              <p style={{ fontFamily: SERIF, fontSize: 15, lineHeight: 1.55, color: STEEL_700, margin: 0, fontVariationSettings: '"opsz" 14' }}>
                {s.body}
              </p>
            </div>
            {i < steps.length - 1 && (
              <span
                aria-hidden
                className="procession-spacer"
                style={{
                  flex: "0 0 auto",
                  fontFamily: SERIF,
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: "clamp(36px, 4.5vw, 56px)",
                  lineHeight: 1,
                  color: "transparent",
                  fontVariationSettings: '"opsz" 60',
                  userSelect: "none",
                }}
              >
                →
              </span>
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

      <style jsx>{`
        @media (max-width: 880px) {
          .procession,
          .procession-captions {
            flex-direction: column !important;
            gap: 32px !important;
          }
          .procession-chevron,
          .procession-spacer {
            transform: rotate(90deg);
            margin: 4px 0 !important;
          }
          .procession-spacer {
            display: none !important;
          }
        }
      `}</style>
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
