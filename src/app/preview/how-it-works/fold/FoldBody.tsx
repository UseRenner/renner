"use client";

import Link from "next/link";
import { useState } from "react";

const SERIF = "var(--font-source-serif), ui-serif, Georgia, serif";
const SANS =
  "var(--font-source-sans), ui-sans-serif, system-ui, sans-serif";
const MONO =
  "var(--font-source-code), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const INK = "#0d0f12";
const STEEL_700 = "#4d5b6a";
const STEEL_600 = "#647589";
const STEEL_500 = "#7d8da0";
const STEEL_300 = "#cad1d8";
const RULE = "#eaedf0";
const PAPER = "#fbfbfc";

type Step = { number: string; title: string; body: string; proof: string };

const CLIENT_DEK =
  "A marketplace for real-estate work. Post a task, pick a Renner, get it done. Both sides are screened to join.";
const RENNER_DEK =
  "Real-estate work, paid through the platform. Set your area, set your rate, pick what you take. Both sides are screened to join.";

const CLIENT_STEPS: Step[] = [
  { number: "01", title: "Post a task.", body: "Where, when, what, how much. Two minutes.", proof: "Under 2 min" },
  { number: "02", title: "Pick a Renner.", body: "Vetted Renners apply. Read the file. Book one.", proof: "Checkr-vetted" },
  { number: "03", title: "Get it done.", body: "Photos arrive. You confirm. Stripe pays.", proof: "Stripe escrow" },
];

const RENNER_STEPS: Step[] = [
  { number: "01", title: "Get verified.", body: "ID, background check, area, rate. Same day.", proof: "Same-day" },
  { number: "02", title: "Pick a task.", body: "Briefs from agents and managers nearby. Apply.", proof: "Local" },
  { number: "03", title: "Get it done.", body: "Run the task. Send photos. Get paid.", proof: "100% of pay" },
];

const CLIENT_TRUST = [
  ["Both sides vetted", "ID and Checkr before any booking."],
  ["Funds in escrow", "Held by Stripe until you confirm."],
  ["On the record", "Photos and a note on every task."],
] as const;

const RENNER_TRUST = [
  ["Real work", "From agents, brokers, managers."],
  ["Vetted clients", "ID and Checkr, same as you."],
  ["Repeat work", "A reputation paid in repeat clients."],
] as const;

export function FoldBody({ showCta }: { showCta: boolean }) {
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
      {/* Audience switch */}
      <div
        role="tablist"
        aria-label="Audience"
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 14,
          marginBottom: "clamp(40px, 5vw, 56px)",
          fontFamily: SERIF,
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: 16,
        }}
      >
        <Tab label="For clients" active={isClient} onClick={() => setTab("client")} />
        <span aria-hidden style={{ color: STEEL_300, fontStyle: "normal" }}>·</span>
        <Tab label="For Renners" active={!isClient} onClick={() => setTab("renner")} />
      </div>

      {/* Lede */}
      <p
        style={{
          fontFamily: SERIF,
          fontWeight: 400,
          fontSize: "clamp(22px, 2.4vw, 30px)",
          lineHeight: 1.35,
          color: INK,
          margin: 0,
          marginBottom: "clamp(56px, 7vw, 88px)",
          maxWidth: "32ch",
          fontVariationSettings: '"opsz" 60',
        }}
      >
        {dek}
      </p>

      {/* The fold — three tall panels divided by vertical hairlines that touch top and bottom */}
      <div
        className="fold"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1px 1fr 1px 1fr",
          marginBottom: "clamp(56px, 7vw, 88px)",
        }}
      >
        {steps.flatMap((s, i) => {
          const panel = (
            <section
              key={`panel-${s.number}`}
              className="fold-panel"
              style={{
                padding: i === 0
                  ? "0 clamp(20px, 2.5vw, 32px) 0 0"
                  : i === steps.length - 1
                    ? "0 0 0 clamp(20px, 2.5vw, 32px)"
                    : "0 clamp(20px, 2.5vw, 32px)",
                display: "flex",
                flexDirection: "column",
                gap: 18,
                minHeight: 360,
              }}
            >
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.24em",
                  color: STEEL_500,
                }}
              >
                {s.number}
              </div>
              <h3
                style={{
                  fontFamily: SERIF,
                  fontWeight: 400,
                  fontSize: "clamp(28px, 3.4vw, 44px)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.025em",
                  color: INK,
                  margin: 0,
                  fontVariationSettings: '"opsz" 96',
                }}
              >
                {s.title}
              </h3>
              <p
                style={{
                  fontFamily: SERIF,
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: 18,
                  lineHeight: 1.45,
                  color: STEEL_700,
                  margin: 0,
                  fontVariationSettings: '"opsz" 36',
                }}
              >
                {s.body}
              </p>
              <div
                style={{
                  marginTop: "auto",
                  paddingTop: 14,
                  borderTop: `1px solid ${RULE}`,
                  fontFamily: MONO,
                  fontSize: 10,
                  fontWeight: 500,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: STEEL_600,
                }}
              >
                {s.proof}
              </div>
            </section>
          );
          if (i === steps.length - 1) return [panel];
          return [
            panel,
            <div
              key={`crease-${s.number}`}
              className="fold-crease"
              style={{ backgroundColor: INK }}
              aria-hidden
            />,
          ];
        })}
      </div>

      {/* Trust band */}
      <section
        className="fold-trust"
        style={{
          paddingTop: "clamp(20px, 2.5vw, 28px)",
          borderTop: `1px solid ${INK}`,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "clamp(20px, 3vw, 40px)",
          marginBottom: showCta ? "clamp(48px, 6vw, 80px)" : 0,
        }}
      >
        {trust.map(([label, body]) => (
          <div key={label}>
            <div style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 18, color: INK, marginBottom: 6, fontVariationSettings: '"opsz" 36' }}>
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
            display: "flex",
            justifyContent: "center",
            paddingTop: "clamp(40px, 5vw, 64px)",
          }}
        >
          <Link
            href={cta.href}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              fontFamily: SANS,
              fontSize: 14,
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
        </section>
      )}

      <style jsx>{`
        @media (max-width: 880px) {
          .fold {
            grid-template-columns: 1fr !important;
          }
          .fold-panel {
            padding: 0 !important;
            min-height: 0 !important;
            margin-bottom: clamp(24px, 4vw, 40px);
          }
          .fold-panel:not(:first-child) {
            padding-top: clamp(20px, 2.5vw, 28px) !important;
            border-top: 1px solid ${RULE};
          }
          .fold-crease {
            display: none !important;
          }
          .fold-trust {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
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
