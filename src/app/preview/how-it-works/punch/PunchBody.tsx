"use client";

import Link from "next/link";
import { useState } from "react";

const SERIF = "var(--font-source-serif), ui-serif, Georgia, serif";
const SANS = "var(--font-source-sans), ui-sans-serif, system-ui, sans-serif";
const MONO = "var(--font-source-code), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const INK = "#0d0f12";
const STEEL_700 = "#4d5b6a";
const STEEL_500 = "#7d8da0";
const STEEL_300 = "#cad1d8";
const RULE = "#eaedf0";
const PAPER = "#fbfbfc";
const PAPER_DIM = "rgba(251,251,252,0.62)";

type Step = { number: string; title: string; body: string; proof: string };

const CLIENT_DEK = "A marketplace for real-estate work. Post a task, pick a Renner, get it done. Both sides are screened to join.";
const RENNER_DEK = "Real-estate work, paid through the platform. Set your area, set your rate, pick what you take. Both sides are screened to join.";

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

export function PunchBody({ showCta }: { showCta: boolean }) {
  const [tab, setTab] = useState<"client" | "renner">("client");
  const isClient = tab === "client";
  const dek = isClient ? CLIENT_DEK : RENNER_DEK;
  const steps = isClient ? CLIENT_STEPS : RENNER_STEPS;
  const cta = isClient ? { label: "Sign up", href: "/signup" } : { label: "Become a Renner", href: "/become-a-renner" };

  return (
    <>
      {/* Hero ink block */}
      <section
        style={{
          backgroundColor: INK,
          color: PAPER,
          padding: "clamp(40px, 6vw, 96px) clamp(28px, 4vw, 64px)",
          marginBottom: 6,
        }}
      >
        <div
          role="tablist"
          aria-label="Audience"
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 14,
            marginBottom: "clamp(40px, 5vw, 64px)",
            fontFamily: SERIF,
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: 16,
            color: PAPER_DIM,
          }}
        >
          <button
            type="button"
            onClick={() => setTab("client")}
            style={{ background: "none", border: "none", padding: 0, fontFamily: "inherit", fontStyle: "inherit", fontSize: "inherit", fontWeight: "inherit", color: isClient ? PAPER : PAPER_DIM, cursor: "pointer" }}
          >
            For clients
          </button>
          <span aria-hidden style={{ color: PAPER_DIM, fontStyle: "normal" }}>·</span>
          <button
            type="button"
            onClick={() => setTab("renner")}
            style={{ background: "none", border: "none", padding: 0, fontFamily: "inherit", fontStyle: "inherit", fontSize: "inherit", fontWeight: "inherit", color: !isClient ? PAPER : PAPER_DIM, cursor: "pointer" }}
          >
            For Renners
          </button>
        </div>

        <h1
          style={{
            fontFamily: SERIF,
            fontWeight: 400,
            fontSize: "clamp(48px, 8vw, 128px)",
            lineHeight: 0.92,
            letterSpacing: "-0.035em",
            color: PAPER,
            margin: 0,
            marginBottom: "clamp(28px, 3.5vw, 40px)",
            maxWidth: "16ch",
            fontVariationSettings: '"opsz" 144',
          }}
        >
          {isClient ? "Post. Pick. Done." : "Verify. Pick. Done."}
        </h1>
        <p
          style={{
            fontFamily: SERIF,
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(18px, 1.7vw, 22px)",
            lineHeight: 1.5,
            color: PAPER_DIM,
            margin: 0,
            maxWidth: "44ch",
            fontVariationSettings: '"opsz" 36',
          }}
        >
          {dek}
        </p>
      </section>

      {/* Step rows — alternating ink/paper for the punch */}
      {steps.map((s, i) => {
        const dark = i % 2 === 0;
        return (
          <section
            key={s.number}
            style={{
              backgroundColor: dark ? INK : PAPER,
              color: dark ? PAPER : INK,
              padding: "clamp(36px, 5vw, 64px) clamp(28px, 4vw, 64px)",
              marginBottom: 6,
              display: "grid",
              gridTemplateColumns: "minmax(80px, 120px) minmax(0, 1fr) minmax(140px, 200px)",
              gap: "clamp(20px, 3vw, 48px)",
              alignItems: "baseline",
            }}
            className="punch-row"
          >
            <div style={{ fontFamily: MONO, fontSize: 12, fontWeight: 500, letterSpacing: "0.24em", color: dark ? PAPER_DIM : STEEL_500 }}>
              {s.number}
            </div>
            <div>
              <h2
                style={{
                  fontFamily: SERIF,
                  fontWeight: 400,
                  fontSize: "clamp(28px, 3.4vw, 44px)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.025em",
                  margin: 0,
                  marginBottom: 12,
                  color: dark ? PAPER : INK,
                  fontVariationSettings: '"opsz" 96',
                }}
              >
                {s.title}
              </h2>
              <p
                style={{
                  fontFamily: SERIF,
                  fontSize: 16,
                  lineHeight: 1.6,
                  margin: 0,
                  maxWidth: "44ch",
                  color: dark ? PAPER_DIM : STEEL_700,
                  fontVariationSettings: '"opsz" 14',
                }}
              >
                {s.body}
              </p>
            </div>
            <div
              style={{
                fontFamily: MONO,
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                textAlign: "right",
                color: dark ? PAPER_DIM : STEEL_700,
              }}
            >
              {s.proof}
            </div>
          </section>
        );
      })}

      {/* Trust ink block */}
      <section
        style={{
          backgroundColor: INK,
          color: PAPER,
          padding: "clamp(36px, 5vw, 64px) clamp(28px, 4vw, 64px)",
          marginBottom: showCta ? 6 : 0,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "clamp(20px, 3vw, 48px)",
        }}
        className="punch-trust"
      >
        {(isClient
          ? [
              ["Both sides vetted", "ID and Checkr before any booking."],
              ["Funds in escrow", "Held by Stripe until you confirm."],
              ["On the record", "Photos and a note on every task."],
            ]
          : [
              ["Real work", "From agents, brokers, managers."],
              ["Vetted clients", "ID and Checkr, same as you."],
              ["Repeat work", "A reputation paid in repeat clients."],
            ]
        ).map(([label, body]) => (
          <div key={label}>
            <div style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 18, color: PAPER, marginBottom: 6, fontVariationSettings: '"opsz" 36' }}>
              {label}.
            </div>
            <div style={{ fontFamily: SERIF, fontSize: 14, lineHeight: 1.55, color: PAPER_DIM, fontVariationSettings: '"opsz" 14' }}>
              {body}
            </div>
          </div>
        ))}
      </section>

      {showCta && (
        <section
          style={{
            backgroundColor: PAPER,
            padding: "clamp(28px, 3.5vw, 48px) clamp(28px, 4vw, 64px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
            border: `1px solid ${INK}`,
            marginTop: 0,
          }}
        >
          <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(20px, 2vw, 26px)", color: INK, fontVariationSettings: '"opsz" 36' }}>
            {isClient ? "Get something done." : "Start running."}
          </span>
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
        @media (max-width: 720px) {
          .punch-row {
            grid-template-columns: 40px 1fr !important;
            gap: 8px 16px !important;
          }
          .punch-row > :nth-child(3) {
            grid-column: 2;
            text-align: left !important;
          }
          .punch-trust {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
      `}</style>
    </>
  );
}
