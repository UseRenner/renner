"use client";

import Link from "next/link";
import { RennerMark, getToneVars } from "../../how-it-works/_shared";
import { HEADLINE_LEAD, HEADLINE_TAIL, SHORT_DEK } from "../_content";

const SERIF = "var(--font-source-serif), ui-serif, Georgia, serif";
const SANS = "var(--font-source-sans), ui-sans-serif, system-ui, sans-serif";
const MONO = "var(--font-source-code), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const INK = "var(--c-text, #0d0f12)";
const STEEL_700 = "var(--c-700, #38414d)";
const STEEL_500 = "var(--c-500, #7d8da0)";
const STEEL_300 = "var(--c-300, #cad1d8)";
const RULE = "var(--c-rule, #eaedf0)";
const PAPER = "var(--c-bg, #fbfbfc)";

// Bureau — ARCHIVE WALL.
// Same 50/50 wall geometry as Iteration, but the left side is a
// live-feeling feed of posted tasks rather than one card. Six
// rows in Bureau's table grammar — category, italic title,
// location, rate, timestamp — drive the FOMO without saying a
// word about exclusivity. The right side is the form. The
// volume on the left does the work the wall needs.

type FeedRow = {
  category: string;
  title: string;
  location: string;
  rate: string;
  posted: string;
};

const FEED: FeedRow[] = [
  { category: "Signs", title: "Install sign rider", location: "RiNo, Denver 80205", rate: "$45", posted: "12m ago" },
  { category: "Lockbox", title: "Swap lockbox at listing", location: "Buckhead, Atlanta 30305", rate: "$35", posted: "34m ago" },
  { category: "Showings", title: "Show property to buyer", location: "Lincoln Park, Chicago 60614", rate: "$75", posted: "1h ago" },
  { category: "Courier", title: "Deliver closing docs", location: "SoHo, New York 10012", rate: "$45", posted: "2h ago" },
  { category: "Visuals", title: "Walkthrough photos", location: "West Hollywood, LA 90046", rate: "$75", posted: "3h ago" },
  { category: "Guest", title: "Guest check-in", location: "South Beach, Miami 33139", rate: "$40", posted: "4h ago" },
];

export function BureauArchiveBody() {
  return (
    <div style={{ ...getToneVars("paper"), backgroundColor: PAPER, color: INK, minHeight: "100vh" }}>
      <div className="bureau-ar-split">
        <LeftPanel />
        <RightPanel />
      </div>
      <Footer />

      <style jsx>{`
        .bureau-ar-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 100vh;
        }
        @media (max-width: 880px) {
          .bureau-ar-split {
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
            fontSize: "clamp(40px, 5.4vw, 72px)",
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
        <p style={{ fontFamily: SERIF, fontSize: "clamp(15px, 1.4vw, 17px)", lineHeight: 1.55, color: STEEL_700, margin: 0, marginTop: 24, maxWidth: "44ch", fontVariationSettings: '"opsz" 14' }}>
          {SHORT_DEK}
        </p>
      </div>

      <Feed />
    </section>
  );
}

function Feed() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div className="bureau-ar-status" style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
        <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: STEEL_500 }}>
          Recent tasks
        </span>
      </div>

      <div style={{ borderTop: `1px solid ${INK}`, borderBottom: `1px solid ${INK}` }}>
        {FEED.map((row, i) => (
          <article
            key={`${row.title}-${i}`}
            className="bureau-ar-row"
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(70px, 90px) minmax(0, 2fr) minmax(0, 1.4fr) auto auto",
              gap: "clamp(12px, 1.6vw, 24px)",
              padding: "16px 0",
              borderBottom: i === FEED.length - 1 ? "none" : `1px solid ${RULE}`,
              alignItems: "baseline",
            }}
          >
            <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: STEEL_500 }}>
              {row.category}
            </span>
            <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(16px, 1.6vw, 19px)", lineHeight: 1.15, color: INK, fontVariationSettings: '"opsz" 36' }}>
              {row.title}
            </span>
            <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.06em", color: STEEL_700, lineHeight: 1.4 }}>
              {row.location}
            </span>
            <span style={{ fontFamily: SERIF, fontSize: 16, fontWeight: 400, color: INK, fontVariationSettings: '"opsz" 14' }}>
              {row.rate}
            </span>
            <span style={{ fontFamily: MONO, fontSize: 9, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: STEEL_500, whiteSpace: "nowrap" }}>
              {row.posted}
            </span>
          </article>
        ))}
      </div>


      <style>{`
        @media (max-width: 1100px) {
          .bureau-ar-row {
            grid-template-columns: minmax(60px, 80px) 1fr auto !important;
          }
          .bureau-ar-row > :nth-child(3),
          .bureau-ar-row > :nth-child(5) {
            display: none;
          }
        }
        @media (max-width: 720px) {
          .bureau-ar-status {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 6px;
          }
        }
      `}</style>
    </div>
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
        gap: 24,
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
