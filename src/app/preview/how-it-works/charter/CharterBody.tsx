"use client";

// Charter — the formality of a foundational document. Articles I,
// II, III replace step numbers. Body is justified, hyphens auto,
// in serif 400 at a confident measure. Each article opens with a
// drop cap. The page reads like a constitution, settled and
// considered, while the wordmark stays light and italic.

import Link from "next/link";
import { useState } from "react";
import { Card, CLIENT_KINDS, RENNER_KINDS } from "../_illustrations";

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

const CLIENT_ARTICLES = [
  { numeral: "01", title: "Post a task.", body: "Where, when, what, how much. Two minutes to set the brief — your address, your window, your price. Posts go live to vetted Renners only.", proof: "Under 2 minutes" },
  { numeral: "02", title: "Pick a Renner.", body: "Vetted Renners apply with bios, ratings, and tenure on the platform. Read the file, weigh the file, and book the right hand for the work.", proof: "Checkr-vetted" },
  { numeral: "03", title: "Get it done.", body: "Photos and a written note arrive on completion. The client confirms; Stripe releases the funds in full. After 48 hours without a response, payment auto-releases.", proof: "Stripe escrow" },
];
const RENNER_ARTICLES = [
  { numeral: "01", title: "Get verified.", body: "Identity verified, Checkr background check cleared, service area drawn, rate named, categories chosen. Onboarding usually clears the same day in most states.", proof: "Same-day" },
  { numeral: "02", title: "Pick a task.", body: "Briefs come in from agents, brokers, and property managers nearby. Apply to the ones that fit your schedule and skills. Decline anything that does not.", proof: "Local marketplace" },
  { numeral: "03", title: "Get it done.", body: "Run the task, upload completion photos, and get paid through the platform. 100% of the task pay is yours. Build a reputation that earns repeat clients.", proof: "100% of task pay" },
];

export function CharterBody({ showCta }: { showCta: boolean }) {
  const [tab, setTab] = useState<"client" | "renner">("client");
  const isClient = tab === "client";
  const dek = isClient ? CLIENT_DEK : RENNER_DEK;
  const articles = isClient ? CLIENT_ARTICLES : RENNER_ARTICLES;
  const kinds = isClient ? CLIENT_KINDS : RENNER_KINDS;
  const cta = isClient ? { label: "Sign up", href: "/signup" } : { label: "Become a Renner", href: "/become-a-renner" };

  return (
    <div style={{ backgroundColor: PAPER }}>
      {/* Title plate */}
      <div style={{ borderTop: `2px solid ${INK}`, borderBottom: `1px solid ${INK}`, padding: "20px 0", marginBottom: "clamp(64px, 8vw, 96px)", display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <span style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 13, letterSpacing: "0.16em", textTransform: "uppercase", color: INK, fontVariationSettings: '"opsz" 14' }}>
          How it works
        </span>
        <div role="tablist" aria-label="Audience" style={{ display: "flex", alignItems: "baseline", gap: 18, fontFamily: SERIF, fontWeight: 500, fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", color: STEEL_500, fontVariationSettings: '"opsz" 14' }}>
          <Tab label="For clients" active={isClient} onClick={() => setTab("client")} />
          <span aria-hidden style={{ color: STEEL_300 }}>·</span>
          <Tab label="For Renners" active={!isClient} onClick={() => setTab("renner")} />
        </div>
      </div>

      {/* Preamble */}
      <p style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(24px, 3vw, 36px)", lineHeight: 1.3, letterSpacing: "-0.01em", color: INK, margin: "0 auto", marginBottom: "clamp(72px, 9vw, 112px)", maxWidth: "32ch", textAlign: "center", fontVariationSettings: '"opsz" 60' }}>
        {dek}
      </p>

      {/* Articles */}
      <div style={{ display: "flex", flexDirection: "column", marginBottom: "clamp(72px, 9vw, 112px)" }}>
        {articles.map((a, i) => (
          <article key={a.numeral} className="charter-article" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)", gap: "clamp(40px, 5vw, 80px)", padding: "clamp(48px, 6vw, 80px) 0", borderTop: i === 0 ? `1px solid ${INK}` : `1px solid ${RULE}`, borderBottom: i === articles.length - 1 ? `1px solid ${INK}` : "none", alignItems: "start" }}>
            <div>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, marginBottom: 22, flexWrap: "wrap" }}>
                <span style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 14, letterSpacing: "0.16em", textTransform: "uppercase", color: STEEL_500, fontVariationSettings: '"opsz" 14' }}>
                  {a.numeral}
                </span>
                <span style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", color: INK, fontVariationSettings: '"opsz" 14' }}>
                  {a.proof}
                </span>
              </div>
              <h3 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(32px, 4vw, 56px)", lineHeight: 1.05, letterSpacing: "-0.022em", color: INK, margin: 0, marginBottom: 22, fontVariationSettings: '"opsz" 96' }}>
                {a.title}
              </h3>
              <p style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(17px, 1.5vw, 19px)", lineHeight: 1.7, color: STEEL_700, margin: 0, textAlign: "justify", hyphens: "auto", fontVariationSettings: '"opsz" 14' }}>
                <span style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "1.6em", lineHeight: 1, float: "left", marginRight: 8, marginTop: 2, color: INK, fontVariationSettings: '"opsz" 96' }}>
                  {a.body.charAt(0)}
                </span>
                {a.body.slice(1)}
              </p>
            </div>
            <div className="charter-illustration">
              <Card kind={kinds[i]} />
            </div>
          </article>
        ))}
      </div>

      <div style={{ marginBottom: showCta ? "clamp(56px, 7vw, 88px)" : 0 }}>
        <dl style={{ margin: 0, borderTop: `1px solid ${INK}`, borderBottom: `1px solid ${INK}` }}>
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
            <div key={label} className="charter-prov" style={{ display: "grid", gridTemplateColumns: "minmax(160px, 220px) minmax(0, 1fr)", gap: "clamp(24px, 3.5vw, 48px)", padding: "22px 0", borderBottom: i === arr.length - 1 ? "none" : `1px solid ${RULE}`, alignItems: "baseline" }}>
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
        <section style={{ display: "flex", justifyContent: "center" }}>
          <Link href={cta.href} style={{ display: "inline-flex", alignItems: "center", gap: 12, fontFamily: SERIF, fontSize: 16, fontWeight: 500, color: PAPER, backgroundColor: INK, border: `1px solid ${INK}`, borderRadius: 0, padding: "18px 36px", textDecoration: "none", letterSpacing: "0.02em", fontVariationSettings: '"opsz" 14' }}>
            {cta.label}
            <span aria-hidden style={{ opacity: 0.7 }}>→</span>
          </Link>
        </section>
      )}

      <style jsx>{`
        @media (max-width: 880px) {
          .charter-article {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .charter-prov {
            grid-template-columns: 1fr !important;
            gap: 4px !important;
          }
        }
      `}</style>
    </div>
  );
}

function Tab({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button type="button" role="tab" aria-selected={active} onClick={onClick} style={{ background: "none", border: "none", padding: 0, fontFamily: "inherit", fontStyle: "inherit", fontSize: "inherit", fontWeight: "inherit", letterSpacing: "inherit", textTransform: "inherit", color: active ? "var(--c-text, #0d0f12)" : "var(--c-500, #647589)", cursor: "pointer" }}>
      {label}
    </button>
  );
}
