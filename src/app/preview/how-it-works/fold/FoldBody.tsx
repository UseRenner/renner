"use client";

import Link from "next/link";
import { useState } from "react";
import { Mini, CLIENT_KINDS, RENNER_KINDS } from "../_illustrations";

const SERIF = "var(--font-source-serif), ui-serif, Georgia, serif";
const SANS =
  "var(--font-source-sans), ui-sans-serif, system-ui, sans-serif";
const MONO =
  "var(--font-source-code), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const INK = "var(--c-text, #0d0f12)";
const STEEL_700 = "var(--c-700, #38414d)";
const STEEL_600 = "var(--c-600, #647589)";
const STEEL_500 = "var(--c-500, #7d8da0)";
const STEEL_300 = "var(--c-300, #cad1d8)";
const RULE = "var(--c-rule, #eaedf0)";
const PAPER = "var(--c-bg, #fbfbfc)";

type Step = { number: string; title: string; body: string; proof: string };

const CLIENT_DEK =
  "A marketplace for real-estate work. Post a task, pick a Renner, get it done. Both sides are screened to join.";
const RENNER_DEK =
  "Real-estate work, paid through the platform. Set your area, set your rate, pick what you take. Both sides are screened to join.";

const CLIENT_STEPS: Step[] = [
  { number: "01", title: "Post a task.", body: "Where, when, what, how much. Two minutes.", proof: "Under 2 min" },
  { number: "02", title: "Pick a Renner.", body: "Vetted Renners apply. Read the file. Book one.", proof: "Checkr-vetted" },
  { number: "03", title: "Get it done.", body: "Photos arrive. You confirm. Stripe pays.", proof: "Stripe escrow" },
];

const RENNER_STEPS: Step[] = [
  { number: "01", title: "Get verified.", body: "ID, background check, area, rate. Same day.", proof: "Same-day" },
  { number: "02", title: "Pick a task.", body: "Briefs from agents and managers nearby. Apply.", proof: "Local" },
  { number: "03", title: "Get it done.", body: "Run the task. Send photos. Get paid.", proof: "100% of pay" },
];

const CLIENT_TRUST = [
  ["Both sides vetted", "ID and Checkr before any booking."],
  ["Funds in escrow", "Held by Stripe until you confirm."],
  ["On the record", "Photos and a note on every task."],
] as const;

const RENNER_TRUST = [
  ["Real work", "From agents, brokers, managers."],
  ["Vetted clients", "ID and Checkr, same as you."],
  ["Repeat work", "A reputation paid in repeat clients."],
] as const;

type FontPalette = {
  key: string;
  label: string;
  dek: React.CSSProperties;
  title: React.CSSProperties;
  body: React.CSSProperties;
  trustLabel: React.CSSProperties;
  trustBody: React.CSSProperties;
};

const PALETTES: FontPalette[] = [
  {
    key: "italic",
    label: "Italic serif",
    dek: { fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(22px, 2.4vw, 30px)", lineHeight: 1.35, color: INK, fontVariationSettings: '"opsz" 36' },
    title: { fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(28px, 3.4vw, 44px)", lineHeight: 1.05, letterSpacing: "-0.018em", color: INK, fontVariationSettings: '"opsz" 96' },
    body: { fontFamily: SERIF, fontWeight: 400, fontSize: 17, lineHeight: 1.55, color: STEEL_700, fontVariationSettings: '"opsz" 14' },
    trustLabel: { fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 18, color: INK, fontVariationSettings: '"opsz" 36' },
    trustBody: { fontFamily: SERIF, fontWeight: 400, fontSize: 14, lineHeight: 1.55, color: STEEL_700, fontVariationSettings: '"opsz" 14' },
  },
  {
    key: "display",
    label: "Display serif",
    dek: { fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(22px, 2.4vw, 30px)", lineHeight: 1.35, color: INK, fontVariationSettings: '"opsz" 60' },
    title: { fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(28px, 3.4vw, 44px)", lineHeight: 1.0, letterSpacing: "-0.03em", color: INK, fontVariationSettings: '"opsz" 144' },
    body: { fontFamily: SANS, fontWeight: 400, fontSize: 16, lineHeight: 1.55, color: STEEL_700 },
    trustLabel: { fontFamily: SERIF, fontWeight: 400, fontSize: 18, color: INK, fontVariationSettings: '"opsz" 60' },
    trustBody: { fontFamily: SANS, fontWeight: 400, fontSize: 14, lineHeight: 1.55, color: STEEL_700 },
  },
  {
    key: "sans",
    label: "Modern sans",
    dek: { fontFamily: SANS, fontWeight: 400, fontSize: "clamp(20px, 2.2vw, 26px)", lineHeight: 1.4, color: INK, letterSpacing: "-0.005em" },
    title: { fontFamily: SANS, fontWeight: 500, fontSize: "clamp(26px, 3.2vw, 40px)", lineHeight: 1.1, letterSpacing: "-0.025em", color: INK },
    body: { fontFamily: SANS, fontWeight: 400, fontSize: 15, lineHeight: 1.55, color: STEEL_700 },
    trustLabel: { fontFamily: SANS, fontWeight: 500, fontSize: 16, color: INK, letterSpacing: "-0.005em" },
    trustBody: { fontFamily: SANS, fontWeight: 400, fontSize: 14, lineHeight: 1.55, color: STEEL_700 },
  },
];

export function FoldBody({ showCta }: { showCta: boolean }) {
  const [tab, setTab] = useState<"client" | "renner">("client");
  const [paletteIndex, setPaletteIndex] = useState(0);
  const isClient = tab === "client";
  const dek = isClient ? CLIENT_DEK : RENNER_DEK;
  const steps = isClient ? CLIENT_STEPS : RENNER_STEPS;
  const trust = isClient ? CLIENT_TRUST : RENNER_TRUST;
  const palette = PALETTES[paletteIndex];
  const cta = isClient
    ? { label: "Sign up", href: "/signup" }
    : { label: "Become a Renner", href: "/become-a-renner" };

  return (
    <>
      {/* Top row — audience switch + font-palette switcher */}
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 24, flexWrap: "wrap", marginBottom: "clamp(48px, 6vw, 72px)" }}>
        <div role="tablist" aria-label="Audience" style={{ display: "flex", alignItems: "baseline", gap: 14, fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 16 }}>
          <Tab label="For clients" active={isClient} onClick={() => setTab("client")} />
          <span aria-hidden style={{ color: STEEL_300, fontStyle: "normal" }}>·</span>
          <Tab label="For Renners" active={!isClient} onClick={() => setTab("renner")} />
        </div>
        <div role="tablist" aria-label="Font palette" style={{ display: "flex", alignItems: "baseline", gap: 12, fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.24em", textTransform: "uppercase", color: STEEL_500 }}>
          <span aria-hidden>Type</span>
          {PALETTES.map((p, i) => (
            <button
              key={p.key}
              type="button"
              role="tab"
              aria-selected={i === paletteIndex}
              onClick={() => setPaletteIndex(i)}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                fontFamily: "inherit",
                fontSize: "inherit",
                fontWeight: "inherit",
                letterSpacing: "inherit",
                textTransform: "inherit",
                color: i === paletteIndex ? INK : STEEL_500,
                cursor: "pointer",
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Lede */}
      <p
        style={{
          ...palette.dek,
          margin: 0,
          marginBottom: "clamp(64px, 8vw, 96px)",
          maxWidth: "32ch",
        }}
      >
        {dek}
      </p>

      {/* The fold — three tall panels */}
      <div
        className="fold"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1px 1fr 1px 1fr",
          marginBottom: "clamp(64px, 8vw, 96px)",
        }}
      >
        {steps.flatMap((s, i) => {
          const kind = (isClient ? CLIENT_KINDS : RENNER_KINDS)[i];
          const panel = (
            <section
              key={`panel-${s.number}`}
              className="fold-panel"
              style={{
                padding: i === 0
                  ? "0 clamp(24px, 3vw, 40px) 0 0"
                  : i === steps.length - 1
                    ? "0 0 0 clamp(24px, 3vw, 40px)"
                    : "0 clamp(24px, 3vw, 40px)",
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              <div style={{ marginBottom: 4 }}>
                <Mini kind={kind} />
              </div>
              <div style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: "0.24em", color: STEEL_500 }}>
                {s.number}
              </div>
              <h3 style={{ ...palette.title, margin: 0 }}>
                {s.title}
              </h3>
              <p style={{ ...palette.body, margin: 0 }}>
                {s.body}
              </p>
              <div style={{ marginTop: "auto", paddingTop: 16, borderTop: `1px solid ${RULE}`, fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: STEEL_600 }}>
                {s.proof}
              </div>
            </section>
          );
          if (i === steps.length - 1) return [panel];
          return [
            panel,
            <div key={`crease-${s.number}`} className="fold-crease" style={{ backgroundColor: INK }} aria-hidden />,
          ];
        })}
      </div>

      {/* Trust band */}
      <section
        className="fold-trust"
        style={{
          paddingTop: "clamp(28px, 3.5vw, 36px)",
          borderTop: `1px solid ${INK}`,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "clamp(24px, 3vw, 48px)",
          marginBottom: showCta ? "clamp(56px, 7vw, 88px)" : 0,
        }}
      >
        {trust.map(([label, body]) => (
          <div key={label}>
            <div style={{ ...palette.trustLabel, marginBottom: 8 }}>
              {label}.
            </div>
            <div style={palette.trustBody}>
              {body}
            </div>
          </div>
        ))}
      </section>

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
        @media (max-width: 880px) {
          .fold {
            grid-template-columns: 1fr !important;
          }
          .fold-panel {
            padding: 0 !important;
            min-height: 0 !important;
            margin-bottom: clamp(24px, 4vw, 40px);
          }
          .fold-panel:not(:first-child) {
            padding-top: clamp(24px, 3vw, 36px) !important;
            border-top: 1px solid ${RULE};
          }
          .fold-crease {
            display: none !important;
          }
          .fold-trust {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </>
  );
}

function Tab({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      style={{ background: "none", border: "none", padding: 0, fontFamily: "inherit", fontStyle: "inherit", fontSize: "inherit", fontWeight: "inherit", color: active ? INK : STEEL_500, cursor: "pointer" }}
    >
      {label}
    </button>
  );
}
