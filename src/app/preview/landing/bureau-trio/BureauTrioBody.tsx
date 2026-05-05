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
const PAPER = "var(--c-bg, #fbfbfc)";

// Bureau — TRIO WALL.
// The page reads top-to-bottom as headline → triptych → form.
// The triptych is the body: three sample tasks set side by
// side as typographic columns, separated by single hairlines
// running floor to ceiling. No bordered cards, no rate row —
// each column is a category kicker, an italic title, and a
// location stamp. The columns stand as printed exhibit
// captions.
//
// The trio shows the variety of what Renner handles in one
// horizontal sweep, then the form below closes the page.

// Three samples chosen to span the audience at first glance:
// signage (the iconic real-estate task), guest access (host
// audience), and licensed showings (the premium broker side).
// Without a host-side example, non-traditional-real-estate
// visitors leave thinking Renner isn't for them.
const TRIO = [SAMPLE_TASKS[0], SAMPLE_TASKS[5], SAMPLE_TASKS[2]];

export function BureauTrioBody({ tone }: { tone: ShellTone }) {
  return (
    <div style={{ ...getToneVars(tone), backgroundColor: PAPER, color: INK, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <main
        style={{
          flex: 1,
          paddingTop: "clamp(40px, 5vw, 64px)",
          paddingBottom: "clamp(48px, 6vw, 80px)",
          paddingLeft: "clamp(24px, 4vw, 64px)",
          paddingRight: "clamp(24px, 4vw, 64px)",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", flexDirection: "column", gap: "clamp(40px, 5vw, 64px)" }}>
          <Lede />
          <Triptych />
          <FormSection />
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
        <p style={{ fontFamily: SERIF, fontSize: 15, color: STEEL_500, margin: 0, fontVariationSettings: '"opsz" 14' }}>
          Have an account?{" "}
          <Link href="/signin" style={{ color: STEEL_700, fontWeight: 500, textDecoration: "none" }}>
            Sign in
          </Link>
        </p>
      </div>
    </header>
  );
}

function Lede() {
  return (
    <div>
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
  );
}

function Triptych() {
  return (
    <div
      className="bureau-tr-trip"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        borderTop: `1px solid ${INK}`,
        borderBottom: `1px solid ${INK}`,
      }}
    >
      {TRIO.map((task, i) => (
        <div
          key={task.title}
          style={{
            padding: "clamp(24px, 3vw, 36px) clamp(20px, 2.4vw, 32px)",
            borderLeft: i === 0 ? "none" : `1px solid ${STEEL_300}`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "clamp(16px, 1.8vw, 22px)",
            minHeight: "clamp(180px, 20vw, 240px)",
          }}
        >
          <span
            style={{
              fontFamily: MONO,
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: STEEL_500,
            }}
          >
            {task.category}
          </span>
          <h3
            style={{
              fontFamily: SERIF,
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(20px, 2vw, 26px)",
              lineHeight: 1.15,
              color: INK,
              margin: 0,
              fontVariationSettings: '"opsz" 36',
            }}
          >
            {task.title}
          </h3>
          <span
            style={{
              fontFamily: MONO,
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.06em",
              color: STEEL_700,
              lineHeight: 1.5,
            }}
          >
            {task.location}
          </span>
        </div>
      ))}

      <style>{`
        @media (max-width: 720px) {
          .bureau-tr-trip {
            grid-template-columns: 1fr !important;
          }
          .bureau-tr-trip > div {
            border-left: none !important;
            border-top: 1px solid var(--c-rule, #eaedf0) !important;
          }
          .bureau-tr-trip > div:first-child {
            border-top: none !important;
          }
        }
      `}</style>
    </div>
  );
}

function FormSection() {
  return (
    <section style={{ paddingTop: "clamp(8px, 1vw, 16px)" }}>
      <h2 style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(24px, 2.6vw, 32px)", lineHeight: 1.1, letterSpacing: "-0.014em", color: INK, margin: 0, marginBottom: "clamp(20px, 2.4vw, 28px)", fontVariationSettings: '"opsz" 36' }}>
        Sign up — to hire or become a Renner
      </h2>
      <TrioForm />
      <p style={{ fontFamily: SERIF, fontSize: 12, lineHeight: 1.6, color: STEEL_500, margin: 0, marginTop: "clamp(20px, 2.4vw, 28px)", whiteSpace: "nowrap", fontVariationSettings: '"opsz" 14' }}>
        Persona identity verification and Checkr background check required to create an account.
      </p>
    </section>
  );
}

function TrioForm() {
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
        <TrioField label="First" type="text" placeholder="James" autoComplete="given-name" />
        <TrioField label="Last" type="text" placeholder="Mendez" autoComplete="family-name" />
      </div>
      <TrioField label="Email" type="email" placeholder="you@firm.com" autoComplete="email" />
      <TrioField label="Password" type="password" placeholder="At least 8 characters" autoComplete="new-password" />

      <div style={{ display: "flex", flexDirection: "column", gap: "clamp(16px, 2vw, 20px)", marginTop: "clamp(8px, 1vw, 12px)" }}>
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

function TrioField({
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
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
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
