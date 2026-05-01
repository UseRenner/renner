"use client";

import Link from "next/link";
import { useState } from "react";
import { Mini, CLIENT_KINDS, RENNER_KINDS } from "../_illustrations";

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

const CLIENT_CAPTIONS = [
  { number: "01", title: "Post a task.", proof: "Under 2 min" },
  { number: "02", title: "Pick a Renner.", proof: "Checkr-vetted" },
  { number: "03", title: "Get it done.", proof: "Stripe escrow" },
];
const RENNER_CAPTIONS = [
  { number: "01", title: "Get verified.", proof: "Same-day" },
  { number: "02", title: "Pick a task.", proof: "Local" },
  { number: "03", title: "Get it done.", proof: "100% of pay" },
];

export function TopBody({ showCta }: { showCta: boolean }) {
  const [tab, setTab] = useState<"client" | "renner">("client");
  const isClient = tab === "client";
  const dek = isClient ? CLIENT_DEK : RENNER_DEK;
  const captions = isClient ? CLIENT_CAPTIONS : RENNER_CAPTIONS;
  const kinds = isClient ? CLIENT_KINDS : RENNER_KINDS;
  const cta = isClient ? { label: "Sign up", href: "/signup" } : { label: "Become a Renner", href: "/become-a-renner" };

  return (
    <>
      <div role="tablist" aria-label="Audience" style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: "clamp(40px, 5vw, 56px)", fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 16 }}>
        <Tab label="For clients" active={isClient} onClick={() => setTab("client")} />
        <span aria-hidden style={{ color: STEEL_300, fontStyle: "normal" }}>·</span>
        <Tab label="For Renners" active={!isClient} onClick={() => setTab("renner")} />
      </div>

      <p
        style={{
          fontFamily: SERIF,
          fontWeight: 400,
          fontSize: "clamp(28px, 3.5vw, 44px)",
          lineHeight: 1.25,
          letterSpacing: "-0.012em",
          color: INK,
          margin: 0,
          marginBottom: "clamp(56px, 7vw, 88px)",
          maxWidth: "32ch",
          fontVariationSettings: '"opsz" 60',
        }}
      >
        {dek}
      </p>

      <div className="top-row" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "clamp(24px, 3vw, 44px)", marginBottom: "clamp(48px, 6vw, 72px)" }}>
        {kinds.map((kind, i) => (
          <div key={kind} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Mini kind={kind} />
            <div style={{ paddingTop: 14, borderTop: `1px solid ${RULE}` }}>
              <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.22em", color: STEEL_500, marginBottom: 8 }}>
                {captions[i].number} · {captions[i].proof}
              </div>
              <div style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(20px, 2vw, 24px)", lineHeight: 1.1, color: INK, fontVariationSettings: '"opsz" 36' }}>
                {captions[i].title}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(24px, 3vw, 48px)", paddingTop: "clamp(28px, 3.5vw, 36px)", borderTop: `1px solid ${INK}`, marginBottom: showCta ? "clamp(48px, 6vw, 72px)" : 0 }} className="top-trust">
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
            <div style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 18, color: INK, marginBottom: 8, fontVariationSettings: '"opsz" 36' }}>
              {label}.
            </div>
            <div style={{ fontFamily: SERIF, fontSize: 14, lineHeight: 1.55, color: STEEL_700, fontVariationSettings: '"opsz" 14' }}>
              {body}
            </div>
          </div>
        ))}
      </div>

      {showCta && (
        <section style={{ display: "flex", justifyContent: "flex-start" }}>
          <Link href={cta.href} style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: SANS, fontSize: 14, fontWeight: 500, color: PAPER, backgroundColor: INK, border: `1px solid ${INK}`, borderRadius: 4, padding: "14px 22px", textDecoration: "none" }}>
            {cta.label}
            <span aria-hidden style={{ opacity: 0.7 }}>→</span>
          </Link>
        </section>
      )}

      <style jsx>{`
        @media (max-width: 880px) {
          .top-row,
          .top-trust {
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
    <button type="button" role="tab" aria-selected={active} onClick={onClick} style={{ background: "none", border: "none", padding: 0, fontFamily: "inherit", fontStyle: "inherit", fontSize: "inherit", fontWeight: "inherit", color: active ? INK : STEEL_500, cursor: "pointer" }}>
      {label}
    </button>
  );
}
