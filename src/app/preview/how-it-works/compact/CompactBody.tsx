"use client";

import Link from "next/link";
import { useState } from "react";
import { Mini, CLIENT_KINDS, RENNER_KINDS } from "../_illustrations";

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

const CLIENT_DEK = "A marketplace for real-estate work. Both sides are screened to join.";
const RENNER_DEK = "Real-estate work, paid through the platform. Both sides are screened to join.";

const CLIENT_STEPS = [
  { number: "01", title: "Post a task.", body: "Where, when, what, how much. Two minutes.", proof: "Under 2 min" },
  { number: "02", title: "Pick a Renner.", body: "Vetted Renners apply. Read the file. Book one.", proof: "Checkr-vetted" },
  { number: "03", title: "Get it done.", body: "Photos arrive. You confirm. Stripe pays.", proof: "Stripe escrow" },
];
const RENNER_STEPS = [
  { number: "01", title: "Get verified.", body: "ID, background check, area, rate. Same day.", proof: "Same-day" },
  { number: "02", title: "Pick a task.", body: "Briefs from agents and managers nearby. Apply.", proof: "Local" },
  { number: "03", title: "Get it done.", body: "Run the task. Send photos. Get paid.", proof: "100% of pay" },
];

export function CompactBody({ showCta }: { showCta: boolean }) {
  const [tab, setTab] = useState<"client" | "renner">("client");
  const isClient = tab === "client";
  const dek = isClient ? CLIENT_DEK : RENNER_DEK;
  const steps = isClient ? CLIENT_STEPS : RENNER_STEPS;
  const kinds = isClient ? CLIENT_KINDS : RENNER_KINDS;
  const cta = isClient ? { label: "Sign up", href: "/signup" } : { label: "Become a Renner", href: "/become-a-renner" };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "clamp(28px, 3.5vw, 40px)" }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
        <h1
          style={{
            fontFamily: SERIF,
            fontWeight: 400,
            fontSize: "clamp(32px, 4.5vw, 56px)",
            lineHeight: 1.0,
            letterSpacing: "-0.025em",
            color: INK,
            margin: 0,
            maxWidth: "20ch",
            fontVariationSettings: '"opsz" 96',
          }}
        >
          {isClient ? "Post a task. Pick a Renner. Get it done." : "Get verified. Pick a task. Get it done."}
        </h1>
        <div role="tablist" aria-label="Audience" style={{ display: "flex", alignItems: "baseline", gap: 14, fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 16 }}>
          <Tab label="For clients" active={isClient} onClick={() => setTab("client")} />
          <span aria-hidden style={{ color: STEEL_300, fontStyle: "normal" }}>·</span>
          <Tab label="For Renners" active={!isClient} onClick={() => setTab("renner")} />
        </div>
      </div>

      <p style={{ fontFamily: SERIF, fontSize: "clamp(17px, 1.5vw, 19px)", lineHeight: 1.55, color: STEEL_700, margin: 0, maxWidth: "60ch", fontVariationSettings: '"opsz" 14' }}>
        {dek}
      </p>

      {/* Three rows; each holds number + title + body + proof + Mini, in line */}
      <div style={{ borderTop: `1px solid ${INK}`, borderBottom: `1px solid ${INK}` }}>
        {steps.map((s, i) => (
          <article
            key={s.number}
            className="compact-row"
            style={{
              display: "grid",
              gridTemplateColumns: "44px minmax(180px, 1fr) minmax(0, 1.4fr) minmax(140px, auto) minmax(280px, 320px)",
              gap: "clamp(16px, 2.4vw, 28px)",
              padding: "clamp(20px, 2.4vw, 28px) 0",
              borderBottom: i === steps.length - 1 ? "none" : `1px solid ${RULE}`,
              alignItems: "center",
            }}
          >
            <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: "0.22em", color: STEEL_500 }}>{s.number}</span>
            <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(20px, 2vw, 24px)", lineHeight: 1.1, color: INK, fontVariationSettings: '"opsz" 36' }}>
              {s.title}
            </span>
            <span style={{ fontFamily: SERIF, fontSize: 15, lineHeight: 1.55, color: STEEL_700, fontVariationSettings: '"opsz" 14' }}>
              {s.body}
            </span>
            <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: STEEL_600, textAlign: "right" }}>
              {s.proof}
            </span>
            <div className="compact-illustration" style={{ display: "flex", justifyContent: "flex-end" }}>
              <Mini kind={kinds[i]} />
            </div>
          </article>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: STEEL_500 }}>
          Both sides screened to join · ID + Checkr · Stripe escrow
        </span>
        {showCta && (
          <Link href={cta.href} style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: SANS, fontSize: 14, fontWeight: 500, color: PAPER, backgroundColor: INK, border: `1px solid ${INK}`, borderRadius: 4, padding: "12px 20px", textDecoration: "none" }}>
            {cta.label}
            <span aria-hidden style={{ opacity: 0.7 }}>→</span>
          </Link>
        )}
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .compact-row {
            grid-template-columns: 44px minmax(180px, 1fr) minmax(0, 1.4fr) minmax(140px, auto) !important;
          }
          .compact-illustration {
            display: none !important;
          }
        }
        @media (max-width: 720px) {
          .compact-row {
            grid-template-columns: 36px 1fr !important;
            gap: 8px 14px !important;
          }
          .compact-row > :nth-child(3),
          .compact-row > :nth-child(4) {
            grid-column: 2;
          }
          .compact-row > :nth-child(4) {
            text-align: left !important;
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
