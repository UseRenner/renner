"use client";

import Link from "next/link";
import { RennerMark, getToneVars } from "../../how-it-works/_shared";
import { HEADLINE_LEAD, HEADLINE_TAIL, SAMPLE_TASKS, TESTIMONIALS } from "../_content";

const SERIF = "var(--font-source-serif), ui-serif, Georgia, serif";
const SANS = "var(--font-source-sans), ui-sans-serif, system-ui, sans-serif";
const MONO = "var(--font-source-code), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const INK = "var(--c-text, #0d0f12)";
const STEEL_700 = "var(--c-700, #38414d)";
const STEEL_500 = "var(--c-500, #7d8da0)";
const STEEL_300 = "var(--c-300, #cad1d8)";
const RULE = "var(--c-rule, #eaedf0)";
const PAPER = "var(--c-bg, #fbfbfc)";

// Bureau — BROADSHEET WALL.
// A single editorial spread, three columns wide. Top: a banner
// strip with the date, the wordmark, and a huge italic headline
// the way a quarterly's cover would treat it. Below: three
// columns side-by-side — a posted task on the left as the
// peek, a single testimonial in the middle as social proof,
// the signup form on the right as the gate. The page reads as
// one composed page, not a marketing scroll. Most distinctive
// Bureau expression of "wall."

export function BureauBroadsheetBody() {
  const sample = SAMPLE_TASKS[0];
  const testimonial = TESTIMONIALS[0];

  return (
    <div style={{ ...getToneVars("paper"), backgroundColor: PAPER, color: INK, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <Banner />
      <Body sample={sample} testimonial={testimonial} />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header style={{ paddingTop: "clamp(20px, 2.5vw, 32px)", paddingBottom: "clamp(20px, 2.5vw, 32px)", paddingLeft: "clamp(24px, 4vw, 56px)", paddingRight: "clamp(24px, 4vw, 56px)", borderBottom: `1px solid ${INK}` }}>
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

function Banner() {
  return (
    <section style={{ paddingTop: "clamp(28px, 3.5vw, 48px)", paddingBottom: "clamp(28px, 3.5vw, 48px)", paddingLeft: "clamp(24px, 4vw, 56px)", paddingRight: "clamp(24px, 4vw, 56px)", borderBottom: `1px solid ${INK}` }}>
      <div style={{ maxWidth: 1440, margin: "0 auto" }}>
        {/* Newsroom-style masthead row: wordmark left,
            issue/date kicker centered, members-wanted kicker
            on the right. Reads as the cover strip of a journal. */}
        <div className="bureau-bs-masthead" style={{ display: "grid", gridTemplateColumns: "minmax(120px, 1fr) auto minmax(120px, 1fr)", alignItems: "center", gap: 16, marginBottom: "clamp(28px, 3.5vw, 40px)" }}>
          <div>
            <RennerMark size={36} weight={300} />
          </div>
          <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.32em", textTransform: "uppercase", color: STEEL_500, textAlign: "center" }}>
            Vol. I · Issue 01 · MMXXVI
          </div>
          <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: STEEL_500, textAlign: "right" }}>
            Members wanted
          </div>
        </div>

        {/* Editorial headline — full width, treated as the
            cover line of the issue. */}
        <h1
          style={{
            fontFamily: SERIF,
            fontWeight: 400,
            fontSize: "clamp(56px, 9.5vw, 152px)",
            lineHeight: 0.92,
            letterSpacing: "-0.028em",
            color: INK,
            margin: 0,
            fontVariationSettings: '"opsz" 144',
          }}
        >
          {HEADLINE_LEAD}{" "}
          <span style={{ fontStyle: "italic", fontWeight: 300, color: STEEL_700 }}>{HEADLINE_TAIL}</span>
        </h1>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .bureau-bs-masthead { grid-template-columns: 1fr !important; gap: 12px !important; }
          .bureau-bs-masthead > * { text-align: left !important; }
        }
      `}</style>
    </section>
  );
}

function Body({
  sample,
  testimonial,
}: {
  sample: typeof SAMPLE_TASKS[number];
  testimonial: typeof TESTIMONIALS[number];
}) {
  return (
    <section style={{ flex: 1, paddingTop: "clamp(40px, 5vw, 64px)", paddingBottom: "clamp(40px, 5vw, 64px)", paddingLeft: "clamp(24px, 4vw, 56px)", paddingRight: "clamp(24px, 4vw, 56px)" }}>
      <div className="bureau-bs-body" style={{ maxWidth: 1440, margin: "0 auto", display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.1fr) minmax(0, 1fr)", gap: "clamp(24px, 3vw, 48px)", alignItems: "stretch" }}>
        <SamplePeek task={sample} />
        <FieldNote testimonial={testimonial} />
        <SignupForm />
      </div>

      <style>{`
        @media (max-width: 980px) {
          .bureau-bs-body { grid-template-columns: 1fr !important; row-gap: 32px !important; }
        }
      `}</style>
    </section>
  );
}

function SamplePeek({ task }: { task: typeof SAMPLE_TASKS[number] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: STEEL_500 }}>
        Sample posted task
      </div>
      <article
        aria-hidden
        style={{
          backgroundColor: PAPER,
          border: `1px solid ${STEEL_300}`,
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ padding: "12px 16px", borderBottom: `1px solid ${RULE}`, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <span style={{ fontFamily: MONO, fontSize: 9, fontWeight: 500, letterSpacing: "0.24em", textTransform: "uppercase", color: STEEL_500 }}>
            {task.category}
          </span>
          <span style={{ fontFamily: MONO, fontSize: 9, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: STEEL_500 }}>
            Today
          </span>
        </div>
        <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
          <h3 style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(22px, 2.2vw, 26px)", lineHeight: 1.15, color: INK, margin: 0, fontVariationSettings: '"opsz" 36' }}>
            {task.title}
          </h3>
          <div style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: "0.08em", color: STEEL_700, lineHeight: 1.55 }}>
            {task.location}
          </div>
          <div style={{ marginTop: "auto", display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, paddingTop: 14, borderTop: `1px solid ${RULE}` }}>
            <span style={{ fontFamily: MONO, fontSize: 9, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: STEEL_500 }}>
              Rate
            </span>
            <span style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 400, color: INK, fontVariationSettings: '"opsz" 36' }}>
              {task.price}
            </span>
          </div>
        </div>
      </article>
    </div>
  );
}

function FieldNote({ testimonial }: { testimonial: typeof TESTIMONIALS[number] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, paddingLeft: "clamp(0px, 1vw, 16px)", paddingRight: "clamp(0px, 1vw, 16px)" }}>
      <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: STEEL_500 }}>
        From the field
      </div>
      <figure style={{ margin: 0, display: "flex", flexDirection: "column", gap: 24, flex: 1 }}>
        <blockquote style={{ margin: 0 }}>
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(20px, 2.2vw, 26px)", lineHeight: 1.4, letterSpacing: "-0.005em", color: INK, margin: 0, fontVariationSettings: '"opsz" 36' }}>
            &ldquo;{testimonial.quote}&rdquo;
          </p>
        </blockquote>
        <figcaption style={{ marginTop: "auto", paddingTop: 16, borderTop: `1px solid ${STEEL_300}` }}>
          <div style={{ fontFamily: SANS, fontSize: 13, fontWeight: 500, color: INK, marginBottom: 4 }}>
            {testimonial.name}
          </div>
          <div style={{ fontFamily: MONO, fontSize: 9, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: STEEL_500 }}>
            {testimonial.role}
          </div>
        </figcaption>
      </figure>
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
        gap: 16,
        border: `1px solid ${INK}`,
        padding: "clamp(24px, 3vw, 32px)",
        backgroundColor: PAPER,
      }}
    >
      <div>
        <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: STEEL_500, marginBottom: 10 }}>
          Apply for access
        </div>
        <h2 style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(22px, 2.4vw, 28px)", lineHeight: 1.05, letterSpacing: "-0.014em", color: INK, margin: 0, fontVariationSettings: '"opsz" 60' }}>
          Take care of it.
        </h2>
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
          marginTop: 4,
        }}
      >
        Apply
        <span aria-hidden style={{ opacity: 0.7 }}>→</span>
      </button>

      <p style={{ fontFamily: SERIF, fontSize: 12, lineHeight: 1.55, color: STEEL_500, margin: 0, fontVariationSettings: '"opsz" 14' }}>
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
    <footer style={{ paddingTop: "clamp(28px, 3vw, 40px)", paddingBottom: "clamp(28px, 3vw, 40px)", paddingLeft: "clamp(24px, 4vw, 56px)", paddingRight: "clamp(24px, 4vw, 56px)", borderTop: `1px solid ${INK}` }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
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
