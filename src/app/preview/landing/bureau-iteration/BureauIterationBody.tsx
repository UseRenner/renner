"use client";

import Link from "next/link";
import { useState } from "react";
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
const PANEL = "var(--c-panel, #eaedf0)";

// Bureau — ITERATION OF THE LIVE LANDING.
// Same skeleton as renner-zeta.vercel.app: 50/50 split, wordmark
// + headline + interactive sample card + category pills on the
// left, sign-in link + signup form on the right. Every visual
// detail is replaced with Bureau's: hairlines instead of
// shadows, sharp corners instead of rounded, italic serif
// instead of sans where hierarchy matters, monospace caps for
// kickers and labels. The pills still swap the sample card on
// click, but they've lost their "pill" shape — they're now
// hairline-bordered chips reading as Bureau audience tabs.

export function BureauIterationBody({ tone }: { tone: ShellTone }) {
  const [activeId, setActiveId] = useState<string>(SAMPLE_TASKS[0].category);
  const active = SAMPLE_TASKS.find((t) => t.category === activeId) ?? SAMPLE_TASKS[0];

  return (
    <div style={{ ...getToneVars(tone), backgroundColor: PAPER, color: INK, minHeight: "100vh" }}>
      <div className="bureau-iter-split">
        <LeftPanel active={active} activeId={activeId} onSelect={setActiveId} />
        <RightPanel />
      </div>
      <Footer />

      <style jsx>{`
        .bureau-iter-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 100vh;
        }
        @media (max-width: 880px) {
          .bureau-iter-split {
            grid-template-columns: 1fr;
          }
        }
        /* When the panel is too narrow for the pills to fit
           one row, swap to dot navigation. The pill/dot wrappers
           are emitted by helper components, so we reach them
           with :global(). */
        @media (max-width: 1100px) and (min-width: 881px) {
          .bureau-iter-split :global(.bureau-iter-pills-wrap) {
            display: none !important;
          }
          .bureau-iter-split :global(.bureau-iter-dots-wrap) {
            display: flex !important;
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
      className="bureau-iter-left"
      style={{
        backgroundColor: PANEL,
        padding: "clamp(40px, 5vw, 72px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 56,
        borderRight: `1px solid ${INK}`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        <RennerMark size={36} weight={300} />
        <Link href="/preview/landing" style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: STEEL_500, textDecoration: "none" }}>
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
              color: INK,
              margin: 0,
              maxWidth: "16ch",
              fontVariationSettings: '"opsz" 144',
            }}
          >
            {HEADLINE_LEAD}{" "}
            <span style={{ fontStyle: "italic", fontWeight: 300, color: STEEL_700 }}>{HEADLINE_TAIL}</span>
          </h1>
          <p style={{ fontFamily: SERIF, fontSize: 17, lineHeight: 1.55, color: STEEL_700, margin: 0, marginTop: 24, maxWidth: "44ch", fontVariationSettings: '"opsz" 14' }}>
            {SHORT_DEK}
          </p>
        </div>

        <SampleCard task={active} />

        <CategoryPills activeId={activeId} onSelect={onSelect} />
        <CategoryDots activeId={activeId} onSelect={onSelect} />
      </div>

      <div aria-hidden />
    </section>
  );
}

function SampleCard({ task }: { task: typeof SAMPLE_TASKS[number] }) {
  return (
    <article
      aria-hidden
      style={{
        backgroundColor: PAPER,
        border: `1px solid ${STEEL_300}`,
        // sharp corners, no shadow — Bureau DNA
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

function CategoryPills({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="bureau-iter-pills-wrap" style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 520 }}>
      <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: STEEL_500 }}>
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
                color: isActive ? PAPER : STEEL_700,
                backgroundColor: isActive ? INK : PAPER,
                border: `1px solid ${isActive ? INK : STEEL_300}`,
                padding: "8px 14px",
                cursor: "pointer",
                // sharp corners — Bureau DNA. No border-radius.
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

// Dots fallback: when the panel is too narrow for the pills to
// fit on one row, show a row of small clickable dots instead.
// Same activeId state powers both — the pills hide and dots
// show via a media query below.
function CategoryDots({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const activeCategory = SAMPLE_TASKS.find((t) => t.category === activeId)?.category ?? "";
  return (
    <div className="bureau-iter-dots-wrap" style={{ display: "none", flexDirection: "column", gap: 12, maxWidth: 520 }}>
      <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: STEEL_500 }}>
        Categories · <span style={{ color: INK }}>{activeCategory}</span>
      </div>
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        {SAMPLE_TASKS.map((t) => {
          const isActive = t.category === activeId;
          return (
            <button
              key={t.category}
              type="button"
              tabIndex={-1}
              aria-label={`Show ${t.category} sample`}
              onClick={() => onSelect(t.category)}
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: isActive ? INK : "transparent",
                border: `1px solid ${INK}`,
                padding: 0,
                cursor: "pointer",
                transition: "background-color 120ms ease",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

function RightPanel() {
  return (
    <section
      className="bureau-iter-right"
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
        <BureauSignupForm />
      </div>

      <div aria-hidden />
    </section>
  );
}

function BureauSignupForm() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      style={{
        width: "100%",
        maxWidth: 440,
        display: "flex",
        flexDirection: "column",
        gap: 28,
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

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
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
            border: `1px solid ${INK}`,
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

      <p style={{ fontFamily: SERIF, fontSize: 13, lineHeight: 1.55, color: STEEL_700, margin: 0, fontVariationSettings: '"opsz" 14' }}>
        ID verification and a Checkr background check follow before either side can post or take a task.
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
          // sharp corners — Bureau DNA
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
        <RennerMark size={36} weight={300} />
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
