"use client";

import Link from "next/link";
import { useState } from "react";
import { Mini, CLIENT_KINDS, RENNER_KINDS } from "../_illustrations";

const SERIF = "var(--font-source-serif), ui-serif, Georgia, serif";
const SANS =
  "var(--font-source-sans), ui-sans-serif, system-ui, sans-serif";
const MONO =
  "var(--font-source-code), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const INK = "var(--c-text, #0d0f12)";
const STEEL_700 = "var(--c-700, #38414d)";
const STEEL_600 = "var(--c-600, #647589)";
const STEEL_500 = "var(--c-500, #7d8da0)";
const STEEL_300 = "var(--c-300, #cad1d8)";
const RULE = "var(--c-rule, #eaedf0)";
const PAPER = "var(--c-bg, #fbfbfc)";

type Step = { number: string; title: string; body: string; proof: string };

const CLIENT_DEK =
  "A marketplace for real-estate work. Post a task, pick a Renner. Verified on both sides.";
const RENNER_DEK =
  "Real-estate work, paid through the platform. Set your area, apply to tasks. Verified on both sides.";

const CLIENT_STEPS: Step[] = [
  { number: "01", title: "Post a task.", body: "Set the location, time, task, and price. Takes about two minutes.", proof: "Under 2 min" },
  { number: "02", title: "Pick a Renner.", body: "Renners apply. Read their profiles and book one.", proof: "Vetted" },
  { number: "03", title: "It gets done.", body: "The Renner sends photo confirmation. You confirm. Payment is released.", proof: "Escrow" },
];

const RENNER_STEPS: Step[] = [
  { number: "01", title: "Get verified.", body: "Verify your ID, clear a background check, and set your service area. Done in a day.", proof: "Same-day" },
  { number: "02", title: "Apply to tasks.", body: "See tasks posted in your area. Apply to the ones that fit your skills and schedule.", proof: "Local" },
  { number: "03", title: "It gets done.", body: "Complete the task. Send photo confirmation. Receive payment.", proof: "100% of pay" },
];

const CLIENT_TRUST = [
  ["Both sides vetted", "ID verified and background checked before any booking."],
  ["Funds in escrow", "Held by Stripe until you confirm."],
  ["Photos on every task", "A photo and a note when it's done."],
] as const;

const RENNER_TRUST = [
  ["Real work", "Real estate."],
  ["Vetted clients", "ID verified and background checked, same as you."],
  ["Repeat work", "Clients can save you as a favorite."],
] as const;

export function PivotBody({ showCta }: { showCta: boolean }) {
  const [tab, setTab] = useState<"client" | "renner">("client");
  const isClient = tab === "client";
  const dek = isClient ? CLIENT_DEK : RENNER_DEK;
  const steps = isClient ? CLIENT_STEPS : RENNER_STEPS;
  const trust = isClient ? CLIENT_TRUST : RENNER_TRUST;
  const cta = isClient
    ? { label: "Sign up", href: "/signup" }
    : { label: "Become a Renner", href: "/become-a-renner" };

  return (
    <>
      {/* Audience switch — pinned to the axis */}
      <div
        role="tablist"
        aria-label="Audience"
        className="pivot-axis-row"
        style={{
          marginBottom: "clamp(32px, 4vw, 48px)",
          fontFamily: SERIF,
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: 16,
        }}
      >
        <div className="pivot-left" style={{ textAlign: "right", paddingRight: 20 }}>
          <Tab label="For clients" active={isClient} onClick={() => setTab("client")} />
        </div>
        <div className="pivot-right" style={{ textAlign: "left", paddingLeft: 20 }}>
          <Tab label="For Renners" active={!isClient} onClick={() => setTab("renner")} />
        </div>
      </div>

      {/* Dek — single line, pinned to the axis */}
      <div className="pivot-axis-row" style={{ marginBottom: "clamp(48px, 6vw, 72px)" }}>
        <div className="pivot-left" style={{ textAlign: "right", paddingRight: 28 }}>
          <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: STEEL_500 }}>
            How it works
          </span>
        </div>
        <div className="pivot-right" style={{ textAlign: "left", paddingLeft: 28 }}>
          <p
            style={{
              fontFamily: SERIF,
              fontSize: "clamp(18px, 1.7vw, 22px)",
              lineHeight: 1.45,
              color: INK,
              margin: 0,
              maxWidth: "40ch",
              fontVariationSettings: '"opsz" 14',
            }}
          >
            {dek}
          </p>
        </div>
      </div>

      {/* The pivot — three rows alternating sides around a single axis line */}
      <div className="pivot-spine">
        {steps.map((s, i) => {
          const titleSide = i % 2 === 0 ? "left" : "right";
          const bodySide = i % 2 === 0 ? "right" : "left";
          return (
            <div
              key={s.number}
              className="pivot-axis-row pivot-step"
              style={{
                padding: "clamp(40px, 5vw, 72px) 0",
                borderTop: `1px solid ${RULE}`,
                borderBottom: i === steps.length - 1 ? `1px solid ${RULE}` : "none",
              }}
            >
              <div className={`pivot-${titleSide}`} style={{ textAlign: titleSide === "left" ? "right" : "left", padding: titleSide === "left" ? "0 28px 0 0" : "0 0 0 28px" }}>
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: "0.22em",
                    color: STEEL_500,
                    marginBottom: 12,
                  }}
                >
                  {s.number}
                </div>
                <h3
                  style={{
                    fontFamily: SERIF,
                    fontStyle: "italic",
                    fontWeight: 300,
                    fontSize: "clamp(28px, 3.4vw, 44px)",
                    lineHeight: 1.05,
                    letterSpacing: "-0.018em",
                    color: INK,
                    margin: 0,
                    fontVariationSettings: '"opsz" 60',
                  }}
                >
                  {s.title}
                </h3>
              </div>
              <div className={`pivot-${bodySide}`} style={{ textAlign: bodySide === "left" ? "right" : "left", padding: bodySide === "left" ? "0 28px 0 0" : "0 0 0 28px" }}>
                <p
                  style={{
                    fontFamily: SERIF,
                    fontSize: "clamp(16px, 1.4vw, 18px)",
                    lineHeight: 1.55,
                    color: STEEL_700,
                    margin: 0,
                    marginBottom: 16,
                    maxWidth: bodySide === "left" ? "100%" : "40ch",
                    marginLeft: bodySide === "left" ? "auto" : 0,
                    fontVariationSettings: '"opsz" 14',
                  }}
                >
                  {s.body}
                </p>
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: 10,
                    fontWeight: 500,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: STEEL_600,
                    marginBottom: 24,
                  }}
                >
                  {s.proof}
                </div>
                <div className="pivot-illustration" style={{ display: "flex", justifyContent: bodySide === "left" ? "flex-end" : "flex-start" }}>
                  <Mini kind={(isClient ? CLIENT_KINDS : RENNER_KINDS)[i]} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust — centered three-up grid */}
      <section style={{
        marginTop: "clamp(64px, 8vw, 96px)",
        marginBottom: showCta ? "clamp(64px, 8vw, 96px)" : 0,
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "clamp(20px, 2.4vw, 32px)",
        paddingTop: "clamp(28px, 3.5vw, 36px)",
        borderTop: `1px solid ${INK}`,
        textAlign: "center",
      }}>
        {trust.map(([label, body]) => (
          <div key={label}>
            <div style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 18, color: INK, marginBottom: 8, fontVariationSettings: '"opsz" 36' }}>
              {label}.
            </div>
            <div style={{ fontFamily: SERIF, fontSize: 14, lineHeight: 1.55, color: STEEL_700, fontVariationSettings: '"opsz" 14' }}>
              {body}
            </div>
          </div>
        ))}
      </section>

      {showCta && (
        <section className="pivot-axis-row" style={{ marginTop: "clamp(64px, 8vw, 96px)", paddingTop: "clamp(40px, 5vw, 64px)", borderTop: `1px solid ${INK}` }}>
          <div className="pivot-left" style={{ textAlign: "right", paddingRight: 28 }}>
            <h2
              style={{
                fontFamily: SERIF,
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "clamp(24px, 2.8vw, 36px)",
                color: INK,
                margin: 0,
                lineHeight: 1.1,
                fontVariationSettings: '"opsz" 60',
              }}
            >
              {isClient ? "Ready when you are." : "Ready to run."}
            </h2>
          </div>
          <div className="pivot-right" style={{ textAlign: "left", paddingLeft: 28 }}>
            <Link
              href={cta.href}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                fontFamily: SANS,
                fontSize: 15,
                fontWeight: 500,
                color: PAPER,
                backgroundColor: INK,
                border: `1px solid ${INK}`,
                borderRadius: 4,
                padding: "14px 22px",
                textDecoration: "none",
              }}
            >
              {cta.label}
              <span aria-hidden style={{ opacity: 0.7 }}>→</span>
            </Link>
          </div>
        </section>
      )}

      <style jsx>{`
        .pivot-axis-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: baseline;
        }
        .pivot-spine {
          position: relative;
        }
        .pivot-spine::before {
          content: "";
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 1px;
          background: ${INK};
          pointer-events: none;
        }
        @media (max-width: 720px) {
          .pivot-axis-row {
            grid-template-columns: 1fr;
            gap: 8px;
          }
          .pivot-axis-row > .pivot-left,
          .pivot-axis-row > .pivot-right {
            text-align: left !important;
            padding: 0 !important;
          }
          .pivot-spine::before {
            left: 0;
          }
          .pivot-step {
            padding-left: 20px !important;
          }
        }
      `}</style>
    </>
  );
}

function Tab({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
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
        color: active ? INK : STEEL_500,
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}
