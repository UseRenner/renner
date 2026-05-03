import Link from "next/link";
import { Card } from "../../how-it-works/_illustrations";
import { BureauBody } from "../../how-it-works/bureau/BureauBody";
import { getToneVars, RennerMark } from "../../how-it-works/_shared";
import {
  CATEGORIES,
  DEK,
  FINAL_CTA_DEK,
  FINAL_CTA_HEAD,
  HEADLINE_LEAD,
  HEADLINE_TAIL,
  TESTIMONIALS,
  TRUST_PILLARS,
} from "../_content";

const SERIF = "var(--font-source-serif), ui-serif, Georgia, serif";
const SANS = "var(--font-source-sans), ui-sans-serif, system-ui, sans-serif";
const MONO = "var(--font-source-code), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const INK = "var(--c-text, #0d0f12)";
const STEEL_700 = "var(--c-700, #38414d)";
const STEEL_500 = "var(--c-500, #7d8da0)";
const STEEL_300 = "var(--c-300, #cad1d8)";
const RULE = "var(--c-rule, #eaedf0)";
const PAPER = "var(--c-bg, #fbfbfc)";

const MAX_WIDTH = 1280;
const GUTTER = "clamp(28px, 4vw, 64px)";

// Bureau — TIGHT.
// Every major section uses Bureau's structural pattern: a two-
// column hero, then ink-bordered tables for categories,
// testimonials, and pricing. The table grammar from Bureau's
// how-it-works repeats four more times across the page —
// numbered left column, italic title column, body column,
// proof/rate column on the right. The page reads as one unified
// editorial document. Most distinctive Bureau expression; also
// the most demanding of the content.

export function BureauTightBody() {
  return (
    <div style={{ ...getToneVars("paper"), backgroundColor: PAPER, color: INK, minHeight: "100vh" }}>
      <Header />

      <main>
        <Hero />
        <TrustStrip />
        <CategoriesTable />
        <HowItWorks />
        <TestimonialsTable />
        <PricingTable />
        <FinalCta />
      </main>

      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header style={{ paddingTop: "clamp(28px, 3.5vw, 48px)", paddingBottom: "clamp(28px, 3.5vw, 48px)", paddingLeft: GUTTER, paddingRight: GUTTER }}>
      <div className="mx-auto" style={{ maxWidth: MAX_WIDTH, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        <RennerMark size={36} weight={300} />
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <Link href="/preview/landing" style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: STEEL_500, textDecoration: "none" }}>
            ← All previews
          </Link>
          <Link href="/signin" style={{ fontFamily: SANS, fontSize: 13, fontWeight: 500, color: STEEL_700, textDecoration: "none" }}>
            Sign in
          </Link>
          <Link href="/signup" style={{ fontFamily: SANS, fontSize: 13, fontWeight: 500, color: PAPER, backgroundColor: INK, border: `1px solid ${INK}`, borderRadius: 4, padding: "10px 18px", textDecoration: "none", whiteSpace: "nowrap" }}>
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section style={{ paddingTop: "clamp(48px, 7vw, 96px)", paddingBottom: "clamp(64px, 9vw, 128px)", paddingLeft: GUTTER, paddingRight: GUTTER, borderTop: `1px solid ${INK}` }}>
      <div className="mx-auto" style={{ maxWidth: MAX_WIDTH }}>
        <div className="bureau-hero" style={{ display: "grid", gridTemplateColumns: "minmax(0, 7fr) minmax(0, 5fr)", gap: "clamp(40px, 6vw, 96px)", alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: STEEL_500, marginBottom: 24 }}>
              Real-estate task marketplace
            </div>
            <h1
              style={{
                fontFamily: SERIF,
                fontWeight: 400,
                fontSize: "clamp(48px, 7.2vw, 104px)",
                lineHeight: 0.98,
                letterSpacing: "-0.02em",
                color: INK,
                margin: 0,
                marginBottom: 32,
                fontVariationSettings: '"opsz" 144',
              }}
            >
              {HEADLINE_LEAD}{" "}
              <span style={{ fontStyle: "italic", fontWeight: 300, color: STEEL_700 }}>{HEADLINE_TAIL}</span>
            </h1>
            <p style={{ fontFamily: SERIF, fontSize: "clamp(17px, 1.6vw, 20px)", lineHeight: 1.6, color: STEEL_700, margin: 0, marginBottom: 40, maxWidth: "44ch", fontVariationSettings: '"opsz" 14' }}>
              {DEK}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
              <Link href="/signup" style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: SANS, fontSize: 14, fontWeight: 500, color: PAPER, backgroundColor: INK, border: `1px solid ${INK}`, borderRadius: 4, padding: "14px 22px", textDecoration: "none" }}>
                Sign up
                <span aria-hidden style={{ opacity: 0.7 }}>→</span>
              </Link>
              <Link href="/become-a-renner" style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: SANS, fontSize: 14, fontWeight: 500, color: INK, border: `1px solid ${INK}`, borderRadius: 4, padding: "14px 22px", textDecoration: "none" }}>
                Become a Renner
              </Link>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Card kind="task" />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .bureau-hero { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
}

function TrustStrip() {
  return (
    <section style={{ paddingTop: "clamp(40px, 5vw, 64px)", paddingBottom: "clamp(40px, 5vw, 64px)", paddingLeft: GUTTER, paddingRight: GUTTER, borderTop: `1px solid ${INK}`, borderBottom: `1px solid ${INK}` }}>
      <div className="mx-auto" style={{ maxWidth: MAX_WIDTH }}>
        <div className="bureau-trust-strip" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(24px, 3vw, 48px)" }}>
          {TRUST_PILLARS.map(([label, body]) => (
            <div key={label}>
              <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: STEEL_500, marginBottom: 12 }}>
                Pillar
              </div>
              <div style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(20px, 2vw, 24px)", lineHeight: 1.15, letterSpacing: "-0.012em", color: INK, marginBottom: 10, fontVariationSettings: '"opsz" 36' }}>
                {label}
              </div>
              <div style={{ fontFamily: SERIF, fontSize: 15, lineHeight: 1.55, color: STEEL_700, fontVariationSettings: '"opsz" 14' }}>
                {body}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .bureau-trust-strip { grid-template-columns: 1fr !important; gap: 28px !important; }
        }
      `}</style>
    </section>
  );
}

// ─── Bureau-pattern table ───────────────────────────────────
// Reusable four-column rule-bordered table that mirrors Bureau's
// how-it-works step table. Used for Categories and Testimonials
// so both sections inherit the same grammar — number, italic
// title, body, proof column on the right.

function SectionHeader({ kicker, title, italic }: { kicker: string; title: string; italic: string }) {
  return (
    <div style={{ marginBottom: "clamp(40px, 5vw, 64px)", maxWidth: "60ch" }}>
      <div style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: STEEL_500, marginBottom: 16 }}>
        {kicker}
      </div>
      <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(32px, 4vw, 52px)", lineHeight: 1.05, letterSpacing: "-0.018em", color: INK, margin: 0, fontVariationSettings: '"opsz" 60' }}>
        {title} <span style={{ fontStyle: "italic", fontWeight: 300, color: STEEL_700 }}>{italic}</span>
      </h2>
    </div>
  );
}

function CategoriesTable() {
  return (
    <section style={{ paddingTop: "clamp(72px, 9vw, 128px)", paddingBottom: "clamp(72px, 9vw, 128px)", paddingLeft: GUTTER, paddingRight: GUTTER }}>
      <div className="mx-auto" style={{ maxWidth: MAX_WIDTH }}>
        <SectionHeader kicker="Categories" title="The small jobs real estate" italic="runs on." />

        <div style={{ borderTop: `1px solid ${INK}`, borderBottom: `1px solid ${INK}` }}>
          {CATEGORIES.map((c, i) => (
            <article
              key={c.id}
              className="bureau-row"
              style={{
                display: "grid",
                gridTemplateColumns: "64px minmax(160px, 1fr) minmax(0, 1.6fr) minmax(120px, auto)",
                gap: "clamp(20px, 2.4vw, 32px)",
                padding: "clamp(20px, 2.4vw, 28px) 0",
                borderBottom: i === CATEGORIES.length - 1 ? "none" : `1px solid ${RULE}`,
                alignItems: "baseline",
              }}
            >
              <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: "0.22em", color: STEEL_500 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(20px, 2vw, 26px)", lineHeight: 1.1, color: INK, fontVariationSettings: '"opsz" 36' }}>
                {c.title}
              </span>
              <span style={{ fontFamily: SERIF, fontSize: 16, lineHeight: 1.55, color: STEEL_700, fontVariationSettings: '"opsz" 14' }}>
                {c.detail}
              </span>
              <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: STEEL_700, textAlign: "right" }}>
                {c.rate}
              </span>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .bureau-row {
            grid-template-columns: 36px 1fr !important;
            gap: 6px 14px !important;
          }
          .bureau-row > :nth-child(3),
          .bureau-row > :nth-child(4) {
            grid-column: 2;
          }
          .bureau-row > :nth-child(4) {
            text-align: left !important;
          }
        }
      `}</style>
    </section>
  );
}

function HowItWorks() {
  return (
    <section style={{ paddingTop: "clamp(64px, 8vw, 112px)", paddingBottom: "clamp(64px, 8vw, 112px)", paddingLeft: GUTTER, paddingRight: GUTTER, borderTop: `1px solid ${INK}` }}>
      <div className="mx-auto" style={{ maxWidth: MAX_WIDTH }}>
        <div style={{ marginBottom: "clamp(40px, 5vw, 64px)" }}>
          <div style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: STEEL_500, marginBottom: 12 }}>
            How it works
          </div>
        </div>
        <BureauBody showCta={false} />
      </div>
    </section>
  );
}

function TestimonialsTable() {
  return (
    <section style={{ paddingTop: "clamp(72px, 9vw, 128px)", paddingBottom: "clamp(72px, 9vw, 128px)", paddingLeft: GUTTER, paddingRight: GUTTER, borderTop: `1px solid ${INK}` }}>
      <div className="mx-auto" style={{ maxWidth: MAX_WIDTH }}>
        <SectionHeader kicker="Word from the field" title="Brokers, hosts, and Renners" italic="on the platform." />

        <div style={{ borderTop: `1px solid ${INK}`, borderBottom: `1px solid ${INK}` }}>
          {TESTIMONIALS.map((t, i) => (
            <article
              key={t.name}
              className="bureau-row"
              style={{
                display: "grid",
                gridTemplateColumns: "64px minmax(0, 3fr) minmax(160px, auto)",
                gap: "clamp(20px, 2.4vw, 40px)",
                padding: "clamp(28px, 3.5vw, 40px) 0",
                borderBottom: i === TESTIMONIALS.length - 1 ? "none" : `1px solid ${RULE}`,
                alignItems: "baseline",
              }}
            >
              <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: "0.22em", color: STEEL_500 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <p style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(18px, 1.9vw, 22px)", lineHeight: 1.5, letterSpacing: "-0.005em", color: INK, margin: 0, fontVariationSettings: '"opsz" 36' }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: SANS, fontSize: 13, fontWeight: 500, color: INK, marginBottom: 4 }}>
                  {t.name}
                </div>
                <div style={{ fontFamily: MONO, fontSize: 9, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: STEEL_500, lineHeight: 1.4 }}>
                  {t.role}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingTable() {
  // Three-column comparison table — Side / Pays / Receives.
  // Different shape than Categories/Testimonials but still
  // table-grammar: bordered top/bottom, internal hairlines,
  // mono header row.
  const rows: Array<[string, string, string]> = [
    ["Clients", "10% service fee", "Full transparency, escrow holds."],
    ["Renners", "0% — keep 100% of pay", "Direct payouts, repeat clients."],
  ];

  return (
    <section style={{ paddingTop: "clamp(72px, 9vw, 128px)", paddingBottom: "clamp(72px, 9vw, 128px)", paddingLeft: GUTTER, paddingRight: GUTTER, borderTop: `1px solid ${INK}` }}>
      <div className="mx-auto" style={{ maxWidth: MAX_WIDTH }}>
        <SectionHeader kicker="Pricing" title="Two columns of money," italic="both shown to both sides." />

        <div className="bureau-pricing" style={{ borderTop: `1px solid ${INK}`, borderBottom: `1px solid ${INK}` }}>
          {/* Header row */}
          <div
            className="bureau-pricing-row"
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(140px, 1fr) minmax(180px, 1.2fr) minmax(0, 2fr)",
              gap: "clamp(20px, 2.4vw, 40px)",
              padding: "clamp(16px, 2vw, 24px) 0",
              borderBottom: `1px solid ${RULE}`,
              fontFamily: MONO,
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: STEEL_500,
            }}
          >
            <span>Side</span>
            <span>Pays</span>
            <span>Receives</span>
          </div>
          {rows.map(([side, pays, receives], i) => (
            <article
              key={side}
              className="bureau-pricing-row"
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(140px, 1fr) minmax(180px, 1.2fr) minmax(0, 2fr)",
                gap: "clamp(20px, 2.4vw, 40px)",
                padding: "clamp(28px, 3.5vw, 40px) 0",
                borderBottom: i === rows.length - 1 ? "none" : `1px solid ${RULE}`,
                alignItems: "baseline",
              }}
            >
              <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(24px, 2.6vw, 32px)", lineHeight: 1.05, color: INK, fontVariationSettings: '"opsz" 36' }}>
                {side}
              </span>
              <span style={{ fontFamily: SERIF, fontSize: "clamp(17px, 1.7vw, 20px)", lineHeight: 1.4, color: INK, fontVariationSettings: '"opsz" 14' }}>
                {pays}
              </span>
              <span style={{ fontFamily: SERIF, fontSize: 16, lineHeight: 1.55, color: STEEL_700, fontVariationSettings: '"opsz" 14' }}>
                {receives}
              </span>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .bureau-pricing-row {
            grid-template-columns: 1fr !important;
            gap: 8px !important;
          }
        }
      `}</style>
    </section>
  );
}

function FinalCta() {
  return (
    <section style={{ paddingTop: "clamp(96px, 12vw, 160px)", paddingBottom: "clamp(96px, 12vw, 160px)", paddingLeft: GUTTER, paddingRight: GUTTER, borderTop: `1px solid ${INK}` }}>
      <div className="mx-auto" style={{ maxWidth: MAX_WIDTH, textAlign: "center" }}>
        <h2 style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(40px, 6vw, 88px)", lineHeight: 1.05, letterSpacing: "-0.022em", color: INK, margin: 0, marginBottom: 24, fontVariationSettings: '"opsz" 144' }}>
          {FINAL_CTA_HEAD}
        </h2>
        <p style={{ fontFamily: SERIF, fontSize: "clamp(17px, 1.6vw, 20px)", lineHeight: 1.55, color: STEEL_700, margin: 0, marginBottom: 40, maxWidth: "44ch", marginLeft: "auto", marginRight: "auto", fontVariationSettings: '"opsz" 14' }}>
          {FINAL_CTA_DEK}
        </p>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
          <Link href="/signup" style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: SANS, fontSize: 14, fontWeight: 500, color: PAPER, backgroundColor: INK, border: `1px solid ${INK}`, borderRadius: 4, padding: "14px 22px", textDecoration: "none" }}>
            Sign up
            <span aria-hidden style={{ opacity: 0.7 }}>→</span>
          </Link>
          <Link href="/become-a-renner" style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: SANS, fontSize: 14, fontWeight: 500, color: INK, border: `1px solid ${INK}`, borderRadius: 4, padding: "14px 22px", textDecoration: "none" }}>
            Become a Renner
          </Link>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ paddingTop: "clamp(40px, 5vw, 64px)", paddingBottom: "clamp(40px, 5vw, 64px)", paddingLeft: GUTTER, paddingRight: GUTTER, borderTop: `1px solid ${RULE}` }}>
      <div className="mx-auto" style={{ maxWidth: MAX_WIDTH, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
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
