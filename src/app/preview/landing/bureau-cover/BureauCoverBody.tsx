"use client";

import Link from "next/link";
import { RennerMark, getToneVars } from "../../how-it-works/_shared";
import { HEADLINE_LEAD, HEADLINE_TAIL, TRUST_PILLARS } from "../_content";

const SERIF = "var(--font-source-serif), ui-serif, Georgia, serif";
const SANS = "var(--font-source-sans), ui-sans-serif, system-ui, sans-serif";
const MONO = "var(--font-source-code), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const INK = "var(--c-text, #0d0f12)";
const STEEL_700 = "var(--c-700, #38414d)";
const STEEL_500 = "var(--c-500, #7d8da0)";
const STEEL_300 = "var(--c-300, #cad1d8)";
const RULE = "var(--c-rule, #eaedf0)";
const PAPER = "var(--c-bg, #fbfbfc)";

// Bureau — COVER WALL.
// The page is one editorial cover. The headline takes ~60% of
// the viewport at huge display size; everything else recedes.
// A masthead row at the top, a strip of trust labels below
// the headline, and a single inline signup row at the bottom —
// email + apply button on one hairline. Reads as the cover of
// a private quarterly that you have to ask to receive. Maximum
// exclusivity expression of "wall."

export function BureauCoverBody() {
  return (
    <div style={{ ...getToneVars("paper"), backgroundColor: PAPER, color: INK, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Masthead />
      <Cover />
      <SignupRow />
      <Footer />
    </div>
  );
}

function Masthead() {
  // Three-cell masthead: previews link + wordmark + sign-in.
  // The wordmark sits on the centerline of the page so the
  // composition reads as one symmetric cover.
  return (
    <header style={{ paddingTop: "clamp(20px, 2.5vw, 32px)", paddingBottom: "clamp(20px, 2.5vw, 32px)", paddingLeft: "clamp(24px, 4vw, 56px)", paddingRight: "clamp(24px, 4vw, 56px)", borderBottom: `1px solid ${INK}` }}>
      <div className="bureau-cv-masthead" style={{ maxWidth: 1440, margin: "0 auto", display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto minmax(0, 1fr)", alignItems: "center", gap: 16 }}>
        <Link href="/preview/landing" style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: STEEL_500, textDecoration: "none" }}>
          ← All previews
        </Link>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <RennerMark size={32} weight={300} />
        </div>
        <p style={{ fontFamily: SANS, fontSize: 13, color: STEEL_700, margin: 0, textAlign: "right" }}>
          Have an account?{" "}
          <Link href="/signin" style={{ color: INK, fontWeight: 500, textDecoration: "underline", textUnderlineOffset: 3 }}>
            Sign in
          </Link>
        </p>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .bureau-cv-masthead { grid-template-columns: 1fr !important; gap: 12px !important; }
          .bureau-cv-masthead > * { text-align: left !important; justify-content: flex-start !important; }
        }
      `}</style>
    </header>
  );
}

function Cover() {
  return (
    <section style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: "clamp(48px, 8vw, 112px)", paddingBottom: "clamp(40px, 6vw, 80px)", paddingLeft: "clamp(24px, 4vw, 56px)", paddingRight: "clamp(24px, 4vw, 56px)" }}>
      <div style={{ maxWidth: 1600, margin: "0 auto", width: "100%" }}>
        {/* Issue line — small mono caps above the headline,
            anchoring the cover at the top edge. */}
        <div className="bureau-cv-issue" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto minmax(0, 1fr)", alignItems: "baseline", gap: 16, marginBottom: "clamp(28px, 3.5vw, 48px)" }}>
          <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.32em", textTransform: "uppercase", color: STEEL_500 }}>
            Vol. I · Issue 01
          </span>
          <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.32em", textTransform: "uppercase", color: STEEL_500, textAlign: "center" }}>
            Members wanted · MMXXVI
          </span>
          <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.32em", textTransform: "uppercase", color: STEEL_500, textAlign: "right" }}>
            By application
          </span>
        </div>

        {/* The cover headline. As large as we can make it
            without breaking the page on common viewports —
            the type is the cover. */}
        <h1
          style={{
            fontFamily: SERIF,
            fontWeight: 400,
            fontSize: "clamp(64px, 12vw, 200px)",
            lineHeight: 0.88,
            letterSpacing: "-0.034em",
            color: INK,
            margin: 0,
            fontVariationSettings: '"opsz" 144',
          }}
        >
          {HEADLINE_LEAD}{" "}
          <span style={{ fontStyle: "italic", fontWeight: 300, color: STEEL_700 }}>{HEADLINE_TAIL}</span>
        </h1>

        {/* Trust strip below the headline — reads as the
            cover blurb on a magazine. Three pillars in mono
            caps, separated by middots. */}
        <div className="bureau-cv-trust" style={{ marginTop: "clamp(40px, 5vw, 64px)", paddingTop: 20, borderTop: `1px solid ${INK}`, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "clamp(16px, 2vw, 32px)" }}>
          {TRUST_PILLARS.map(([label]) => (
            <span key={label} style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: STEEL_700 }}>
              {label}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .bureau-cv-issue { grid-template-columns: 1fr !important; gap: 8px !important; }
          .bureau-cv-issue > * { text-align: left !important; }
        }
      `}</style>
    </section>
  );
}

function SignupRow() {
  // A single horizontal row at the foot of the cover: kicker,
  // email field, apply button, all on one ink-bordered
  // hairline strip. The form is a footnote on the cover, not
  // its main event. That's what makes the cover feel like
  // an object you have to ask to be inside.
  return (
    <section style={{ paddingTop: "clamp(28px, 3.5vw, 40px)", paddingBottom: "clamp(28px, 3.5vw, 40px)", paddingLeft: "clamp(24px, 4vw, 56px)", paddingRight: "clamp(24px, 4vw, 56px)", borderTop: `1px solid ${INK}` }}>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="bureau-cv-signup"
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "auto minmax(0, 1fr) auto",
          gap: "clamp(16px, 2.4vw, 32px)",
          alignItems: "center",
        }}
      >
        <div>
          <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: STEEL_500, marginBottom: 6 }}>
            Apply for access
          </div>
          <h2 style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(20px, 2.2vw, 28px)", lineHeight: 1, letterSpacing: "-0.014em", color: INK, margin: 0, fontVariationSettings: '"opsz" 60' }}>
            Take care of it.
          </h2>
        </div>

        <input
          type="email"
          placeholder="you@firm.com"
          autoComplete="email"
          style={{
            fontFamily: SANS,
            fontSize: 15,
            color: INK,
            backgroundColor: PAPER,
            border: `1px solid ${STEEL_300}`,
            padding: "14px 16px",
            outline: "none",
            width: "100%",
          }}
        />

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
            whiteSpace: "nowrap",
          }}
        >
          Apply
          <span aria-hidden style={{ opacity: 0.7 }}>→</span>
        </button>
      </form>

      <style>{`
        @media (max-width: 720px) {
          .bureau-cv-signup { grid-template-columns: 1fr !important; gap: 16px !important; }
        }
      `}</style>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ paddingTop: "clamp(20px, 2.5vw, 32px)", paddingBottom: "clamp(20px, 2.5vw, 32px)", paddingLeft: "clamp(24px, 4vw, 56px)", paddingRight: "clamp(24px, 4vw, 56px)", borderTop: `1px solid ${RULE}` }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", gap: 24, fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: STEEL_500, flexWrap: "wrap" }}>
        <Link href="/contact" style={{ color: STEEL_700, textDecoration: "none" }}>Contact</Link>
        <Link href="/terms" style={{ color: STEEL_700, textDecoration: "none" }}>Terms</Link>
        <Link href="/privacy" style={{ color: STEEL_700, textDecoration: "none" }}>Privacy</Link>
        <span>·</span>
        <span>© 2026</span>
      </div>
    </footer>
  );
}
