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
const RULE = "var(--c-rule, #eaedf0)";
const PAPER = "var(--c-bg, #fbfbfc)";

// Bureau — SPECIMEN WALL.
// The page reads as a type-specimen sheet — the brand voice
// on display in different scales. A massive italic wordmark
// at the top sets the type; below, a sequence of "specimens"
// separated by single hairlines: the display headline, the
// body dek, the categories list as a mono-kicker showcase,
// and finally the signup form as the "membership" specimen.
//
// Each specimen has a tiny mono-caps label on the left margin,
// reading as a typographer's note. The form's labels, inputs,
// and primary action sit in the last specimen row — the
// catalog ends in the act of becoming a member.
//
// Distinct from Letter: Letter is a single reading column
// that hides the form inside the body. Specimen names every
// element of the brand's typography by category, and the form
// is the final entry rather than an integrated stretch.

export function BureauSpecimenBody({ tone }: { tone: ShellTone }) {
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
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          {/* Wordmark at display scale — sets the typographic
              register before any other element appears. */}
          <div style={{ paddingBottom: "clamp(40px, 5vw, 72px)" }}>
            <span
              aria-hidden
              style={{
                fontFamily: SERIF,
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "clamp(96px, 18vw, 280px)",
                lineHeight: 0.85,
                letterSpacing: "-0.04em",
                color: INK,
                display: "block",
                fontVariationSettings: '"opsz" 144',
              }}
            >
              renner
            </span>
          </div>

          <Specimen label="Headline">
            <h1
              style={{
                fontFamily: SERIF,
                fontWeight: 400,
                fontSize: "clamp(40px, 5.6vw, 80px)",
                lineHeight: 0.98,
                letterSpacing: "-0.022em",
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
            <p style={{ fontFamily: SERIF, fontSize: "clamp(17px, 1.7vw, 20px)", lineHeight: 1.55, color: STEEL_700, margin: 0, maxWidth: "44ch", fontVariationSettings: '"opsz" 14' }}>
              {SHORT_DEK}
            </p>
          </Specimen>

          <Specimen label="Categories">
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexWrap: "wrap", columnGap: "clamp(16px, 2.4vw, 32px)", rowGap: 8 }}>
              {CATEGORIES.map((c, i) => (
                <li
                  key={c.id}
                  style={{
                    fontFamily: MONO,
                    fontSize: "clamp(11px, 1vw, 13px)",
                    fontWeight: 500,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: STEEL_700,
                  }}
                >
                  {c.label}
                  {i < CATEGORIES.length - 1 && (
                    <span aria-hidden style={{ marginLeft: "clamp(16px, 2.4vw, 32px)", color: STEEL_300 }}>·</span>
                  )}
                </li>
              ))}
            </ul>
          </Specimen>

          <Specimen label="Membership">
            <SignupSpecimen />
          </Specimen>
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

// One specimen entry: a hairline above, a tiny mono caps label
// in the left gutter naming the specimen, and the content on
// the right. Reads as a typographer's note.
function Specimen({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section
      className="bureau-sp-row"
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(120px, 160px) minmax(0, 1fr)",
        columnGap: "clamp(24px, 3vw, 48px)",
        paddingTop: "clamp(28px, 3.5vw, 44px)",
        paddingBottom: "clamp(40px, 5vw, 64px)",
        borderTop: `1px solid ${STEEL_300}`,
      }}
    >
      <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: STEEL_500 }}>
        {label}
      </div>
      <div>{children}</div>

      <style>{`
        @media (max-width: 720px) {
          .bureau-sp-row {
            grid-template-columns: 1fr !important;
            row-gap: 16px !important;
          }
        }
      `}</style>
    </section>
  );
}

function SignupSpecimen() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "clamp(20px, 2.4vw, 28px)",
        maxWidth: 560,
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(16px, 2vw, 24px)" }}>
        <SpecimenField label="First" type="text" placeholder="James" autoComplete="given-name" />
        <SpecimenField label="Last" type="text" placeholder="Mendez" autoComplete="family-name" />
      </div>
      <SpecimenField label="Email" type="email" placeholder="you@firm.com" autoComplete="email" />
      <SpecimenField label="Password" type="password" placeholder="At least 8 characters" autoComplete="new-password" />

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

      <p style={{ fontFamily: SERIF, fontSize: 13, lineHeight: 1.6, color: STEEL_500, margin: 0, fontVariationSettings: '"opsz" 14' }}>
        ID verification and a Checkr background check follow before either side can post or take a task.
      </p>
    </form>
  );
}

function SpecimenField({
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
