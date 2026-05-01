"use client";

// Counsel — the gravity of a private-bank annual letter. Source
// Serif at weight 500-600 throughout, no italic body, deep ink at
// full opacity, generous leading. The page reads with the cadence
// of a formal communication: structured hierarchy, numbered
// sections, restrained palette.

import Link from "next/link";
import { useState } from "react";
import { Card, CLIENT_KINDS, RENNER_KINDS } from "../_illustrations";

const SERIF = "var(--font-source-serif), ui-serif, Georgia, serif";
const SANS = "var(--font-source-sans), ui-sans-serif, system-ui, sans-serif";
const MONO = "var(--font-source-code), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const INK = "#0a0c0f";
const STEEL_700 = "#363c46";
const STEEL_500 = "#5a6470";
const STEEL_300 = "#bcc4cd";
const RULE = "#cdd3da";
const PAPER = "#fbfaf6";

const CLIENT_DEK = "A marketplace for real-estate work. Post a task, pick a Renner, get it done. Both sides are screened to join.";
const RENNER_DEK = "Real-estate work, paid through the platform. Set your area, set your rate, pick what you take. Both sides are screened to join.";

const CLIENT_STEPS = [
  { number: "I.", title: "Post a task.", body: "Where, when, what, how much. Two minutes.", proof: "Under 2 minutes" },
  { number: "II.", title: "Pick a Renner.", body: "Vetted Renners apply. Read the file. Book one.", proof: "Checkr-vetted" },
  { number: "III.", title: "Get it done.", body: "Photos arrive. You confirm. Stripe pays.", proof: "Stripe escrow" },
];
const RENNER_STEPS = [
  { number: "I.", title: "Get verified.", body: "ID, background check, area, rate. Same day.", proof: "Same-day" },
  { number: "II.", title: "Pick a task.", body: "Briefs from agents and managers nearby. Apply.", proof: "Local marketplace" },
  { number: "III.", title: "Get it done.", body: "Run the task. Send photos. Get paid.", proof: "100% of task pay" },
];

export function CounselBody({ showCta }: { showCta: boolean }) {
  const [tab, setTab] = useState<"client" | "renner">("client");
  const isClient = tab === "client";
  const dek = isClient ? CLIENT_DEK : RENNER_DEK;
  const steps = isClient ? CLIENT_STEPS : RENNER_STEPS;
  const kinds = isClient ? CLIENT_KINDS : RENNER_KINDS;
  const cta = isClient ? { label: "Sign up", href: "/signup" } : { label: "Become a Renner", href: "/become-a-renner" };

  return (
    <div style={{ backgroundColor: PAPER }}>
      <div style={{ borderTop: `2px solid ${INK}`, borderBottom: `1px solid ${INK}`, padding: "18px 0", marginBottom: "clamp(64px, 8vw, 96px)", display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <span style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 13, letterSpacing: "0.16em", textTransform: "uppercase", color: INK, fontVariationSettings: '"opsz" 14' }}>
          A note on procedure
        </span>
        <div role="tablist" aria-label="Audience" style={{ display: "flex", alignItems: "baseline", gap: 18, fontFamily: SERIF, fontWeight: 500, fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", color: STEEL_500, fontVariationSettings: '"opsz" 14' }}>
          <Tab label="For clients" active={isClient} onClick={() => setTab("client")} />
          <span aria-hidden style={{ color: STEEL_300 }}>·</span>
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
                  Section {s.number}
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
        <div style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 13, letterSpacing: "0.16em", textTransform: "uppercase", color: INK, marginBottom: 24, fontVariationSettings: '"opsz" 14' }}>
          Provisions
        </div>
        <dl style={{ margin: 0, borderTop: `1px solid ${INK}` }}>
          {(isClient
            ? [
                ["Vetting", "Both clients and Renners are ID-verified and Checkr-cleared before any booking."],
                ["Custody", "Funds are held in Stripe escrow until the client confirms; auto-release at 48 hours."],
                ["Record", "Each task closes with completion photos and a written confirmation on file."],
              ]
            : [
                ["Source", "Briefs originate from agents, brokers, and property managers within the platform."],
                ["Equity", "Clients are ID-verified and Checkr-cleared on the same standard as Renners."],
                ["Payment", "100% of task pay is released to the Renner through Stripe upon confirmation."],
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
    </div>
  );
}

function Tab({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button type="button" role="tab" aria-selected={active} onClick={onClick} style={{ background: "none", border: "none", padding: 0, fontFamily: "inherit", fontStyle: "inherit", fontSize: "inherit", fontWeight: "inherit", letterSpacing: "inherit", textTransform: "inherit", color: active ? "#0a0c0f" : "#5a6470", cursor: "pointer" }}>
      {label}
    </button>
  );
}
