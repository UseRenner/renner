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
const CHALK = "var(--c-panel, #eaedf0)";

// Bureau — WINDOW WALL · SOFT.
// Same panel-on-chalk composition as Window, but rendered with
// two tones and no borders: a paper panel sitting on a chalk
// page, the tone change alone defining the panel's edge. No
// outer ink frame, no inner hairlines — sections inside the
// panel are separated by whitespace alone.
//
// Categories switch from mono caps to italic serif, matching
// Letter's editorial register. Reads softer than the original
// Window — quieter card laid on quieter surface, with the type
// doing all the work.

export function BureauWindowSoftBody({ tone }: { tone: ShellTone }) {
  return (
    <div style={{ ...getToneVars(tone), backgroundColor: CHALK, color: INK, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <main
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "clamp(40px, 5vw, 80px) clamp(20px, 3vw, 48px)",
        }}
      >
        <Panel />
      </main>
      <Footer />
    </div>
  );
}

function Panel() {
  return (
    <article
      style={{
        backgroundColor: PAPER,
        width: "100%",
        maxWidth: 640,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          padding: "clamp(28px, 3vw, 36px) clamp(28px, 3.5vw, 44px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <RennerMark size={28} weight={300} />
        <p style={{ fontFamily: SANS, fontSize: 13, color: STEEL_700, margin: 0 }}>
          Have an account?{" "}
          <Link href="/signin" style={{ color: INK, fontWeight: 500, textDecoration: "underline", textUnderlineOffset: 3 }}>
            Sign in
          </Link>
        </p>
      </div>

      <div
        style={{
          padding: "clamp(24px, 3vw, 40px) clamp(28px, 3.5vw, 56px) clamp(40px, 5vw, 64px)",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(28px, 3.5vw, 40px)",
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: SERIF,
              fontWeight: 400,
              fontSize: "clamp(40px, 4.8vw, 60px)",
              lineHeight: 1.0,
              letterSpacing: "-0.022em",
              color: INK,
              margin: 0,
              marginBottom: "clamp(16px, 2vw, 22px)",
              maxWidth: "14ch",
              fontVariationSettings: '"opsz" 144',
            }}
          >
            {HEADLINE_LEAD}{" "}
            <span style={{ fontStyle: "italic", fontWeight: 300, color: STEEL_700 }}>{HEADLINE_TAIL}</span>
          </h1>
          <p style={{ fontFamily: SERIF, fontSize: "clamp(16px, 1.5vw, 18px)", lineHeight: 1.55, color: STEEL_700, margin: 0, whiteSpace: "nowrap", fontVariationSettings: '"opsz" 14' }}>
            {SHORT_DEK}
          </p>
        </div>

        {/* Categories — italic serif with middots, no rules.
            Same content as the original Window's mono-caps strip
            but in Letter's editorial register. */}
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400, fontSize: "clamp(14px, 1.3vw, 16px)", lineHeight: 1.5, color: INK, margin: 0, fontVariationSettings: '"opsz" 14' }}>
          {CATEGORY_STRIP_SHORT.map((c, i, arr) => (
            <span key={c.id}>
              <span style={{ whiteSpace: "nowrap" }}>{c.title}</span>
              {i < arr.length - 1 && (
                <span aria-hidden style={{ marginLeft: "clamp(8px, 1.2vw, 14px)", marginRight: "clamp(8px, 1.2vw, 14px)", color: STEEL_300 }}>·</span>
              )}
            </span>
          ))}
        </p>

        <WindowForm />
      </div>
    </article>
  );
}

function WindowForm() {
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
        <WindowField label="First" type="text" placeholder="James" autoComplete="given-name" />
        <WindowField label="Last" type="text" placeholder="Mendez" autoComplete="family-name" />
      </div>
      <WindowField label="Email" type="email" placeholder="you@firm.com" autoComplete="email" />
      <WindowField label="Password" type="password" placeholder="At least 8 characters" autoComplete="new-password" />

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

      <p style={{ fontFamily: SERIF, fontSize: 11, lineHeight: 1.6, color: STEEL_500, margin: 0, whiteSpace: "nowrap", fontVariationSettings: '"opsz" 14' }}>
        Persona identity verification and Checkr background check required to create an account.
      </p>
    </form>
  );
}

function WindowField({
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
        paddingTop: "clamp(20px, 2.5vw, 32px)",
        paddingBottom: "clamp(20px, 2.5vw, 32px)",
        paddingLeft: "clamp(24px, 4vw, 56px)",
        paddingRight: "clamp(24px, 4vw, 56px)",
      }}
    >
      <div style={{ maxWidth: 1440, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <RennerMark size={28} weight={300} />
        <div style={{ display: "flex", alignItems: "center", gap: 24, fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: STEEL_500 }}>
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
