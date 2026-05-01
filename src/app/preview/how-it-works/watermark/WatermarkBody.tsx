"use client";

// Watermark — the wordmark is the page. Set at viewport scale,
// italic, low weight, the mark sits behind everything as the
// page's spine. Content lives in front of it. Confidence by
// presence, not by ornament.

import Link from "next/link";
import { useState } from "react";
import { Mini } from "../_illustrations";

const SERIF = "var(--font-source-serif), ui-serif, Georgia, serif";
const SANS = "var(--font-source-sans), ui-sans-serif, system-ui, sans-serif";
const MONO = "var(--font-source-code), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const INK = "#0d0f12";
const STEEL_700 = "#4d5b6a";
const STEEL_500 = "#7d8da0";
const STEEL_300 = "#cad1d8";
const RULE = "#eaedf0";
const PAPER = "#fbfbfc";

const CLIENT_STEPS = [
  { number: "01", title: "Post a task.", body: "Where, when, what, how much.", proof: "Under 2 min", illustration: "brief" as const },
  { number: "02", title: "Pick a Renner.", body: "Vetted Renners apply. Read the file.", proof: "Checkr-vetted", illustration: "applicant" as const },
  { number: "03", title: "Get it done.", body: "Photos arrive. You confirm. Stripe pays.", proof: "Stripe escrow", illustration: "completion" as const },
];
const RENNER_STEPS = [
  { number: "01", title: "Get verified.", body: "ID, background check, area, rate.", proof: "Same-day", illustration: "profile" as const },
  { number: "02", title: "Pick a task.", body: "Briefs from agents and managers nearby.", proof: "Local", illustration: "inbox" as const },
  { number: "03", title: "Get it done.", body: "Run it. Send photos. Get paid.", proof: "100% of pay", illustration: "payout" as const },
];

export function WatermarkBody({ showCta }: { showCta: boolean }) {
  const [tab, setTab] = useState<"client" | "renner">("client");
  const isClient = tab === "client";
  const steps = isClient ? CLIENT_STEPS : RENNER_STEPS;
  const cta = isClient ? { label: "Sign up", href: "/signup" } : { label: "Become a Renner", href: "/become-a-renner" };

  return (
    <div style={{ position: "relative", paddingTop: "clamp(20px, 3vw, 32px)" }}>
      {/* Top bar — meta + audience */}
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 24, flexWrap: "wrap", marginBottom: "clamp(40px, 5vw, 64px)" }}>
        <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: STEEL_500 }}>
          A marketplace for real-estate work
        </span>
        <div role="tablist" aria-label="Audience" style={{ display: "flex", alignItems: "baseline", gap: 14, fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 16 }}>
          <Tab label="For clients" active={isClient} onClick={() => setTab("client")} />
          <span aria-hidden style={{ color: STEEL_300, fontStyle: "normal" }}>·</span>
          <Tab label="For Renners" active={!isClient} onClick={() => setTab("renner")} />
        </div>
      </div>

      {/* The watermark — wordmark at full container width, italic, weight 200 */}
      <div
        aria-hidden
        style={{
          fontFamily: SERIF,
          fontStyle: "italic",
          fontWeight: 200,
          fontSize: "clamp(120px, 28vw, 480px)",
          lineHeight: 0.78,
          letterSpacing: "-0.05em",
          color: INK,
          margin: 0,
          marginBottom: "clamp(32px, 4vw, 48px)",
          fontVariationSettings: '"opsz" 144',
          textAlign: "left",
        }}
      >
        renner
      </div>

      {/* Right under the mark — a single confident line */}
      <p
        style={{
          fontFamily: SERIF,
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "clamp(28px, 3.5vw, 44px)",
          lineHeight: 1.2,
          color: INK,
          margin: 0,
          marginBottom: "clamp(24px, 3vw, 36px)",
          maxWidth: "32ch",
          fontVariationSettings: '"opsz" 60',
        }}
      >
        a marketplace and a network for real-estate work — both sides screened to join.
      </p>

      {/* Three-row plate — number, headline, body, proof, illustration */}
      <div style={{ marginTop: "clamp(64px, 8vw, 96px)", marginBottom: "clamp(56px, 7vw, 88px)" }}>
        {steps.map((s, i) => (
          <article
            key={s.number}
            className="watermark-row"
            style={{
              display: "grid",
              gridTemplateColumns: "60px minmax(0, 1.2fr) minmax(0, 1.5fr) minmax(280px, 320px)",
              gap: "clamp(20px, 3vw, 48px)",
              padding: "clamp(28px, 3.5vw, 44px) 0",
              borderTop: i === 0 ? `1px solid ${INK}` : `1px solid ${RULE}`,
              borderBottom: i === steps.length - 1 ? `1px solid ${INK}` : "none",
              alignItems: "center",
            }}
          >
            <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: "0.22em", color: STEEL_500 }}>
              {s.number}
            </span>
            <h3 style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(24px, 2.6vw, 32px)", lineHeight: 1.05, letterSpacing: "-0.018em", color: INK, margin: 0, fontVariationSettings: '"opsz" 60' }}>
              {s.title}
            </h3>
            <div>
              <p style={{ fontFamily: SERIF, fontSize: 16, lineHeight: 1.55, color: STEEL_700, margin: 0, marginBottom: 8, fontVariationSettings: '"opsz" 14' }}>
                {s.body}
              </p>
              <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: STEEL_700 }}>
                {s.proof}
              </span>
            </div>
            <div className="watermark-illustration" style={{ display: "flex", justifyContent: "flex-end" }}>
              <Mini kind={s.illustration} />
            </div>
          </article>
        ))}
      </div>

      {showCta && (
        <section style={{ display: "flex", justifyContent: "flex-start" }}>
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
        @media (max-width: 1024px) {
          .watermark-row {
            grid-template-columns: 48px minmax(0, 1.2fr) minmax(0, 1.5fr) !important;
          }
          .watermark-illustration {
            display: none !important;
          }
        }
        @media (max-width: 720px) {
          .watermark-row {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
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
