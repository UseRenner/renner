"use client";

import Link from "next/link";
import { useState } from "react";

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

const CLIENT_DEK = "A marketplace for real-estate work. Post a task, pick a Renner, get it done. Both sides are screened to join.";
const RENNER_DEK = "Real-estate work, paid through the platform. Set your area, set your rate, pick what you take. Both sides are screened to join.";

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
  const isClient = tab === "client";
  const dek = isClient ? CLIENT_DEK : RENNER_DEK;
  const steps = isClient ? CLIENT_STEPS : RENNER_STEPS;
  const cta = isClient ? { label: "Sign up", href: "/signup" } : { label: "Become a Renner", href: "/become-a-renner" };

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
          <h1
            style={{
              fontFamily: SERIF,
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(32px, 4.5vw, 56px)",
              lineHeight: 1.05,
              letterSpacing: "-0.022em",
              color: INK,
              margin: 0,
              maxWidth: "14ch",
              fontVariationSettings: '"opsz" 96',
            }}
          >
            {isClient ? "Post a task. Pick a Renner. Get it done." : "Get verified. Pick a task. Get it done."}
          </h1>
        </section>

        <div aria-hidden style={{ backgroundColor: INK }} className="quarter-vrule" />

        {/* Top-right: dek */}
        <section className="quarter-cell" style={{ padding: "clamp(32px, 4.5vw, 64px)", display: "flex", alignItems: "center" }}>
          <p
            style={{
              fontFamily: SERIF,
              fontWeight: 400,
              fontSize: "clamp(17px, 1.5vw, 19px)",
              lineHeight: 1.6,
              color: STEEL_700,
              margin: 0,
              maxWidth: "44ch",
              fontVariationSettings: '"opsz" 14',
            }}
          >
            {dek}
          </p>
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

        {/* Bottom-right: trust */}
        <section className="quarter-cell" style={{ padding: "clamp(32px, 4.5vw, 64px)" }}>
          <dl style={{ margin: 0, display: "flex", flexDirection: "column", gap: 20 }}>
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
            ).map(([label, body]) => (
              <div key={label}>
                <dt style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 19, color: INK, marginBottom: 4, fontVariationSettings: '"opsz" 36' }}>
                  {label}.
                </dt>
                <dd style={{ fontFamily: SERIF, fontSize: 15, lineHeight: 1.55, color: STEEL_700, margin: 0, fontVariationSettings: '"opsz" 14' }}>
                  {body}
                </dd>
              </div>
            ))}
          </dl>
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
