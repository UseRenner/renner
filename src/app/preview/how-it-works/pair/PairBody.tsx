"use client";

// Pair — both audiences at once. The page is split by an ink seam.
// Left side reads from the client perspective; right side reads
// from the Renner perspective. Each step shows what's happening
// on both sides simultaneously. No tab to flip — both stories run.

import Link from "next/link";
import { Card } from "../_illustrations";

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

const PAIRS: Array<{
  number: string;
  client: { title: string; body: string; proof: string; illustration: "brief" | "applicant" | "completion" };
  renner: { title: string; body: string; proof: string; illustration: "profile" | "inbox" | "payout" };
}> = [
  {
    number: "01",
    client: { title: "Post a task.", body: "Where, when, what, how much. Two minutes to set the brief — your address, your window, your price.", proof: "Under 2 min", illustration: "brief" },
    renner: { title: "Get verified.", body: "ID-verified, Checkr-cleared, area drawn, rate set. Same-day clearance in most states.", proof: "Same-day", illustration: "profile" },
  },
  {
    number: "02",
    client: { title: "Pick a Renner.", body: "Vetted Renners apply with bio, ratings, and tenure. Read the file. Book the right hand.", proof: "Checkr-vetted", illustration: "applicant" },
    renner: { title: "Pick a task.", body: "Briefs come in from agents, brokers, and managers nearby. Apply to what fits. Decline what doesn't.", proof: "Local", illustration: "inbox" },
  },
  {
    number: "03",
    client: { title: "Get it done.", body: "Photos and a written note arrive on completion. You confirm; Stripe releases the funds in full.", proof: "Stripe escrow", illustration: "completion" },
    renner: { title: "Get paid.", body: "Run the task, upload completion photos. Stripe pays out — 100% of the task pay.", proof: "100% of pay", illustration: "payout" },
  },
];

export function PairBody({ showCta }: { showCta: boolean }) {
  const ctaA = { label: "Sign up", href: "/signup" };
  const ctaB = { label: "Become a Renner", href: "/become-a-renner" };

  return (
    <>
      {/* Header strip — column labels */}
      <div className="pair-header" style={{ display: "grid", gridTemplateColumns: "1fr 1px 1fr", gap: 0, paddingBottom: "clamp(20px, 2.5vw, 28px)", borderBottom: `1px solid ${INK}`, marginBottom: "clamp(48px, 6vw, 72px)" }}>
        <div style={{ paddingRight: "clamp(20px, 3vw, 40px)" }}>
          <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.32em", textTransform: "uppercase", color: STEEL_500, marginBottom: 6 }}>
            One side
          </div>
          <div style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(20px, 2vw, 26px)", color: INK, fontVariationSettings: '"opsz" 36' }}>
            For clients.
          </div>
        </div>
        <div aria-hidden style={{ backgroundColor: INK }} />
        <div style={{ paddingLeft: "clamp(20px, 3vw, 40px)", textAlign: "right" }}>
          <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.32em", textTransform: "uppercase", color: STEEL_500, marginBottom: 6 }}>
            The other
          </div>
          <div style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(20px, 2vw, 26px)", color: INK, fontVariationSettings: '"opsz" 36' }}>
            For Renners.
          </div>
        </div>
      </div>

      {/* Headline shared across both sides */}
      <h1
        style={{
          fontFamily: SERIF,
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "clamp(48px, 8vw, 128px)",
          lineHeight: 0.92,
          letterSpacing: "-0.035em",
          color: INK,
          margin: 0,
          marginBottom: "clamp(24px, 3vw, 36px)",
          maxWidth: "16ch",
          textAlign: "center",
          marginLeft: "auto",
          marginRight: "auto",
          fontVariationSettings: '"opsz" 144',
        }}
      >
        two sides, one platform.
      </h1>
      <p style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(18px, 1.7vw, 22px)", lineHeight: 1.55, color: STEEL_700, margin: 0, marginLeft: "auto", marginRight: "auto", marginBottom: "clamp(64px, 8vw, 96px)", maxWidth: "44ch", textAlign: "center", fontVariationSettings: '"opsz" 14' }}>
        Both sides are screened to join. Here&rsquo;s the same task, from both points of view.
      </p>

      {/* The pair rows */}
      <div style={{ marginBottom: "clamp(56px, 7vw, 88px)" }}>
        {PAIRS.map((p, i) => (
          <article
            key={p.number}
            className="pair-row"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1px 1fr",
              gap: 0,
              padding: "clamp(40px, 5vw, 64px) 0",
              borderTop: i === 0 ? `1px solid ${INK}` : `1px solid ${RULE}`,
              borderBottom: i === PAIRS.length - 1 ? `1px solid ${INK}` : "none",
            }}
          >
            {/* Client side */}
            <div className="pair-cell pair-cell-left" style={{ paddingRight: "clamp(20px, 3vw, 48px)", display: "flex", flexDirection: "column", gap: 18 }}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
                <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: "0.22em", color: STEEL_500 }}>
                  {p.number} · client
                </span>
                <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: STEEL_700 }}>
                  {p.client.proof}
                </span>
              </div>
              <h3 style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(28px, 3.4vw, 44px)", lineHeight: 1.05, letterSpacing: "-0.02em", color: INK, margin: 0, fontVariationSettings: '"opsz" 96' }}>
                {p.client.title}
              </h3>
              <p style={{ fontFamily: SERIF, fontSize: "clamp(15px, 1.4vw, 17px)", lineHeight: 1.6, color: STEEL_700, margin: 0, fontVariationSettings: '"opsz" 14' }}>
                {p.client.body}
              </p>
              <div>
                <Card kind={p.client.illustration} />
              </div>
            </div>

            {/* The seam */}
            <div aria-hidden className="pair-seam" style={{ backgroundColor: INK }} />

            {/* Renner side */}
            <div className="pair-cell pair-cell-right" style={{ paddingLeft: "clamp(20px, 3vw, 48px)", display: "flex", flexDirection: "column", gap: 18, textAlign: "right" }}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
                <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: STEEL_700 }}>
                  {p.renner.proof}
                </span>
                <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: "0.22em", color: STEEL_500 }}>
                  {p.number} · renner
                </span>
              </div>
              <h3 style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(28px, 3.4vw, 44px)", lineHeight: 1.05, letterSpacing: "-0.02em", color: INK, margin: 0, fontVariationSettings: '"opsz" 96' }}>
                {p.renner.title}
              </h3>
              <p style={{ fontFamily: SERIF, fontSize: "clamp(15px, 1.4vw, 17px)", lineHeight: 1.6, color: STEEL_700, margin: 0, marginLeft: "auto", maxWidth: "44ch", fontVariationSettings: '"opsz" 14' }}>
                {p.renner.body}
              </p>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <div style={{ width: "100%" }}>
                  <Card kind={p.renner.illustration} />
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Two CTAs — one per side */}
      {showCta && (
        <section className="pair-cta" style={{ display: "grid", gridTemplateColumns: "1fr 1px 1fr", gap: 0, paddingTop: "clamp(40px, 5vw, 56px)", borderTop: `1px solid ${INK}` }}>
          <div style={{ paddingRight: "clamp(20px, 3vw, 48px)", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 18 }}>
            <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(20px, 2vw, 26px)", color: INK, fontVariationSettings: '"opsz" 36' }}>
              Need work done?
            </span>
            <Link href={ctaA.href} style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: SANS, fontSize: 14, fontWeight: 500, color: PAPER, backgroundColor: INK, border: `1px solid ${INK}`, borderRadius: 4, padding: "14px 22px", textDecoration: "none" }}>
              {ctaA.label}
              <span aria-hidden style={{ opacity: 0.7 }}>→</span>
            </Link>
          </div>
          <div aria-hidden style={{ backgroundColor: INK }} />
          <div style={{ paddingLeft: "clamp(20px, 3vw, 48px)", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 18 }}>
            <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(20px, 2vw, 26px)", color: INK, fontVariationSettings: '"opsz" 36' }}>
              Want to run it?
            </span>
            <Link href={ctaB.href} style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: SANS, fontSize: 14, fontWeight: 500, color: PAPER, backgroundColor: INK, border: `1px solid ${INK}`, borderRadius: 4, padding: "14px 22px", textDecoration: "none" }}>
              {ctaB.label}
              <span aria-hidden style={{ opacity: 0.7 }}>→</span>
            </Link>
          </div>
        </section>
      )}

      <style jsx>{`
        @media (max-width: 880px) {
          .pair-header,
          .pair-row,
          .pair-cta {
            grid-template-columns: 1fr !important;
          }
          .pair-seam {
            display: none !important;
          }
          .pair-cell-left {
            padding-right: 0 !important;
            padding-bottom: clamp(28px, 4vw, 40px);
            border-bottom: 1px solid ${RULE};
            margin-bottom: clamp(28px, 4vw, 40px);
          }
          .pair-cell-right {
            padding-left: 0 !important;
            text-align: left !important;
          }
          .pair-cell-right p {
            margin-left: 0 !important;
          }
          .pair-cell-right > div:last-child {
            justify-content: flex-start !important;
          }
        }
      `}</style>
    </>
  );
}
