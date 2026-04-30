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
const STEEL_200 = "#dfe4e9";
const RULE = "#eaedf0";
const PAPER = "#fbfbfc";

const CLIENT_DEK = "A marketplace for real-estate work. Post a task, pick a Renner, get it done. Both sides are screened to join.";
const RENNER_DEK = "Real-estate work, paid through the platform. Set your area, set your rate, pick what you take. Both sides are screened to join.";

type Step = {
  number: string;
  title: string;
  body: string;
  proof: string;
  illustration: "post" | "pick" | "done" | "verify" | "browse";
};

const CLIENT_STEPS: Step[] = [
  { number: "01", title: "Post a task.", body: "Where, when, what, how much. Two minutes.", proof: "Under 2 min", illustration: "post" },
  { number: "02", title: "Pick a Renner.", body: "Vetted Renners apply. Read the file. Book one.", proof: "Checkr-vetted", illustration: "pick" },
  { number: "03", title: "Get it done.", body: "Photos arrive. You confirm. Stripe pays.", proof: "Stripe escrow", illustration: "done" },
];
const RENNER_STEPS: Step[] = [
  { number: "01", title: "Get verified.", body: "ID, background check, area, rate. Same day.", proof: "Same-day", illustration: "verify" },
  { number: "02", title: "Pick a task.", body: "Briefs from agents and managers nearby. Apply.", proof: "Local", illustration: "browse" },
  { number: "03", title: "Get it done.", body: "Run the task. Send photos. Get paid.", proof: "100% of pay", illustration: "done" },
];

function Frame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div
      style={{
        border: `1px solid ${INK}`,
        backgroundColor: PAPER,
        padding: 18,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        aspectRatio: "5 / 4",
        minHeight: 220,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 8, borderBottom: `1px solid ${RULE}`, fontFamily: MONO, fontSize: 9, fontWeight: 500, letterSpacing: "0.24em", textTransform: "uppercase", color: STEEL_500 }}>
        <span>{label}</span>
        <span aria-hidden style={{ display: "flex", gap: 4 }}>
          <span style={{ width: 5, height: 5, borderRadius: 5, border: `1px solid ${STEEL_300}` }} />
          <span style={{ width: 5, height: 5, borderRadius: 5, border: `1px solid ${STEEL_300}` }} />
          <span style={{ width: 5, height: 5, borderRadius: 5, border: `1px solid ${STEEL_300}` }} />
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>{children}</div>
    </div>
  );
}

function FieldRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 3, paddingBottom: 6, borderBottom: `1px solid ${RULE}` }}>
      <span style={{ fontFamily: MONO, fontSize: 8, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: STEEL_500 }}>{label}</span>
      <span style={{ fontFamily: mono ? MONO : SERIF, fontSize: mono ? 12 : 13, color: INK, lineHeight: 1.2, fontVariationSettings: mono ? undefined : '"opsz" 14' }}>{value}</span>
    </div>
  );
}

function Avatar({ initial, name, rating }: { initial: string; name: string; rating: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: 8, borderBottom: `1px solid ${RULE}` }}>
      <span style={{ width: 22, height: 22, borderRadius: 22, border: `1px solid ${INK}`, display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 11, color: INK, fontVariationSettings: '"opsz" 14' }}>
        {initial}
      </span>
      <span style={{ fontFamily: SERIF, fontSize: 12, color: INK, flex: 1, fontVariationSettings: '"opsz" 14' }}>{name}</span>
      <span style={{ fontFamily: MONO, fontSize: 9, fontWeight: 500, letterSpacing: "0.18em", color: STEEL_600 }}>{rating}</span>
    </div>
  );
}

function PostIllustration() {
  return (
    <Frame label="New task">
      <FieldRow label="What" value="Sign install — front yard" />
      <FieldRow label="Where" value="1842 Oak Ave, Austin TX" />
      <FieldRow label="When" value="Sat 14 Jun · 10–11 am" mono />
      <FieldRow label="Pay" value="$45" mono />
    </Frame>
  );
}

function PickIllustration() {
  return (
    <Frame label="Applicants · 3">
      <Avatar initial="M" name="Maya R." rating="4.97 · 142" />
      <Avatar initial="J" name="Jordan T." rating="4.92 · 88" />
      <Avatar initial="L" name="Leo S." rating="4.89 · 213" />
    </Frame>
  );
}

function DoneIllustration() {
  return (
    <Frame label="Completion">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, flex: 1 }}>
        <div style={{ aspectRatio: "1", backgroundColor: STEEL_200, border: `1px solid ${RULE}` }} aria-hidden />
        <div style={{ aspectRatio: "1", backgroundColor: STEEL_200, border: `1px solid ${RULE}` }} aria-hidden />
        <div style={{ aspectRatio: "1", backgroundColor: STEEL_200, border: `1px solid ${RULE}` }} aria-hidden />
        <div style={{ aspectRatio: "1", backgroundColor: STEEL_200, border: `1px solid ${RULE}` }} aria-hidden />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 6, borderTop: `1px solid ${RULE}`, fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: INK }}>
        <span>✓ Confirmed</span>
        <span style={{ color: STEEL_600 }}>$45 · paid</span>
      </div>
    </Frame>
  );
}

function VerifyIllustration() {
  return (
    <Frame label="Onboarding">
      <FieldRow label="Identity" value="Verified · driver's license" />
      <FieldRow label="Background" value="Checkr · cleared" />
      <FieldRow label="Area" value="Austin · 25 mi radius" />
      <FieldRow label="Rate" value="$45 / task" mono />
    </Frame>
  );
}

function BrowseIllustration() {
  return (
    <Frame label="Briefs nearby · 4">
      <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
        {[
          ["Sign install", "Oak Ave · $45"],
          ["Lockbox swap", "5th St · $30"],
          ["Property prep", "Bell Dr · $90"],
          ["Guest check-in", "Main St · $40"],
        ].map(([t, m]) => (
          <div key={t} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", paddingBottom: 6, borderBottom: `1px solid ${RULE}` }}>
            <span style={{ fontFamily: SERIF, fontSize: 12, color: INK, fontVariationSettings: '"opsz" 14' }}>{t}</span>
            <span style={{ fontFamily: MONO, fontSize: 9, fontWeight: 500, letterSpacing: "0.18em", color: STEEL_600 }}>{m}</span>
          </div>
        ))}
      </div>
    </Frame>
  );
}

function Illustration({ kind }: { kind: Step["illustration"] }) {
  switch (kind) {
    case "post":
      return <PostIllustration />;
    case "pick":
      return <PickIllustration />;
    case "done":
      return <DoneIllustration />;
    case "verify":
      return <VerifyIllustration />;
    case "browse":
      return <BrowseIllustration />;
  }
}

export function SceneBody({ showCta }: { showCta: boolean }) {
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

      <h1
        style={{
          fontFamily: SERIF,
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "clamp(40px, 5.5vw, 72px)",
          lineHeight: 1.0,
          letterSpacing: "-0.025em",
          color: INK,
          margin: 0,
          marginBottom: 24,
          maxWidth: "20ch",
          fontVariationSettings: '"opsz" 144',
        }}
      >
        {isClient ? "Post a task. Pick a Renner. Get it done." : "Get verified. Pick a task. Get it done."}
      </h1>
      <p
        style={{
          fontFamily: SERIF,
          fontSize: "clamp(17px, 1.5vw, 19px)",
          lineHeight: 1.55,
          color: STEEL_700,
          margin: 0,
          marginBottom: "clamp(56px, 7vw, 96px)",
          maxWidth: "52ch",
          fontVariationSettings: '"opsz" 14',
        }}
      >
        {dek}
      </p>

      {/* Each step: illustration on the left, copy on the right */}
      <div style={{ display: "flex", flexDirection: "column", marginBottom: "clamp(56px, 7vw, 88px)" }}>
        {steps.map((s, i) => (
          <article
            key={s.number}
            className="scene-row"
            style={{
              display: "grid",
              gridTemplateColumns: i % 2 === 0 ? "minmax(260px, 360px) minmax(0, 1fr)" : "minmax(0, 1fr) minmax(260px, 360px)",
              gap: "clamp(28px, 4vw, 64px)",
              padding: "clamp(40px, 5vw, 64px) 0",
              borderTop: i === 0 ? `1px solid ${INK}` : `1px solid ${RULE}`,
              borderBottom: i === steps.length - 1 ? `1px solid ${INK}` : "none",
              alignItems: "center",
            }}
          >
            <div className={i % 2 === 0 ? "scene-art-left" : "scene-art-right"} style={{ order: i % 2 === 0 ? 0 : 1 }}>
              <Illustration kind={s.illustration} />
            </div>
            <div style={{ order: i % 2 === 0 ? 1 : 0 }}>
              <div style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: "0.24em", color: STEEL_500, marginBottom: 14 }}>
                {s.number} · {s.proof}
              </div>
              <h3
                style={{
                  fontFamily: SERIF,
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: "clamp(28px, 3.4vw, 44px)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.018em",
                  color: INK,
                  margin: 0,
                  marginBottom: 14,
                  fontVariationSettings: '"opsz" 60',
                }}
              >
                {s.title}
              </h3>
              <p
                style={{
                  fontFamily: SERIF,
                  fontSize: "clamp(16px, 1.4vw, 18px)",
                  lineHeight: 1.6,
                  color: STEEL_700,
                  margin: 0,
                  maxWidth: "44ch",
                  fontVariationSettings: '"opsz" 14',
                }}
              >
                {s.body}
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* Trust */}
      <section
        style={{
          marginBottom: showCta ? "clamp(48px, 6vw, 72px)" : 0,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "clamp(20px, 3vw, 48px)",
        }}
        className="scene-trust"
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
          <div key={label} style={{ paddingTop: 20, borderTop: `1px solid ${RULE}` }}>
            <div style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 18, color: INK, marginBottom: 6, fontVariationSettings: '"opsz" 36' }}>
              {label}.
            </div>
            <div style={{ fontFamily: SERIF, fontSize: 14, lineHeight: 1.55, color: STEEL_700, fontVariationSettings: '"opsz" 14' }}>
              {body}
            </div>
          </div>
        ))}
      </section>

      {showCta && (
        <section style={{ display: "flex", justifyContent: "flex-start", paddingTop: "clamp(40px, 5vw, 64px)" }}>
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
        @media (max-width: 720px) {
          .scene-row {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .scene-row > :first-child,
          .scene-row > :last-child {
            order: 0 !important;
          }
          .scene-trust {
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
      style={{ background: "none", border: "none", padding: 0, fontFamily: "inherit", fontStyle: "inherit", fontSize: "inherit", fontWeight: "inherit", color: active ? INK : STEEL_500, cursor: "pointer" }}
    >
      {label}
    </button>
  );
}
