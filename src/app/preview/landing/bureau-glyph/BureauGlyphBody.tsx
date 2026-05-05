"use client";

import Link from "next/link";
import { RennerMark, getToneVars, type ShellTone } from "../../how-it-works/_shared";
import { CATEGORY_STRIP_SHORT, HEADLINE_LEAD, HEADLINE_TAIL, SHORT_DEK } from "../_content";

const SERIF = "var(--font-source-serif), ui-serif, Georgia, serif";
const SANS = "var(--font-source-sans), ui-sans-serif, system-ui, sans-serif";
const MONO = "var(--font-source-code), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const INK = "var(--c-text, #0d0f12)";
const STEEL_700 = "var(--c-700, #38414d)";
const STEEL_500 = "var(--c-500, #7d8da0)";
const STEEL_300 = "var(--c-300, #cad1d8)";
const PAPER = "var(--c-bg, #fbfbfc)";

// Bureau — GLYPH WALL.
// The wordmark is rendered enormously across the top of the
// page — italic, low-opsz, generous letter-spacing — anchoring
// the entire composition. Below it, the body splits into
// headline+dek+categories on the left and the form on the
// right. Reading order:
//
//     giant glyph → "Keep real estate running." → dek →
//     categories → form
//
// The headline keeps top billing right after the wordmark; the
// categories sit as a supporting list close to the message they
// support, separated from the dek by a single light hairline.

export function BureauGlyphBody({ tone }: { tone: ShellTone }) {
  return (
    <div style={{ ...getToneVars(tone), backgroundColor: PAPER, color: INK, minHeight: "100vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <Header />
      <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Glyph />
        <Body />
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
      <div style={{ maxWidth: 1440, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
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

function Glyph() {
  return (
    <div
      aria-hidden
      style={{
        paddingLeft: "clamp(24px, 4vw, 64px)",
        paddingRight: "clamp(24px, 4vw, 64px)",
        paddingTop: "clamp(8px, 1vw, 16px)",
        paddingBottom: "clamp(8px, 1vw, 16px)",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1440, margin: "0 auto" }}>
        <span
          style={{
            fontFamily: SERIF,
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(80px, 18vw, 320px)",
            lineHeight: 0.86,
            letterSpacing: "-0.045em",
            color: INK,
            display: "block",
            fontVariationSettings: '"opsz" 144',
          }}
        >
          renner
        </span>
      </div>
    </div>
  );
}

function Body() {
  return (
    <section
      style={{
        paddingTop: "clamp(40px, 5vw, 64px)",
        paddingBottom: "clamp(40px, 5vw, 64px)",
        paddingLeft: "clamp(24px, 4vw, 64px)",
        paddingRight: "clamp(24px, 4vw, 64px)",
        flex: 1,
      }}
    >
      <div className="bureau-gl-body" style={{ maxWidth: 1440, margin: "0 auto", display: "grid", gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 1fr)", gap: "clamp(40px, 6vw, 96px)", alignItems: "start" }}>
        <div>
          <h1
            style={{
              fontFamily: SERIF,
              fontWeight: 400,
              fontSize: "clamp(36px, 4.5vw, 60px)",
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
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
          <p style={{ fontFamily: SERIF, fontSize: "clamp(17px, 1.6vw, 19px)", lineHeight: 1.55, color: STEEL_700, margin: 0, marginBottom: "clamp(28px, 3.2vw, 40px)", whiteSpace: "nowrap", fontVariationSettings: '"opsz" 14' }}>
            {SHORT_DEK}
          </p>

          {/* Categories tucked under the dek. Wrapper uses
              width: fit-content so the hairline shrinks to span
              only the categories — left and right edges of the
              rule line up with the start of "Sign installs" and
              the end of "Licensed showings". No middots; gaps
              between titles carry the separation. */}
          <div style={{ width: "fit-content", maxWidth: "100%", paddingTop: "clamp(20px, 2.4vw, 28px)", borderTop: `1px solid ${STEEL_300}` }}>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexWrap: "wrap", columnGap: "clamp(8px, 1vw, 14px)", rowGap: 8 }}>
              {CATEGORY_STRIP_SHORT.map((c) => (
                <li
                  key={c.id}
                  style={{
                    fontFamily: SERIF,
                    fontStyle: "italic",
                    fontWeight: 300,
                    fontSize: "clamp(16px, 1.5vw, 18px)",
                    lineHeight: 1.5,
                    color: INK,
                    fontVariationSettings: '"opsz" 14',
                    whiteSpace: "nowrap",
                  }}
                >
                  {c.title}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(20px, 2.4vw, 28px)" }}>
          <h2 style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(22px, 2.4vw, 28px)", lineHeight: 1.1, letterSpacing: "-0.014em", color: INK, margin: 0, fontVariationSettings: '"opsz" 36' }}>
            Sign up — to hire or become a Renner
          </h2>
          <GlyphForm />
          <p style={{ fontFamily: SERIF, fontSize: 12, lineHeight: 1.6, color: STEEL_500, margin: 0, whiteSpace: "nowrap", fontVariationSettings: '"opsz" 14' }}>
            Persona identity verification and Checkr background check required to create an account.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .bureau-gl-body { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}

function GlyphForm() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "clamp(18px, 2.2vw, 24px)",
        maxWidth: 480,
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(14px, 1.8vw, 20px)" }}>
        <GlyphField label="First" type="text" placeholder="James" autoComplete="given-name" />
        <GlyphField label="Last" type="text" placeholder="Mendez" autoComplete="family-name" />
      </div>
      <GlyphField label="Email" type="email" placeholder="you@firm.com" autoComplete="email" />
      <GlyphField label="Password" type="password" placeholder="At least 8 characters" autoComplete="new-password" />

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

function GlyphField({
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

function Footer() {
  return (
    <footer
      style={{
        paddingTop: "clamp(20px, 2.5vw, 28px)",
        paddingBottom: "clamp(20px, 2.5vw, 28px)",
        paddingLeft: "clamp(24px, 4vw, 64px)",
        paddingRight: "clamp(24px, 4vw, 64px)",
      }}
    >
      <div style={{ maxWidth: 1440, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
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
