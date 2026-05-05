"use client";

// Shared landing-page pieces for the how-it-works DNA variants
// (Plate, Scene, Lead, Compact, Pivot, Folio, Brief, Quarter,
// Center). Each variant supplies its own body layout but reuses
// the same Header, Footer, SignupForm, and SignupField. Keeps
// per-wall files focused on the DNA-distinguishing geometry.

import Link from "next/link";
import type { CSSProperties } from "react";
import { RennerMark } from "../how-it-works/_shared";

const SERIF = "var(--font-source-serif), ui-serif, Georgia, serif";
const SANS = "var(--font-source-sans), ui-sans-serif, system-ui, sans-serif";
const MONO = "var(--font-source-code), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const INK = "var(--c-text, #0d0f12)";
const STEEL_700 = "var(--c-700, #38414d)";
const STEEL_500 = "var(--c-500, #7d8da0)";
const STEEL_300 = "var(--c-300, #cad1d8)";
const PAPER = "var(--c-bg, #fbfbfc)";

export const TOKENS = { SERIF, SANS, MONO, INK, STEEL_700, STEEL_500, STEEL_300, PAPER };

export function Header({ maxWidth = 1440 }: { maxWidth?: number }) {
  return (
    <header
      style={{
        paddingTop: "clamp(20px, 2.5vw, 28px)",
        paddingBottom: "clamp(20px, 2.5vw, 28px)",
        paddingLeft: "clamp(24px, 4vw, 64px)",
        paddingRight: "clamp(24px, 4vw, 64px)",
      }}
    >
      <div style={{ maxWidth, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        <RennerMark size={28} weight={300} />
        <p style={{ fontFamily: SERIF, fontSize: 15, color: STEEL_500, margin: 0, fontVariationSettings: '"opsz" 14' }}>
          Have an account?{" "}
          <Link href="/signin" style={{ color: STEEL_700, textDecoration: "none" }}>
            Sign in
          </Link>
        </p>
      </div>
    </header>
  );
}

export function Footer({ maxWidth = 1440 }: { maxWidth?: number }) {
  return (
    <footer
      style={{
        paddingTop: "clamp(20px, 2.5vw, 28px)",
        paddingBottom: "clamp(20px, 2.5vw, 28px)",
        paddingLeft: "clamp(24px, 4vw, 64px)",
        paddingRight: "clamp(24px, 4vw, 64px)",
      }}
    >
      <div style={{ maxWidth, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <RennerMark size={28} weight={300} />
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontFamily: SERIF, fontSize: 15, color: STEEL_500, fontVariationSettings: '"opsz" 14' }}>
          <Link href="/contact" style={{ color: STEEL_700, textDecoration: "none" }}>Contact</Link>
          <Link href="/terms" style={{ color: STEEL_700, textDecoration: "none" }}>Terms</Link>
          <Link href="/privacy" style={{ color: STEEL_700, textDecoration: "none" }}>Privacy</Link>
          <span>·</span>
          <span>© 2026</span>
        </div>
      </div>
    </footer>
  );
}

export function SignupHeading({ style }: { style?: CSSProperties }) {
  return (
    <h2
      style={{
        fontFamily: SERIF,
        fontStyle: "italic",
        fontWeight: 300,
        fontSize: "clamp(22px, 2.4vw, 28px)",
        lineHeight: 1.1,
        letterSpacing: "-0.014em",
        color: INK,
        margin: 0,
        marginBottom: "clamp(20px, 2.4vw, 28px)",
        fontVariationSettings: '"opsz" 36',
        ...style,
      }}
    >
      Hire or become a Renner
    </h2>
  );
}

export function SignupForm({ maxWidth = 480 }: { maxWidth?: number }) {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "clamp(18px, 2.2vw, 24px)",
        maxWidth,
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(14px, 1.8vw, 20px)" }}>
        <SignupField label="First" type="text" placeholder="James" autoComplete="given-name" />
        <SignupField label="Last" type="text" placeholder="Mendez" autoComplete="family-name" />
      </div>
      <SignupField label="Email" type="email" placeholder="you@firm.com" autoComplete="email" />
      <SignupField label="Password" type="password" placeholder="At least 8 characters" autoComplete="new-password" />

      <div style={{ display: "flex", flexDirection: "column", gap: "clamp(14px, 1.8vw, 18px)", marginTop: "clamp(6px, 0.8vw, 10px)" }}>
        <button
          type="submit"
          style={{
            fontFamily: SERIF,
            fontSize: 15,
            fontWeight: 400,
            color: PAPER,
            backgroundColor: INK,
            border: `1px solid ${INK}`,
            padding: "16px 24px",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            alignSelf: "flex-start",
            minWidth: 220,
            fontVariationSettings: '"opsz" 14',
          }}
        >
          Sign up to hire
          <span aria-hidden style={{ opacity: 0.7 }}>→</span>
        </button>

        <Link
          href="/become-a-renner"
          style={{
            fontFamily: SERIF,
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(16px, 1.5vw, 18px)",
            color: INK,
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            paddingTop: "clamp(8px, 1vw, 12px)",
            borderTop: `1px solid ${STEEL_300}`,
            alignSelf: "stretch",
            fontVariationSettings: '"opsz" 36',
          }}
        >
          Or become a Renner
          <span aria-hidden style={{ opacity: 0.6 }}>→</span>
        </Link>
      </div>
    </form>
  );
}

export function SignupField({
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
      <span style={{ fontFamily: MONO, fontSize: 9, fontWeight: 500, letterSpacing: "0.24em", textTransform: "uppercase", color: STEEL_500 }}>
        {label}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        style={{
          fontFamily: SERIF,
          fontSize: 17,
          color: INK,
          backgroundColor: "transparent",
          border: "none",
          borderBottom: `1px solid ${STEEL_300}`,
          padding: "8px 2px",
          outline: "none",
          fontVariationSettings: '"opsz" 14',
        }}
      />
    </label>
  );
}

export function ComplianceLine({ style }: { style?: CSSProperties }) {
  return (
    <p style={{ fontFamily: SERIF, fontSize: 12, lineHeight: 1.6, color: STEEL_500, margin: 0, whiteSpace: "nowrap", fontVariationSettings: '"opsz" 14', ...style }}>
      Persona identity verification and Checkr background check required to create an account.
    </p>
  );
}
