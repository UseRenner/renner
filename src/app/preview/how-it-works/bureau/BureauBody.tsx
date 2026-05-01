"use client";

import Link from "next/link";
import { useState } from "react";
import { Mini, CLIENT_KINDS, RENNER_KINDS } from "../_illustrations";

const SERIF = "var(--font-source-serif), ui-serif, Georgia, serif";
const SANS = "var(--font-source-sans), ui-sans-serif, system-ui, sans-serif";
const MONO = "var(--font-source-code), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const INK = "var(--c-text, #0d0f12)";
const STEEL_700 = "var(--c-700, #38414d)";
const STEEL_600 = "var(--c-600, #647589)";
const STEEL_300 = "var(--c-300, #a7b2be)";
const RULE = "var(--c-rule, #eaedf0)";
const PAPER = "var(--c-bg, #fbfbfc)";

const CLIENT_DEK = "A marketplace for real-estate work. Post a task, pick a Renner, get it done. Both sides are screened to join.";
const RENNER_DEK = "Real-estate work, paid through the platform. Set your area, set your rate, pick what you take. Both sides are screened to join.";

const CLIENT_STEPS = [
  { number: "01", title: "Post a task", body: "Where, when, what, how much. Two minutes.", proof: "Under 2 min" },
  { number: "02", title: "Pick a Renner", body: "Vetted Renners apply. Read the file. Book one.", proof: "Checkr-vetted" },
  { number: "03", title: "Get it done", body: "Photos arrive. You confirm. Stripe pays.", proof: "Stripe escrow" },
];
const RENNER_STEPS = [
  { number: "01", title: "Get verified", body: "ID, background check, area, rate. Same day.", proof: "Same-day" },
  { number: "02", title: "Pick a task", body: "Briefs from agents and managers nearby. Apply.", proof: "Local" },
  { number: "03", title: "Get it done", body: "Run the task. Send photos. Get paid.", proof: "100% of pay" },
];

const SECTION_LABEL: React.CSSProperties = {
  fontFamily: SANS,
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.28em",
  textTransform: "uppercase",
  color: INK,
};

export function BureauBody({ showCta }: { showCta: boolean }) {
  const [tab, setTab] = useState<"client" | "renner">("client");
  const isClient = tab === "client";
  const dek = isClient ? CLIENT_DEK : RENNER_DEK;
  const steps = isClient ? CLIENT_STEPS : RENNER_STEPS;
  const kinds = isClient ? CLIENT_KINDS : RENNER_KINDS;
  const cta = isClient ? { label: "Sign up", href: "/signup" } : { label: "Become a Renner", href: "/become-a-renner" };

  return (
    <>
      <div style={{ borderTop: `2px solid ${INK}`, borderBottom: `1px solid ${INK}`, padding: "16px 0", marginBottom: "clamp(48px, 6vw, 72px)", display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <span style={SECTION_LABEL}>How it works</span>
        <div role="tablist" aria-label="Audience" style={{ display: "flex", alignItems: "baseline", gap: 18, ...SECTION_LABEL, color: STEEL_600 }}>
          <Tab label="For clients" active={isClient} onClick={() => setTab("client")} />
          <span aria-hidden style={{ color: STEEL_300 }}>/</span>
          <Tab label="For Renners" active={!isClient} onClick={() => setTab("renner")} />
        </div>
      </div>

      <p style={{ fontFamily: SANS, fontWeight: 500, fontSize: "clamp(24px, 3vw, 36px)", lineHeight: 1.3, letterSpacing: "-0.012em", color: INK, margin: 0, marginBottom: "clamp(64px, 8vw, 96px)", maxWidth: "32ch" }}>
        {dek}
      </p>

      <div style={{ borderTop: `1px solid ${INK}`, borderBottom: `1px solid ${INK}`, marginBottom: "clamp(56px, 7vw, 88px)" }}>
        {steps.map((s, i) => (
          <article key={s.number} className="bureau-row" style={{ display: "grid", gridTemplateColumns: "60px minmax(160px, 1fr) minmax(0, 2.4fr) minmax(140px, auto) minmax(280px, 320px)", gap: "clamp(20px, 2.4vw, 32px)", padding: "clamp(28px, 3.5vw, 40px) 0", borderBottom: i === steps.length - 1 ? "none" : `1px solid ${RULE}`, alignItems: "center" }}>
            <span style={{ fontFamily: MONO, fontSize: 13, fontWeight: 500, color: INK }}>{s.number}</span>
            <h3 style={{ fontFamily: SANS, fontWeight: 600, fontSize: "clamp(20px, 2.2vw, 26px)", lineHeight: 1.15, letterSpacing: "-0.012em", color: INK, margin: 0 }}>
              {s.title}
            </h3>
            <p style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 16, lineHeight: 1.65, color: STEEL_700, margin: 0, fontVariationSettings: '"opsz" 14' }}>
              {s.body}
            </p>
            <span style={{ ...SECTION_LABEL, color: INK, textAlign: "right" }}>
              {s.proof}
            </span>
            <div className="bureau-illustration" style={{ display: "flex", justifyContent: "flex-end" }}>
              <Mini kind={kinds[i]} />
            </div>
          </article>
        ))}
      </div>

      <div style={{ borderTop: `1px solid ${INK}`, borderBottom: `1px solid ${INK}`, marginBottom: showCta ? "clamp(56px, 7vw, 88px)" : 0 }}>
        {(isClient
          ? [
              ["01", "Both sides vetted", "ID and Checkr before any booking."],
              ["02", "Funds in escrow", "Held by Stripe until you confirm."],
              ["03", "On the record", "Photos and a note on every task."],
            ]
          : [
              ["01", "Real work", "From agents, brokers, managers."],
              ["02", "Vetted clients", "ID and Checkr, same as you."],
              ["03", "Repeat work", "A reputation paid in repeat clients."],
            ]
        ).map(([num, label, body], i, arr) => (
          <div key={num} className="bureau-provisions" style={{ display: "grid", gridTemplateColumns: "80px minmax(180px, 240px) minmax(0, 1fr)", gap: "clamp(20px, 2.4vw, 36px)", padding: "20px 0", borderBottom: i === arr.length - 1 ? "none" : `1px solid ${RULE}`, alignItems: "baseline" }}>
            <span style={{ fontFamily: MONO, fontSize: 12, fontWeight: 500, color: STEEL_600, letterSpacing: "0.08em" }}>{num}</span>
            <span style={{ fontFamily: SANS, fontWeight: 600, fontSize: 16, color: INK, letterSpacing: "-0.005em" }}>{label}</span>
            <span style={{ fontFamily: SERIF, fontSize: 16, lineHeight: 1.6, color: STEEL_700, fontVariationSettings: '"opsz" 14' }}>{body}</span>
          </div>
        ))}
      </div>

      {showCta && (
        <section style={{ display: "flex", justifyContent: "flex-start" }}>
          <Link href={cta.href} style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: SANS, fontSize: 14, fontWeight: 600, color: PAPER, backgroundColor: INK, border: `1px solid ${INK}`, borderRadius: 0, padding: "16px 28px", textDecoration: "none", letterSpacing: "0.02em" }}>
            {cta.label}
            <span aria-hidden style={{ opacity: 0.7 }}>→</span>
          </Link>
        </section>
      )}

      <style jsx>{`
        @media (max-width: 1024px) {
          .bureau-row {
            grid-template-columns: 60px minmax(160px, 1fr) minmax(0, 2.4fr) minmax(140px, auto) !important;
          }
          .bureau-illustration {
            display: none !important;
          }
        }
        @media (max-width: 720px) {
          .bureau-row {
            grid-template-columns: 44px 1fr !important;
            gap: 8px 14px !important;
          }
          .bureau-row > :nth-child(3),
          .bureau-row > :nth-child(4) {
            grid-column: 2;
          }
          .bureau-row > :nth-child(4) {
            text-align: left !important;
          }
          .bureau-provisions {
            grid-template-columns: 1fr !important;
            gap: 4px !important;
          }
        }
      `}</style>
    </>
  );
}

function Tab({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button type="button" role="tab" aria-selected={active} onClick={onClick} style={{ background: "none", border: "none", padding: 0, fontFamily: "inherit", fontSize: "inherit", fontWeight: "inherit", letterSpacing: "inherit", textTransform: "inherit", color: active ? "#0d0f12" : "#647589", cursor: "pointer" }}>
      {label}
    </button>
  );
}
