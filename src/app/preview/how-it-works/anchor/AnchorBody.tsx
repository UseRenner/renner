"use client";

import Link from "next/link";
import { useState } from "react";
import { Card, CLIENT_KINDS, RENNER_KINDS } from "../_illustrations";

const SERIF = "var(--font-source-serif), ui-serif, Georgia, serif";
const SANS = "var(--font-source-sans), ui-sans-serif, system-ui, sans-serif";
const MONO = "var(--font-source-code), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const INK = "#0d0f12";
const PAPER = "#fbfbfc";
const PAPER_DIM = "rgba(251,251,252,0.78)";
const PAPER_FOG = "rgba(251,251,252,0.52)";
const PAPER_RULE = "rgba(251,251,252,0.22)";
const PAPER_HAIR = "rgba(251,251,252,0.10)";

const CLIENT_DEK = "A marketplace for real-estate work. Post a task, pick a Renner, get it done. Both sides are screened to join.";
const RENNER_DEK = "Real-estate work, paid through the platform. Set your area, set your rate, pick what you take. Both sides are screened to join.";

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

export function AnchorBody({ showCta }: { showCta: boolean }) {
  const [tab, setTab] = useState<"client" | "renner">("client");
  const isClient = tab === "client";
  const dek = isClient ? CLIENT_DEK : RENNER_DEK;
  const steps = isClient ? CLIENT_STEPS : RENNER_STEPS;
  const cta = isClient ? { label: "Sign up", href: "/signup" } : { label: "Become a Renner", href: "/become-a-renner" };

  return (
    <div style={{ minHeight: "min(820px, 80vh)", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
        <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: PAPER_FOG }}>
          How it works
        </span>
        <div role="tablist" aria-label="Audience" style={{ display: "flex", alignItems: "baseline", gap: 14, fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 16 }}>
          <Tab label="For clients" active={isClient} onClick={() => setTab("client")} />
          <span aria-hidden style={{ color: PAPER_FOG, fontStyle: "normal" }}>·</span>
          <Tab label="For Renners" active={!isClient} onClick={() => setTab("renner")} />
        </div>
      </div>

      <p style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(24px, 3vw, 36px)", lineHeight: 1.3, color: PAPER, margin: 0, marginTop: "clamp(48px, 6vw, 72px)", maxWidth: "32ch", fontVariationSettings: '"opsz" 36' }}>
        {dek}
      </p>

      <div className="anchor-cards" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "clamp(20px, 2.4vw, 32px)", marginTop: "clamp(56px, 7vw, 88px)" }}>
        {(isClient ? CLIENT_KINDS : RENNER_KINDS).map((kind) => (
          <div key={kind} style={{ display: "flex" }}>
            <div style={{ flex: 1 }}>
              <Card kind={kind} />
            </div>
          </div>
        ))}
      </div>

      <div style={{ flex: 1, minHeight: "clamp(64px, 8vw, 112px)" }} />

      <ol style={{ listStyle: "none", margin: 0, padding: 0, borderTop: `1px solid ${PAPER}` }}>
        {steps.map((s, i) => (
          <li
            key={s.number}
            className="anchor-row"
            style={{
              display: "grid",
              gridTemplateColumns: "56px minmax(180px, 1fr) minmax(0, 2.4fr) minmax(140px, auto)",
              gap: "clamp(20px, 2.5vw, 36px)",
              padding: "clamp(22px, 2.6vw, 32px) 0",
              borderBottom: i === steps.length - 1 ? "none" : `1px solid ${PAPER_HAIR}`,
              alignItems: "baseline",
            }}
          >
            <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: "0.22em", color: PAPER_FOG }}>{s.number}</span>
            <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(22px, 2.4vw, 28px)", lineHeight: 1.1, color: PAPER, fontVariationSettings: '"opsz" 36' }}>{s.title}</span>
            <span style={{ fontFamily: SERIF, fontSize: 16, lineHeight: 1.55, color: PAPER_DIM, fontVariationSettings: '"opsz" 14' }}>{s.body}</span>
            <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: PAPER, textAlign: "right" }}>{s.proof}</span>
          </li>
        ))}
      </ol>

      {showCta && (
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "clamp(28px, 3.5vw, 40px)" }}>
          <Link
            href={cta.href}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              fontFamily: SANS,
              fontSize: 14,
              fontWeight: 500,
              color: INK,
              backgroundColor: PAPER,
              border: `1px solid ${PAPER}`,
              borderRadius: 4,
              padding: "14px 22px",
              textDecoration: "none",
            }}
          >
            {cta.label}
            <span aria-hidden style={{ opacity: 0.7 }}>→</span>
          </Link>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 880px) {
          .anchor-cards {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
        @media (max-width: 760px) {
          .anchor-row {
            grid-template-columns: 40px 1fr !important;
            gap: 8px 14px !important;
          }
          .anchor-row > :nth-child(3),
          .anchor-row > :nth-child(4) {
            grid-column: 2;
          }
          .anchor-row > :nth-child(4) {
            text-align: left !important;
          }
        }
      `}</style>
    </div>
  );
}

function Tab({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      style={{ background: "none", border: "none", padding: 0, fontFamily: "inherit", fontStyle: "inherit", fontSize: "inherit", fontWeight: "inherit", color: active ? "#fbfbfc" : "rgba(251,251,252,0.52)", cursor: "pointer" }}
    >
      {label}
    </button>
  );
}
