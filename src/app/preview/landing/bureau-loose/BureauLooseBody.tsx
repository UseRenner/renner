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
  PRICING_CLAIM,
  PRICING_DETAIL,
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

// Bureau — LOOSE.
// The page reads in Bureau's atmosphere — italic Source Serif
// titles, monospace caps kickers, hairline rules, no shadows or
// rounded corners — but each section uses whatever pattern fits
// the content best. Categories are a 3-up grid (not Bureau's
// signature 4-column table); testimonials are a 3-up of italic
// quotes; trust is a single editorial paragraph. The structural
// rhythm relaxes; the voice and texture stay constant.

export function BureauLooseBody() {
  return (
    <div style={{ ...getToneVars("paper"), backgroundColor: PAPER, color: INK, minHeight: "100vh" }}>
      <Header />

      <main>
        <Hero />
        <TrustStrip />
        <Categories />
        <HowItWorks />
        <Testimonials />
        <Pricing />
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

function Categories() {
  return (
    <section style={{ paddingTop: "clamp(72px, 9vw, 128px)", paddingBottom: "clamp(72px, 9vw, 128px)", paddingLeft: GUTTER, paddingRight: GUTTER }}>
      <div className="mx-auto" style={{ maxWidth: MAX_WIDTH }}>
        <div style={{ marginBottom: "clamp(48px, 6vw, 80px)", maxWidth: "60ch" }}>
          <div style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: STEEL_500, marginBottom: 16 }}>
            Categories
          </div>
          <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(32px, 4vw, 52px)", lineHeight: 1.05, letterSpacing: "-0.018em", color: INK, margin: 0, fontVariationSettings: '"opsz" 60' }}>
            The small jobs real estate <span style={{ fontStyle: "italic", fontWeight: 300, color: STEEL_700 }}>runs on.</span>
          </h2>
        </div>

        <div className="bureau-categories" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", columnGap: "clamp(24px, 3vw, 48px)", rowGap: "clamp(40px, 5vw, 64px)" }}>
          {CATEGORIES.map((c) => (
            <article key={c.id} style={{ paddingTop: 24, borderTop: `1px solid ${STEEL_300}` }}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, marginBottom: 14 }}>
                <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: STEEL_500 }}>
                  {c.label}
                </span>
                <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: STEEL_700 }}>
                  {c.rate}
                </span>
              </div>
              <h3 style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(22px, 2.4vw, 28px)", lineHeight: 1.1, letterSpacing: "-0.012em", color: INK, margin: 0, marginBottom: 10, fontVariationSettings: '"opsz" 36' }}>
                {c.title}
              </h3>
              <p style={{ fontFamily: SERIF, fontSize: 15, lineHeight: 1.55, color: STEEL_700, margin: 0, fontVariationSettings: '"opsz" 14' }}>
                {c.detail}
              </p>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .bureau-categories { grid-template-columns: 1fr !important; row-gap: 32px !important; }
        }
      `}</style>
    </section>
  );
}

function HowItWorks() {
  // Embed Bureau's existing how-it-works section. It carries
  // its own audience switch, dek, steps, and trust grid.
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

function Testimonials() {
  return (
    <section style={{ paddingTop: "clamp(72px, 9vw, 128px)", paddingBottom: "clamp(72px, 9vw, 128px)", paddingLeft: GUTTER, paddingRight: GUTTER, borderTop: `1px solid ${INK}` }}>
      <div className="mx-auto" style={{ maxWidth: MAX_WIDTH }}>
        <div style={{ marginBottom: "clamp(48px, 6vw, 80px)", maxWidth: "60ch" }}>
          <div style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: STEEL_500, marginBottom: 16 }}>
            Word from the field
          </div>
          <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(32px, 4vw, 52px)", lineHeight: 1.05, letterSpacing: "-0.018em", color: INK, margin: 0, fontVariationSettings: '"opsz" 60' }}>
            Brokers, hosts, and Renners <span style={{ fontStyle: "italic", fontWeight: 300, color: STEEL_700 }}>on the platform.</span>
          </h2>
        </div>

        <div className="bureau-testimonials" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", columnGap: "clamp(32px, 4vw, 56px)", rowGap: "clamp(40px, 5vw, 64px)" }}>
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} style={{ margin: 0 }}>
              <blockquote style={{ margin: 0, marginBottom: 24 }}>
                <p style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(20px, 2vw, 24px)", lineHeight: 1.4, letterSpacing: "-0.005em", color: INK, margin: 0, fontVariationSettings: '"opsz" 36' }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
              </blockquote>
              <figcaption style={{ paddingTop: 16, borderTop: `1px solid ${STEEL_300}` }}>
                <div style={{ fontFamily: SANS, fontSize: 13, fontWeight: 500, color: INK, marginBottom: 4 }}>
                  {t.name}
                </div>
                <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: STEEL_500 }}>
                  {t.role}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .bureau-testimonials { grid-template-columns: 1fr !important; row-gap: 32px !important; }
        }
      `}</style>
    </section>
  );
}

function Pricing() {
  return (
    <section style={{ paddingTop: "clamp(72px, 9vw, 128px)", paddingBottom: "clamp(72px, 9vw, 128px)", paddingLeft: GUTTER, paddingRight: GUTTER, borderTop: `1px solid ${INK}` }}>
      <div className="mx-auto" style={{ maxWidth: MAX_WIDTH }}>
        <div style={{ maxWidth: "60ch" }}>
          <div style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: STEEL_500, marginBottom: 16 }}>
            Pricing
          </div>
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(28px, 3.4vw, 44px)", lineHeight: 1.25, letterSpacing: "-0.014em", color: INK, margin: 0, marginBottom: 24, fontVariationSettings: '"opsz" 60' }}>
            {PRICING_CLAIM}
          </p>
          <p style={{ fontFamily: SERIF, fontSize: 17, lineHeight: 1.6, color: STEEL_700, margin: 0, fontVariationSettings: '"opsz" 14' }}>
            {PRICING_DETAIL}
          </p>
        </div>
      </div>
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
