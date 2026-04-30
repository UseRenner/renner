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

const TICK = 14;

function Bracket({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <div className="plat-bracket" style={{ position: "relative", padding: "clamp(28px, 3.5vw, 48px) clamp(24px, 3vw, 40px)" }}>
      <span aria-hidden style={{ position: "absolute", top: 0, left: 0, width: TICK, height: 1, backgroundColor: INK }} />
      <span aria-hidden style={{ position: "absolute", top: 0, left: 0, width: 1, height: TICK, backgroundColor: INK }} />
      <span aria-hidden style={{ position: "absolute", top: 0, right: 0, width: TICK, height: 1, backgroundColor: INK }} />
      <span aria-hidden style={{ position: "absolute", top: 0, right: 0, width: 1, height: TICK, backgroundColor: INK }} />
      <span aria-hidden style={{ position: "absolute", bottom: 0, left: 0, width: TICK, height: 1, backgroundColor: INK }} />
      <span aria-hidden style={{ position: "absolute", bottom: 0, left: 0, width: 1, height: TICK, backgroundColor: INK }} />
      <span aria-hidden style={{ position: "absolute", bottom: 0, right: 0, width: TICK, height: 1, backgroundColor: INK }} />
      <span aria-hidden style={{ position: "absolute", bottom: 0, right: 0, width: 1, height: TICK, backgroundColor: INK }} />
      {label && (
        <span
          aria-hidden
          style={{
            position: "absolute",
            top: -7,
            left: 32,
            backgroundColor: PAPER,
            padding: "0 10px",
            fontFamily: MONO,
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: STEEL_500,
          }}
        >
          {label}
        </span>
      )}
      {children}
    </div>
  );
}

export function PlatBody({ showCta }: { showCta: boolean }) {
  const [tab, setTab] = useState<"client" | "renner">("client");
  const isClient = tab === "client";
  const dek = isClient ? CLIENT_DEK : RENNER_DEK;
  const steps = isClient ? CLIENT_STEPS : RENNER_STEPS;
  const trust = isClient ? CLIENT_TRUST : RENNER_TRUST;
  const cta = isClient
    ? { label: "Sign up", href: "/signup" }
    : { label: "Become a Renner", href: "/become-a-renner" };

  return (
    <>
      {/* Audience switch */}
      <div
        role="tablist"
        aria-label="Audience"
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 14,
          marginBottom: "clamp(40px, 5vw, 56px)",
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

      {/* Lede plat */}
      <div style={{ marginBottom: "clamp(40px, 5vw, 56px)" }}>
        <Bracket label="How it works">
          <h1
            style={{
              fontFamily: SERIF,
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(36px, 5vw, 64px)",
              lineHeight: 1.05,
              letterSpacing: "-0.022em",
              color: INK,
              margin: 0,
              marginBottom: 20,
              maxWidth: "20ch",
              fontVariationSettings: '"opsz" 96',
            }}
          >
            {isClient ? "Post. Pick. Done." : "Verify. Pick. Done."}
          </h1>
          <p
            style={{
              fontFamily: SERIF,
              fontSize: "clamp(16px, 1.4vw, 18px)",
              lineHeight: 1.6,
              color: STEEL_700,
              margin: 0,
              maxWidth: "52ch",
              fontVariationSettings: '"opsz" 14',
            }}
          >
            {dek}
          </p>
        </Bracket>
      </div>

      {/* Step plats — title above, body below */}
      <div style={{ display: "flex", flexDirection: "column", gap: "clamp(24px, 3vw, 40px)", marginBottom: "clamp(40px, 5vw, 64px)" }}>
        {steps.map((s) => (
          <Bracket key={s.number} label={`${s.number} · ${s.proof}`}>
            <div
              style={{
                fontFamily: SERIF,
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "clamp(26px, 3.2vw, 36px)",
                lineHeight: 1.1,
                letterSpacing: "-0.018em",
                color: INK,
                marginBottom: 14,
                fontVariationSettings: '"opsz" 60',
              }}
            >
              {s.title}
            </div>
            <p
              style={{
                fontFamily: SERIF,
                fontSize: "clamp(15px, 1.4vw, 17px)",
                lineHeight: 1.6,
                color: STEEL_700,
                margin: 0,
                maxWidth: "56ch",
                fontVariationSettings: '"opsz" 14',
              }}
            >
              {s.body}
            </p>
          </Bracket>
        ))}
      </div>

      {/* Trust plat */}
      <div style={{ marginBottom: showCta ? "clamp(32px, 4vw, 48px)" : 0 }}>
        <Bracket label={isClient ? "Why Renner" : "What you get"}>
          <div
            className="plat-trust"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "clamp(20px, 3vw, 40px)",
            }}
          >
            {trust.map(([label, body]) => (
              <div key={label}>
                <div style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 18, color: INK, marginBottom: 6, fontVariationSettings: '"opsz" 36' }}>
                  {label}.
                </div>
                <div style={{ fontFamily: SERIF, fontSize: 14, lineHeight: 1.55, color: STEEL_700, fontVariationSettings: '"opsz" 14' }}>
                  {body}
                </div>
              </div>
            ))}
          </div>
        </Bracket>
      </div>

      {showCta && (
        <Bracket>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(18px, 1.6vw, 22px)", color: INK, fontVariationSettings: '"opsz" 36' }}>
              {isClient ? "Get something done." : "Start running."}
            </span>
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
                padding: "12px 20px",
                textDecoration: "none",
              }}
            >
              {cta.label}
              <span aria-hidden style={{ opacity: 0.7 }}>→</span>
            </Link>
          </div>
        </Bracket>
      )}

      <style jsx>{`
        @media (max-width: 720px) {
          .plat-trust {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
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
