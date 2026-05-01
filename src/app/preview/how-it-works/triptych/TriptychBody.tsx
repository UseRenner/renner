"use client";

// Triptych — three large panels, like a printer's broadside or a
// museum altarpiece. Each panel is a hero in its own right: full
// illustration, italic display title, body. Confidence by scale.

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

const CLIENT_PANELS = [
  { number: "I", title: "post.", body: "Where, when, what, how much. Two minutes to set the brief — your address, your window, your price.", proof: "Under 2 min" },
  { number: "II", title: "pick.", body: "Vetted Renners apply. Read the file — bio, ratings, tenure on the platform — and book the right hand.", proof: "Checkr-vetted" },
  { number: "III", title: "done.", body: "Photos and a written note arrive on completion. You confirm; Stripe releases the funds in full.", proof: "Stripe escrow" },
];
const RENNER_PANELS = [
  { number: "I", title: "verify.", body: "Identity, background check, area, rate. Same-day clearance in most states. Pick the categories you run.", proof: "Same-day" },
  { number: "II", title: "pick.", body: "Briefs come in from agents, brokers, and managers nearby. Apply to what fits. Decline what doesn't.", proof: "Local" },
  { number: "III", title: "done.", body: "Run the task, upload completion photos. Stripe pays out — 100% of the task pay, on confirmation.", proof: "100% of pay" },
];

export function TriptychBody({ showCta }: { showCta: boolean }) {
  const [tab, setTab] = useState<"client" | "renner">("client");
  const isClient = tab === "client";
  const panels = isClient ? CLIENT_PANELS : RENNER_PANELS;
  const kinds = isClient ? CLIENT_KINDS : RENNER_KINDS;
  const cta = isClient ? { label: "Sign up", href: "/signup" } : { label: "Become a Renner", href: "/become-a-renner" };

  return (
    <>
      {/* Title cap — the wordmark sits at huge scale, italic, weight 200 */}
      <div style={{ textAlign: "center", paddingBottom: "clamp(40px, 5vw, 64px)", borderBottom: `1px solid ${INK}`, marginBottom: "clamp(56px, 7vw, 88px)" }}>
        <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.32em", textTransform: "uppercase", color: STEEL_500, marginBottom: 20 }}>
          A triptych in three movements
        </div>
        <div
          style={{
            fontFamily: SERIF,
            fontStyle: "italic",
            fontWeight: 200,
            fontSize: "clamp(80px, 14vw, 240px)",
            lineHeight: 0.9,
            letterSpacing: "-0.04em",
            color: INK,
            fontVariationSettings: '"opsz" 144',
          }}
        >
          renner
        </div>
        <div role="tablist" aria-label="Audience" style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 14, marginTop: 24, fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 16 }}>
          <Tab label="For clients" active={isClient} onClick={() => setTab("client")} />
          <span aria-hidden style={{ color: STEEL_300, fontStyle: "normal" }}>·</span>
          <Tab label="For Renners" active={!isClient} onClick={() => setTab("renner")} />
        </div>
      </div>

      {/* The three panels */}
      <div className="triptych-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1px 1fr 1px 1fr", marginBottom: "clamp(56px, 7vw, 88px)" }}>
        {panels.flatMap((p, i) => {
          const panel = (
            <section
              key={`p-${i}`}
              className="triptych-panel"
              style={{
                padding: i === 0
                  ? "0 clamp(28px, 3.5vw, 48px) 0 0"
                  : i === panels.length - 1
                    ? "0 0 0 clamp(28px, 3.5vw, 48px)"
                    : "0 clamp(28px, 3.5vw, 48px)",
                display: "flex",
                flexDirection: "column",
                gap: 24,
              }}
            >
              <div>
                <Card kind={kinds[i]} />
              </div>
              <div style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: "0.24em", color: STEEL_500 }}>
                Movement {p.number} · {p.proof}
              </div>
              <h3
                style={{
                  fontFamily: SERIF,
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: "clamp(40px, 5vw, 72px)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.03em",
                  color: INK,
                  margin: 0,
                  fontVariationSettings: '"opsz" 144',
                }}
              >
                {p.title}
              </h3>
              <p style={{ fontFamily: SERIF, fontSize: 16, lineHeight: 1.6, color: STEEL_700, margin: 0, fontVariationSettings: '"opsz" 14' }}>
                {p.body}
              </p>
            </section>
          );
          if (i === panels.length - 1) return [panel];
          return [panel, <div key={`c-${i}`} className="triptych-crease" style={{ backgroundColor: INK }} aria-hidden />];
        })}
      </div>

      {/* Footer line */}
      <div style={{ paddingTop: "clamp(28px, 3.5vw, 36px)", borderTop: `1px solid ${INK}`, textAlign: "center", marginBottom: showCta ? "clamp(40px, 5vw, 56px)" : 0 }}>
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(20px, 2vw, 26px)", lineHeight: 1.5, color: INK, margin: 0, marginLeft: "auto", marginRight: "auto", maxWidth: "44ch", fontVariationSettings: '"opsz" 36' }}>
          A marketplace and a network for real-estate task work. Both sides are screened to join.
        </p>
      </div>

      {showCta && (
        <section style={{ display: "flex", justifyContent: "center" }}>
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
          .triptych-grid {
            grid-template-columns: 1fr !important;
            gap: clamp(40px, 6vw, 64px);
          }
          .triptych-panel {
            padding: 0 !important;
          }
          .triptych-panel:not(:first-child) {
            padding-top: clamp(40px, 6vw, 64px) !important;
            border-top: 1px solid ${RULE};
          }
          .triptych-crease {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}

function Tab({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button type="button" role="tab" aria-selected={active} onClick={onClick} style={{ background: "none", border: "none", padding: 0, fontFamily: "inherit", fontStyle: "inherit", fontSize: "inherit", fontWeight: "inherit", color: active ? INK : STEEL_500, cursor: "pointer" }}>
      {label}
    </button>
  );
}
