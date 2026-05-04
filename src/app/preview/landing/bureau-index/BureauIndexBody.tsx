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
const PAPER = "var(--c-bg, #fbfbfc)";

// Bureau — INDEX WALL.
// The page is a table of contents. Numbered entries down a
// single column, each a row in a TOC: number on the left,
// title (italic) in the middle, leader dots, page reference
// on the right. The signup form is the final entry —
// expanded inline as the place the reader arrives at when
// they reach the end of the index.

export function BureauIndexBody({ tone }: { tone: ShellTone }) {
  return (
    <div style={{ ...getToneVars(tone), backgroundColor: PAPER, color: INK, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <main
        style={{
          flex: 1,
          paddingTop: "clamp(40px, 5vw, 64px)",
          paddingBottom: "clamp(56px, 7vw, 96px)",
          paddingLeft: "clamp(24px, 4vw, 64px)",
          paddingRight: "clamp(24px, 4vw, 64px)",
        }}
      >
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          {/* Cover line — the hero is one editorial sentence
              treated as the table-of-contents title. */}
          <div style={{ paddingBottom: "clamp(40px, 5vw, 64px)" }}>
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
                maxWidth: "16ch",
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

          {/* The index. The six entries flow as a single italic
              line between two ink rules — wrapping as needed.
              Same TOC gesture, far less vertical space. */}
          <EntryStrip />

          {/* Final entry — the form. Sits in the same TOC rhythm,
              expanded inline rather than as a row. The reader
              arrives at it after the list. */}
          <FinalEntry />
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header
      style={{
        paddingTop: "clamp(20px, 2.5vw, 28px)",
        paddingBottom: "clamp(20px, 2.5vw, 28px)",
        paddingLeft: "clamp(24px, 4vw, 64px)",
        paddingRight: "clamp(24px, 4vw, 64px)",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        <RennerMark size={28} weight={300} />
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

const ENTRY_TITLES = [
  "Sign installs",
  "Lockbox swaps",
  "Licensed showings",
  "Document delivery",
  "Walkthrough photos",
  "Guest check-ins",
];

function EntryStrip() {
  return (
    <div
      style={{
        width: "fit-content",
        maxWidth: "100%",
        borderTop: `1px solid ${INK}`,
        borderBottom: `1px solid ${INK}`,
        paddingTop: "clamp(28px, 3vw, 40px)",
        paddingBottom: "clamp(28px, 3vw, 40px)",
      }}
    >
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexWrap: "wrap", alignItems: "baseline", rowGap: 8 }}>
        {ENTRY_TITLES.map((title, i) => (
          <li
            key={title}
            style={{
              fontFamily: SERIF,
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(14px, 1.4vw, 17px)",
              lineHeight: 1.3,
              color: INK,
              fontVariationSettings: '"opsz" 36',
            }}
          >
            {title}
            {i < ENTRY_TITLES.length - 1 && (
              <span aria-hidden style={{ marginLeft: "clamp(8px, 1.2vw, 14px)", marginRight: "clamp(8px, 1.2vw, 14px)", color: STEEL_300 }}>·</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function FinalEntry() {
  return (
    <article
      style={{
        paddingTop: "clamp(40px, 5vw, 64px)",
      }}
    >
      <h2 style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(24px, 2.6vw, 32px)", lineHeight: 1.1, letterSpacing: "-0.014em", color: INK, margin: 0, marginBottom: "clamp(20px, 2.4vw, 28px)", fontVariationSettings: '"opsz" 36' }}>
        Sign up — to hire or to be hired
      </h2>
      <IndexForm />
      <p style={{ fontFamily: SERIF, fontSize: 12, lineHeight: 1.6, color: STEEL_500, margin: 0, marginTop: "clamp(20px, 2.4vw, 28px)", whiteSpace: "nowrap", fontVariationSettings: '"opsz" 14' }}>
        Persona identity verification and Checkr background check required to create an account.
      </p>
    </article>
  );
}

function IndexForm() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "clamp(20px, 2.4vw, 28px)",
        maxWidth: 520,
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(16px, 2vw, 24px)" }}>
        <IndexField label="First" type="text" placeholder="James" autoComplete="given-name" />
        <IndexField label="Last" type="text" placeholder="Mendez" autoComplete="family-name" />
      </div>
      <IndexField label="Email" type="email" placeholder="you@firm.com" autoComplete="email" />
      <IndexField label="Password" type="password" placeholder="At least 8 characters" autoComplete="new-password" />

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
            minWidth: 220,
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
    </form>
  );
}

function IndexField({
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

function Footer() {
  return (
    <footer
      style={{
        paddingTop: "clamp(20px, 2.5vw, 28px)",
        paddingBottom: "clamp(20px, 2.5vw, 28px)",
        paddingLeft: "clamp(24px, 4vw, 64px)",
        paddingRight: "clamp(24px, 4vw, 64px)",
        borderTop: `1px solid ${STEEL_300}`,
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16, fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: STEEL_500 }}>
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
