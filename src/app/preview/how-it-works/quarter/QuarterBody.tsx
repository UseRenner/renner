"use client";

import Link from "next/link";
import { useState } from "react";
import { Card } from "../_illustrations";

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
  { number: "01", title: "Post a task.", body: "Set the location, time, task, and price. Takes about two minutes.", proof: "Under 2 min" },
  { number: "02", title: "Pick a Renner.", body: "Renners apply. Read their profiles and book one.", proof: "Vetted" },
  { number: "03", title: "It gets done.", body: "The Renner sends photo confirmation. You confirm.", proof: "Escrow" },
];
const RENNER_STEPS = [
  { number: "01", title: "Get verified.", body: "Verify your ID, clear a background check, and set your service area. Done in a day.", proof: "Same-day" },
  { number: "02", title: "Pick a task.", body: "See tasks posted in your area. Apply to the ones that fit your skills and schedule.", proof: "Local" },
  { number: "03", title: "It gets done.", body: "Complete the task. Send photo confirmation.", proof: "100% of pay" },
];

export function QuarterBody({ showCta }: { showCta: boolean }) {
  const [tab, setTab] = useState<"client" | "renner">("client");
  const isClient = tab === "client";
  const steps = isClient ? CLIENT_STEPS : RENNER_STEPS;
  const cta = isClient ? { label: "Sign up", href: "/signup" } : { label: "Become a Renner", href: "/become-a-renner" };

  const trustPairs: Array<[string, string, string]> = isClient
    ? [
        ["Both sides vetted", "ID verified and background checked before any booking.", "Verified"],
        ["Funds in escrow", "Held by Stripe until you confirm.", "In escrow"],
        ["Photos on every task", "A photo and a note when it's done.", "Photo + note"],
      ]
    : [
        ["Real work", "Real-estate tasks.", "Real-estate"],
        ["Vetted clients", "ID verified and background checked, same as you.", "Verified"],
        ["Repeat work", "Saved as a favorite, booked again.", "Saved & booked"],
      ];

  return (
    <>
      <div role="tablist" aria-label="Audience" style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: "clamp(40px, 5vw, 56px)", fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 16 }}>
        <Tab label="For clients" active={isClient} onClick={() => setTab("client")} />
        <span aria-hidden style={{ color: STEEL_300, fontStyle: "normal" }}>·</span>
        <Tab label="For Renners" active={!isClient} onClick={() => setTab("renner")} />
      </div>

      {/* 2 × 2 grid divided by an ink crosshair — every cell shares
          the same width and height so the page reads as four equal
          quadrants rather than a top/bottom split. */}
      <div
        className="quarter"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1px 1fr",
          gridTemplateRows: "1fr 1px 1fr",
          border: `1px solid ${INK}`,
          minHeight: "clamp(640px, 70vw, 820px)",
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
            {isClient
              ? "A marketplace for real-estate work. Post a task, pick a Renner. Verified on both sides."
              : "Real-estate work, paid through the platform. Set your area, apply to tasks. Verified on both sides."}
          </p>
        </section>

        <div aria-hidden style={{ backgroundColor: INK }} className="quarter-vrule" />

        {/* Top-right: a UI illustration — see the product first */}
        <section className="quarter-cell" style={{ padding: "clamp(28px, 3.5vw, 48px)", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: BONE }}>
          <Card kind={isClient ? "task" : "inbox"} />
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

        {/* Bottom-right: trust — italic claims with mono kickers,
            paired typographically with the lede in the top-left so all
            four quadrants read as one editorial spread. */}
        <section
          className="quarter-cell quarter-trust"
          style={{
            padding: "clamp(32px, 4.5vw, 64px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: STEEL_500, marginBottom: 28 }}>
            {isClient ? "Why Renner" : "What you get"}
          </div>
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
            min-height: 0 !important;
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
