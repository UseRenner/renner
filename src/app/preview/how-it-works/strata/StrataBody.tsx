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
  "A marketplace for real-estate work. Post a task, pick a vetted Renner, get it done.";
const RENNER_DEK =
  "Real-estate work, paid through the platform. Set your area, set your rate, pick what you take.";

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

export function StrataBody({ showCta }: { showCta: boolean }) {
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
      {/* Audience switch — sits in the inset, not full-bleed */}
      <div className="strata-inset" style={{ paddingTop: "clamp(24px, 3vw, 40px)", paddingBottom: "clamp(24px, 3vw, 40px)" }}>
        <div
          role="tablist"
          aria-label="Audience"
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 14,
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
      </div>

      {/* Band 1 — lede */}
      <section className="strata-band">
        <div className="strata-inset strata-lede">
          <div
            style={{
              fontFamily: MONO,
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: STEEL_500,
              marginBottom: 32,
            }}
          >
            How it works
          </div>
          <p
            style={{
              fontFamily: SERIF,
              fontWeight: 400,
              fontSize: "clamp(28px, 3.6vw, 48px)",
              lineHeight: 1.15,
              letterSpacing: "-0.018em",
              color: INK,
              margin: 0,
              maxWidth: "32ch",
              fontVariationSettings: '"opsz" 60',
            }}
          >
            {dek}
          </p>
        </div>
      </section>

      {/* Bands 2–4 — steps. Each is its own full-bleed stratum. */}
      {steps.map((s) => (
        <section key={s.number} className="strata-band strata-step">
          <div className="strata-inset strata-step-grid">
            <div className="strata-step-number">
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: "0.24em",
                  color: STEEL_500,
                }}
              >
                {s.number}
              </span>
            </div>
            <div className="strata-step-title">
              <h3
                style={{
                  fontFamily: SERIF,
                  fontWeight: 400,
                  fontSize: "clamp(36px, 5.5vw, 88px)",
                  lineHeight: 1.0,
                  letterSpacing: "-0.03em",
                  color: INK,
                  margin: 0,
                  fontVariationSettings: '"opsz" 144',
                }}
              >
                {s.title}
              </h3>
            </div>
            <div className="strata-step-body">
              <p
                style={{
                  fontFamily: SERIF,
                  fontSize: "clamp(16px, 1.4vw, 18px)",
                  lineHeight: 1.55,
                  color: STEEL_700,
                  margin: 0,
                  maxWidth: "36ch",
                  fontVariationSettings: '"opsz" 14',
                }}
              >
                {s.body}
              </p>
            </div>
            <div className="strata-step-proof">
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 10,
                  fontWeight: 500,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: STEEL_600,
                }}
              >
                {s.proof}
              </span>
            </div>
          </div>
        </section>
      ))}

      {/* Band 5 — trust */}
      <section className="strata-band">
        <div className="strata-inset">
          <div
            style={{
              fontFamily: MONO,
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: STEEL_500,
              marginBottom: 28,
            }}
          >
            {isClient ? "Why Renner" : "What you get"}
          </div>
          <div
            className="strata-trust"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "clamp(24px, 3vw, 48px)",
            }}
          >
            {trust.map(([label, body]) => (
              <div key={label}>
                <div style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 20, color: INK, marginBottom: 6, fontVariationSettings: '"opsz" 36' }}>
                  {label}.
                </div>
                <div style={{ fontFamily: SERIF, fontSize: 14, lineHeight: 1.55, color: STEEL_700, fontVariationSettings: '"opsz" 14' }}>
                  {body}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Band 6 — CTA */}
      {showCta && (
        <section className="strata-band strata-cta">
          <div className="strata-inset" style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
            <h2
              style={{
                fontFamily: SERIF,
                fontWeight: 400,
                fontSize: "clamp(28px, 3.4vw, 44px)",
                lineHeight: 1.05,
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
                padding: "16px 28px",
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
        .strata-band {
          width: 100vw;
          margin-left: calc(50% - 50vw);
          padding: clamp(64px, 9vw, 128px) clamp(28px, 4vw, 64px);
          border-top: 1px solid ${INK};
        }
        .strata-band:last-child {
          border-bottom: 1px solid ${INK};
        }
        .strata-inset {
          max-width: 1200px;
          margin: 0 auto;
        }
        .strata-step {
          padding: clamp(80px, 12vw, 168px) clamp(28px, 4vw, 64px);
        }
        .strata-step-grid {
          display: grid;
          grid-template-columns: 80px minmax(0, 2fr) minmax(0, 1.2fr) 140px;
          gap: clamp(24px, 3vw, 48px);
          align-items: baseline;
        }
        .strata-step-proof {
          text-align: right;
        }
        @media (max-width: 880px) {
          .strata-step-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .strata-step-proof {
            text-align: left;
          }
          .strata-trust {
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
