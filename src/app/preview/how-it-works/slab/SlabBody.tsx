"use client";

import Link from "next/link";
import { useState } from "react";

const SERIF = "var(--font-source-serif), ui-serif, Georgia, serif";
const SANS =
  "var(--font-source-sans), ui-sans-serif, system-ui, sans-serif";
const MONO =
  "var(--font-source-code), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const INK = "#0d0f12";
const STEEL_700 = "#4d5b6a";
const STEEL_600 = "#647589";
const STEEL_500 = "#7d8da0";
const STEEL_300 = "#cad1d8";
const RULE = "#eaedf0";
const PAPER = "#fbfbfc";

type Step = { number: string; title: string; body: string; proof: string };

const CLIENT_DEK =
  "A marketplace for real-estate work. Post a task, pick a vetted Renner, get it done.";
const RENNER_DEK =
  "Real-estate work, paid through the platform. Set your area, set your rate, pick what you take.";

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

export function SlabBody({ showCta }: { showCta: boolean }) {
  const [tab, setTab] = useState<"client" | "renner">("client");
  const isClient = tab === "client";
  const dek = isClient ? CLIENT_DEK : RENNER_DEK;
  const steps = isClient ? CLIENT_STEPS : RENNER_STEPS;
  const trust = isClient ? CLIENT_TRUST : RENNER_TRUST;
  const cta = isClient
    ? { label: "Sign up", href: "/signup" }
    : { label: "Become a Renner", href: "/become-a-renner" };

  const clauses = isClient
    ? ["Post a task.", "Pick a Renner.", "Get it done."]
    : ["Get verified.", "Pick a task.", "Get it done."];

  return (
    <>
      <div
        role="tablist"
        aria-label="Audience"
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 14,
          marginBottom: "clamp(48px, 6vw, 80px)",
          fontFamily: SERIF,
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: 16,
        }}
      >
        <Tab label="For clients" active={isClient} onClick={() => setTab("client")} />
        <span aria-hidden style={{ color: STEEL_300, fontStyle: "normal" }}>·</span>
        <Tab label="For Renners" active={!isClient} onClick={() => setTab("renner")} />
      </div>

      {/* The slab — three clauses, each on its own line, scaled to fill */}
      <h1
        style={{
          fontFamily: SERIF,
          fontWeight: 400,
          fontSize: "clamp(64px, 13vw, 220px)",
          lineHeight: 0.92,
          letterSpacing: "-0.04em",
          color: INK,
          margin: 0,
          marginBottom: "clamp(64px, 9vw, 128px)",
          fontVariationSettings: '"opsz" 144',
        }}
      >
        {clauses.map((c, i) => (
          <span key={i} style={{ display: "block" }}>{c}</span>
        ))}
      </h1>

      {/* Dek as a single short paragraph */}
      <p
        style={{
          fontFamily: SERIF,
          fontWeight: 400,
          fontSize: "clamp(20px, 1.9vw, 24px)",
          lineHeight: 1.45,
          color: STEEL_700,
          margin: 0,
          marginBottom: "clamp(56px, 7vw, 96px)",
          maxWidth: "44ch",
          fontVariationSettings: '"opsz" 14',
        }}
      >
        {dek}
      </p>

      {/* Three thin rows. Everything supports the slab above. */}
      <div style={{ borderTop: `1px solid ${INK}`, marginBottom: "clamp(56px, 7vw, 96px)" }}>
        {steps.map((s, i) => (
          <div
            key={s.number}
            className="slab-row"
            style={{
              padding: "clamp(20px, 2.4vw, 32px) 0",
              borderBottom: i === steps.length - 1 ? `1px solid ${INK}` : `1px solid ${RULE}`,
              alignItems: "baseline",
            }}
          >
            <span style={{ fontFamily: MONO, fontSize: 12, fontWeight: 500, letterSpacing: "0.22em", color: STEEL_500 }}>
              {s.number}
            </span>
            <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(20px, 2vw, 24px)", color: INK, fontVariationSettings: '"opsz" 36' }}>
              {s.title}
            </span>
            <span style={{ fontFamily: SERIF, fontSize: 15, lineHeight: 1.5, color: STEEL_700, fontVariationSettings: '"opsz" 14' }}>
              {s.body}
            </span>
            <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: STEEL_600, textAlign: "right" }}>
              {s.proof}
            </span>
          </div>
        ))}
      </div>

      {/* Trust as one mono band, no boxes */}
      <div
        className="slab-trust"
        style={{
          display: "flex",
          gap: "clamp(24px, 4vw, 64px)",
          flexWrap: "wrap",
          marginBottom: showCta ? "clamp(56px, 7vw, 88px)" : 0,
        }}
      >
        {trust.map(([label, body]) => (
          <div key={label} style={{ flex: "1 1 220px" }}>
            <div style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 18, color: INK, marginBottom: 4, fontVariationSettings: '"opsz" 36' }}>
              {label}.
            </div>
            <div style={{ fontFamily: SERIF, fontSize: 14, lineHeight: 1.55, color: STEEL_700, fontVariationSettings: '"opsz" 14' }}>
              {body}
            </div>
          </div>
        ))}
      </div>

      {showCta && (
        <section
          style={{
            display: "flex",
            justifyContent: "flex-end",
            paddingTop: "clamp(40px, 5vw, 64px)",
            borderTop: `1px solid ${INK}`,
          }}
        >
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
        .slab-row {
          display: grid;
          grid-template-columns: 56px minmax(160px, 1fr) minmax(0, 2.4fr) minmax(120px, 1fr);
          gap: clamp(16px, 2.4vw, 32px);
        }
        @media (max-width: 720px) {
          .slab-row {
            grid-template-columns: 40px 1fr;
            gap: 8px 16px;
          }
          .slab-row > :nth-child(3),
          .slab-row > :nth-child(4) {
            grid-column: 2;
          }
          .slab-row > :nth-child(4) {
            text-align: left !important;
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
      style={{
        background: "none",
        border: "none",
        padding: 0,
        fontFamily: "inherit",
        fontStyle: "inherit",
        fontSize: "inherit",
        fontWeight: "inherit",
        color: active ? INK : STEEL_500,
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}
