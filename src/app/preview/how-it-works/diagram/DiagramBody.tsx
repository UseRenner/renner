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

export function DiagramBody({ showCta }: { showCta: boolean }) {
  const [tab, setTab] = useState<"client" | "renner">("client");
  const isClient = tab === "client";
  const dek = isClient ? CLIENT_DEK : RENNER_DEK;
  const steps = isClient ? CLIENT_STEPS : RENNER_STEPS;
  const cta = isClient ? { label: "Sign up", href: "/signup" } : { label: "Become a Renner", href: "/become-a-renner" };

  return (
    <>
      <div role="tablist" aria-label="Audience" style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: "clamp(40px, 5vw, 56px)", fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 16 }}>
        <Tab label="For clients" active={isClient} onClick={() => setTab("client")} />
        <span aria-hidden style={{ color: STEEL_300, fontStyle: "normal" }}>·</span>
        <Tab label="For Renners" active={!isClient} onClick={() => setTab("renner")} />
      </div>

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

      {/* Flow row — nodes joined by arrows */}
      <div className="diagram-flow" style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr auto 1fr", alignItems: "stretch", gap: "clamp(12px, 2vw, 24px)", marginBottom: "clamp(56px, 7vw, 88px)" }}>
        {steps.flatMap((s, i) => {
          const node = (
            <article
              key={`node-${s.number}`}
              className="diagram-node"
              style={{
                border: `1px solid ${INK}`,
                padding: "clamp(20px, 2.5vw, 32px)",
                display: "flex",
                flexDirection: "column",
                gap: 12,
                minHeight: 200,
                backgroundColor: PAPER,
              }}
            >
              <div style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: "0.24em", color: STEEL_500 }}>{s.number}</div>
              <h3 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(22px, 2.4vw, 30px)", lineHeight: 1.05, letterSpacing: "-0.02em", color: INK, margin: 0, fontVariationSettings: '"opsz" 60' }}>{s.title}</h3>
              <p style={{ fontFamily: SERIF, fontSize: 15, lineHeight: 1.55, color: STEEL_700, margin: 0, fontVariationSettings: '"opsz" 14' }}>{s.body}</p>
              <div style={{ marginTop: "auto", paddingTop: 10, fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: STEEL_600 }}>{s.proof}</div>
            </article>
          );
          if (i === steps.length - 1) return [node];
          const arrow = (
            <div
              key={`arrow-${s.number}`}
              aria-hidden
              className="diagram-arrow"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", color: INK, fontFamily: SANS, fontSize: 22, fontWeight: 300 }}
            >
              →
            </div>
          );
          return [node, arrow];
        })}
      </div>

      {/* Trust row — same diagrammatic register, smaller */}
      <div className="diagram-trust" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(20px, 3vw, 40px)", paddingTop: "clamp(20px, 2.5vw, 28px)", borderTop: `1px solid ${INK}`, marginBottom: showCta ? "clamp(48px, 6vw, 72px)" : 0 }}>
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
            <div style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 18, color: INK, marginBottom: 6, fontVariationSettings: '"opsz" 36' }}>
              {label}.
            </div>
            <div style={{ fontFamily: SERIF, fontSize: 14, lineHeight: 1.55, color: STEEL_700, fontVariationSettings: '"opsz" 14' }}>
              {body}
            </div>
          </div>
        ))}
      </div>

      {showCta && (
        <section style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", gap: 16, paddingTop: "clamp(40px, 5vw, 64px)" }}>
          <span aria-hidden style={{ fontFamily: SANS, fontSize: 22, fontWeight: 300, color: INK }}>→</span>
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
          .diagram-flow {
            grid-template-columns: 1fr !important;
          }
          .diagram-arrow {
            transform: rotate(90deg);
            min-height: 32px;
          }
          .diagram-trust {
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
