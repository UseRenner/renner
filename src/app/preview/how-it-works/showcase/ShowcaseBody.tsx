"use client";

import Link from "next/link";
import { useState } from "react";
import { Card, CLIENT_KINDS, RENNER_KINDS } from "../_illustrations";

const SERIF = "var(--font-source-serif), ui-serif, Georgia, serif";
const SANS = "var(--font-source-sans), ui-sans-serif, system-ui, sans-serif";
const MONO = "var(--font-source-code), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const INK = "var(--c-text, #0d0f12)";
const STEEL_700 = "var(--c-700, #38414d)";
const STEEL_500 = "var(--c-500, #7d8da0)";
const STEEL_300 = "var(--c-300, #cad1d8)";
const RULE = "var(--c-rule, #eaedf0)";
const PAPER = "var(--c-bg, #fbfbfc)";

const CLIENT_DEK = "A marketplace for real-estate work. Post a task, pick a Renner. Verified on both sides.";
const RENNER_DEK = "Real-estate work, paid through the platform. Set your area, apply to tasks. Verified on both sides.";

const CLIENT_STEPS: Array<[string, string, string]> = [
  ["Post a task.", "Set the location, time, task, and price. Takes about two minutes.", "Under 2 min"],
  ["Pick a Renner.", "Renners apply. Read their profiles and book one.", "Vetted"],
  ["It gets done.", "The Renner sends photo confirmation. You confirm.", "Escrow"],
];

const RENNER_STEPS: Array<[string, string, string]> = [
  ["Get verified.", "Verify your ID, clear a background check, and set your service area. Done in a day.", "Same-day"],
  ["Pick a task.", "See tasks posted in your area. Apply to the ones that fit your skills and schedule.", "Local"],
  ["It gets done.", "Complete the task. Send photo confirmation.", "100% of pay"],
];

export function ShowcaseBody({ showCta }: { showCta: boolean }) {
  const [tab, setTab] = useState<"client" | "renner">("client");
  const isClient = tab === "client";
  const dek = isClient ? CLIENT_DEK : RENNER_DEK;
  const kinds = isClient ? CLIENT_KINDS : RENNER_KINDS;
  const steps = isClient ? CLIENT_STEPS : RENNER_STEPS;
  const cta = isClient ? { label: "Sign up", href: "/signup" } : { label: "Become a Renner", href: "/become-a-renner" };

  return (
    <>
      {/* Top — meta line + audience switch */}
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 24, flexWrap: "wrap", marginBottom: "clamp(24px, 3vw, 36px)" }}>
        <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: STEEL_500 }}>
          How it works
        </span>
        <div role="tablist" aria-label="Audience" style={{ display: "flex", alignItems: "baseline", gap: 14, fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 16 }}>
          <Tab label="For clients" active={isClient} onClick={() => setTab("client")} />
          <span aria-hidden style={{ color: STEEL_300, fontStyle: "normal" }}>·</span>
          <Tab label="For Renners" active={!isClient} onClick={() => setTab("renner")} />
        </div>
      </div>

      {/* Lede — sets the page's voice. Sits above the cards as a single
          confident sentence so the page reads top-down. */}
      <p style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(28px, 3.5vw, 44px)", lineHeight: 1.25, letterSpacing: "-0.012em", color: INK, margin: 0, marginBottom: "clamp(64px, 8vw, 96px)", maxWidth: "32ch", fontVariationSettings: '"opsz" 60' }}>
        {dek}
      </p>

      {/* Three card+caption columns — card on top, centered caption
          beneath. Centering the caption gives each column its own
          breathing margin so the three captions don't read as one
          back-to-back row of text. */}
      <div className="showcase-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "clamp(40px, 5vw, 72px)", marginBottom: "clamp(64px, 8vw, 96px)" }}>
        {kinds.map((kind, i) => {
          const [title, body, proof] = steps[i];
          return (
            <article key={kind} style={{ display: "flex", flexDirection: "column", gap: "clamp(20px, 2.4vw, 28px)" }}>
              <Card kind={kind} />
              <div style={{ paddingTop: "clamp(16px, 2vw, 20px)", borderTop: `1px solid ${RULE}`, width: "100%" }}>
                <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: STEEL_500, marginBottom: 10 }}>
                  {String(i + 1).padStart(2, "0")} · {proof}
                </div>
                <h3 style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(22px, 2.4vw, 28px)", lineHeight: 1.1, letterSpacing: "-0.012em", color: INK, margin: 0, marginBottom: 8, fontVariationSettings: '"opsz" 36' }}>
                  {title}
                </h3>
                <p style={{ fontFamily: SERIF, fontSize: 15, lineHeight: 1.55, color: STEEL_700, margin: 0, maxWidth: "26ch", fontVariationSettings: '"opsz" 14' }}>
                  {body}
                </p>
              </div>
            </article>
          );
        })}
      </div>

      {/* Trust — three reinforcing pairs in the same three-column rhythm */}
      <section
        className="showcase-trust"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "clamp(20px, 2.4vw, 32px)",
          paddingTop: "clamp(28px, 3.5vw, 36px)",
          borderTop: `1px solid ${INK}`,
          marginBottom: showCta ? "clamp(48px, 6vw, 72px)" : 0,
          textAlign: "center",
        }}
      >
        {(isClient
          ? [
              ["Both sides vetted", "ID verified and background checked before any booking."],
              ["Funds in escrow", "Held by Stripe until you confirm."],
              ["Photos on every task", "A photo and a note when it's done."],
            ]
          : [
              ["Real work", "Real-estate tasks."],
              ["Vetted clients", "ID verified and background checked, same as you."],
              ["Repeat work", "Saved as a favorite, booked again."],
            ]
        ).map(([label, body]) => (
          <div key={label}>
            <div style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 18, color: INK, marginBottom: 8, fontVariationSettings: '"opsz" 36' }}>
              {label}.
            </div>
            <div style={{ fontFamily: SERIF, fontSize: 14, lineHeight: 1.55, color: STEEL_700, fontVariationSettings: '"opsz" 14' }}>
              {body}
            </div>
          </div>
        ))}
      </section>

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
        @media (max-width: 880px) {
          .showcase-grid,
          .showcase-trust {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
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
