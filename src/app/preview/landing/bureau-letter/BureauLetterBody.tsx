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

// Bureau — LETTER WALL.
// The page is a single piece of editorial stationery. A
// masthead hairline across the top, a narrow centered reading
// column below, and form fields that sit DIRECTLY in the page
// — no wrapping form box, no enclosing border. Each field has
// its own input rule; the form as a whole is just a stack of
// fields integrated into the body of the letter, like an RSVP
// card printed inside a letter.
//
// What makes it distinct from any signup page I've seen: most
// signup forms are walled off — a card, a box, a border. Here
// the form is part of the editorial body. The page reads as a
// continuous composition from headline to closing line, with
// no design seam between "the writing" and "the form."

export function BureauLetterBody({ tone }: { tone: ShellTone }) {
  return (
    <div style={{ ...getToneVars(tone), backgroundColor: PAPER, color: INK, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Masthead />
      <Letter />
      <Footer />
    </div>
  );
}

function Masthead() {
  // Single hairline below the masthead — quieter than letterhead,
  // still a clear horizon for the page.
  return (
    <header
      style={{
        paddingTop: "clamp(28px, 3.5vw, 40px)",
        paddingLeft: "clamp(28px, 4vw, 64px)",
        paddingRight: "clamp(28px, 4vw, 64px)",
      }}
    >
      <div style={{ maxWidth: 1180, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, paddingBottom: 16, borderBottom: `1px solid ${INK}` }}>
        <RennerMark size={32} weight={300} />
        <p style={{ fontFamily: SANS, fontSize: 13, color: STEEL_700, margin: 0 }}>
          Have an account?{" "}
          <Link href="/signin" style={{ color: INK, fontWeight: 500, textDecoration: "underline", textUnderlineOffset: 3 }}>
            Sign in
          </Link>
        </p>
      </div>
    </header>
  );
}

function Letter() {
  return (
    <main
      style={{
        flex: 1,
        paddingTop: "clamp(56px, 8vw, 112px)",
        paddingBottom: "clamp(56px, 8vw, 112px)",
        paddingLeft: "clamp(28px, 4vw, 64px)",
        paddingRight: "clamp(28px, 4vw, 64px)",
      }}
    >
      <div style={{ maxWidth: 640, margin: "0 auto", display: "flex", flexDirection: "column", gap: "clamp(40px, 5vw, 64px)" }}>
        {/* Headline + dek read as the opening of the letter. */}
        <div>
          <h1
            style={{
              fontFamily: SERIF,
              fontWeight: 400,
              fontSize: "clamp(48px, 6.4vw, 88px)",
              lineHeight: 0.96,
              letterSpacing: "-0.024em",
              color: INK,
              margin: 0,
              marginBottom: "clamp(20px, 2.4vw, 28px)",
              maxWidth: "14ch",
              fontVariationSettings: '"opsz" 144',
            }}
          >
            {HEADLINE_LEAD}{" "}
            <span style={{ fontStyle: "italic", fontWeight: 300, color: STEEL_700 }}>{HEADLINE_TAIL}</span>
          </h1>
          <p style={{ fontFamily: SERIF, fontSize: "clamp(17px, 1.7vw, 20px)", lineHeight: 1.55, color: STEEL_700, margin: 0, whiteSpace: "nowrap", fontVariationSettings: '"opsz" 14' }}>
            {SHORT_DEK}
          </p>
        </div>

        {/* The form sits directly in the page — no wrapping
            border. Each field has its own input rule. The form
            reads as the body of the letter continuing into an
            RSVP card. */}
        <SignupLetter />
      </div>
    </main>
  );
}

function SignupLetter() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "clamp(20px, 2.4vw, 28px)",
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(16px, 2vw, 24px)" }}>
        <LetterField label="First" type="text" placeholder="James" autoComplete="given-name" />
        <LetterField label="Last" type="text" placeholder="Mendez" autoComplete="family-name" />
      </div>
      <LetterField label="Email" type="email" placeholder="you@firm.com" autoComplete="email" />
      <LetterField label="Password" type="password" placeholder="At least 8 characters" autoComplete="new-password" />

      {/* Primary action: a black button that sits in the column.
          Secondary action: a hairline-rule text link below. The
          asymmetry — solid button + spare link — reads as
          "primary path / quieter alternative" without a second
          button competing for attention. */}
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

        {/* Secondary path as an italic-serif text link with a
            hairline beneath. Reads like a closing line in a
            letter ("with regards"), not like a competing CTA. */}
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

      <p style={{ fontFamily: SERIF, fontSize: 12, lineHeight: 1.6, color: STEEL_500, margin: 0, marginTop: "clamp(8px, 1vw, 12px)", whiteSpace: "nowrap", fontVariationSettings: '"opsz" 14' }}>
        Persona identity verification and Checkr background check required to create an account.
      </p>
    </form>
  );
}

function LetterField({
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
  // Field with no surrounding box — the input has only a
  // bottom rule (like a fill-in-the-blank line on a paper
  // form). Keeps the "page integration" feel.
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
      <div style={{ maxWidth: 1180, margin: "0 auto", borderTop: `1px solid ${INK}`, paddingTop: 16, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16, fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: STEEL_500 }}>
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
