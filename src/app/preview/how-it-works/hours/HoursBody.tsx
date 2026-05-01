"use client";

// Hours — the marketplace runs at every hour. The page is built
// around a 24-hour ruler. Tasks happen at specific times. The
// chronology speaks to a host (a guest arrives at 4 pm) and a
// broker (a sign goes up before tomorrow morning's open house)
// at the same scale.

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

type Moment = { time: string; hour: number; title: string; body: string; place: string; price: string; illustration: "brief" | "applicant" | "completion" | "profile" | "inbox" | "payout" };

const CLIENT_MOMENTS: Moment[] = [
  { time: "08:14", hour: 8, title: "You post a task.", body: "A sign install on a corner lot. Window: today 14:00–17:00. Price: $45.", place: "Cherry Creek, CO", price: "$45", illustration: "brief" },
  { time: "12:32", hour: 12, title: "A Renner books it.", body: "James M. — vetted, 4.96, 142 tasks. Two miles away. He arrives at 14:08.", place: "Denver, CO · 2.4 mi", price: "Booked", illustration: "applicant" },
  { time: "16:47", hour: 17, title: "It's done.", body: "Photos arrive. You confirm. Stripe releases the funds, in full, to the Renner.", place: "Confirmed", price: "$45 · Stripe", illustration: "completion" },
];

const RENNER_MOMENTS: Moment[] = [
  { time: "07:00", hour: 7, title: "You sign on.", body: "ID-verified, Checkr-cleared, area drawn, rate set. Same-day clearance in most states.", place: "Denver, CO · 25 mi", price: "$45/min", illustration: "profile" },
  { time: "10:18", hour: 10, title: "A brief comes in.", body: "A sign install nearby. You read the file, you apply. The decision is yours.", place: "Briefs nearby · 4", price: "Apply", illustration: "inbox" },
  { time: "16:47", hour: 17, title: "You're paid.", body: "Photos uploaded, brief confirmed. Stripe pays out 100% of the task — same day.", place: "Stripe payout", price: "$45 · 100%", illustration: "payout" },
];

function HourRuler({ marks }: { marks: number[] }) {
  // 24 ticks across the rule; named hours where moments anchor
  return (
    <div style={{ position: "relative", marginBottom: "clamp(56px, 7vw, 88px)" }}>
      <div style={{ borderTop: `1px solid ${INK}`, paddingTop: 14 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(24, 1fr)", gap: 0 }}>
          {Array.from({ length: 24 }).map((_, h) => {
            const isMark = marks.includes(h);
            const showLabel = h % 6 === 0;
            return (
              <div key={h} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", position: "relative" }}>
                <span aria-hidden style={{ width: 1, height: isMark ? 18 : 8, backgroundColor: isMark ? INK : STEEL_300 }} />
                {showLabel && (
                  <span style={{ fontFamily: MONO, fontSize: 9, fontWeight: 500, letterSpacing: "0.18em", color: STEEL_500, marginTop: 6 }}>
                    {String(h).padStart(2, "0")}:00
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function HoursBody({ showCta }: { showCta: boolean }) {
  const [tab, setTab] = useState<"client" | "renner">("client");
  const isClient = tab === "client";
  const moments = isClient ? CLIENT_MOMENTS : RENNER_MOMENTS;
  const cta = isClient ? { label: "Sign up", href: "/signup" } : { label: "Become a Renner", href: "/become-a-renner" };

  return (
    <>
      {/* Top — meta + audience */}
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 24, flexWrap: "wrap", marginBottom: "clamp(40px, 5vw, 56px)" }}>
        <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: STEEL_500 }}>
          24/7 · A day on the platform
        </span>
        <div role="tablist" aria-label="Audience" style={{ display: "flex", alignItems: "baseline", gap: 14, fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 16 }}>
          <Tab label="For clients" active={isClient} onClick={() => setTab("client")} />
          <span aria-hidden style={{ color: STEEL_300, fontStyle: "normal" }}>·</span>
          <Tab label="For Renners" active={!isClient} onClick={() => setTab("renner")} />
        </div>
      </div>

      {/* Headline */}
      <h1
        style={{
          fontFamily: SERIF,
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "clamp(48px, 7vw, 112px)",
          lineHeight: 0.95,
          letterSpacing: "-0.03em",
          color: INK,
          margin: 0,
          marginBottom: "clamp(24px, 3vw, 36px)",
          maxWidth: "16ch",
          fontVariationSettings: '"opsz" 144',
        }}
      >
        the work runs on real-estate hours.
      </h1>
      <p
        style={{
          fontFamily: SERIF,
          fontWeight: 400,
          fontSize: "clamp(18px, 1.7vw, 22px)",
          lineHeight: 1.55,
          color: STEEL_700,
          margin: 0,
          marginBottom: "clamp(64px, 8vw, 96px)",
          maxWidth: "52ch",
          fontVariationSettings: '"opsz" 14',
        }}
      >
        A typical day, kept in time. Both sides are screened to join — so when 4&nbsp;pm arrives, the right hand is at the door.
      </p>

      {/* The 24-hour ruler */}
      <HourRuler marks={moments.map((m) => m.hour)} />

      {/* Moments — each anchored to a time, illustration on the right */}
      <div style={{ marginBottom: "clamp(56px, 7vw, 88px)" }}>
        {moments.map((m, i) => (
          <article
            key={m.time}
            className="hours-row"
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(120px, 140px) minmax(0, 1fr) minmax(280px, 320px)",
              gap: "clamp(24px, 3.5vw, 56px)",
              padding: "clamp(32px, 4vw, 52px) 0",
              borderTop: i === 0 ? `1px solid ${INK}` : "none",
              borderBottom: i === moments.length - 1 ? `1px solid ${INK}` : `1px solid ${RULE}`,
              alignItems: "start",
            }}
          >
            <div>
              <div style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: "0.22em", color: STEEL_500, marginBottom: 8 }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <div style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(28px, 3vw, 36px)", lineHeight: 1, letterSpacing: "-0.02em", color: INK, fontVariationSettings: '"opsz" 96' }}>
                {m.time}
              </div>
            </div>
            <div>
              <h3 style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(24px, 2.6vw, 32px)", lineHeight: 1.1, letterSpacing: "-0.018em", color: INK, margin: 0, marginBottom: 12, fontVariationSettings: '"opsz" 60' }}>
                {m.title}
              </h3>
              <p style={{ fontFamily: SERIF, fontSize: 16, lineHeight: 1.6, color: STEEL_700, margin: 0, marginBottom: 12, maxWidth: "44ch", fontVariationSettings: '"opsz" 14' }}>
                {m.body}
              </p>
              <div style={{ display: "flex", alignItems: "baseline", gap: 14, fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: STEEL_600 }}>
                <span>{m.place}</span>
                <span aria-hidden style={{ color: STEEL_300 }}>·</span>
                <span style={{ color: INK }}>{m.price}</span>
              </div>
            </div>
            <div className="hours-illustration" style={{ display: "flex", justifyContent: "flex-end" }}>
              <Mini kind={m.illustration} />
            </div>
          </article>
        ))}
      </div>

      {/* Closing line */}
      <div style={{ marginBottom: showCta ? "clamp(40px, 5vw, 64px)" : 0 }}>
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(20px, 2vw, 26px)", lineHeight: 1.4, color: INK, margin: 0, maxWidth: "44ch", fontVariationSettings: '"opsz" 36' }}>
          {isClient ? "Post when you need it. The platform doesn't sleep." : "Run when you choose. Your area, your hours, your rate."}
        </p>
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
          .hours-row {
            grid-template-columns: minmax(120px, 140px) minmax(0, 1fr) !important;
          }
          .hours-illustration {
            display: none !important;
          }
        }
        @media (max-width: 720px) {
          .hours-row {
            grid-template-columns: 1fr !important;
            gap: 14px !important;
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
