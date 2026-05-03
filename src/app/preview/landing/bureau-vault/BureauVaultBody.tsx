"use client";

import Link from "next/link";
import { useState } from "react";
import { RennerMark, getToneVars } from "../../how-it-works/_shared";
import { HEADLINE_LEAD, HEADLINE_TAIL, SAMPLE_TASKS, SHORT_DEK } from "../_content";

const SERIF = "var(--font-source-serif), ui-serif, Georgia, serif";
const SANS = "var(--font-source-sans), ui-sans-serif, system-ui, sans-serif";
const MONO = "var(--font-source-code), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

// In ink tone, the tokens flip: --c-text is paper, --c-bg is
// ink, --c-300 is mid-grey on dark, etc. We re-name them here
// so the JSX still reads naturally — INK is the page bg, PAPER
// is the foreground, BORDER is the rule weight.
const PAPER = "var(--c-text, #fbfbfc)";
const PAPER_DIM = "var(--c-600, #cad1d8)";
const PAPER_FOG = "var(--c-500, #a7b2be)";
const BORDER = "var(--c-300, #647589)";
const RULE = "var(--c-rule, rgba(251,251,252,0.18))";
const INK = "var(--c-bg, #0d0f12)";
const PANEL = "var(--c-panel, #38414d)";

// Bureau — VAULT WALL.
// Same 50/50 wall geometry as bureau-iteration, but rendered
// in ink tone — the brand's dark register. The page reads as
// the entrance to a private members area: paper-bordered form
// on the right, peek of an inside posted task on the left, all
// on a page-dark surface. The pills still drive the sample
// card. Lead-capture's same job; "private club" instead of
// "editorial publication."

export function BureauVaultBody() {
  const [activeId, setActiveId] = useState<string>(SAMPLE_TASKS[0].category);
  const active = SAMPLE_TASKS.find((t) => t.category === activeId) ?? SAMPLE_TASKS[0];

  return (
    <div style={{ ...getToneVars("ink"), backgroundColor: INK, color: PAPER, minHeight: "100vh" }}>
      <div className="bureau-vt-split">
        <LeftPanel active={active} activeId={activeId} onSelect={setActiveId} />
        <RightPanel />
      </div>
      <Footer />

      <style jsx>{`
        .bureau-vt-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 100vh;
        }
        @media (max-width: 880px) {
          .bureau-vt-split {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

function LeftPanel({
  active,
  activeId,
  onSelect,
}: {
  active: typeof SAMPLE_TASKS[number];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <section
      style={{
        backgroundColor: INK,
        padding: "clamp(40px, 5vw, 72px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 56,
        borderRight: `1px solid ${RULE}`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        <RennerMark size={36} weight={300} />
        <Link href="/preview/landing" style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: PAPER_FOG, textDecoration: "none" }}>
          ← All previews
        </Link>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
        <div>
          <h1
            style={{
              fontFamily: SERIF,
              fontWeight: 400,
              fontSize: "clamp(48px, 6.4vw, 88px)",
              lineHeight: 0.98,
              letterSpacing: "-0.022em",
              color: PAPER,
              margin: 0,
              maxWidth: "16ch",
              fontVariationSettings: '"opsz" 144',
            }}
          >
            {HEADLINE_LEAD}{" "}
            <span style={{ fontStyle: "italic", fontWeight: 300, color: PAPER_DIM }}>{HEADLINE_TAIL}</span>
          </h1>
          <p style={{ fontFamily: SERIF, fontSize: 17, lineHeight: 1.55, color: PAPER_DIM, margin: 0, marginTop: 24, maxWidth: "44ch", fontVariationSettings: '"opsz" 14' }}>
            {SHORT_DEK}
          </p>
        </div>

        <SamplePeek task={active} />

        <CategoryPills activeId={activeId} onSelect={onSelect} />
      </div>

      <div aria-hidden />
    </section>
  );
}

function SamplePeek({ task }: { task: typeof SAMPLE_TASKS[number] }) {
  // The peek card sits on a slightly lighter panel surface
  // (Steel 700 on ink) so it reads as "an inside view" rather
  // than another piece of page chrome. Borders are paper-
  // tinted hairlines.
  return (
    <article
      aria-hidden
      style={{
        backgroundColor: PANEL,
        border: `1px solid ${RULE}`,
        maxWidth: 460,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ padding: "12px 16px", borderBottom: `1px solid ${RULE}`, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <span style={{ fontFamily: MONO, fontSize: 9, fontWeight: 500, letterSpacing: "0.24em", textTransform: "uppercase", color: PAPER_FOG }}>
          {task.category}
        </span>
        <span style={{ fontFamily: MONO, fontSize: 9, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: PAPER_FOG }}>
          Posted task
        </span>
      </div>
      <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 14 }}>
        <h3 style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: 24, lineHeight: 1.15, color: PAPER, margin: 0, fontVariationSettings: '"opsz" 36' }}>
          {task.title}
        </h3>
        <div style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: "0.08em", color: PAPER_DIM, lineHeight: 1.55 }}>
          {task.location}
        </div>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, paddingTop: 14, borderTop: `1px solid ${RULE}` }}>
          <span style={{ fontFamily: MONO, fontSize: 9, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: PAPER_FOG }}>
            Rate
          </span>
          <span style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 400, color: PAPER, fontVariationSettings: '"opsz" 36' }}>
            {task.price}
          </span>
        </div>
      </div>
    </article>
  );
}

function CategoryPills({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 520 }}>
      <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: PAPER_FOG }}>
        Categories
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {SAMPLE_TASKS.map((t) => {
          const isActive = t.category === activeId;
          return (
            <button
              key={t.category}
              type="button"
              tabIndex={-1}
              onClick={() => onSelect(t.category)}
              style={{
                fontFamily: MONO,
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: isActive ? INK : PAPER_DIM,
                backgroundColor: isActive ? PAPER : "transparent",
                border: `1px solid ${isActive ? PAPER : BORDER}`,
                padding: "8px 14px",
                cursor: "pointer",
                transition: "background-color 150ms ease, color 150ms ease, border-color 150ms ease",
              }}
            >
              {t.category}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function RightPanel() {
  return (
    <section
      style={{
        backgroundColor: INK,
        padding: "clamp(40px, 5vw, 72px)",
        display: "flex",
        flexDirection: "column",
        gap: 56,
      }}
    >
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <p style={{ fontFamily: SANS, fontSize: 13, color: PAPER_DIM, margin: 0 }}>
          Have an account?{" "}
          <Link href="/signin" style={{ color: PAPER, fontWeight: 500, textDecoration: "underline", textUnderlineOffset: 3 }}>
            Sign in
          </Link>
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: 1, alignItems: "center" }}>
        <VaultSignupForm />
      </div>

      <div aria-hidden />
    </section>
  );
}

function VaultSignupForm() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      style={{
        width: "100%",
        maxWidth: 440,
        display: "flex",
        flexDirection: "column",
        gap: 24,
        border: `1px solid ${PAPER}`,
        padding: "clamp(28px, 3.5vw, 40px)",
        backgroundColor: INK,
      }}
    >
      <div>
        <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: PAPER_FOG }}>
          Create an account
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <VaultField label="First" type="text" placeholder="James" autoComplete="given-name" />
        <VaultField label="Last" type="text" placeholder="Mendez" autoComplete="family-name" />
      </div>
      <VaultField label="Email" type="email" placeholder="you@firm.com" autoComplete="email" />
      <VaultField label="Password" type="password" placeholder="At least 8 characters" autoComplete="new-password" />

      <button
        type="submit"
        style={{
          fontFamily: SANS,
          fontSize: 14,
          fontWeight: 500,
          color: INK,
          backgroundColor: PAPER,
          border: `1px solid ${PAPER}`,
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

      <p style={{ fontFamily: SERIF, fontSize: 13, lineHeight: 1.55, color: PAPER_DIM, margin: 0, fontVariationSettings: '"opsz" 14' }}>
        ID verification + Checkr background check follow before any first task is posted or booked.
      </p>
    </form>
  );
}

function VaultField({
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
      <span style={{ fontFamily: MONO, fontSize: 9, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: PAPER_FOG }}>
        {label}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        style={{
          fontFamily: SANS,
          fontSize: 14,
          color: PAPER,
          backgroundColor: PANEL,
          border: `1px solid ${BORDER}`,
          padding: "12px 14px",
          outline: "none",
        }}
      />
    </label>
  );
}

function Footer() {
  return (
    <footer style={{ paddingTop: "clamp(40px, 5vw, 64px)", paddingBottom: "clamp(40px, 5vw, 64px)", paddingLeft: "clamp(28px, 4vw, 64px)", paddingRight: "clamp(28px, 4vw, 64px)", borderTop: `1px solid ${RULE}`, backgroundColor: INK }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
        <RennerMark size={28} weight={300} />
        <div style={{ display: "flex", alignItems: "center", gap: 24, fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: PAPER_FOG }}>
          <Link href="/contact" style={{ color: PAPER_DIM, textDecoration: "none" }}>Contact</Link>
          <Link href="/terms" style={{ color: PAPER_DIM, textDecoration: "none" }}>Terms</Link>
          <Link href="/privacy" style={{ color: PAPER_DIM, textDecoration: "none" }}>Privacy</Link>
          <span>·</span>
          <span>© 2026</span>
        </div>
      </div>
    </footer>
  );
}
