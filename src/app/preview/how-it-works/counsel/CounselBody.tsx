"use client";

import Link from "next/link";
import { useState } from "react";
import { Card, CLIENT_KINDS, RENNER_KINDS } from "../_illustrations";

const SERIF = "var(--font-source-serif), ui-serif, Georgia, serif";
const SANS = "var(--font-source-sans), ui-sans-serif, system-ui, sans-serif";
const MONO = "var(--font-source-code), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const INK = "var(--c-text, #0d0f12)";
const STEEL_700 = "var(--c-700, #38414d)";
const STEEL_600 = "var(--c-600, #647589)";
const STEEL_500 = "var(--c-500, #7d8da0)";
const STEEL_300 = "var(--c-300, #cad1d8)";
const RULE = "var(--c-rule, #eaedf0)";
const PAPER = "var(--c-bg, #fbfbfc)";

const CLIENT_DEK = "A marketplace for real-estate work. Post a task, pick a Renner, get it done. Both sides are screened to join.";
const RENNER_DEK = "Real-estate work, paid through the platform. Set your area, set your rate, pick what you take. Both sides are screened to join.";

const CLIENT_STEPS = [
  { number: "01", title: "Post a task.", body: "Where, when, what, how much. Two minutes.", proof: "Under 2 minutes" },
  { number: "02", title: "Pick a Renner.", body: "Vetted Renners apply. Read the file. Book one.", proof: "Checkr-vetted" },
  { number: "03", title: "Get it done.", body: "Photos arrive. You confirm. Stripe pays.", proof: "Stripe escrow" },
];
const RENNER_STEPS = [
  { number: "01", title: "Get verified.", body: "ID, background check, area, rate. Same day.", proof: "Same-day" },
  { number: "02", title: "Pick a task.", body: "Briefs from agents and managers nearby. Apply.", proof: "Local marketplace" },
  { number: "03", title: "Get it done.", body: "Run the task. Send photos. Get paid.", proof: "100% of task pay" },
];

export function CounselBody({ showCta }: { showCta: boolean }) {
  const [tab, setTab] = useState<"client" | "renner">("client");
  const isClient = tab === "client";
  const dek = isClient ? CLIENT_DEK : RENNER_DEK;
  const steps = isClient ? CLIENT_STEPS : RENNER_STEPS;
  const kinds = isClient ? CLIENT_KINDS : RENNER_KINDS;
  const cta = isClient ? { label: "Sign up", href: "/signup" } : { label: "Become a Renner", href: "/become-a-renner" };

  return (
    <>
      <div style={{ borderTop: `2px solid ${INK}`, borderBottom: `1px solid ${RULE}`, padding: "18px 0", marginBottom: "clamp(64px, 8vw, 96px)", display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <span style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 13, letterSpacing: "0.16em", textTransform: "uppercase", color: INK, fontVariationSettings: '"opsz" 14' }}>
          How it works
        </span>
        <div role="tablist" aria-label="Audience" style={{ display: "flex", alignItems: "baseline", gap: 18, fontFamily: SERIF, fontWeight: 500, fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", fontVariationSettings: '"opsz" 14' }}>
          <Tab label="For clients" active={isClient} onClick={() => setTab("client")} />
          <span aria-hidden style={{ color: STEEL_500 }}>·</span>
          <Tab label="For Renners" active={!isClient} onClick={() => setTab("renner")} />
        </div>
      </div>

      <p style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(28px, 3.6vw, 48px)", lineHeight: 1.25, letterSpacing: "-0.012em", color: INK, margin: 0, marginBottom: "clamp(72px, 9vw, 112px)", maxWidth: "30ch", fontVariationSettings: '"opsz" 60' }}>
        {dek}
      </p>

      <div style={{ display: "flex", flexDirection: "column", marginBottom: "clamp(72px, 9vw, 112px)" }}>
        {steps.map((s, i) => (
          <article key={s.number} className="counsel-row" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1fr)", gap: "clamp(40px, 5vw, 80px)", padding: "clamp(48px, 6vw, 80px) 0", borderTop: i === 0 ? `1px solid ${INK}` : `1px solid ${RULE}`, borderBottom: i === steps.length - 1 ? `1px solid ${INK}` : "none", alignItems: "center" }}>
            <div>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, marginBottom: 18, flexWrap: "wrap" }}>
                <span style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 14, letterSpacing: "0.12em", textTransform: "uppercase", color: STEEL_500, fontVariationSettings: '"opsz" 14' }}>
                  {s.number}
                </span>
                <span style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", color: INK, fontVariationSettings: '"opsz" 14' }}>
                  {s.proof}
                </span>
              </div>
              <h3 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(32px, 4vw, 56px)", lineHeight: 1.05, letterSpacing: "-0.022em", color: INK, margin: 0, marginBottom: 18, fontVariationSettings: '"opsz" 96' }}>
                {s.title}
              </h3>
              <p style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(17px, 1.5vw, 19px)", lineHeight: 1.7, color: STEEL_700, margin: 0, maxWidth: "44ch", fontVariationSettings: '"opsz" 14' }}>
                {s.body}
              </p>
            </div>
            <div className="counsel-illustration">
              <Card kind={kinds[i]} />
            </div>
          </article>
        ))}
      </div>

      <div style={{ marginBottom: showCta ? "clamp(56px, 7vw, 88px)" : 0 }}>
        <dl style={{ margin: 0, borderTop: `1px solid ${INK}` }}>
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
            <div key={label} className="counsel-prov" style={{ display: "grid", gridTemplateColumns: "minmax(180px, 240px) minmax(0, 1fr)", gap: "clamp(24px, 3.5vw, 56px)", padding: "22px 0", borderBottom: i === arr.length - 1 ? `1px solid ${INK}` : `1px solid ${RULE}`, alignItems: "baseline" }}>
              <dt style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 18, color: INK, fontVariationSettings: '"opsz" 36' }}>
                {label}
              </dt>
              <dd style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 16, lineHeight: 1.65, color: STEEL_700, margin: 0, fontVariationSettings: '"opsz" 14' }}>
                {body}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {showCta && (
        <section style={{ display: "flex", justifyContent: "flex-start" }}>
          <Link href={cta.href} style={{ display: "inline-flex", alignItems: "center", gap: 12, fontFamily: SERIF, fontSize: 16, fontWeight: 500, color: PAPER, backgroundColor: INK, border: `1px solid ${INK}`, borderRadius: 0, padding: "18px 32px", textDecoration: "none", letterSpacing: "0.02em", fontVariationSettings: '"opsz" 14' }}>
            {cta.label}
            <span aria-hidden style={{ opacity: 0.7 }}>→</span>
          </Link>
        </section>
      )}

      <style jsx>{`
        @media (max-width: 880px) {
          .counsel-row {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .counsel-prov {
            grid-template-columns: 1fr !important;
            gap: 6px !important;
          }
        }
      `}</style>
    </>
  );
}

function Tab({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button type="button" role="tab" aria-selected={active} onClick={onClick} style={{ background: "none", border: "none", padding: 0, fontFamily: "inherit", fontStyle: "inherit", fontSize: "inherit", fontWeight: "inherit", letterSpacing: "inherit", textTransform: "inherit", color: active ? INK : STEEL_500, cursor: "pointer" }}>
      {label}
    </button>
  );
}
