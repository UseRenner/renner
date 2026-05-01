"use client";

import Link from "next/link";
import { useState } from "react";
import { Mini, CLIENT_KINDS, RENNER_KINDS } from "../_illustrations";

type Step = { number: string; title: string; body: React.ReactNode; spec: string };

const CLIENT_DEK =
  "A marketplace for real-estate work. Post a task, pick a Renner, get it done. Both sides are screened to join.";

const RENNER_DEK =
  "Real-estate work, paid through the platform. Set your area, set your rate, pick what you take. Both sides are screened to join.";

const CLIENT_STEPS: Step[] = [
  { number: "01", title: "Post a task.", body: "Where, when, what, how much. Two minutes.", spec: "Under 2 min" },
  { number: "02", title: "Pick a Renner.", body: "Vetted Renners apply. Read their profile. Book one.", spec: "Checkr-vetted" },
  { number: "03", title: "Get it done.", body: "Photos arrive. You confirm. Stripe pays.", spec: "Stripe escrow" },
];

const RENNER_STEPS: Step[] = [
  { number: "01", title: "Get verified.", body: "ID, background check, area, rate. Same day.", spec: "Same-day" },
  { number: "02", title: "Pick a task.", body: "Tasks from agents and managers nearby. Apply.", spec: "Local" },
  { number: "03", title: "Get it done.", body: "Run the task. Send photos. Get paid.", spec: "100% of pay" },
];

const CLIENT_TRUST: Array<[string, string]> = [
  ["Both sides vetted", "ID and Checkr before any booking."],
  ["Funds in escrow", "Held by Stripe until you confirm."],
  ["Photos on every task", "A photo and a note when it's done."],
];

const RENNER_TRUST: Array<[string, string]> = [
  ["Real work", "From agents, brokers, managers."],
  ["Vetted clients", "ID and Checkr, same as you."],
  ["Repeat work", "Good work earns repeat clients."],
];

const SERIF = "var(--font-source-serif), ui-serif, Georgia, serif";
const SANS =
  "var(--font-source-sans), ui-sans-serif, system-ui, sans-serif";
const MONO =
  "var(--font-source-code), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const INK = "var(--c-text, #0d0f12)";
const STEEL_800 = "var(--c-700, #38414d)";
const STEEL_700 = "var(--c-700, #38414d)";
const STEEL_600 = "var(--c-600, #647589)";
const STEEL_500 = "var(--c-500, #7d8da0)";
const STEEL_300 = "var(--c-300, #cad1d8)";
const PAPER = "var(--c-bg, #fbfbfc)";

export function AtelierBody({ showCta }: { showCta: boolean }) {
  const [tab, setTab] = useState<"client" | "renner">("client");
  const isClient = tab === "client";
  const dek = isClient ? CLIENT_DEK : RENNER_DEK;
  const steps = isClient ? CLIENT_STEPS : RENNER_STEPS;
  const trust = isClient ? CLIENT_TRUST : RENNER_TRUST;
  const ctaButton = isClient
    ? { label: "Sign up", href: "/signup" }
    : { label: "Become a Renner", href: "/become-a-renner" };

  return (
    <>
      <div className="atelier-grid">
        {/* ─── Left ─── italic-display dek, sticky on desktop */}
        <aside className="atelier-left">
          <p
            style={{
              fontFamily: SERIF,
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(28px, 3.6vw, 44px)",
              lineHeight: 1.25,
              letterSpacing: "-0.012em",
              color: STEEL_800,
              margin: 0,
              maxWidth: "26ch",
              fontVariationSettings: '"opsz" 60',
            }}
          >
            {dek}
          </p>
        </aside>

        {/* ─── Right ─── upright content column */}
        <div className="atelier-right">
          <div
            role="tablist"
            aria-label="Audience"
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 14,
              marginBottom: 48,
              fontFamily: SERIF,
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: 16,
              letterSpacing: 0,
            }}
          >
            <TabButton label="For clients" active={isClient} onClick={() => setTab("client")} />
            <span aria-hidden style={{ color: STEEL_300, fontStyle: "normal" }}>·</span>
            <TabButton label="For Renners" active={!isClient} onClick={() => setTab("renner")} />
          </div>

          {/* Numbered steps */}
          <ol
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              marginBottom: "clamp(56px, 7vw, 88px)",
            }}
          >
            {steps.map((step, idx) => (
              <li
                key={step.number}
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(56px, 64px) 1fr",
                  columnGap: 24,
                  rowGap: 8,
                  padding: "28px 0",
                  borderTop: `1px solid ${STEEL_300}`,
                  borderBottom: idx === steps.length - 1 ? `1px solid ${STEEL_300}` : "none",
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
                  {step.number}
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: SERIF,
                      fontWeight: 400,
                      fontSize: "clamp(20px, 1.9vw, 24px)",
                      lineHeight: 1.2,
                      letterSpacing: "-0.014em",
                      color: INK,
                      margin: 0,
                      marginBottom: 10,
                      fontVariationSettings: '"opsz" 36',
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: SERIF,
                      fontSize: 16,
                      lineHeight: 1.6,
                      color: STEEL_700,
                      margin: 0,
                      marginBottom: 14,
                      maxWidth: "56ch",
                      fontVariationSettings: '"opsz" 14',
                    }}
                  >
                    {step.body}
                  </p>
                  <div
                    style={{
                      fontFamily: MONO,
                      fontSize: 10,
                      fontWeight: 500,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: STEEL_600,
                      marginBottom: 18,
                    }}
                  >
                    {step.spec}
                  </div>
                  <Mini kind={(isClient ? CLIENT_KINDS : RENNER_KINDS)[idx]} />
                </div>
              </li>
            ))}
          </ol>

          {/* Trust — centered three-up grid */}
          <section
            style={{
              marginBottom: showCta ? "clamp(56px, 7vw, 88px)" : 0,
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "clamp(20px, 2.4vw, 32px)",
              paddingTop: "clamp(28px, 3.5vw, 36px)",
              borderTop: `1px solid ${STEEL_300}`,
              textAlign: "center",
            }}
          >
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
            <section
              style={{
                paddingTop: "clamp(40px, 5vw, 64px)",
                borderTop: `1px solid ${STEEL_300}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 24,
                flexWrap: "wrap",
              }}
            >
              <h2
                style={{
                  fontFamily: SERIF,
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: "clamp(28px, 3.4vw, 40px)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  color: STEEL_800,
                  margin: 0,
                  maxWidth: "16ch",
                  fontVariationSettings: '"opsz" 60',
                }}
              >
                {isClient ? "Get something done." : "Start running."}
              </h2>
              <Link
                href={ctaButton.href}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  fontFamily: SANS,
                  fontSize: 12,
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
                }}
              >
                {ctaButton.label}
              </Link>
            </section>
          )}
        </div>
      </div>

      <style jsx>{`
        .atelier-grid {
          display: grid;
          grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
          gap: clamp(48px, 6vw, 96px);
          align-items: start;
        }
        .atelier-left {
          position: sticky;
          top: clamp(56px, 7vw, 96px);
          align-self: start;
        }
        @media (max-width: 880px) {
          .atelier-grid {
            grid-template-columns: 1fr;
            gap: clamp(48px, 8vw, 80px);
          }
          .atelier-left {
            position: static;
          }
        }
        @media (max-width: 640px) {
          :global(.atelier-trust-row) {
            grid-template-columns: 1fr !important;
            gap: 6px !important;
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
