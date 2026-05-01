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
const SLATE = "var(--c-700, #2a2f36)";
const STEEL_700 = "var(--c-700, #38414d)";
const STEEL_600 = "var(--c-600, #647589)";
const STEEL_500 = "var(--c-500, #7d8da0)";
const STEEL_400 = "var(--c-500, #9aa6b4)";
const STEEL_300 = "var(--c-300, #cad1d8)";
const STEEL_200 = "var(--c-300, #a7b2be)";
const RULE = "var(--c-rule, #eaedf0)";
const PAPER = "var(--c-bg, #fbfbfc)";

type Step = {
  number: string;
  title: React.ReactNode;
  body: React.ReactNode;
  proof: string;
};

const CLIENT_DEK =
  "A marketplace for real-estate work. Post a task, pick a Renner, get it done. Both sides are screened to join.";

const RENNER_DEK =
  "Real-estate work, paid through the platform. Set your area, set your rate, pick what you take. Both sides are screened to join.";

const CLIENT_STEPS: Step[] = [
  { number: "01", title: "Post a task.", body: "Where, when, what, how much. Two minutes.", proof: "Under 2 min" },
  { number: "02", title: "Pick a Renner.", body: "Vetted Renners apply. Read their profile. Book one.", proof: "Checkr-vetted" },
  { number: "03", title: "Get it done.", body: "Photos arrive. You confirm. Stripe pays.", proof: "Stripe escrow" },
];

const RENNER_STEPS: Step[] = [
  { number: "01", title: "Get verified.", body: "ID, background check, area, rate. Same day.", proof: "Same-day" },
  { number: "02", title: "Pick a task.", body: "Tasks from agents and managers nearby. Apply.", proof: "Local" },
  { number: "03", title: "Get it done.", body: "Run the task. Send photos. Get paid.", proof: "100% of pay" },
];

export function MastBody({ showCta }: { showCta: boolean }) {
  const [tab, setTab] = useState<"client" | "renner">("client");
  const isClient = tab === "client";
  const dek = isClient ? CLIENT_DEK : RENNER_DEK;
  const steps = isClient ? CLIENT_STEPS : RENNER_STEPS;
  const ctaButton = isClient
    ? { label: "Sign up", href: "/signup" }
    : { label: "Become a Renner", href: "/become-a-renner" };

  return (
    <>
      {/* Audience switch */}
      <div
        role="tablist"
        aria-label="Audience"
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 14,
          marginBottom: 56,
          fontFamily: SERIF,
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: 16,
        }}
      >
        <TabButton label="For clients" active={isClient} onClick={() => setTab("client")} />
        <span aria-hidden style={{ color: STEEL_300, fontStyle: "normal" }}>·</span>
        <TabButton label="For Renners" active={!isClient} onClick={() => setTab("renner")} />
      </div>

      {/* Lede — kept small so the counters carry the page */}
      <div style={{ marginBottom: "clamp(80px, 10vw, 128px)", maxWidth: 720 }}>
        <p
          style={{
            fontFamily: SERIF,
            fontWeight: 400,
            fontSize: "clamp(20px, 1.9vw, 24px)",
            lineHeight: 1.5,
            color: INK,
            margin: 0,
            fontVariationSettings: '"opsz" 14',
          }}
        >
          {dek}
        </p>
      </div>

      {/* The counters */}
      <ol
        className="counter-list"
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          marginBottom: "clamp(80px, 10vw, 128px)",
        }}
      >
        {steps.map((step, idx) => (
          <li
            key={step.number}
            className="counter-row"
            style={{
              borderTop: `1px solid ${INK}`,
              borderBottom:
                idx === steps.length - 1 ? `1px solid ${INK}` : "none",
              padding: "clamp(40px, 5vw, 72px) 0",
              alignItems: "center",
            }}
          >
            <div
              className="counter-numeral"
              aria-hidden
              style={{
                fontFamily: MONO,
                fontWeight: 400,
                fontSize: "clamp(96px, 16vw, 200px)",
                lineHeight: 0.95,
                letterSpacing: "-0.04em",
                color: STEEL_200,
                userSelect: "none",
              }}
            >
              {step.number}
            </div>
            <div className="counter-content">
              <h3
                style={{
                  fontFamily: SERIF,
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: "clamp(28px, 3.2vw, 40px)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.018em",
                  color: INK,
                  margin: 0,
                  marginBottom: 18,
                  fontVariationSettings: '"opsz" 60',
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontFamily: SERIF,
                  fontSize: 17,
                  lineHeight: 1.6,
                  color: STEEL_700,
                  margin: 0,
                  marginBottom: 24,
                  maxWidth: "52ch",
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
                }}
              >
                {step.proof}
              </div>
            </div>
            <div className="counter-illustration" style={{ display: "flex", justifyContent: "flex-end" }}>
              <Mini kind={(isClient ? CLIENT_KINDS : RENNER_KINDS)[idx]} />
            </div>
          </li>
        ))}
      </ol>

      {/* Trust — centered three-up grid */}
      <section
        className="counter-trust"
        style={{
          marginBottom: showCta ? "clamp(64px, 8vw, 96px)" : 0,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "clamp(20px, 2.4vw, 32px)",
          paddingTop: "clamp(28px, 3.5vw, 36px)",
          borderTop: `1px solid ${INK}`,
          textAlign: "center",
        }}
      >
        {(isClient
          ? [
              ["Both sides vetted", "ID and Checkr before any booking."],
              ["Funds in escrow", "Held by Stripe until you confirm."],
              ["Photos on every task", "A photo and a note when it's done."],
            ]
          : [
              ["Real work", "From agents, brokers, managers."],
              ["Vetted clients", "ID and Checkr, same as you."],
              ["Repeat work", "Good work earns repeat clients."],
            ]
        ).map(([label, body]) => (
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

      {/* CTA */}
      {showCta && (
        <section
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 24,
            flexWrap: "wrap",
            paddingTop: "clamp(48px, 6vw, 80px)",
            borderTop: `1px solid ${INK}`,
            justifyContent: "space-between",
          }}
        >
          <h2
            style={{
              fontFamily: SERIF,
              fontWeight: 400,
              fontSize: "clamp(28px, 3.2vw, 40px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: INK,
              margin: 0,
              maxWidth: "20ch",
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
        </section>
      )}

      <style jsx>{`
        .counter-row {
          display: grid;
          grid-template-columns: minmax(140px, 220px) minmax(0, 1fr) minmax(260px, 320px);
          gap: clamp(24px, 3.5vw, 56px);
        }
        .counter-trust-row {
          display: grid;
          grid-template-columns: minmax(180px, 280px) minmax(0, 1fr);
          gap: clamp(24px, 4vw, 64px);
        }
        @media (max-width: 1024px) {
          .counter-row {
            grid-template-columns: minmax(140px, 220px) minmax(0, 1fr);
          }
          .counter-illustration {
            display: none !important;
          }
        }
        @media (max-width: 720px) {
          .counter-row {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          .counter-trust-row {
            grid-template-columns: 1fr;
            gap: 4px;
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
        color: active ? INK : STEEL_500,
        cursor: "pointer",
        transition: "color 150ms ease",
      }}
    >
      {label}
    </button>
  );
}
