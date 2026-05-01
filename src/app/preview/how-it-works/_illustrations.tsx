// Shared UI illustration components used across the how-it-works
// previews. These are mockups of moments in the Renner product —
// posted brief, applicant card, completion proof, onboarding,
// briefs-nearby inbox, payout — so reviewers and prospective
// users can see what the platform looks like before they sign up.
//
// Two size variants: <Card kind="..." /> renders the full card
// (~440px sweet spot, used by Scene / Marketplace / Network /
// Showcase). <Mini kind="..." /> renders the same content tightly
// (~280-320px) for inline placement inside text-heavy layouts.

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
  | "brief"
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
// Sized for prominent placement (Scene, Marketplace, Network,
// Showcase). The footer info bar gives each card a closing beat.

function BriefCard() {
  return (
    <Shell kicker="01 · Posted brief">
      <h4 style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 24, lineHeight: 1.15, color: INK, margin: 0, fontVariationSettings: '"opsz" 36' }}>
        Install sign rider.
      </h4>
      <div style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: "0.08em", color: STEEL_600, lineHeight: 1.5 }}>
        Cherry Creek, CO · 80205
        <br />
        Today 14:00–17:00 · $45
      </div>
      <p style={{ fontFamily: SERIF, fontSize: 14, lineHeight: 1.55, color: STEEL_700, margin: 0, fontVariationSettings: '"opsz" 14' }}>
        Standard rider on a corner lot in RiNo. Bring a 6 ft ladder. Photographic confirmation on completion.
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
        <span>$45 through Stripe escrow</span>
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
    <Shell kicker="02 · Briefs nearby">
      {[
        ["Install sign rider.", "Cherry Creek · 2.4 mi · $45"],
        ["Lockbox swap.", "Capitol Hill · 4.1 mi · $30"],
        ["Property prep.", "Highlands · 5.8 mi · $90"],
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
          Confirmed by Sarah K. Funds released through Stripe.
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
    case "brief":
      return <BriefCard />;
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
// Sized for inline placement inside text-heavy layouts. Each
// keeps the same content shape — kicker, title or list, footer
// — but at a tighter scale so it can sit beside body copy
// without dominating.

function MiniShell({ kicker, children }: { kicker: string; children: ReactNode }) {
  return (
    <article style={{ border: `1px solid ${STEEL_300}`, backgroundColor: PAPER, display: "flex", flexDirection: "column", width: "100%", maxWidth: 320, minHeight: 240 }}>
      <div style={{ padding: "10px 14px", borderBottom: `1px solid ${RULE}`, fontFamily: MONO, fontSize: 8, fontWeight: 500, letterSpacing: "0.24em", textTransform: "uppercase", color: STEEL_500 }}>
        {kicker}
      </div>
      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
        {children}
      </div>
    </article>
  );
}

function MiniBrief() {
  return (
    <MiniShell kicker="Posted brief">
      <div style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 17, lineHeight: 1.15, color: INK, fontVariationSettings: '"opsz" 36' }}>
        Install sign rider.
      </div>
      <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.06em", color: STEEL_600, lineHeight: 1.5 }}>
        Cherry Creek · Today · $45
      </div>
      <div style={{ paddingTop: 10, borderTop: `1px solid ${RULE}`, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: SANS, fontSize: 11, fontWeight: 500, color: INK }}>
          <InitialsDisc initials="SK" size={18} fontSize={9} />
          Sarah K.
        </span>
        <VerifiedRow label="Verified" fontSize={8} />
      </div>
    </MiniShell>
  );
}

function MiniApplicant() {
  return (
    <MiniShell kicker="Applicant">
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <InitialsDisc initials="JM" size={32} fontSize={12} />
        <div>
          <div style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 16, lineHeight: 1.1, color: INK, fontVariationSettings: '"opsz" 36' }}>
            James M.
          </div>
          <div style={{ marginTop: 2, fontFamily: MONO, fontSize: 9, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: STEEL_500 }}>
            Denver · 2.4 mi
          </div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10, fontFamily: SANS, fontSize: 11, color: INK }}>
        <span style={{ fontFamily: SERIF, fontSize: 17, fontWeight: 400, color: INK }}>4.96</span>
        <span style={{ color: STEEL_600 }}>· 142 tasks</span>
      </div>
      <div style={{ paddingTop: 10, borderTop: `1px solid ${RULE}`, display: "flex", flexDirection: "column", gap: 4 }}>
        <VerifiedRow label="ID + Checkr" fontSize={8} />
      </div>
    </MiniShell>
  );
}

function MiniCompletion() {
  return (
    <MiniShell kicker="Completion">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 4 }}>
        <PhotoSlot />
        <PhotoSlot />
        <PhotoSlot />
      </div>
      <div style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 16, color: INK, fontVariationSettings: '"opsz" 36' }}>
        Confirmed.
      </div>
      <div style={{ paddingTop: 10, borderTop: `1px solid ${RULE}`, display: "flex", justifyContent: "space-between", alignItems: "baseline", fontFamily: MONO, fontSize: 9, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: STEEL_600 }}>
        <span>Released</span>
        <span style={{ color: INK }}>$45 · Stripe</span>
      </div>
    </MiniShell>
  );
}

function MiniProfile() {
  return (
    <MiniShell kicker="Onboarding">
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <InitialsDisc initials="JM" size={32} fontSize={12} />
        <div>
          <div style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 16, lineHeight: 1.1, color: INK, fontVariationSettings: '"opsz" 36' }}>
            James M.
          </div>
          <div style={{ marginTop: 2, fontFamily: MONO, fontSize: 9, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: STEEL_500 }}>
            Denver · 25 mi
          </div>
        </div>
      </div>
      <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.06em", color: STEEL_600 }}>
        Signs · Lockbox · Courier
      </div>
      <div style={{ paddingTop: 10, borderTop: `1px solid ${RULE}`, display: "flex", flexDirection: "column", gap: 4 }}>
        <VerifiedRow label="ID + Checkr" fontSize={8} />
      </div>
    </MiniShell>
  );
}

function MiniInbox() {
  return (
    <MiniShell kicker="Briefs nearby">
      {[
        ["Install sign rider.", "$45"],
        ["Lockbox swap.", "$30"],
        ["Property prep.", "$90"],
      ].map(([t, m]) => (
        <div key={t} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", paddingBottom: 8, borderBottom: `1px solid ${RULE}`, gap: 8 }}>
          <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 14, color: INK, fontVariationSettings: '"opsz" 36' }}>{t}</span>
          <span style={{ fontFamily: MONO, fontSize: 9, fontWeight: 500, letterSpacing: "0.14em", color: STEEL_600 }}>{m}</span>
        </div>
      ))}
    </MiniShell>
  );
}

function MiniPayout() {
  return (
    <MiniShell kicker="Payout">
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8 }}>
        <span style={{ fontFamily: SERIF, fontSize: 26, fontWeight: 400, color: INK, fontVariationSettings: '"opsz" 60' }}>$45</span>
        <span style={{ fontFamily: MONO, fontSize: 9, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: STEEL_600 }}>100% of pay</span>
      </div>
      <div style={{ fontFamily: SERIF, fontSize: 13, lineHeight: 1.5, color: STEEL_700, fontVariationSettings: '"opsz" 14' }}>
        Released by Sarah K. through Stripe.
      </div>
      <div style={{ paddingTop: 10, borderTop: `1px solid ${RULE}` }}>
        <VerifiedRow label="Stripe escrow" fontSize={8} />
      </div>
    </MiniShell>
  );
}

export function Mini({ kind }: { kind: IllustrationKind }) {
  switch (kind) {
    case "brief":
      return <MiniBrief />;
    case "applicant":
      return <MiniApplicant />;
    case "completion":
      return <MiniCompletion />;
    case "profile":
      return <MiniProfile />;
    case "inbox":
      return <MiniInbox />;
    case "payout":
      return <MiniPayout />;
  }
}

// Convenience: the canonical client / Renner illustration sequences
export const CLIENT_KINDS: IllustrationKind[] = ["brief", "applicant", "completion"];
export const RENNER_KINDS: IllustrationKind[] = ["profile", "inbox", "payout"];
