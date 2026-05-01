"use client";

// Atlas — every task has a place. The page foregrounds that. Each
// step is stamped with coordinates, a time window, and a price,
// the way a customs ledger or an arrivals board would render the
// same information. Speaks to the broker (precision) and the host
// (utility) at the same volume.

import Link from "next/link";
import { useState } from "react";
import { Mini } from "../_illustrations";

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

type Entry = {
  coords: string;
  zip: string;
  city: string;
  window: string;
  action: string;
  price: string;
  body: string;
  illustration: "brief" | "applicant" | "completion" | "profile" | "inbox" | "payout";
};

const CLIENT_ENTRIES: Entry[] = [
  { coords: "39.7184° N · 104.9519° W", zip: "80205", city: "Cherry Creek, CO", window: "Today · 14:00–17:00", action: "Install sign rider.", price: "$45", body: "Standard rider on a corner lot in RiNo. Bring a 6 ft ladder. Photographic confirmation on completion.", illustration: "brief" },
  { coords: "38.8939° N · 77.0365° W", zip: "20002", city: "Capitol Hill, DC", window: "Tomorrow · 09:00–10:00", action: "Lockbox swap.", price: "$30", body: "Replace the existing lockbox with a new SentriLock unit. Photo of new code in place required.", illustration: "applicant" },
  { coords: "30.2672° N · 97.7431° W", zip: "78702", city: "East Austin, TX", window: "Friday · 17:30–18:00", action: "Guest check-in.", price: "$40", body: "Meet the Airbnb guest at the door. Hand over the keys, walk the unit, confirm the wifi works.", illustration: "completion" },
];

const RENNER_ENTRIES: Entry[] = [
  { coords: "39.7392° N · 104.9903° W", zip: "80202", city: "Denver, CO", window: "Service area · 25 mi", action: "James M. signs on.", price: "$45/min", body: "ID-verified, Checkr-cleared. Picks the categories he runs — signs, lockbox, courier — and names a rate.", illustration: "profile" },
  { coords: "Local marketplace", zip: "—", city: "Briefs nearby", window: "4 active right now", action: "Pick a task.", price: "Yours", body: "Briefs come in from agents, brokers, and managers. Apply to the ones that fit. Decline anything that doesn't.", illustration: "inbox" },
  { coords: "Stripe payout", zip: "—", city: "Same day, on confirm", window: "Released by client", action: "$45 earned.", price: "100%", body: "Run the task, upload completion photos. Funds release through Stripe escrow. 100% of task pay.", illustration: "payout" },
];

export function AtlasBody({ showCta }: { showCta: boolean }) {
  const [tab, setTab] = useState<"client" | "renner">("client");
  const isClient = tab === "client";
  const entries = isClient ? CLIENT_ENTRIES : RENNER_ENTRIES;
  const cta = isClient ? { label: "Sign up", href: "/signup" } : { label: "Become a Renner", href: "/become-a-renner" };

  return (
    <>
      {/* Top — coordinates-style meta strip */}
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 24, paddingBottom: "clamp(20px, 2.5vw, 28px)", borderBottom: `1px solid ${INK}`, marginBottom: "clamp(48px, 6vw, 72px)", flexWrap: "wrap", fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: STEEL_500 }}>
        <span>An atlas of work</span>
        <span>Edition 26</span>
      </div>

      <div role="tablist" aria-label="Audience" style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: "clamp(40px, 5vw, 56px)", fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 16 }}>
        <Tab label="For clients" active={isClient} onClick={() => setTab("client")} />
        <span aria-hidden style={{ color: STEEL_300, fontStyle: "normal" }}>·</span>
        <Tab label="For Renners" active={!isClient} onClick={() => setTab("renner")} />
      </div>

      {/* Headline — confident, lower-case, italic to echo the wordmark */}
      <h1
        style={{
          fontFamily: SERIF,
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "clamp(56px, 9vw, 144px)",
          lineHeight: 0.92,
          letterSpacing: "-0.035em",
          color: INK,
          margin: 0,
          marginBottom: "clamp(24px, 3vw, 36px)",
          maxWidth: "12ch",
          fontVariationSettings: '"opsz" 144',
        }}
      >
        real estate, located.
      </h1>

      <p
        style={{
          fontFamily: SERIF,
          fontWeight: 400,
          fontSize: "clamp(18px, 1.7vw, 22px)",
          lineHeight: 1.55,
          color: STEEL_700,
          margin: 0,
          marginBottom: "clamp(72px, 9vw, 112px)",
          maxWidth: "44ch",
          fontVariationSettings: '"opsz" 14',
        }}
      >
        A marketplace and a network for real-estate task work. Three entries from this week. Both sides are screened to join.
      </p>

      {/* Entries — each one stamped with place, time, action, price */}
      <div style={{ marginBottom: "clamp(72px, 9vw, 112px)" }}>
        {entries.map((e, i) => (
          <article
            key={i}
            className="atlas-entry"
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(220px, 280px) minmax(0, 1fr) minmax(280px, 320px)",
              gap: "clamp(28px, 4vw, 56px)",
              padding: "clamp(36px, 5vw, 56px) 0",
              borderTop: `1px solid ${INK}`,
              borderBottom: i === entries.length - 1 ? `1px solid ${INK}` : "none",
              alignItems: "start",
            }}
          >
            <div>
              <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.22em", color: STEEL_500, marginBottom: 12 }}>
                Entry {String(i + 1).padStart(2, "0")}
              </div>
              <div style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(20px, 2vw, 24px)", lineHeight: 1.2, color: INK, marginBottom: 6, fontVariationSettings: '"opsz" 36' }}>
                {e.city}
              </div>
              <div style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: "0.08em", color: STEEL_600, lineHeight: 1.55 }}>
                {e.coords}
                <br />
                {e.zip !== "—" && <>ZIP {e.zip}<br /></>}
                {e.window}
              </div>
            </div>
            <div>
              <h3 style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(28px, 3.4vw, 40px)", lineHeight: 1.05, letterSpacing: "-0.018em", color: INK, margin: 0, marginBottom: 14, fontVariationSettings: '"opsz" 60' }}>
                {e.action}
              </h3>
              <p style={{ fontFamily: SERIF, fontSize: 16, lineHeight: 1.6, color: STEEL_700, margin: 0, marginBottom: 18, maxWidth: "44ch", fontVariationSettings: '"opsz" 14' }}>
                {e.body}
              </p>
              <div style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: INK }}>
                {e.price}
              </div>
            </div>
            <div className="atlas-illustration" style={{ display: "flex", justifyContent: "flex-end" }}>
              <Mini kind={e.illustration} />
            </div>
          </article>
        ))}
      </div>

      {/* Trust as one quiet inline line — atlas register */}
      <div style={{ marginBottom: showCta ? "clamp(48px, 6vw, 72px)" : 0, paddingTop: 0 }}>
        <div style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(18px, 1.7vw, 22px)", lineHeight: 1.5, color: INK, maxWidth: "60ch", fontVariationSettings: '"opsz" 36' }}>
          {isClient
            ? "Both sides are vetted — ID and Checkr — before any booking. Funds sit in Stripe escrow until you confirm. Photos and a written note arrive on every task."
            : "The clients who book you are vetted — ID and Checkr — the same as you. You set your rate and your area. Stripe pays you on confirm; 100% of the task pay is yours."}
        </div>
      </div>

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
        @media (max-width: 1024px) {
          .atlas-entry {
            grid-template-columns: minmax(220px, 280px) minmax(0, 1fr) !important;
          }
          .atlas-illustration {
            display: none !important;
          }
        }
        @media (max-width: 720px) {
          .atlas-entry {
            grid-template-columns: 1fr !important;
            gap: 18px !important;
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
