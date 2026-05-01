"use client";

import Link from "next/link";
import { useState } from "react";
import { Card, CLIENT_KINDS, RENNER_KINDS } from "../_illustrations";

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

export function CenterBody({ showCta }: { showCta: boolean }) {
  const [tab, setTab] = useState<"client" | "renner">("client");
  const isClient = tab === "client";
  const dek = isClient ? CLIENT_DEK : RENNER_DEK;
  const steps = isClient ? CLIENT_STEPS : RENNER_STEPS;
  const kinds = isClient ? CLIENT_KINDS : RENNER_KINDS;
  const cta = isClient ? { label: "Sign up", href: "/signup" } : { label: "Become a Renner", href: "/become-a-renner" };

  return (
    <div style={{ textAlign: "center" }}>
      <div role="tablist" aria-label="Audience" style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 14, marginBottom: "clamp(40px, 5vw, 56px)", fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 16 }}>
        <Tab label="For clients" active={isClient} onClick={() => setTab("client")} />
        <span aria-hidden style={{ color: STEEL_300, fontStyle: "normal" }}>·</span>
        <Tab label="For Renners" active={!isClient} onClick={() => setTab("renner")} />
      </div>

      <h1
        style={{
          fontFamily: SERIF,
          fontWeight: 400,
          fontSize: "clamp(40px, 6vw, 88px)",
          lineHeight: 0.98,
          letterSpacing: "-0.028em",
          color: INK,
          margin: "0 auto",
          marginBottom: 24,
          maxWidth: "20ch",
          fontVariationSettings: '"opsz" 144',
        }}
      >
        {isClient ? "Post a task. Pick a Renner. Get it done." : "Get verified. Pick a task. Get it done."}
      </h1>
      <p style={{ fontFamily: SERIF, fontSize: "clamp(17px, 1.5vw, 19px)", lineHeight: 1.55, color: STEEL_700, margin: "0 auto", marginBottom: "clamp(64px, 8vw, 96px)", maxWidth: "44ch", fontVariationSettings: '"opsz" 14' }}>
        {dek}
      </p>

      {/* Three cards centered in a row */}
      <div className="center-row" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "clamp(20px, 2.4vw, 32px)", marginBottom: "clamp(40px, 5vw, 56px)", textAlign: "left" }}>
        {kinds.map((kind) => (
          <div key={kind} style={{ display: "flex" }}>
            <div style={{ flex: 1 }}>
              <Card kind={kind} />
            </div>
          </div>
        ))}
      </div>

      {/* Captions row centered */}
      <div className="center-captions" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "clamp(20px, 2.4vw, 32px)", marginBottom: "clamp(64px, 8vw, 96px)" }}>
        {steps.map((s) => (
          <div key={s.number} style={{ textAlign: "center" }}>
            <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: STEEL_500, marginBottom: 10 }}>
              {s.number} · {s.proof}
            </div>
            <div style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(20px, 2vw, 24px)", lineHeight: 1.1, color: INK, marginBottom: 8, fontVariationSettings: '"opsz" 36' }}>
              {s.title}
            </div>
            <p style={{ fontFamily: SERIF, fontSize: 15, lineHeight: 1.55, color: STEEL_700, margin: "0 auto", maxWidth: "32ch", fontVariationSettings: '"opsz" 14' }}>
              {s.body}
            </p>
          </div>
        ))}
      </div>

      {/* Trust line — centered, single sentence */}
      <p style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(18px, 1.7vw, 22px)", lineHeight: 1.5, color: INK, margin: "0 auto", marginBottom: showCta ? "clamp(40px, 5vw, 56px)" : 0, maxWidth: "52ch", paddingTop: "clamp(28px, 3.5vw, 36px)", borderTop: `1px solid ${INK}`, fontVariationSettings: '"opsz" 36' }}>
        Both sides — clients and Renners — are ID-verified and Checkr-cleared before any booking.
      </p>

      {showCta && (
        <section style={{ display: "flex", justifyContent: "center" }}>
          <Link href={cta.href} style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: SANS, fontSize: 14, fontWeight: 500, color: PAPER, backgroundColor: INK, border: `1px solid ${INK}`, borderRadius: 4, padding: "14px 22px", textDecoration: "none" }}>
            {cta.label}
            <span aria-hidden style={{ opacity: 0.7 }}>→</span>
          </Link>
        </section>
      )}

      <style jsx>{`
        @media (max-width: 880px) {
          .center-row,
          .center-captions {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
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
