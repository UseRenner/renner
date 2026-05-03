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

// Bureau — TRIO WALL.
// Same 50/50 wall geometry. Left side stacks three sample task
// cards — Signs, Lockbox, Showings — clearly framed as samples.
// Conveys variety of what the platform handles without claiming
// any are live tasks. Right side is the form.

const TRIO = [SAMPLE_TASKS[0], SAMPLE_TASKS[1], SAMPLE_TASKS[2]];

export function BureauTrioBody() {
  return (
    <div style={{ ...getToneVars("paper"), backgroundColor: PAPER, color: INK, minHeight: "100vh" }}>
      <div className="bureau-tr-split">
        <LeftPanel />
        <RightPanel />
      </div>
      <Footer />

      <style jsx>{`
        .bureau-tr-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 100vh;
        }
        @media (max-width: 880px) {
          .bureau-tr-split {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

function LeftPanel() {
  return (
    <section
      style={{
        padding: "clamp(40px, 5vw, 72px)",
        display: "flex",
        flexDirection: "column",
        gap: 40,
        borderRight: `1px solid ${INK}`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        <RennerMark size={36} weight={300} />
        <Link href="/preview/landing" style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: STEEL_500, textDecoration: "none" }}>
          ← All previews
        </Link>
      </div>

      <div>
        <h1
          style={{
            fontFamily: SERIF,
            fontWeight: 400,
            fontSize: "clamp(36px, 4.6vw, 60px)",
            lineHeight: 0.98,
            letterSpacing: "-0.022em",
            color: INK,
            margin: 0,
            maxWidth: "16ch",
            fontVariationSettings: '"opsz" 144',
          }}
        >
          {HEADLINE_LEAD}{" "}
          <span style={{ fontStyle: "italic", fontWeight: 300, color: STEEL_700 }}>{HEADLINE_TAIL}</span>
        </h1>
        <p style={{ fontFamily: SERIF, fontSize: "clamp(14px, 1.3vw, 16px)", lineHeight: 1.55, color: STEEL_700, margin: 0, marginTop: 18, maxWidth: "44ch", fontVariationSettings: '"opsz" 14' }}>
          {SHORT_DEK}
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: STEEL_500 }}>
          Sample posted tasks
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {TRIO.map((task) => (
            <SampleRow key={task.title} task={task} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SampleRow({ task }: { task: typeof SAMPLE_TASKS[number] }) {
  return (
    <article
      aria-hidden
      style={{
        backgroundColor: PAPER,
        border: `1px solid ${STEEL_300}`,
        display: "grid",
        gridTemplateColumns: "minmax(80px, 100px) minmax(0, 1fr) auto",
        alignItems: "baseline",
        gap: "clamp(12px, 1.6vw, 20px)",
        padding: "14px 18px",
      }}
    >
      <span style={{ fontFamily: MONO, fontSize: 9, fontWeight: 500, letterSpacing: "0.24em", textTransform: "uppercase", color: STEEL_500 }}>
        {task.category}
      </span>
      <div>
        <div style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 17, lineHeight: 1.15, color: INK, fontVariationSettings: '"opsz" 36' }}>
          {task.title}
        </div>
        <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.06em", color: STEEL_700, lineHeight: 1.5, marginTop: 4 }}>
          {task.location}
        </div>
      </div>
      <span style={{ fontFamily: SERIF, fontSize: 18, fontWeight: 400, color: INK, fontVariationSettings: '"opsz" 36' }}>
        {task.price}
      </span>
    </article>
  );
}

function RightPanel() {
  return (
    <section
      style={{
        backgroundColor: PAPER,
        padding: "clamp(40px, 5vw, 72px)",
        display: "flex",
        flexDirection: "column",
        gap: 56,
      }}
    >
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <p style={{ fontFamily: SANS, fontSize: 13, color: STEEL_700, margin: 0 }}>
          Have an account?{" "}
          <Link href="/signin" style={{ color: INK, fontWeight: 500, textDecoration: "underline", textUnderlineOffset: 3 }}>
            Sign in
          </Link>
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: 1, alignItems: "center" }}>
        <SignupForm />
      </div>

      <div aria-hidden />
    </section>
  );
}

function SignupForm() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      style={{
        width: "100%",
        maxWidth: 440,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        border: `1px solid ${INK}`,
        padding: "clamp(28px, 3.5vw, 40px)",
        backgroundColor: PAPER,
      }}
    >
      <div>
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

      <p style={{ fontFamily: SERIF, fontSize: 13, lineHeight: 1.55, color: STEEL_700, margin: 0, fontVariationSettings: '"opsz" 14' }}>
        ID verification + Checkr background check follow before any first task is posted or booked.
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
    <footer style={{ paddingTop: "clamp(40px, 5vw, 64px)", paddingBottom: "clamp(40px, 5vw, 64px)", paddingLeft: "clamp(28px, 4vw, 64px)", paddingRight: "clamp(28px, 4vw, 64px)", borderTop: `1px solid ${INK}`, backgroundColor: PAPER }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
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
