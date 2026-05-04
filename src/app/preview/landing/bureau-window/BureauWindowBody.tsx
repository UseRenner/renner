"use client";

import Link from "next/link";
import { RennerMark, getToneVars, type ShellTone } from "../../how-it-works/_shared";
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
const CHALK = "var(--c-panel, #eaedf0)"; // tone-aware page surrounding the panel

// Bureau — WINDOW WALL.
// A single bordered panel sits at the center of a chalk page,
// like an invitation card laid on a desk. The panel itself is
// paper, ink-bordered, and contains everything: wordmark,
// kicker, headline, sample peek, signup form. Outside the
// panel: generous chalk-tinted negative space. Reads as one
// composed object placed before the visitor — open it or
// don't.

export function BureauWindowBody({ tone }: { tone: ShellTone }) {
  const sample = SAMPLE_TASKS[0];

  return (
    <div style={{ ...getToneVars(tone), backgroundColor: CHALK, color: INK, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(32px, 4vw, 64px) clamp(20px, 3vw, 48px)" }}>
        <Panel sample={sample} />
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header style={{ paddingTop: "clamp(20px, 2.5vw, 32px)", paddingBottom: "clamp(20px, 2.5vw, 32px)", paddingLeft: "clamp(24px, 4vw, 56px)", paddingRight: "clamp(24px, 4vw, 56px)" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
</div>
    </header>
  );
}

function Panel({ sample }: { sample: typeof SAMPLE_TASKS[number] }) {
  return (
    <article
      style={{
        backgroundColor: PAPER,
        border: `1px solid ${STEEL_300}`,
        width: "100%",
        maxWidth: 880,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ padding: "clamp(16px, 2vw, 22px) clamp(24px, 3vw, 36px)", borderBottom: `1px solid ${RULE}`, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        <RennerMark size={28} weight={300} />
        <p style={{ fontFamily: SANS, fontSize: 13, color: STEEL_700, margin: 0 }}>
          Have an account?{" "}
          <Link href="/signin" style={{ color: INK, fontWeight: 500, textDecoration: "underline", textUnderlineOffset: 3 }}>
            Sign in
          </Link>
        </p>
      </div>

      <div style={{ padding: "clamp(28px, 3.5vw, 44px) clamp(24px, 3vw, 48px)", display: "flex", flexDirection: "column", gap: "clamp(24px, 3vw, 36px)" }}>
        {/* Headline */}
        <div>
          <h1
            style={{
              fontFamily: SERIF,
              fontWeight: 400,
              fontSize: "clamp(32px, 4vw, 52px)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
              color: INK,
              margin: 0,
              marginBottom: 14,
              fontVariationSettings: '"opsz" 144',
            }}
          >
            {HEADLINE_LEAD}{" "}
            <span style={{ fontStyle: "italic", fontWeight: 300, color: STEEL_700 }}>{HEADLINE_TAIL}</span>
          </h1>
          <p style={{ fontFamily: SERIF, fontSize: "clamp(14px, 1.3vw, 16px)", lineHeight: 1.5, color: STEEL_700, margin: 0, maxWidth: "60ch", fontVariationSettings: '"opsz" 14' }}>
            {SHORT_DEK}
          </p>
        </div>

        {/* Two-column: peek on the left, form on the right */}
        <div className="bureau-wn-body" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.1fr)", gap: "clamp(24px, 3vw, 40px)", alignItems: "start" }}>
          <SamplePeek task={sample} />
          <SignupForm />
        </div>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .bureau-wn-body { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </article>
  );
}

function SamplePeek({ task }: { task: typeof SAMPLE_TASKS[number] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <article
        aria-hidden
        style={{
          backgroundColor: PAPER,
          border: `1px solid ${STEEL_300}`,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ padding: "10px 14px", borderBottom: `1px solid ${RULE}`, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
          <span style={{ fontFamily: MONO, fontSize: 9, fontWeight: 500, letterSpacing: "0.24em", textTransform: "uppercase", color: STEEL_500 }}>
            {task.category}
          </span>
          <span style={{ fontFamily: MONO, fontSize: 9, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: STEEL_500 }}>
            Posted task
          </span>
        </div>
        <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
          <h3 style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 22, lineHeight: 1.15, color: INK, margin: 0, fontVariationSettings: '"opsz" 36' }}>
            {task.title}
          </h3>
          <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.06em", color: STEEL_700, lineHeight: 1.55 }}>
            {task.location}
          </div>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, paddingTop: 12, borderTop: `1px solid ${RULE}` }}>
            <span style={{ fontFamily: MONO, fontSize: 9, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: STEEL_500 }}>
              Rate
            </span>
            <span style={{ fontFamily: SERIF, fontSize: 20, fontWeight: 400, color: INK, fontVariationSettings: '"opsz" 36' }}>
              {task.price}
            </span>
          </div>
        </div>
      </article>
    </div>
  );
}

function SignupForm() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: STEEL_500 }}>
        Create an account
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <BureauField label="First" type="text" placeholder="James" autoComplete="given-name" />
        <BureauField label="Last" type="text" placeholder="Mendez" autoComplete="family-name" />
      </div>
      <BureauField label="Email" type="email" placeholder="you@firm.com" autoComplete="email" />
      <BureauField label="Password" type="password" placeholder="At least 8 characters" autoComplete="new-password" />
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
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
          Sign up to hire
          <span aria-hidden style={{ opacity: 0.7 }}>→</span>
        </button>
        <Link
          href="/become-a-renner"
          style={{
            fontFamily: SANS,
            fontSize: 14,
            fontWeight: 500,
            color: INK,
            backgroundColor: PAPER,
            border: `1px solid ${STEEL_300}`,
            padding: "14px 22px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            textDecoration: "none",
          }}
        >
          Become a Renner
          <span aria-hidden style={{ opacity: 0.7 }}>→</span>
        </Link>
      </div>
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
    <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
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
          padding: "11px 14px",
          outline: "none",
        }}
      />
    </label>
  );
}

function Footer() {
  return (
    <footer style={{ paddingTop: "clamp(20px, 2.5vw, 32px)", paddingBottom: "clamp(20px, 2.5vw, 32px)", paddingLeft: "clamp(24px, 4vw, 56px)", paddingRight: "clamp(24px, 4vw, 56px)" }}>
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
