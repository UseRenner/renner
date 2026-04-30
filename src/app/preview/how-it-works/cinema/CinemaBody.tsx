"use client";

import Link from "next/link";
import { useState } from "react";

const SERIF = "var(--font-source-serif), ui-serif, Georgia, serif";
const SANS = "var(--font-source-sans), ui-sans-serif, system-ui, sans-serif";
const MONO = "var(--font-source-code), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const INK = "#0d0f12";
const STEEL_700 = "#4d5b6a";
const STEEL_600 = "#647589";
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

export function CinemaBody({ showCta }: { showCta: boolean }) {
  const [tab, setTab] = useState<"client" | "renner">("client");
  const isClient = tab === "client";
  const dek = isClient ? CLIENT_DEK : RENNER_DEK;
  const steps = isClient ? CLIENT_STEPS : RENNER_STEPS;
  const cta = isClient ? { label: "Sign up", href: "/signup" } : { label: "Become a Renner", href: "/become-a-renner" };

  return (
    <>
      {/* Letterbox hero — 2.39:1 ratio, ink panel with serif H1 */}
      <section
        style={{
          backgroundColor: INK,
          color: PAPER,
          aspectRatio: "2.39 / 1",
          minHeight: 320,
          padding: "clamp(28px, 4vw, 64px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          marginBottom: "clamp(40px, 5vw, 64px)",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.24em", textTransform: "uppercase", color: PAPER_DIM, flexWrap: "wrap" }}>
          <span>How it works</span>
          <span>Both sides screened to join</span>
        </div>

        <h1
          style={{
            fontFamily: SERIF,
            fontWeight: 400,
            fontSize: "clamp(40px, 6vw, 88px)",
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
            color: PAPER,
            margin: 0,
            maxWidth: "16ch",
            fontVariationSettings: '"opsz" 144',
          }}
        >
          {isClient ? "Post a task. Pick a Renner. Get it done." : "Get verified. Pick a task. Get it done."}
        </h1>

        <p
          style={{
            fontFamily: SERIF,
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(15px, 1.4vw, 18px)",
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

      <div role="tablist" aria-label="Audience" style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: "clamp(40px, 5vw, 56px)", fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 16 }}>
        <Tab label="For clients" active={isClient} onClick={() => setTab("client")} />
        <span aria-hidden style={{ color: STEEL_300, fontStyle: "normal" }}>·</span>
        <Tab label="For Renners" active={!isClient} onClick={() => setTab("renner")} />
      </div>

      {/* Step rows */}
      <div style={{ marginBottom: "clamp(48px, 6vw, 80px)" }}>
        {steps.map((s, i) => (
          <article
            key={s.number}
            style={{
              padding: "clamp(28px, 3.5vw, 40px) 0",
              borderTop: i === 0 ? `1px solid ${INK}` : "none",
              borderBottom: i === steps.length - 1 ? `1px solid ${INK}` : `1px solid ${RULE}`,
              display: "grid",
              gridTemplateColumns: "minmax(120px, 160px) minmax(0, 1fr) minmax(140px, 200px)",
              gap: "clamp(20px, 3vw, 48px)",
              alignItems: "baseline",
            }}
            className="cinema-row"
          >
            <div style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: "0.24em", textTransform: "uppercase", color: STEEL_500 }}>
              {s.number}
            </div>
            <div>
              <h3 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(24px, 2.8vw, 36px)", lineHeight: 1.05, letterSpacing: "-0.022em", color: INK, margin: 0, marginBottom: 10, fontVariationSettings: '"opsz" 60' }}>
                {s.title}
              </h3>
              <p style={{ fontFamily: SERIF, fontSize: 16, lineHeight: 1.6, color: STEEL_700, margin: 0, fontVariationSettings: '"opsz" 14' }}>
                {s.body}
              </p>
            </div>
            <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: STEEL_600, textAlign: "right" }}>
              {s.proof}
            </div>
          </article>
        ))}
      </div>

      {/* Trust strip + credits CTA */}
      <section
        className="cinema-credits"
        style={{
          backgroundColor: INK,
          color: PAPER,
          padding: "clamp(28px, 3.5vw, 48px) clamp(28px, 4vw, 64px)",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "clamp(20px, 3vw, 48px)",
          marginBottom: showCta ? "clamp(28px, 3.5vw, 40px)" : 0,
        }}
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
            <div style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 17, color: PAPER, marginBottom: 6, fontVariationSettings: '"opsz" 36' }}>
              {label}.
            </div>
            <div style={{ fontFamily: SERIF, fontSize: 14, lineHeight: 1.55, color: PAPER_DIM, fontVariationSettings: '"opsz" 14' }}>
              {body}
            </div>
          </div>
        ))}
      </section>

      {showCta && (
        <section style={{ display: "flex", justifyContent: "center", paddingTop: "clamp(20px, 2.5vw, 28px)" }}>
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
          .cinema-row {
            grid-template-columns: 80px 1fr !important;
            gap: 8px 16px !important;
          }
          .cinema-row > :nth-child(3) {
            grid-column: 2;
            text-align: left !important;
          }
          .cinema-credits {
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
      style={{ background: "none", border: "none", padding: 0, fontFamily: "inherit", fontStyle: "inherit", fontSize: "inherit", fontWeight: "inherit", color: active ? INK : STEEL_500, cursor: "pointer" }}
    >
      {label}
    </button>
  );
}
