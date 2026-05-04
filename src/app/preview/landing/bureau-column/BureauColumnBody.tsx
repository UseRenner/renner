"use client";

import Link from "next/link";
import { RennerMark, getToneVars, type ShellTone } from "../../how-it-works/_shared";
import { HEADLINE_LEAD, HEADLINE_TAIL, SHORT_DEK, SAMPLE_TASKS } from "../_content";

const SERIF = "var(--font-source-serif), ui-serif, Georgia, serif";
const SANS = "var(--font-source-sans), ui-sans-serif, system-ui, sans-serif";
const MONO = "var(--font-source-code), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const INK = "var(--c-text, #0d0f12)";
const STEEL_700 = "var(--c-700, #38414d)";
const STEEL_500 = "var(--c-500, #7d8da0)";
const STEEL_300 = "var(--c-300, #cad1d8)";
const RULE = "var(--c-rule, #eaedf0)";
const PAPER = "var(--c-bg, #fbfbfc)";

// Bureau — COLUMN WALL.
// A single narrow centered column down the middle of the page.
// Reads as a private invitation: wordmark, mono kicker,
// italic headline, one curated sample task, one signup form,
// footer. No interactive pills, no second column — the page is
// one vertical axis. Restraint is the message; the gate feels
// editorial rather than transactional.

export function BureauColumnBody({ tone }: { tone: ShellTone }) {
  // One curated sample task for the column wall — no pill-driven
  // swap. The first task in the list is the cover example.
  const sample = SAMPLE_TASKS[0];

  return (
    <div style={{ ...getToneVars(tone), backgroundColor: PAPER, color: INK, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Top bar — minimal: previews link + sign-in. The
          wordmark moves down into the column itself so the
          page reads as one composition rather than chrome
          with content. */}
      <div style={{ paddingTop: "clamp(20px, 2.5vw, 32px)", paddingBottom: "clamp(20px, 2.5vw, 32px)", paddingLeft: "clamp(24px, 4vw, 56px)", paddingRight: "clamp(24px, 4vw, 56px)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
<p style={{ fontFamily: SANS, fontSize: 13, color: STEEL_700, margin: 0 }}>
          Have an account?{" "}
          <Link href="/signin" style={{ color: INK, fontWeight: 500, textDecoration: "underline", textUnderlineOffset: 3 }}>
            Sign in
          </Link>
        </p>
      </div>

      {/* The column itself. Max-width 560 keeps the line length
          intimate; generous vertical padding pushes the form
          toward the centerline of the viewport on a desktop
          screen. */}
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "clamp(40px, 6vw, 80px)",
          paddingBottom: "clamp(40px, 6vw, 80px)",
          paddingLeft: "clamp(24px, 4vw, 48px)",
          paddingRight: "clamp(24px, 4vw, 48px)",
        }}
      >
        <div style={{ width: "100%", maxWidth: 560, display: "flex", flexDirection: "column", gap: "clamp(36px, 4.5vw, 56px)", alignItems: "center", textAlign: "center" }}>
          <RennerMark size={36} weight={300} />

          <div>
            <h1
              style={{
                fontFamily: SERIF,
                fontWeight: 400,
                fontSize: "clamp(40px, 5.4vw, 68px)",
                lineHeight: 1.0,
                letterSpacing: "-0.02em",
                color: INK,
                margin: 0,
                marginBottom: 24,
                fontVariationSettings: '"opsz" 144',
              }}
            >
              {HEADLINE_LEAD}{" "}
              <span style={{ fontStyle: "italic", fontWeight: 300, color: STEEL_700 }}>{HEADLINE_TAIL}</span>
            </h1>
            <p style={{ fontFamily: SERIF, fontSize: "clamp(15px, 1.4vw, 17px)", lineHeight: 1.55, color: STEEL_700, margin: 0, maxWidth: "44ch", marginLeft: "auto", marginRight: "auto", fontVariationSettings: '"opsz" 14' }}>
              {SHORT_DEK}
            </p>
          </div>

          <SampleTaskCard task={sample} />

          <SignupForm />
        </div>
      </main>

      <Footer />
    </div>
  );
}

function SampleTaskCard({ task }: { task: typeof SAMPLE_TASKS[number] }) {
  return (
    <article
      aria-hidden
      style={{
        backgroundColor: PAPER,
        border: `1px solid ${STEEL_300}`,
        width: "100%",
        maxWidth: 460,
        textAlign: "left",
      }}
    >
      <div style={{ padding: "12px 16px", borderBottom: `1px solid ${RULE}`, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <span style={{ fontFamily: MONO, fontSize: 9, fontWeight: 500, letterSpacing: "0.24em", textTransform: "uppercase", color: STEEL_500 }}>
          {task.category}
        </span>
        <span style={{ fontFamily: MONO, fontSize: 9, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: STEEL_500 }}>
          Posted task
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
        border: `1px solid ${STEEL_300}`,
        padding: "clamp(28px, 3.5vw, 40px)",
        backgroundColor: PAPER,
        textAlign: "left",
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
    <footer style={{ paddingTop: "clamp(28px, 3vw, 40px)", paddingBottom: "clamp(28px, 3vw, 40px)", paddingLeft: "clamp(24px, 4vw, 56px)", paddingRight: "clamp(24px, 4vw, 56px)", borderTop: `1px solid ${RULE}` }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 24, fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: STEEL_500 }}>
        <Link href="/contact" style={{ color: STEEL_700, textDecoration: "none" }}>Contact</Link>
        <Link href="/terms" style={{ color: STEEL_700, textDecoration: "none" }}>Terms</Link>
        <Link href="/privacy" style={{ color: STEEL_700, textDecoration: "none" }}>Privacy</Link>
        <span>·</span>
        <span>© 2026</span>
      </div>
    </footer>
  );
}
