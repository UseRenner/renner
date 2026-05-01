"use client";

// Quarterly — the seriousness of an annual report. Heavy display
// numerals, ruled three-column structure, sans 600 small caps for
// section headers, mono for data. The page reads like the front
// of a fund's quarterly letter.

import Link from "next/link";
import { useState } from "react";
import { Mini, CLIENT_KINDS, RENNER_KINDS } from "../_illustrations";

const SERIF = "var(--font-source-serif), ui-serif, Georgia, serif";
const SANS = "var(--font-source-sans), ui-sans-serif, system-ui, sans-serif";
const MONO = "var(--font-source-code), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const INK = "var(--c-text, #0d0f12)";
const STEEL_700 = "var(--c-700, #38414d)";
const STEEL_500 = "var(--c-500, #7d8da0)";
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

const KICKER: React.CSSProperties = {
  fontFamily: SANS,
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.28em",
  textTransform: "uppercase",
  color: INK,
};

export function QuarterlyBody({ showCta }: { showCta: boolean }) {
  const [tab, setTab] = useState<"client" | "renner">("client");
  const isClient = tab === "client";
  const dek = isClient ? CLIENT_DEK : RENNER_DEK;
  const steps = isClient ? CLIENT_STEPS : RENNER_STEPS;
  const kinds = isClient ? CLIENT_KINDS : RENNER_KINDS;
  const cta = isClient ? { label: "Sign up", href: "/signup" } : { label: "Become a Renner", href: "/become-a-renner" };

  return (
    <>
      <div style={{ borderTop: `2px solid ${INK}`, borderBottom: `1px solid ${INK}`, padding: "16px 0", marginBottom: "clamp(48px, 6vw, 72px)", display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, flexWrap: "wrap", ...KICKER, color: STEEL_500 }}>
        <span style={{ color: INK }}>How it works</span>
        <div role="tablist" aria-label="Audience" style={{ display: "flex", alignItems: "baseline", gap: 18 }}>
          <Tab label="For clients" active={isClient} onClick={() => setTab("client")} />
          <span aria-hidden style={{ color: STEEL_300 }}>/</span>
          <Tab label="For Renners" active={!isClient} onClick={() => setTab("renner")} />
        </div>
      </div>

      <p style={{ fontFamily: SANS, fontWeight: 500, fontSize: "clamp(26px, 3.2vw, 40px)", lineHeight: 1.25, letterSpacing: "-0.012em", color: INK, margin: 0, marginBottom: "clamp(72px, 9vw, 112px)", maxWidth: "32ch" }}>
        {dek}
      </p>

      <div className="quarterly-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 0, borderTop: `2px solid ${INK}`, borderBottom: `2px solid ${INK}`, marginBottom: "clamp(56px, 7vw, 88px)" }}>
        {steps.map((s, i) => (
          <article key={s.number} className="quarterly-cell" style={{ padding: "clamp(32px, 4vw, 48px) clamp(24px, 3vw, 36px)", borderRight: i < steps.length - 1 ? `1px solid ${RULE}` : "none", display: "flex", flexDirection: "column", gap: 18 }}>
            <span style={{ ...KICKER, color: STEEL_500 }}>
              {s.number} · {s.proof}
            </span>
            <span style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(48px, 7vw, 96px)", lineHeight: 0.95, letterSpacing: "-0.03em", color: INK, fontVariationSettings: '"opsz" 144' }}>
              {s.number}
            </span>
            <h3 style={{ fontFamily: SANS, fontWeight: 600, fontSize: "clamp(20px, 2.2vw, 26px)", lineHeight: 1.15, letterSpacing: "-0.012em", color: INK, margin: 0 }}>
              {s.title}
            </h3>
            <p style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 15, lineHeight: 1.6, color: STEEL_700, margin: 0, fontVariationSettings: '"opsz" 14' }}>
              {s.body}
            </p>
            <div style={{ marginTop: "auto", paddingTop: 18, borderTop: `1px solid ${RULE}` }}>
              <Mini kind={kinds[i]} />
            </div>
          </article>
        ))}
      </div>

      <dl className="quarterly-prov" style={{ margin: 0, borderTop: `1px solid ${INK}`, marginBottom: showCta ? "clamp(56px, 7vw, 88px)" : 0 }}>
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
        ).map(([label, body], i, arr) => (
          <div key={label} className="quarterly-prov-row" style={{ display: "grid", gridTemplateColumns: "minmax(180px, 240px) minmax(0, 1fr)", gap: "clamp(24px, 3.5vw, 56px)", padding: "20px 0", borderBottom: `1px solid ${i === arr.length - 1 ? INK : RULE}`, alignItems: "baseline" }}>
            <dt style={{ fontFamily: SANS, fontWeight: 600, fontSize: 16, color: INK, letterSpacing: "-0.005em" }}>
              {label}
            </dt>
            <dd style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 16, lineHeight: 1.6, color: STEEL_700, margin: 0, fontVariationSettings: '"opsz" 14' }}>
              {body}
            </dd>
          </div>
        ))}
      </dl>

      {showCta && (
        <section style={{ display: "flex", justifyContent: "flex-start" }}>
          <Link href={cta.href} style={{ display: "inline-flex", alignItems: "center", gap: 12, fontFamily: SANS, fontSize: 14, fontWeight: 600, color: PAPER, backgroundColor: INK, border: `1px solid ${INK}`, borderRadius: 0, padding: "16px 28px", textDecoration: "none", letterSpacing: "0.02em" }}>
            {cta.label}
            <span aria-hidden style={{ opacity: 0.7 }}>→</span>
          </Link>
        </section>
      )}

      <style jsx>{`
        @media (max-width: 1024px) {
          .quarterly-grid {
            grid-template-columns: 1fr !important;
          }
          .quarterly-cell {
            border-right: none !important;
            border-bottom: 1px solid ${RULE};
          }
          .quarterly-cell:last-child {
            border-bottom: none;
          }
        }
        @media (max-width: 720px) {
          .quarterly-mast {
            grid-template-columns: 1fr !important;
            gap: 8px !important;
            text-align: left;
          }
          .quarterly-mast > :nth-child(2),
          .quarterly-mast > :nth-child(3) {
            text-align: left !important;
            justify-content: flex-start !important;
          }
          .quarterly-prov-row {
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
    <button type="button" role="tab" aria-selected={active} onClick={onClick} style={{ background: "none", border: "none", padding: 0, fontFamily: "inherit", fontSize: "inherit", fontWeight: "inherit", letterSpacing: "inherit", textTransform: "inherit", color: active ? "var(--c-text, #0d0f12)" : "var(--c-500, #647589)", cursor: "pointer" }}>
      {label}
    </button>
  );
}
