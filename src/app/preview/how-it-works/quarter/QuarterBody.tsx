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
const STEEL_500 = "var(--c-500, #7d8da0)";
const STEEL_300 = "var(--c-300, #cad1d8)";
const RULE = "var(--c-rule, #eaedf0)";
const BONE = "var(--ill-bg, #f6f7f9)";
const PAPER = "var(--c-bg, #fbfbfc)";

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

export function QuarterBody({ showCta }: { showCta: boolean }) {
  const [tab, setTab] = useState<"client" | "renner">("client");
  const [trustVariant, setTrustVariant] = useState<"A" | "B" | "C" | "D">("A");
  const isClient = tab === "client";
  const steps = isClient ? CLIENT_STEPS : RENNER_STEPS;
  const cta = isClient ? { label: "Sign up", href: "/signup" } : { label: "Become a Renner", href: "/become-a-renner" };

  const trustPairs: Array<[string, string, string]> = isClient
    ? [
        ["Both sides vetted", "ID and Checkr before any booking.", "ID + Checkr"],
        ["Funds in escrow", "Held by Stripe until you confirm.", "Stripe held"],
        ["On the record", "Photos and a note on every task.", "Photos + note"],
      ]
    : [
        ["Real work", "From agents, brokers, managers.", "Agents · brokers · managers"],
        ["Vetted clients", "ID and Checkr, same as you.", "ID + Checkr"],
        ["Repeat work", "A reputation paid in repeat clients.", "Built task by task"],
      ];
  const trustHeadline = isClient
    ? "Both sides vetted. Funds held. On the record."
    : "Real work. Vetted clients. Repeat work.";

  return (
    <>
      <div role="tablist" aria-label="Audience" style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: "clamp(40px, 5vw, 56px)", fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 16 }}>
        <Tab label="For clients" active={isClient} onClick={() => setTab("client")} />
        <span aria-hidden style={{ color: STEEL_300, fontStyle: "normal" }}>·</span>
        <Tab label="For Renners" active={!isClient} onClick={() => setTab("renner")} />
      </div>

      {/* 2 × 2 grid divided by an ink crosshair */}
      <div
        className="quarter"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1px 1fr",
          gridTemplateRows: "auto 1px auto",
          border: `1px solid ${INK}`,
          marginBottom: showCta ? "clamp(40px, 5vw, 56px)" : 0,
        }}
      >
        {/* Top-left: statement */}
        <section className="quarter-cell" style={{ padding: "clamp(32px, 4.5vw, 64px)", display: "flex", alignItems: "center" }}>
          <p
            style={{
              fontFamily: SERIF,
              fontWeight: 400,
              fontSize: "clamp(22px, 2.6vw, 30px)",
              lineHeight: 1.35,
              letterSpacing: "-0.005em",
              color: INK,
              margin: 0,
              maxWidth: "32ch",
              fontVariationSettings: '"opsz" 60',
            }}
          >
            A marketplace for real-estate work. Post a task, pick a Renner, get it done. Both sides are screened to join.
          </p>
        </section>

        <div aria-hidden style={{ backgroundColor: INK }} className="quarter-vrule" />

        {/* Top-right: a UI illustration — see the product first */}
        <section className="quarter-cell" style={{ padding: "clamp(28px, 3.5vw, 48px)", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: BONE }}>
          <Mini kind={isClient ? "brief" : "inbox"} />
        </section>

        {/* Horizontal rule across all three columns */}
        <div aria-hidden style={{ backgroundColor: INK, gridColumn: "1 / -1" }} />

        {/* Bottom-left: steps */}
        <section className="quarter-cell" style={{ padding: "clamp(32px, 4.5vw, 64px)" }}>
          <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {steps.map((s, i) => (
              <li
                key={s.number}
                style={{
                  padding: "20px 0",
                  borderBottom: i === steps.length - 1 ? "none" : `1px solid ${RULE}`,
                  display: "grid",
                  gridTemplateColumns: "44px minmax(0, 1fr)",
                  gap: 16,
                  alignItems: "baseline",
                }}
              >
                <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: "0.22em", color: STEEL_500 }}>{s.number}</span>
                <div>
                  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, marginBottom: 6 }}>
                    <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 19, color: INK, fontVariationSettings: '"opsz" 36' }}>
                      {s.title}
                    </span>
                    <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: STEEL_600, whiteSpace: "nowrap" }}>{s.proof}</span>
                  </div>
                  <div style={{ fontFamily: SERIF, fontSize: 15, lineHeight: 1.55, color: STEEL_700, fontVariationSettings: '"opsz" 14' }}>
                    {s.body}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <div aria-hidden style={{ backgroundColor: INK }} className="quarter-vrule" />

        {/* Bottom-right: trust — four design options switch in place. */}
        <section className="quarter-cell quarter-trust" style={{ padding: "clamp(32px, 4.5vw, 64px)", borderLeft: trustVariant === "A" ? "none" : `3px solid ${INK}` }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, marginBottom: 28, flexWrap: "wrap" }}>
            <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: STEEL_500 }}>
              {isClient ? "Why Renner" : "What you get"}
            </span>
            <div role="tablist" aria-label="Design option" style={{ display: "flex", alignItems: "baseline", gap: 8, fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase" }}>
              {(["A", "B", "C", "D"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  role="tab"
                  aria-selected={trustVariant === v}
                  onClick={() => setTrustVariant(v)}
                  style={{ background: "none", border: `1px solid ${trustVariant === v ? INK : STEEL_300}`, padding: "4px 8px", color: trustVariant === v ? INK : STEEL_500, cursor: "pointer", fontFamily: "inherit", fontSize: "inherit", fontWeight: "inherit", letterSpacing: "inherit", textTransform: "inherit" }}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {trustVariant === "A" && (
            // A — big italic claims, body recedes to a mono kicker
            <dl style={{ margin: 0, display: "flex", flexDirection: "column", gap: "clamp(28px, 3.5vw, 40px)" }}>
              {trustPairs.map(([label, , kicker]) => (
                <div key={label}>
                  <dt style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(32px, 4vw, 48px)", lineHeight: 1.05, letterSpacing: "-0.018em", color: INK, marginBottom: 10, fontVariationSettings: '"opsz" 96' }}>
                    {label}.
                  </dt>
                  <dd style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: STEEL_500, margin: 0 }}>
                    {kicker}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          {trustVariant === "B" && (
            // B — mono spec sheet: chevron · italic label · rule · serif body
            <dl style={{ margin: 0, borderTop: `1px solid ${RULE}` }}>
              {trustPairs.map(([label, body], i, arr) => (
                <div key={label} style={{ display: "grid", gridTemplateColumns: "16px minmax(160px, auto) minmax(0, 1fr)", gap: 16, alignItems: "baseline", padding: "18px 0", borderBottom: i === arr.length - 1 ? `1px solid ${RULE}` : `1px solid ${RULE}` }}>
                  <span aria-hidden style={{ fontFamily: MONO, fontSize: 12, color: STEEL_500 }}>›</span>
                  <dt style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 17, color: INK, fontVariationSettings: '"opsz" 36' }}>
                    {label}
                  </dt>
                  <dd style={{ fontFamily: SERIF, fontSize: 14, lineHeight: 1.55, color: STEEL_700, margin: 0, fontVariationSettings: '"opsz" 14' }}>
                    {body}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          {trustVariant === "C" && (
            // C — one italic statement at the top, three small bullets beneath
            <div>
              <p style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(26px, 3vw, 36px)", lineHeight: 1.2, letterSpacing: "-0.014em", color: INK, margin: 0, marginBottom: "clamp(28px, 3.5vw, 36px)", fontVariationSettings: '"opsz" 60' }}>
                {trustHeadline}
              </p>
              <dl style={{ margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                {trustPairs.map(([label, body]) => (
                  <div key={label} style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr)", gap: 2 }}>
                    <dt style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: STEEL_500 }}>
                      {label}
                    </dt>
                    <dd style={{ fontFamily: SERIF, fontSize: 14, lineHeight: 1.5, color: STEEL_700, margin: 0, fontVariationSettings: '"opsz" 14' }}>
                      {body}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {trustVariant === "D" && (
            // D — sigil-anchored pairs: small steel disc, italic label, body to the right
            <dl style={{ margin: 0, display: "flex", flexDirection: "column", gap: "clamp(20px, 2.4vw, 28px)" }}>
              {trustPairs.map(([label, body], i) => (
                <div key={label} style={{ display: "grid", gridTemplateColumns: "44px minmax(0, 1fr)", gap: 18, alignItems: "start" }}>
                  <span aria-hidden style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: "50%", backgroundColor: "var(--ill-disc-bg, #cad1d8)", color: "var(--ill-disc-text, #0d0f12)", fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: "0.04em" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <dt style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(20px, 2.2vw, 24px)", lineHeight: 1.15, letterSpacing: "-0.012em", color: INK, marginBottom: 6, fontVariationSettings: '"opsz" 36' }}>
                      {label}.
                    </dt>
                    <dd style={{ fontFamily: SERIF, fontSize: 14, lineHeight: 1.55, color: STEEL_700, margin: 0, fontVariationSettings: '"opsz" 14' }}>
                      {body}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          )}
        </section>
      </div>

      {showCta && (
        <section style={{ display: "flex", justifyContent: "flex-end" }}>
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
          .quarter {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto !important;
          }
          .quarter-vrule {
            display: none !important;
          }
          .quarter-cell {
            border-bottom: 1px solid ${RULE};
          }
          .quarter-cell:last-child {
            border-bottom: none;
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
