// Shared UI illustration components used across the how-it-works
// previews. These are mockups of moments in the Renner product —
// posted task, applicant card, completion proof, onboarding,
// tasks-nearby inbox, payout — so reviewers and prospective
// users can see what the platform looks like before they sign up.
//
// Two size variants: <Card kind="..." /> renders the full card
// (~440px sweet spot, used by Bureau / Center / Folio / Lead / Quarter
// / Scene). <Mini kind="..." /> renders the same content tightly
// (~280-320px) for inline placement inside text-heavy layouts (Brief,
// Compact, Plate).

import type { CSSProperties, ReactNode } from "react";

const SERIF = "var(--font-source-serif), ui-serif, Georgia, serif";
const SANS = "var(--font-source-sans), ui-sans-serif, system-ui, sans-serif";
const MONO = "var(--font-source-code), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

// Illustration tokens — fed by PageShell via the --ill-* CSS
// variables. In paper tone the cards render as a paper surface with
// ink text; in steel and ink tones they flip to a step-lighter dark
// surface (Steel 700 / Steel 800) with paper text. The semantic
// names are kept (INK / PAPER / STEEL_*) so all the existing markup
// reads naturally.
const INK = "var(--ill-text, #0d0f12)";
const STEEL_700 = "var(--ill-text-dim, #4d5b6a)";
const STEEL_600 = "var(--ill-text-dim, #647589)";
const STEEL_500 = "var(--ill-text-fog, #7d8da0)";
const STEEL_400 = "var(--ill-photo-text, #a7b2be)";
const STEEL_300 = "var(--ill-border, #cad1d8)";
const RULE = "var(--ill-rule, #eaedf0)";
const BONE = "var(--ill-photo-bg, #f6f7f9)";
const PAPER = "var(--ill-bg, #fbfbfc)";
const DISC_BG = "var(--ill-disc-bg, #cad1d8)";
const DISC_TEXT = "var(--ill-disc-text, #0d0f12)";

export type IllustrationKind =
  | "task"
  | "applicant"
  | "completion"
  | "profile"
  | "inbox"
  | "payout";

function InitialsDisc({ initials, size, fontSize }: { initials: string; size: number; fontSize: number }) {
  return (
    <div
      aria-hidden
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: DISC_BG,
        color: DISC_TEXT,
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

function VerifiedRow({ label, fontSize = 9 }: { label: string; fontSize?: number }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: MONO, fontSize, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: STEEL_600 }}>
      <span aria-hidden style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", backgroundColor: INK }} />
      {label}
    </div>
  );
}

function PhotoSlot({ aspect = "1 / 1", height }: { aspect?: string; height?: number | string }) {
  return (
    <div
      aria-hidden
      style={{
        aspectRatio: height ? undefined : aspect,
        height,
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
          fontSize: 8,
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

function Shell({ kicker, children, padding = 24, style }: { kicker: string; children: ReactNode; padding?: number; style?: CSSProperties }) {
  return (
    <article style={{ border: `1px solid ${STEEL_300}`, backgroundColor: PAPER, display: "flex", flexDirection: "column", width: "100%", maxWidth: 420, minHeight: 360, ...style }}>
      <div style={{ padding: "12px 16px", borderBottom: `1px solid ${RULE}`, fontFamily: MONO, fontSize: 9, fontWeight: 500, letterSpacing: "0.24em", textTransform: "uppercase", color: STEEL_500 }}>
        {kicker}
      </div>
      <div style={{ padding, display: "flex", flexDirection: "column", flex: 1, gap: 14 }}>
        {children}
      </div>
    </article>
  );
}

// ─── Full cards ───
// Sized for prominent placement (Bureau, Center, Folio, Lead, Quarter,
// Scene). The footer info bar gives each card a closing beat.

function TaskCard() {
  return (
    <Shell kicker="01 · Posted task">
      <h4 style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 24, lineHeight: 1.15, color: INK, margin: 0, fontVariationSettings: '"opsz" 36' }}>
        Install sign rider
      </h4>
      <div style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: "0.08em", color: STEEL_600, lineHeight: 1.5 }}>
        Cherry Creek, CO · 80205
        <br />
        Today 14:00–17:00 · $45
      </div>
      <p style={{ fontFamily: SERIF, fontSize: 14, lineHeight: 1.55, color: STEEL_700, margin: 0, fontVariationSettings: '"opsz" 14' }}>
        Add a "Just Listed" rider above the for-sale sign.
      </p>
      <div style={{ marginTop: "auto", paddingTop: 14, borderTop: `1px solid ${RULE}`, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: SANS, fontSize: 13, fontWeight: 500, color: INK }}>
          <InitialsDisc initials="SK" size={24} fontSize={10} />
          Sarah K.
        </span>
        <VerifiedRow label="Verified client" />
      </div>
    </Shell>
  );
}

function ApplicantCard() {
  return (
    <Shell kicker="02 · Application">
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
      <div style={{ display: "flex", alignItems: "baseline", gap: 14, fontFamily: SANS, fontSize: 13, color: INK }}>
        <span style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 400, color: INK }}>4.96</span>
        <span style={{ color: STEEL_600 }}>· 142 tasks completed</span>
      </div>
      <p style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 15, lineHeight: 1.55, color: STEEL_700, margin: 0, fontVariationSettings: '"opsz" 14' }}>
        &ldquo;Five years in real estate operations. Punctual, courteous, photo-thorough.&rdquo;
      </p>
      <div style={{ marginTop: "auto", paddingTop: 14, borderTop: `1px solid ${RULE}`, display: "flex", flexDirection: "column", gap: 6 }}>
        <VerifiedRow label="ID-verified" />
        <VerifiedRow label="Background-checked" />
      </div>
    </Shell>
  );
}

function CompletionCard() {
  return (
    <Shell kicker="03 · Completion">
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
      <div style={{ marginTop: "auto", paddingTop: 14, borderTop: `1px solid ${RULE}`, display: "grid", gridTemplateColumns: "auto 1fr", columnGap: 12, alignItems: "baseline", fontFamily: SANS, fontSize: 13, color: INK }}>
        <span style={{ color: STEEL_500, fontFamily: MONO, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 500 }}>
          Released
        </span>
        <span>$45 in escrow</span>
      </div>
    </Shell>
  );
}

function ProfileCard() {
  return (
    <Shell kicker="01 · Onboarding">
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <InitialsDisc initials="JM" size={48} fontSize={16} />
        <div>
          <div style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 22, lineHeight: 1.1, color: INK, fontVariationSettings: '"opsz" 36' }}>
            James M.
          </div>
          <div style={{ marginTop: 4, fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: STEEL_500 }}>
            Denver · 25 mi radius
          </div>
        </div>
      </div>
      <div style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: "0.08em", color: STEEL_600, lineHeight: 1.5 }}>
        Signs · Lockbox · Courier
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 14, fontFamily: SANS, fontSize: 13, color: INK }}>
        <span style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 400, color: INK }}>$45</span>
        <span style={{ color: STEEL_600 }}>· task minimum</span>
      </div>
      <div style={{ marginTop: "auto", paddingTop: 14, borderTop: `1px solid ${RULE}`, display: "flex", flexDirection: "column", gap: 6 }}>
        <VerifiedRow label="ID-verified" />
        <VerifiedRow label="Background-checked" />
      </div>
    </Shell>
  );
}

function InboxCard() {
  return (
    <Shell kicker="02 · Tasks nearby">
      {[
        ["Install sign rider", "Cherry Creek · 2.4 mi · $45"],
        ["Lockbox swap", "Capitol Hill · 4.1 mi · $30"],
        ["Property prep", "Highlands · 5.8 mi · $90"],
      ].map(([t, m]) => (
        <div key={t} style={{ display: "flex", flexDirection: "column", gap: 4, paddingBottom: 10, borderBottom: `1px solid ${RULE}` }}>
          <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 17, color: INK, fontVariationSettings: '"opsz" 36' }}>{t}</span>
          <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.16em", color: STEEL_600 }}>{m}</span>
        </div>
      ))}
      <div style={{ marginTop: "auto", paddingTop: 6, fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: STEEL_500 }}>
        4 more in your area
      </div>
    </Shell>
  );
}

function PayoutCard() {
  return (
    <Shell kicker="03 · Payout">
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
      <div style={{ marginTop: "auto", paddingTop: 14, borderTop: `1px solid ${RULE}`, display: "grid", gridTemplateColumns: "auto 1fr", columnGap: 12, alignItems: "baseline", fontFamily: SANS, fontSize: 13, color: INK }}>
        <span style={{ color: STEEL_500, fontFamily: MONO, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 500 }}>
          Earned
        </span>
        <span>$45 · 100% of task pay</span>
      </div>
    </Shell>
  );
}

export function Card({ kind }: { kind: IllustrationKind }) {
  switch (kind) {
    case "task":
      return <TaskCard />;
    case "applicant":
      return <ApplicantCard />;
    case "completion":
      return <CompletionCard />;
    case "profile":
      return <ProfileCard />;
    case "inbox":
      return <InboxCard />;
    case "payout":
      return <PayoutCard />;
  }
}

// ─── Mini cards ───
// Compact, realistic product surfaces. Each card sits at the
// minimal-but-realistic register: a kicker (role), the named
// entity, the proof — with edge-to-edge rules between sections.
// No minHeight stretching, no narrative quotes, no rating
// inflation, no price anchors. Cards are exactly as tall as
// their content.

function MiniShell({
  kicker,
  children,
  footer,
  maxWidth = 240,
}: {
  kicker: string;
  children: ReactNode;
  footer?: ReactNode;
  maxWidth?: number | string;
}) {
  return (
    <article style={{ border: `1px solid ${STEEL_300}`, backgroundColor: PAPER, display: "flex", flexDirection: "column", width: "100%", maxWidth, minHeight: 160 }}>
      <div style={{ padding: "8px 12px", borderBottom: `1px solid ${RULE}`, fontFamily: MONO, fontSize: 8, fontWeight: 500, letterSpacing: "0.24em", textTransform: "uppercase", color: STEEL_500 }}>
        {kicker}
      </div>
      <div style={{ padding: 12, display: "flex", flexDirection: "column", flex: 1, gap: 10 }}>
        {children}
      </div>
      {footer ? (
        <div style={{ padding: "10px 12px", borderTop: `1px solid ${RULE}`, fontFamily: MONO, fontSize: 8, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: STEEL_500 }}>
          {footer}
        </div>
      ) : null}
    </article>
  );
}

function MiniTask({ maxWidth }: { maxWidth?: number | string }) {
  return (
    <MiniShell
      kicker="Open"
      maxWidth={maxWidth}
      footer={<div>Today · 14:00–17:00</div>}
    >
      <div style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 17, lineHeight: 1.15, color: INK, fontVariationSettings: '"opsz" 36' }}>
        Install sign rider
      </div>
      <div style={{ fontFamily: MONO, fontSize: 9, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: STEEL_500 }}>
        Cherry Creek, CO · 80205
      </div>
    </MiniShell>
  );
}

function MiniApplicant({ maxWidth }: { maxWidth?: number | string }) {
  return (
    <MiniShell
      kicker="Profile"
      maxWidth={maxWidth}
      footer={
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <div>ID-verified</div>
          <div>Background-checked</div>
        </div>
      }
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <InitialsDisc initials="JM" size={32} fontSize={12} />
        <div>
          <div style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 16, lineHeight: 1.1, color: INK, fontVariationSettings: '"opsz" 36' }}>
            James M.
          </div>
          <div style={{ marginTop: 2, fontFamily: MONO, fontSize: 9, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: STEEL_500 }}>
            Denver, CO
          </div>
        </div>
      </div>
    </MiniShell>
  );
}

function MiniCompletion({ maxWidth }: { maxWidth?: number | string }) {
  return (
    <MiniShell
      kicker="Completion"
      maxWidth={maxWidth}
      footer={<div>Confirmed · funds released</div>}
    >
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 4 }}>
        <PhotoSlot height={48} />
        <PhotoSlot height={48} />
        <PhotoSlot height={48} />
      </div>
    </MiniShell>
  );
}

function MiniProfile({ maxWidth }: { maxWidth?: number | string }) {
  return (
    <MiniShell
      kicker="Onboarding"
      maxWidth={maxWidth}
      footer={
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <div>ID-verified</div>
          <div>Background-checked</div>
        </div>
      }
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <InitialsDisc initials="JM" size={32} fontSize={12} />
        <div>
          <div style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 16, lineHeight: 1.1, color: INK, fontVariationSettings: '"opsz" 36' }}>
            James M.
          </div>
          <div style={{ marginTop: 2, fontFamily: MONO, fontSize: 9, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: STEEL_500 }}>
            Denver · 25 mi radius
          </div>
        </div>
      </div>
    </MiniShell>
  );
}

function MiniInbox({ maxWidth }: { maxWidth?: number | string }) {
  return (
    <MiniShell
      kicker="Apply"
      maxWidth={maxWidth}
      footer={<div>Today · 14:00–17:00</div>}
    >
      <div style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 17, lineHeight: 1.15, color: INK, fontVariationSettings: '"opsz" 36' }}>
        Install sign rider
      </div>
      <div style={{ fontFamily: MONO, fontSize: 9, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: STEEL_500 }}>
        Cherry Creek, CO · 80205
      </div>
    </MiniShell>
  );
}

function MiniPayout({ maxWidth }: { maxWidth?: number | string }) {
  return (
    <MiniShell
      kicker="Payout"
      maxWidth={maxWidth}
      footer={<div>Released · 100% to Renner</div>}
    >
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 4 }}>
        <PhotoSlot height={48} />
        <PhotoSlot height={48} />
        <PhotoSlot height={48} />
      </div>
    </MiniShell>
  );
}

export function Mini({ kind, maxWidth }: { kind: IllustrationKind; maxWidth?: number | string }) {
  switch (kind) {
    case "task":
      return <MiniTask maxWidth={maxWidth} />;
    case "applicant":
      return <MiniApplicant maxWidth={maxWidth} />;
    case "completion":
      return <MiniCompletion maxWidth={maxWidth} />;
    case "profile":
      return <MiniProfile maxWidth={maxWidth} />;
    case "inbox":
      return <MiniInbox maxWidth={maxWidth} />;
    case "payout":
      return <MiniPayout maxWidth={maxWidth} />;
  }
}

// Convenience: the canonical client / Renner illustration sequences
export const CLIENT_KINDS: IllustrationKind[] = ["applicant", "task", "completion"];
export const RENNER_KINDS: IllustrationKind[] = ["profile", "inbox", "payout"];
