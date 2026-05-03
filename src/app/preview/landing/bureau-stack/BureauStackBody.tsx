"use client";

import Link from "next/link";
import { RennerMark, getToneVars } from "../../how-it-works/_shared";
import { HEADLINE_LEAD, HEADLINE_TAIL, SAMPLE_TASKS, SHORT_DEK } from "../_content";

const SERIF = "var(--font-source-serif), ui-serif, Georgia, serif";
const SANS = "var(--font-source-sans), ui-sans-serif, system-ui, sans-serif";
const MONO = "var(--font-source-code), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const INK = "var(--c-text, #0d0f12)";
const STEEL_700 = "var(--c-700, #38414d)";
const STEEL_500 = "var(--c-500, #7d8da0)";
const STEEL_300 = "var(--c-300, #cad1d8)";
const RULE = "var(--c-rule, #eaedf0)";
const PAPER = "var(--c-bg, #fbfbfc)";
const CHALK = "#eaedf0"; // Steel 100 — slightly off paper for the lower band

// Bureau — STACK WALL.
// Two horizontal bands separated by an ink rule. The upper
// band — paper — is the peek: wordmark, kicker, headline, a
// curated sample task. The lower band — chalk (Steel 100) —
// is the gate: signup form centered. The horizontal divide
// reads as a literal wall: above it, what's outside; below,
// the door. Different rhythm than the 50/50 split — vertical
// pacing instead of bilateral.

export function BureauStackBody() {
  const sample = SAMPLE_TASKS[0];

  return (
    <div style={{ ...getToneVars("paper"), backgroundColor: PAPER, color: INK, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <UpperBand sample={sample} />
      <LowerBand />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header style={{ paddingTop: "clamp(20px, 2.5vw, 32px)", paddingBottom: "clamp(20px, 2.5vw, 32px)", paddingLeft: "clamp(24px, 4vw, 56px)", paddingRight: "clamp(24px, 4vw, 56px)" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        <Link href="/preview/landing" style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: STEEL_500, textDecoration: "none" }}>
          ← All previews
        </Link>
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

function UpperBand({ sample }: { sample: typeof SAMPLE_TASKS[number] }) {
  return (
    <section
      style={{
        backgroundColor: PAPER,
        paddingTop: "clamp(40px, 6vw, 80px)",
        paddingBottom: "clamp(48px, 7vw, 96px)",
        paddingLeft: "clamp(24px, 4vw, 56px)",
        paddingRight: "clamp(24px, 4vw, 56px)",
        borderBottom: `1px solid ${INK}`,
      }}
    >
      <div className="bureau-st-upper" style={{ maxWidth: 1440, margin: "0 auto", display: "grid", gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)", gap: "clamp(40px, 6vw, 96px)", alignItems: "center" }}>
        <div>
          <RennerMark size={36} weight={300} />
          <h1
            style={{
              fontFamily: SERIF,
              fontWeight: 400,
              fontSize: "clamp(48px, 7vw, 96px)",
              lineHeight: 0.96,
              letterSpacing: "-0.024em",
              color: INK,
              margin: 0,
              marginTop: 32,
              maxWidth: "14ch",
              fontVariationSettings: '"opsz" 144',
            }}
          >
            {HEADLINE_LEAD}{" "}
            <span style={{ fontStyle: "italic", fontWeight: 300, color: STEEL_700 }}>{HEADLINE_TAIL}</span>
          </h1>
          <p style={{ fontFamily: SERIF, fontSize: "clamp(15px, 1.4vw, 17px)", lineHeight: 1.55, color: STEEL_700, margin: 0, marginTop: 24, maxWidth: "44ch", fontVariationSettings: '"opsz" 14' }}>
            {SHORT_DEK}
          </p>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <SamplePeek task={sample} />
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .bureau-st-upper { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}

function SamplePeek({ task }: { task: typeof SAMPLE_TASKS[number] }) {
  return (
    <article
      aria-hidden
      style={{
        backgroundColor: PAPER,
        border: `1px solid ${STEEL_300}`,
        width: "100%",
        maxWidth: 460,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ padding: "12px 16px", borderBottom: `1px solid ${RULE}`, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <span style={{ fontFamily: MONO, fontSize: 9, fontWeight: 500, letterSpacing: "0.24em", textTransform: "uppercase", color: STEEL_500 }}>
          {task.category}
        </span>
        <span style={{ fontFamily: MONO, fontSize: 9, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: STEEL_500 }}>
          Posted today
        </span>
      </div>
      <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 14 }}>
        <h3 style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 24, lineHeight: 1.15, color: INK, margin: 0, fontVariationSettings: '"opsz" 36' }}>
          {task.title}
        </h3>
        <div style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: "0.08em", color: STEEL_700, lineHeight: 1.55 }}>
          {task.location}
        </div>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, paddingTop: 14, borderTop: `1px solid ${RULE}` }}>
          <span style={{ fontFamily: MONO, fontSize: 9, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: STEEL_500 }}>
            Rate
          </span>
          <span style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 400, color: INK, fontVariationSettings: '"opsz" 36' }}>
            {task.price}
          </span>
        </div>
      </div>
    </article>
  );
}

function LowerBand() {
  return (
    <section
      style={{
        backgroundColor: CHALK,
        paddingTop: "clamp(64px, 8vw, 112px)",
        paddingBottom: "clamp(64px, 8vw, 112px)",
        paddingLeft: "clamp(24px, 4vw, 56px)",
        paddingRight: "clamp(24px, 4vw, 56px)",
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <SignupForm />
    </section>
  );
}

function SignupForm() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      style={{
        width: "100%",
        maxWidth: 460,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        border: `1px solid ${INK}`,
        padding: "clamp(28px, 3.5vw, 40px)",
        backgroundColor: PAPER,
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: STEEL_500 }}>
          Create an account
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <BureauField label="First" type="text" placeholder="James" autoComplete="given-name" />
        <BureauField label="Last" type="text" placeholder="Mendez" autoComplete="family-name" />
      </div>
      <BureauField label="Email" type="email" placeholder="you@firm.com" autoComplete="email" />
      <BureauField label="Password" type="password" placeholder="At least 8 characters" autoComplete="new-password" />

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
        }}
      >
        Sign up
        <span aria-hidden style={{ opacity: 0.7 }}>→</span>
      </button>

      <p style={{ fontFamily: SERIF, fontSize: 12, lineHeight: 1.55, color: STEEL_500, margin: 0, textAlign: "center", fontVariationSettings: '"opsz" 14' }}>
        ID verification + Checkr background check follow.
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
      <span style={{ fontFamily: MONO, fontSize: 9, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: STEEL_500 }}>
        {label}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        style={{
          fontFamily: SANS,
          fontSize: 14,
          color: INK,
          backgroundColor: PAPER,
          border: `1px solid ${STEEL_300}`,
          padding: "12px 14px",
          outline: "none",
        }}
      />
    </label>
  );
}

function Footer() {
  return (
    <footer style={{ paddingTop: "clamp(20px, 2.5vw, 32px)", paddingBottom: "clamp(20px, 2.5vw, 32px)", paddingLeft: "clamp(24px, 4vw, 56px)", paddingRight: "clamp(24px, 4vw, 56px)", borderTop: `1px solid ${INK}`, backgroundColor: CHALK }}>
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
