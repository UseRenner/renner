"use client";

import Link from "next/link";
import { useState } from "react";

const SERIF = "var(--font-source-serif), ui-serif, Georgia, serif";
const SANS = "var(--font-source-sans), ui-sans-serif, system-ui, sans-serif";
const MONO = "var(--font-source-code), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const INK = "var(--c-text, #0d0f12)";
const STEEL_700 = "var(--c-700, #38414d)";
const STEEL_600 = "var(--c-600, #647589)";
const STEEL_500 = "var(--c-500, #7d8da0)";
const STEEL_400 = "var(--c-300, #a7b2be)";
const STEEL_300 = "var(--c-300, #cad1d8)";
const RULE = "var(--c-rule, #eaedf0)";
const BONE = "var(--ill-bg, #f6f7f9)";
const PAPER = "var(--c-bg, #fbfbfc)";

const CLIENT_DEK = "What do you need taken care of?";
const RENNER_DEK = "What can you take care of?";

type Step = {
  number: string;
  title: string;
  body: string;
  proof: string;
  illustration: "post" | "pick" | "done" | "verify" | "browse" | "completion";
};

const CLIENT_STEPS: Step[] = [
  { number: "01", title: "Post a task", body: "Set the location, time, task, and price.", proof: "Specifics", illustration: "post" },
  { number: "02", title: "Pick a Renner", body: "Renners apply. Read their profiles and book one.", proof: "Vetted", illustration: "pick" },
  { number: "03", title: "It's taken care of", body: "Receive photos and confirm completion. Payment is released.", proof: "Escrow", illustration: "completion" },
];
const RENNER_STEPS: Step[] = [
  { number: "01", title: "Get verified", body: "Verify your ID, clear a background check, and set your service area.", proof: "Onboarded", illustration: "verify" },
  { number: "02", title: "Pick a task", body: "See tasks in your area. Apply to what fits your skills and schedule.", proof: "Local", illustration: "browse" },
  { number: "03", title: "Take care of it", body: "Complete the task. Send photo confirmation. Receive payment.", proof: "100% of pay", illustration: "done" },
];

function InitialsDisc({ initials, size = 40, fontSize = 14 }: { initials: string; size?: number; fontSize?: number }) {
  return (
    <div
      aria-hidden
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: STEEL_300,
        color: INK,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: SANS,
        fontSize,
        fontWeight: 500,
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}

function VerifiedRow({ label }: { label: string }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: MONO, fontSize: 9, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: STEEL_600 }}>
      <span aria-hidden style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", backgroundColor: INK }} />
      {label}
    </div>
  );
}

function PhotoSlot({ aspect = "1 / 1" }: { aspect?: string }) {
  return (
    <div
      aria-hidden
      style={{
        aspectRatio: aspect,
        backgroundColor: BONE,
        border: `1px solid ${RULE}`,
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: STEEL_400,
          fontFamily: MONO,
          fontSize: 9,
          fontWeight: 500,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
        }}
      >
        Photo
      </div>
    </div>
  );
}

function CardShell({ kicker, children }: { kicker: string; children: React.ReactNode }) {
  return (
    <article style={{ border: `1px solid ${STEEL_300}`, backgroundColor: PAPER, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "16px 20px", borderBottom: `1px solid ${RULE}`, fontFamily: MONO, fontSize: 9, fontWeight: 500, letterSpacing: "0.24em", textTransform: "uppercase", color: STEEL_500 }}>
        {kicker}
      </div>
      <div style={{ padding: "clamp(24px, 2.6vw, 32px)", display: "flex", flexDirection: "column", flex: 1, gap: 16 }}>
        {children}
      </div>
    </article>
  );
}

function PostCard() {
  return (
    <CardShell kicker="01 · Posted task">
      <h4 style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 24, lineHeight: 1.15, color: INK, margin: 0, fontVariationSettings: '"opsz" 36' }}>
        Install sign rider
      </h4>
      <div style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: "0.08em", color: STEEL_600, lineHeight: 1.5 }}>
        Cherry Creek, CO · 80205
        <br />
        Today 14:00–17:00 · $45
      </div>
      <p style={{ fontFamily: SERIF, fontSize: 14, lineHeight: 1.55, color: STEEL_700, margin: 0, fontVariationSettings: '"opsz" 14' }}>
        Add a &ldquo;Just Listed&rdquo; rider above the for-sale sign.
      </p>
      <div style={{ marginTop: "auto", paddingTop: 16, borderTop: `1px solid ${RULE}`, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: SANS, fontSize: 13, fontWeight: 500, color: INK }}>
          <InitialsDisc initials="SK" size={24} fontSize={10} />
          Sarah K.
        </span>
        <VerifiedRow label="Verified client" />
      </div>
    </CardShell>
  );
}

function PickCard() {
  return (
    <CardShell kicker="02 · Application">
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <InitialsDisc initials="JM" size={48} fontSize={16} />
        <div>
          <div style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 22, lineHeight: 1.1, color: INK, fontVariationSettings: '"opsz" 36' }}>
            James M.
          </div>
          <div style={{ marginTop: 4, fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: STEEL_500 }}>
            Denver · 2.4 mi away
          </div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 16, fontFamily: SANS, fontSize: 14, color: INK, fontWeight: 400 }}>
        <span style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 400, color: INK }}>4.96</span>
        <span style={{ color: STEEL_600 }}>· 142 tasks completed</span>
      </div>
      <p style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 15, lineHeight: 1.55, color: STEEL_700, margin: 0, fontVariationSettings: '"opsz" 14' }}>
        &ldquo;Five years in real estate operations. Punctual, courteous,
        photo-thorough.&rdquo;
      </p>
      <div style={{ marginTop: "auto", paddingTop: 16, borderTop: `1px solid ${RULE}`, display: "flex", flexDirection: "column", gap: 6 }}>
        <VerifiedRow label="ID-verified" />
        <VerifiedRow label="Background-checked" />
      </div>
    </CardShell>
  );
}

function CompletionCard() {
  return (
    <CardShell kicker="03 · Completion">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
        <PhotoSlot />
        <PhotoSlot />
        <PhotoSlot />
      </div>
      <div>
        <div style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 22, lineHeight: 1.15, color: INK, marginBottom: 6, fontVariationSettings: '"opsz" 36' }}>
          Confirmed.
        </div>
        <div style={{ fontFamily: SANS, fontSize: 13, color: STEEL_600, lineHeight: 1.55 }}>
          Sarah K. confirmed the work and released payment.
        </div>
      </div>
      <div style={{ marginTop: "auto", paddingTop: 16, borderTop: `1px solid ${RULE}`, display: "grid", gridTemplateColumns: "auto 1fr", columnGap: 12, alignItems: "baseline", fontFamily: SANS, fontSize: 13, color: INK }}>
        <span style={{ color: STEEL_500, fontFamily: MONO, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 500 }}>
          Released
        </span>
        <span>$45 in escrow</span>
      </div>
    </CardShell>
  );
}

function VerifyCard() {
  return (
    <CardShell kicker="01 · Onboarding">
      <h4 style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 24, lineHeight: 1.15, color: INK, margin: 0, fontVariationSettings: '"opsz" 36' }}>
        James M.
      </h4>
      <div style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: "0.08em", color: STEEL_600, lineHeight: 1.5 }}>
        Denver, CO · 25 mi radius
        <br />
        Signs · Lockbox · Courier
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 16, fontFamily: SANS, fontSize: 14, color: INK }}>
        <span style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 400, color: INK }}>$45</span>
        <span style={{ color: STEEL_600 }}>· task minimum</span>
      </div>
      <div style={{ marginTop: "auto", paddingTop: 16, borderTop: `1px solid ${RULE}`, display: "flex", flexDirection: "column", gap: 6 }}>
        <VerifiedRow label="ID-verified" />
        <VerifiedRow label="Background-checked" />
      </div>
    </CardShell>
  );
}

function BrowseCard() {
  return (
    <CardShell kicker="02 · Tasks nearby">
      {[
        ["Install sign rider", "Cherry Creek · 2.4 mi · $45"],
        ["Lockbox swap", "Capitol Hill · 4.1 mi · $30"],
        ["Property prep", "Highlands · 5.8 mi · $90"],
      ].map(([t, m]) => (
        <div key={t} style={{ display: "flex", flexDirection: "column", gap: 4, paddingBottom: 12, borderBottom: `1px solid ${RULE}` }}>
          <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 18, color: INK, fontVariationSettings: '"opsz" 36' }}>{t}</span>
          <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.16em", color: STEEL_600 }}>{m}</span>
        </div>
      ))}
      <div style={{ marginTop: "auto", paddingTop: 8, fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: STEEL_500 }}>
        4 more in your area
      </div>
    </CardShell>
  );
}

function DoneCard() {
  return (
    <CardShell kicker="03 · Payout">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
        <PhotoSlot />
        <PhotoSlot />
        <PhotoSlot />
      </div>
      <div>
        <div style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 22, lineHeight: 1.15, color: INK, marginBottom: 6, fontVariationSettings: '"opsz" 36' }}>
          Paid.
        </div>
        <div style={{ fontFamily: SANS, fontSize: 13, color: STEEL_600, lineHeight: 1.55 }}>
          Confirmed by Sarah K. Funds released.
        </div>
      </div>
      <div style={{ marginTop: "auto", paddingTop: 16, borderTop: `1px solid ${RULE}`, display: "grid", gridTemplateColumns: "auto 1fr", columnGap: 12, alignItems: "baseline", fontFamily: SANS, fontSize: 13, color: INK }}>
        <span style={{ color: STEEL_500, fontFamily: MONO, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 500 }}>
          Earned
        </span>
        <span>$45 · 100% of task pay</span>
      </div>
    </CardShell>
  );
}

function Illustration({ kind }: { kind: Step["illustration"] }) {
  switch (kind) {
    case "post":
      return <PostCard />;
    case "pick":
      return <PickCard />;
    case "completion":
      return <CompletionCard />;
    case "verify":
      return <VerifyCard />;
    case "browse":
      return <BrowseCard />;
    case "done":
      return <DoneCard />;
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
        <Tab label="Hire a Renner" active={isClient} onClick={() => setTab("client")} />
        <span aria-hidden style={{ color: STEEL_300, fontStyle: "normal" }}>·</span>
        <Tab label="Become a Renner" active={!isClient} onClick={() => setTab("renner")} />
      </div>

      <p
        style={{
          fontFamily: SERIF,
          fontWeight: 400,
          fontSize: "clamp(24px, 3vw, 36px)",
          lineHeight: 1.35,
          color: INK,
          margin: 0,
          marginBottom: "clamp(72px, 9vw, 112px)",
          maxWidth: "32ch",
          fontVariationSettings: '"opsz" 36',
        }}
      >
        {dek}
      </p>

      {/* Each step: substantial card on one side, copy on the other; alternating */}
      <div style={{ display: "flex", flexDirection: "column", gap: "clamp(56px, 7vw, 96px)", marginBottom: "clamp(72px, 9vw, 112px)" }}>
        {steps.map((s, i) => {
          const cardLeft = i % 2 === 0;
          return (
            <article
              key={s.number}
              className="scene-row"
              style={{
                display: "grid",
                gridTemplateColumns: cardLeft ? "minmax(320px, 480px) minmax(0, 1fr)" : "minmax(0, 1fr) minmax(320px, 480px)",
                gap: "clamp(36px, 5vw, 80px)",
                alignItems: "center",
              }}
            >
              <div className="scene-illustration" style={{ order: cardLeft ? 0 : 1 }}>
                <Illustration kind={s.illustration} />
              </div>
              <div className="scene-copy" style={{ order: cardLeft ? 1 : 0 }}>
                <div style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: "0.24em", color: STEEL_500, marginBottom: 16 }}>
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
                    marginBottom: 16,
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
                    maxWidth: "60ch",
                    fontVariationSettings: '"opsz" 14',
                  }}
                >
                  {s.body}
                </p>
              </div>
            </article>
          );
        })}
      </div>

      {/* Trust */}
      <section
        style={{
          marginBottom: showCta ? "clamp(56px, 7vw, 88px)" : 0,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "clamp(24px, 3vw, 48px)",
          paddingTop: "clamp(28px, 3.5vw, 36px)",
          borderTop: `1px solid ${INK}`,
          textAlign: "center",
        }}
        className="scene-trust"
      >
        {(isClient
          ? [
              ["Both sides vetted", "ID verified and background checked before any booking."],
              ["Funds in escrow", "Held by Stripe until you confirm."],
              ["Photos on every task", "A photo and a note when it's done."],
            ]
          : [
              ["Real work", "Real estate."],
              ["Vetted clients", "ID verified and background checked, same as you."],
              ["Repeat work", "Clients can save you as a favorite."],
            ]
        ).map(([label, body]) => (
          <div key={label}>
            <div style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 18, color: INK, marginBottom: 8, fontVariationSettings: '"opsz" 36' }}>
              {label}
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
          .scene-row {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
          .scene-illustration,
          .scene-copy {
            order: 0 !important;
          }
          .scene-trust {
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
