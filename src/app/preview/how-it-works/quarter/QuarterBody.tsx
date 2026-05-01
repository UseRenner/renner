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
  const [trustVariant, setTrustVariant] = useState<"A" | "B" | "C" | "D" | "E">("A");
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
        <section
          className="quarter-cell quarter-trust"
          style={{
            position: "relative",
            padding: trustVariant === "B" ? 0 : "clamp(32px, 4.5vw, 64px)",
            borderLeft: trustVariant === "A" || trustVariant === "D" || trustVariant === "E" ? `3px solid ${INK}` : "none",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              gap: 16,
              flexWrap: "wrap",
              padding: trustVariant === "B" ? "clamp(20px, 2.4vw, 28px) clamp(20px, 2.4vw, 28px) 0" : 0,
              marginBottom: trustVariant === "B" ? 0 : 28,
              position: trustVariant === "B" ? "absolute" : "static",
              top: trustVariant === "B" ? 0 : undefined,
              left: trustVariant === "B" ? 0 : undefined,
              right: trustVariant === "B" ? 0 : undefined,
              zIndex: 1,
            }}
          >
            <span
              style={{
                fontFamily: MONO,
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: trustVariant === "B" ? "rgba(251,251,252,0.55)" : STEEL_500,
              }}
            >
              {isClient ? "Why Renner" : "What you get"}
            </span>
            <div
              role="tablist"
              aria-label="Design option"
              style={{ display: "flex", alignItems: "baseline", gap: 8, fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase" }}
            >
              {(["A", "B", "C", "D", "E"] as const).map((v) => {
                const onPlaque = trustVariant === "B";
                const inactiveColor = onPlaque ? "rgba(251,251,252,0.55)" : STEEL_500;
                const activeColor = onPlaque ? "var(--c-paper, #fbfbfc)" : INK;
                const activeBorder = onPlaque ? "var(--c-paper, #fbfbfc)" : INK;
                const inactiveBorder = onPlaque ? "rgba(251,251,252,0.32)" : STEEL_300;
                return (
                  <button
                    key={v}
                    type="button"
                    role="tab"
                    aria-selected={trustVariant === v}
                    onClick={() => setTrustVariant(v)}
                    style={{
                      background: "none",
                      border: `1px solid ${trustVariant === v ? activeBorder : inactiveBorder}`,
                      padding: "4px 8px",
                      color: trustVariant === v ? activeColor : inactiveColor,
                      cursor: "pointer",
                      fontFamily: "inherit",
                      fontSize: "inherit",
                      fontWeight: "inherit",
                      letterSpacing: "inherit",
                      textTransform: "inherit",
                    }}
                  >
                    {v}
                  </button>
                );
              })}
            </div>
          </div>

          {trustVariant === "A" && (
            // A — Receipt. Pure mono ledger lines with leader dots.
            <dl style={{ margin: 0, display: "flex", flexDirection: "column", gap: 0 }}>
              {trustPairs.map(([label, , kicker], i, arr) => (
                <div
                  key={label}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "minmax(0, auto) minmax(40px, 1fr) minmax(0, auto)",
                    gap: 12,
                    alignItems: "baseline",
                    padding: "16px 0",
                    borderBottom: i === arr.length - 1 ? "none" : `1px dashed ${RULE}`,
                  }}
                >
                  <dt
                    style={{
                      fontFamily: MONO,
                      fontSize: 12,
                      fontWeight: 500,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: INK,
                    }}
                  >
                    {label}
                  </dt>
                  <span aria-hidden style={{ borderBottom: `1px dotted ${STEEL_300}`, alignSelf: "center", marginBottom: 4 }} />
                  <dd
                    style={{
                      fontFamily: MONO,
                      fontSize: 11,
                      fontWeight: 500,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: STEEL_700,
                      margin: 0,
                    }}
                  >
                    {kicker}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          {trustVariant === "B" && (
            // B — Plaque. A single ink-filled plaque bleeds to the cell
            //     edges; paper italic claims stack inside it.
            <div
              style={{
                backgroundColor: INK,
                color: "var(--c-paper, #fbfbfc)",
                padding: "clamp(56px, 7vw, 96px) clamp(32px, 4.5vw, 64px) clamp(32px, 4.5vw, 64px)",
                minHeight: "100%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <dl style={{ margin: 0, display: "flex", flexDirection: "column", gap: "clamp(20px, 2.4vw, 28px)", width: "100%" }}>
                {trustPairs.map(([label, , kicker]) => (
                  <div key={label}>
                    <dt
                      style={{
                        fontFamily: SERIF,
                        fontStyle: "italic",
                        fontWeight: 300,
                        fontSize: "clamp(26px, 3vw, 36px)",
                        lineHeight: 1.1,
                        letterSpacing: "-0.014em",
                        color: "var(--c-paper, #fbfbfc)",
                        marginBottom: 6,
                        fontVariationSettings: '"opsz" 60',
                      }}
                    >
                      {label}.
                    </dt>
                    <dd
                      style={{
                        fontFamily: MONO,
                        fontSize: 10,
                        fontWeight: 500,
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: "rgba(251,251,252,0.62)",
                        margin: 0,
                      }}
                    >
                      {kicker}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {trustVariant === "C" && (
            // C — Card stack. Three small steel-panel cards stacked.
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {trustPairs.map(([label, body]) => (
                <div
                  key={label}
                  style={{
                    backgroundColor: "var(--c-panel, #eaedf0)",
                    padding: "clamp(20px, 2.4vw, 28px)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                  }}
                >
                  <span
                    style={{
                      fontFamily: SERIF,
                      fontStyle: "italic",
                      fontWeight: 300,
                      fontSize: "clamp(20px, 2.2vw, 24px)",
                      lineHeight: 1.1,
                      letterSpacing: "-0.012em",
                      color: INK,
                      fontVariationSettings: '"opsz" 36',
                    }}
                  >
                    {label}.
                  </span>
                  <span
                    style={{
                      fontFamily: SERIF,
                      fontSize: 14,
                      lineHeight: 1.55,
                      color: STEEL_700,
                      fontVariationSettings: '"opsz" 14',
                    }}
                  >
                    {body}
                  </span>
                </div>
              ))}
            </div>
          )}

          {trustVariant === "E" && (
            // E — Italic claims at a quieter display size, mono kicker beneath.
            <dl style={{ margin: 0, display: "flex", flexDirection: "column", gap: "clamp(22px, 2.6vw, 30px)" }}>
              {trustPairs.map(([label, , kicker]) => (
                <div key={label}>
                  <dt
                    style={{
                      fontFamily: SERIF,
                      fontStyle: "italic",
                      fontWeight: 300,
                      fontSize: "clamp(22px, 2.4vw, 28px)",
                      lineHeight: 1.1,
                      letterSpacing: "-0.012em",
                      color: INK,
                      marginBottom: 8,
                      fontVariationSettings: '"opsz" 36',
                    }}
                  >
                    {label}.
                  </dt>
                  <dd
                    style={{
                      fontFamily: MONO,
                      fontSize: 10,
                      fontWeight: 500,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: STEEL_500,
                      margin: 0,
                    }}
                  >
                    {kicker}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          {trustVariant === "D" && (
            // D — Hairline schedule. Full-width hairline rules with italic
            //     label on the left and mono proof flushed right.
            <dl style={{ margin: 0, borderTop: `1px solid ${INK}` }}>
              {trustPairs.map(([label, , kicker], i, arr) => (
                <div
                  key={label}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "minmax(0, 1fr) minmax(0, auto)",
                    gap: 16,
                    alignItems: "baseline",
                    padding: "clamp(18px, 2.2vw, 24px) 0",
                    borderBottom: i === arr.length - 1 ? `1px solid ${INK}` : `1px solid ${RULE}`,
                  }}
                >
                  <dt
                    style={{
                      fontFamily: SERIF,
                      fontStyle: "italic",
                      fontWeight: 300,
                      fontSize: "clamp(20px, 2.2vw, 24px)",
                      lineHeight: 1.1,
                      letterSpacing: "-0.012em",
                      color: INK,
                      fontVariationSettings: '"opsz" 36',
                    }}
                  >
                    {label}
                  </dt>
                  <dd
                    style={{
                      fontFamily: MONO,
                      fontSize: 10,
                      fontWeight: 500,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: STEEL_500,
                      margin: 0,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {kicker}
                  </dd>
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
