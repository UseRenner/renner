"use client";

import Link from "next/link";
import { RennerMark, getToneVars, type ShellTone } from "../../how-it-works/_shared";
import { HEADLINE_LEAD, HEADLINE_TAIL, SHORT_DEK } from "../_content";

const SERIF = "var(--font-source-serif), ui-serif, Georgia, serif";
const SANS = "var(--font-source-sans), ui-sans-serif, system-ui, sans-serif";
const MONO = "var(--font-source-code), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

// Stark is two-tone: left panel uses the callout palette (always
// the strongest contrast against the page tone, light on dark or
// dark on light), right panel uses the current tone. Switching
// tone via ?tone= flips which side reads dark and which reads
// light, but the high-contrast two-tone identity stays.
const LEFT_BG = "var(--c-callout-bg, #0d0f12)";
const LEFT_FG = "var(--c-callout-text, #fbfbfc)";
const LEFT_FG_DIM = "var(--c-callout-dim, rgba(251,251,252,0.78))";
const LEFT_FG_FOG = "var(--c-callout-fog, rgba(251,251,252,0.55))";

const RIGHT_BG = "var(--c-bg, #fbfbfc)";
const RIGHT_FG = "var(--c-text, #0d0f12)";
const RIGHT_FG_DIM = "var(--c-700, #38414d)";
const RIGHT_FG_FOG = "var(--c-500, #7d8da0)";
const RIGHT_BORDER = "var(--c-300, #cad1d8)";
const RIGHT_RULE = "var(--c-rule, #eaedf0)";

// Bureau — STARK WALL.
// Two-tone 50/50. The left half is callout-bg — paper headline,
// paper dek, no peek, just type on a dark field. The right half
// is the current tone's bg — signup form. The contrast between
// the two halves is the wall: dark on one side, light on the
// other, hairline between. In ink tone the contrast inverts:
// left becomes light, right becomes dark.

export function BureauStarkBody({ tone }: { tone: ShellTone }) {
  return (
    <div style={{ ...getToneVars(tone), minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: RIGHT_BG }}>
      <div className="bureau-sk-split">
        <LeftPanel />
        <RightPanel />
      </div>
      <Footer />

      <style jsx>{`
        .bureau-sk-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 100vh;
        }
        @media (max-width: 880px) {
          .bureau-sk-split {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

function LeftPanel() {
  return (
    <section
      style={{
        backgroundColor: LEFT_BG,
        color: LEFT_FG,
        padding: "clamp(40px, 5vw, 72px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 56,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        <RennerMark size={36} weight={300} />
</div>

      <div>
        <h1
          style={{
            fontFamily: SERIF,
            fontWeight: 400,
            fontSize: "clamp(48px, 6.4vw, 96px)",
            lineHeight: 0.96,
            letterSpacing: "-0.024em",
            color: LEFT_FG,
            margin: 0,
            maxWidth: "14ch",
            fontVariationSettings: '"opsz" 144',
          }}
        >
          {HEADLINE_LEAD}{" "}
          <span style={{ fontStyle: "italic", fontWeight: 300, color: LEFT_FG_DIM }}>{HEADLINE_TAIL}</span>
        </h1>
        <p style={{ fontFamily: SERIF, fontSize: "clamp(15px, 1.4vw, 17px)", lineHeight: 1.55, color: LEFT_FG_DIM, margin: 0, marginTop: 24, maxWidth: "44ch", fontVariationSettings: '"opsz" 14' }}>
          {SHORT_DEK}
        </p>
      </div>

      <div aria-hidden />
    </section>
  );
}

function RightPanel() {
  return (
    <section
      style={{
        backgroundColor: RIGHT_BG,
        padding: "clamp(40px, 5vw, 72px)",
        display: "flex",
        flexDirection: "column",
        gap: 56,
      }}
    >
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <p style={{ fontFamily: SANS, fontSize: 13, color: RIGHT_FG_DIM, margin: 0 }}>
          Have an account?{" "}
          <Link href="/signin" style={{ color: RIGHT_FG, fontWeight: 500, textDecoration: "underline", textUnderlineOffset: 3 }}>
            Sign in
          </Link>
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: 1, alignItems: "center" }}>
        <SignupForm />
      </div>

      <div aria-hidden />
    </section>
  );
}

function SignupForm() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      style={{
        width: "100%",
        maxWidth: 440,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        border: `1px solid ${RIGHT_BORDER}`,
        padding: "clamp(28px, 3.5vw, 40px)",
        backgroundColor: RIGHT_BG,
      }}
    >
      <div>
        <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: RIGHT_FG_FOG }}>
          Create an account
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <BureauField label="First" type="text" placeholder="James" autoComplete="given-name" />
        <BureauField label="Last" type="text" placeholder="Mendez" autoComplete="family-name" />
      </div>
      <BureauField label="Email" type="email" placeholder="you@firm.com" autoComplete="email" />
      <BureauField label="Password" type="password" placeholder="At least 8 characters" autoComplete="new-password" />
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <button
          type="submit"
          style={{
            fontFamily: SANS,
            fontSize: 14,
            fontWeight: 500,
            color: RIGHT_BG,
            backgroundColor: RIGHT_FG,
            border: `1px solid ${RIGHT_FG}`,
            padding: "14px 22px",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          Sign up to hire
          <span aria-hidden style={{ opacity: 0.7 }}>→</span>
        </button>
        <Link
          href="/become-a-renner"
          style={{
            fontFamily: SANS,
            fontSize: 14,
            fontWeight: 500,
            color: RIGHT_FG,
            backgroundColor: RIGHT_BG,
            border: `1px solid ${RIGHT_BORDER}`,
            padding: "14px 22px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            textDecoration: "none",
          }}
        >
          Become a Renner
          <span aria-hidden style={{ opacity: 0.7 }}>→</span>
        </Link>
      </div>

      <p style={{ fontFamily: SERIF, fontSize: 13, lineHeight: 1.55, color: RIGHT_FG_DIM, margin: 0, fontVariationSettings: '"opsz" 14' }}>
        ID verification + Checkr background check follow before any first task is posted or booked.
      </p>
    </form>
  );
}

function BureauField({
  label,
  type,
  placeholder,
  autoComplete,
}: {
  label: string;
  type: string;
  placeholder: string;
  autoComplete: string;
}) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{ fontFamily: MONO, fontSize: 9, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: RIGHT_FG_FOG }}>
        {label}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        style={{
          fontFamily: SANS,
          fontSize: 14,
          color: RIGHT_FG,
          backgroundColor: RIGHT_BG,
          border: `1px solid ${RIGHT_BORDER}`,
          padding: "12px 14px",
          outline: "none",
        }}
      />
    </label>
  );
}

function Footer() {
  return (
    <footer style={{ paddingTop: "clamp(40px, 5vw, 64px)", paddingBottom: "clamp(40px, 5vw, 64px)", paddingLeft: "clamp(28px, 4vw, 64px)", paddingRight: "clamp(28px, 4vw, 64px)", borderTop: `1px solid ${RIGHT_RULE}`, backgroundColor: RIGHT_BG }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
        <RennerMark size={28} weight={300} />
        <div style={{ display: "flex", alignItems: "center", gap: 24, fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: RIGHT_FG_FOG }}>
          <Link href="/contact" style={{ color: RIGHT_FG_DIM, textDecoration: "none" }}>Contact</Link>
          <Link href="/terms" style={{ color: RIGHT_FG_DIM, textDecoration: "none" }}>Terms</Link>
          <Link href="/privacy" style={{ color: RIGHT_FG_DIM, textDecoration: "none" }}>Privacy</Link>
          <span>·</span>
          <span>© 2026</span>
        </div>
      </div>
    </footer>
  );
}
