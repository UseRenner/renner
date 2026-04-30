"use client";

import Link from "next/link";
import { useState } from "react";
import { Card, CLIENT_KINDS, RENNER_KINDS, type IllustrationKind } from "../_illustrations";

const SERIF = "var(--font-source-serif), ui-serif, Georgia, serif";
const SANS = "var(--font-source-sans), ui-sans-serif, system-ui, sans-serif";
const MONO = "var(--font-source-code), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const INK = "#0d0f12";
const STEEL_700 = "#4d5b6a";
const STEEL_500 = "#7d8da0";
const STEEL_300 = "#cad1d8";
const RULE = "#eaedf0";
const BONE = "#f6f7f9";
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

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        backgroundColor: INK,
        borderRadius: 36,
        padding: 8,
        boxShadow: "0 0 0 1px rgba(13,15,18,0.08)",
        maxWidth: 320,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          backgroundColor: BONE,
          borderRadius: 28,
          padding: 16,
          minHeight: 480,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {/* Notch */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 8,
            left: "50%",
            transform: "translateX(-50%)",
            width: 88,
            height: 22,
            backgroundColor: INK,
            borderRadius: 14,
          }}
        />
        {/* Status bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 12, fontFamily: MONO, fontSize: 9, fontWeight: 500, letterSpacing: "0.16em", color: STEEL_500, marginBottom: 8 }}>
          <span>9:41</span>
          <span aria-hidden style={{ display: "flex", gap: 3 }}>
            <span style={{ width: 14, height: 7, border: `1px solid ${STEEL_500}`, borderRadius: 1 }} />
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}

export function FrameBody({ showCta }: { showCta: boolean }) {
  const [tab, setTab] = useState<"client" | "renner">("client");
  const isClient = tab === "client";
  const dek = isClient ? CLIENT_DEK : RENNER_DEK;
  const captions = isClient ? CLIENT_CAPTIONS : RENNER_CAPTIONS;
  const kinds: IllustrationKind[] = isClient ? CLIENT_KINDS : RENNER_KINDS;
  const cta = isClient ? { label: "Sign up", href: "/signup" } : { label: "Become a Renner", href: "/become-a-renner" };

  return (
    <>
      {/* Top — meta line + audience switch */}
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 24, flexWrap: "wrap", marginBottom: "clamp(40px, 5vw, 56px)" }}>
        <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: STEEL_500 }}>
          Inside Renner
        </span>
        <div role="tablist" aria-label="Audience" style={{ display: "flex", alignItems: "baseline", gap: 14, fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 16 }}>
          <Tab label="For clients" active={isClient} onClick={() => setTab("client")} />
          <span aria-hidden style={{ color: STEEL_300, fontStyle: "normal" }}>·</span>
          <Tab label="For Renners" active={!isClient} onClick={() => setTab("renner")} />
        </div>
      </div>

      {/* Three phones in a row, each carrying one card from the flow */}
      <div className="frame-row" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "clamp(28px, 3.5vw, 56px)", marginBottom: "clamp(40px, 5vw, 56px)" }}>
        {kinds.map((kind, i) => (
          <div key={kind} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <PhoneFrame>
              <Card kind={kind} />
            </PhoneFrame>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.24em", textTransform: "uppercase", color: STEEL_500, marginBottom: 8 }}>
                {captions[i].number} · {captions[i].proof}
              </div>
              <div style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(20px, 2.2vw, 24px)", lineHeight: 1.1, color: INK, fontVariationSettings: '"opsz" 36' }}>
                {captions[i].title}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dek */}
      <p style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(18px, 1.8vw, 22px)", lineHeight: 1.55, color: STEEL_700, margin: "0 auto", marginBottom: "clamp(48px, 6vw, 72px)", maxWidth: "52ch", textAlign: "center", fontVariationSettings: '"opsz" 14' }}>
        {dek}
      </p>

      {/* Trust */}
      <section
        className="frame-trust"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "clamp(24px, 3vw, 48px)",
          paddingTop: "clamp(28px, 3.5vw, 36px)",
          borderTop: `1px solid ${INK}`,
          marginBottom: showCta ? "clamp(48px, 6vw, 72px)" : 0,
        }}
      >
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
          .frame-row,
          .frame-trust {
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
