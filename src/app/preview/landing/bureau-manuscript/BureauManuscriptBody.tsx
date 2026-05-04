"use client";

import Link from "next/link";
import { RennerMark, getToneVars, type ShellTone } from "../../how-it-works/_shared";
import { HEADLINE_LEAD, HEADLINE_TAIL, SHORT_DEK } from "../_content";

const SERIF = "var(--font-source-serif), ui-serif, Georgia, serif";
const SANS = "var(--font-source-sans), ui-sans-serif, system-ui, sans-serif";
const MONO = "var(--font-source-code), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const INK = "var(--c-text, #0d0f12)";
const STEEL_700 = "var(--c-700, #38414d)";
const STEEL_500 = "var(--c-500, #7d8da0)";
const STEEL_300 = "var(--c-300, #cad1d8)";
const RULE = "var(--c-rule, #eaedf0)";
const PAPER = "var(--c-bg, #fbfbfc)";

// Bureau — MANUSCRIPT WALL.
// The page is a two-page spread joined by a vertical spine
// hairline down the middle. Left page holds the wordmark and
// the editorial opening (headline + dek). Right page holds the
// sign-in line and the form — fields integrated as fill-in-
// the-blank lines.
//
// The spine hairline does all the structural work. No page
// numbers, no captions: the geometry alone reads as a spread.

export function BureauManuscriptBody({ tone }: { tone: ShellTone }) {
  return (
    <div style={{ ...getToneVars(tone), backgroundColor: PAPER, color: INK, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div className="bureau-mn-spread" style={{ display: "grid", gridTemplateColumns: "1fr 1px 1fr", flex: 1, minHeight: "100vh" }}>
        <LeftPage />
        <div aria-hidden style={{ backgroundColor: STEEL_300 }} />
        <RightPage />
      </div>

      <style jsx>{`
        .bureau-mn-spread {
          display: grid;
          grid-template-columns: 1fr 1px 1fr;
        }
        @media (max-width: 880px) {
          .bureau-mn-spread {
            grid-template-columns: 1fr !important;
          }
          .bureau-mn-spread > [aria-hidden] {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}

function LeftPage() {
  return (
    <section
      style={{
        padding: "clamp(40px, 6vw, 88px)",
        display: "flex",
        flexDirection: "column",
        gap: "clamp(56px, 7vw, 96px)",
        minHeight: "100vh",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 16 }}>
        <RennerMark size={28} weight={300} />
      </div>

      <div style={{ maxWidth: "20ch", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <h1
          style={{
            fontFamily: SERIF,
            fontWeight: 400,
            fontSize: "clamp(48px, 6.4vw, 88px)",
            lineHeight: 0.96,
            letterSpacing: "-0.024em",
            color: INK,
            margin: 0,
            marginBottom: "clamp(24px, 3vw, 36px)",
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
    </section>
  );
}

function RightPage() {
  return (
    <section
      style={{
        padding: "clamp(40px, 6vw, 88px)",
        display: "flex",
        flexDirection: "column",
        gap: "clamp(56px, 7vw, 96px)",
        minHeight: "100vh",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 16 }}>
        <p style={{ fontFamily: SANS, fontSize: 13, color: STEEL_700, margin: 0 }}>
          Have an account?{" "}
          <Link href="/signin" style={{ color: INK, fontWeight: 500, textDecoration: "underline", textUnderlineOffset: 3 }}>
            Sign in
          </Link>
        </p>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <ManuscriptForm />
      </div>
    </section>
  );
}

function ManuscriptForm() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "clamp(20px, 2.4vw, 28px)",
        maxWidth: 480,
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(16px, 2vw, 24px)" }}>
        <PageField label="First" type="text" placeholder="James" autoComplete="given-name" />
        <PageField label="Last" type="text" placeholder="Mendez" autoComplete="family-name" />
      </div>
      <PageField label="Email" type="email" placeholder="you@firm.com" autoComplete="email" />
      <PageField label="Password" type="password" placeholder="At least 8 characters" autoComplete="new-password" />

      <div style={{ display: "flex", flexDirection: "column", gap: "clamp(16px, 2vw, 20px)", marginTop: "clamp(8px, 1vw, 12px)" }}>
        <button
          type="submit"
          style={{
            fontFamily: SANS,
            fontSize: 14,
            fontWeight: 500,
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
            minWidth: 200,
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
            fontSize: "clamp(17px, 1.6vw, 19px)",
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

      <p style={{ fontFamily: SERIF, fontSize: 13, lineHeight: 1.6, color: STEEL_500, margin: 0, fontVariationSettings: '"opsz" 14' }}>
        Persona identity verification and Checkr background check required before hiring or becoming a Renner.
      </p>
    </form>
  );
}

function PageField({
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
    <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <span style={{ fontFamily: MONO, fontSize: 9, fontWeight: 500, letterSpacing: "0.24em", textTransform: "uppercase", color: STEEL_500 }}>
        {label}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        style={{
          fontFamily: SERIF,
          fontSize: 18,
          color: INK,
          backgroundColor: "transparent",
          border: "none",
          borderBottom: `1px solid ${STEEL_300}`,
          padding: "10px 2px",
          outline: "none",
          fontVariationSettings: '"opsz" 14',
        }}
      />
    </label>
  );
}
