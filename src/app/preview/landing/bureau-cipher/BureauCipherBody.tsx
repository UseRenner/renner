"use client";

import Link from "next/link";
import { RennerMark, getToneVars, type ShellTone } from "../../how-it-works/_shared";
import { CATEGORIES, HEADLINE_LEAD, HEADLINE_TAIL, SHORT_DEK } from "../_content";

const SERIF = "var(--font-source-serif), ui-serif, Georgia, serif";
const SANS = "var(--font-source-sans), ui-sans-serif, system-ui, sans-serif";
const MONO = "var(--font-source-code), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const INK = "var(--c-text, #0d0f12)";
const STEEL_700 = "var(--c-700, #38414d)";
const STEEL_500 = "var(--c-500, #7d8da0)";
const STEEL_300 = "var(--c-300, #cad1d8)";
const PAPER = "var(--c-bg, #fbfbfc)";
const PANEL = "var(--c-panel, #eaedf0)";

// Bureau — CIPHER WALL.
// Bauhaus / De Stijl: an asymmetric grid of blocks bound by
// hairlines. A 12-column composition where the wordmark, the
// headline, the categories, and the form each occupy a
// different cell of the grid. Reads as a constructivist
// poster — type and form as architectural elements arranged
// across a single page rather than stacked vertically.

export function BureauCipherBody({ tone }: { tone: ShellTone }) {
  return (
    <div style={{ ...getToneVars(tone), backgroundColor: PAPER, color: INK, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <main
        style={{
          flex: 1,
          paddingTop: "clamp(28px, 3.5vw, 48px)",
          paddingBottom: "clamp(28px, 3.5vw, 48px)",
          paddingLeft: "clamp(28px, 4vw, 64px)",
          paddingRight: "clamp(28px, 4vw, 64px)",
        }}
      >
        <div
          className="bureau-cp-grid"
          style={{
            maxWidth: 1440,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
            gridTemplateRows: "auto auto auto",
            border: `1px solid ${INK}`,
            minHeight: "min(900px, 88vh)",
          }}
        >
          {/* Top row */}
          <Cell cols="1 / span 5" rows="1 / span 1">
            <MarkCell />
          </Cell>
          <Cell cols="6 / span 7" rows="1 / span 1" leftBorder>
            <SignInCell />
          </Cell>

          {/* Middle row — headline dominant left, form right */}
          <Cell cols="1 / span 8" rows="2 / span 1" topBorder>
            <HeadlineCell />
          </Cell>
          <Cell cols="9 / span 4" rows="2 / span 1" topBorder leftBorder>
            <FormCell />
          </Cell>

          {/* Bottom row — categories full-width across 12 cols */}
          <Cell cols="1 / span 12" rows="3 / span 1" topBorder dim>
            <CategoriesCell />
          </Cell>
        </div>
      </main>

      <style jsx>{`
        @media (max-width: 880px) {
          .bureau-cp-grid {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto !important;
            min-height: 0 !important;
          }
          .bureau-cp-grid > [data-cell] {
            grid-column: 1 / -1 !important;
            grid-row: auto !important;
            border-left: none !important;
            border-top: 1px solid var(--c-rule, #eaedf0) !important;
          }
          .bureau-cp-grid > [data-cell]:first-child {
            border-top: none !important;
          }
        }
      `}</style>

      <Footer />
    </div>
  );
}

function Cell({
  cols,
  rows,
  topBorder,
  leftBorder,
  dim,
  children,
}: {
  cols: string;
  rows: string;
  topBorder?: boolean;
  leftBorder?: boolean;
  dim?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      data-cell
      style={{
        gridColumn: cols,
        gridRow: rows,
        padding: "clamp(28px, 3.5vw, 48px)",
        borderTop: topBorder ? `1px solid ${INK}` : "none",
        borderLeft: leftBorder ? `1px solid ${INK}` : "none",
        backgroundColor: dim ? PANEL : "transparent",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 16,
      }}
    >
      {children}
    </div>
  );
}

function MarkCell() {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "flex-start" }}>
      <RennerMark size={36} weight={300} />
    </div>
  );
}

function SignInCell() {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "flex-end", height: "100%" }}>
      <p style={{ fontFamily: SANS, fontSize: 13, color: STEEL_700, margin: 0 }}>
        Have an account?{" "}
        <Link href="/signin" style={{ color: INK, fontWeight: 500, textDecoration: "underline", textUnderlineOffset: 3 }}>
          Sign in
        </Link>
      </p>
    </div>
  );
}

function HeadlineCell() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "clamp(20px, 2.4vw, 28px)" }}>
      <h1
        style={{
          fontFamily: SERIF,
          fontWeight: 400,
          fontSize: "clamp(48px, 7vw, 112px)",
          lineHeight: 0.94,
          letterSpacing: "-0.026em",
          color: INK,
          margin: 0,
          maxWidth: "14ch",
          fontVariationSettings: '"opsz" 144',
        }}
      >
        {HEADLINE_LEAD}{" "}
        <span style={{ fontStyle: "italic", fontWeight: 300, color: STEEL_700 }}>{HEADLINE_TAIL}</span>
      </h1>
      <p style={{ fontFamily: SERIF, fontSize: "clamp(17px, 1.7vw, 20px)", lineHeight: 1.55, color: STEEL_700, margin: 0, maxWidth: "44ch", fontVariationSettings: '"opsz" 14' }}>
        {SHORT_DEK}
      </p>
    </div>
  );
}

function FormCell() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "clamp(16px, 2vw, 20px)",
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <CipherField label="First" type="text" placeholder="James" autoComplete="given-name" />
        <CipherField label="Last" type="text" placeholder="Mendez" autoComplete="family-name" />
      </div>
      <CipherField label="Email" type="email" placeholder="you@firm.com" autoComplete="email" />
      <CipherField label="Password" type="password" placeholder="At least 8 characters" autoComplete="new-password" />

      <button
        type="submit"
        style={{
          fontFamily: SANS,
          fontSize: 14,
          fontWeight: 500,
          color: PAPER,
          backgroundColor: INK,
          border: `1px solid ${INK}`,
          padding: "14px 22px",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          marginTop: 6,
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
          fontSize: "clamp(15px, 1.4vw, 17px)",
          color: INK,
          textDecoration: "none",
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          paddingTop: 8,
          borderTop: `1px solid ${STEEL_300}`,
          fontVariationSettings: '"opsz" 36',
        }}
      >
        Or become a Renner
        <span aria-hidden style={{ opacity: 0.6 }}>→</span>
      </Link>
    </form>
  );
}

function CipherField({
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
    <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <span style={{ fontFamily: MONO, fontSize: 9, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: STEEL_500 }}>
        {label}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        style={{
          fontFamily: SERIF,
          fontSize: 16,
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

function CategoriesCell() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "clamp(12px, 2vw, 32px)", height: "100%" }}>
      {CATEGORIES.map((c) => (
        <span
          key={c.id}
          style={{
            fontFamily: MONO,
            fontSize: "clamp(11px, 1.1vw, 14px)",
            fontWeight: 500,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: STEEL_700,
          }}
        >
          {c.label}
        </span>
      ))}
    </div>
  );
}

function Footer() {
  return (
    <footer
      style={{
        paddingTop: "clamp(20px, 2.5vw, 28px)",
        paddingBottom: "clamp(20px, 2.5vw, 28px)",
        paddingLeft: "clamp(28px, 4vw, 64px)",
        paddingRight: "clamp(28px, 4vw, 64px)",
      }}
    >
      <div style={{ maxWidth: 1440, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16, fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: STEEL_500 }}>
        <span>Real-estate task marketplace</span>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
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
