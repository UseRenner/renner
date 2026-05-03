import Link from "next/link";

export const metadata = { title: "Landing previews · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

const SERIF = "var(--font-source-serif), ui-serif, Georgia, serif";
const SANS = "var(--font-source-sans), ui-sans-serif, system-ui, sans-serif";
const MONO = "var(--font-source-code), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const VARIANTS: Array<{ slug: string; label: string; subtitle: string; note: string }> = [
  {
    slug: "bureau-iteration",
    label: "Bureau · Iteration",
    subtitle: "The live page, reskinned",
    note: "Same 50/50 split as renner-zeta.vercel.app — wordmark + headline + interactive sample card + signup form — but every visual detail re-rendered in Bureau's DNA: hairlines for shadows, sharp corners for rounded, italic serif and mono caps where hierarchy matters.",
  },
  {
    slug: "bureau-column",
    label: "Bureau · Column",
    subtitle: "A centered narrow column",
    note: "Single vertical axis down the middle of the page. Wordmark, kicker, headline, one curated sample, signup form, footer. No interactive pills, no second column — restraint is the message. Reads as a private invitation.",
  },
  {
    slug: "bureau-broadsheet",
    label: "Bureau · Broadsheet",
    subtitle: "A composed editorial spread",
    note: "Newsroom masthead at the top, an enormous cover headline below it, then three side-by-side columns — sample task on the left, a testimonial in the middle, signup form on the right. The whole page reads as a single page of a quarterly journal.",
  },
  {
    slug: "bureau-cover",
    label: "Bureau · Cover",
    subtitle: "Headline-first, form-as-footnote",
    note: "The headline takes most of the viewport at huge display size; everything else recedes. Trust pillars sit on a hairline beneath the headline. The signup is a single email + apply button on the bottom rule. Maximum exclusivity expression.",
  },
  {
    slug: "bureau-vault",
    label: "Bureau · Vault",
    subtitle: "The 50/50 split, in ink tone",
    note: "Same wall geometry as Iteration — 50/50, sample peek, interactive pills, signup form — rendered in Bureau's dark register. Reads as the entrance to a private members area instead of an editorial publication.",
  },
  {
    slug: "bureau-stack",
    label: "Bureau · Stack",
    subtitle: "Two horizontal bands",
    note: "Vertical pacing instead of bilateral. Upper band (paper) is the peek: wordmark, headline, sample task. Lower band (chalk) is the gate: signup form centered. The horizontal divide reads as a literal wall.",
  },
];

export default function LandingPreviewIndex() {
  return (
    <div style={{ backgroundColor: "#fbfbfc", minHeight: "100vh", color: "#0d0f12" }}>
      <main style={{ maxWidth: 960, margin: "0 auto", padding: "clamp(48px, 8vw, 96px) clamp(28px, 4vw, 64px)" }}>
        <div style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: "#7d8da0", marginBottom: 24 }}>
          Landing previews · Bureau walls
        </div>
        <h1 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(36px, 4.5vw, 56px)", lineHeight: 1.1, letterSpacing: "-0.02em", margin: 0, marginBottom: 16, fontVariationSettings: '"opsz" 60' }}>
          Six Bureau walls.
        </h1>
        <p style={{ fontFamily: SERIF, fontSize: 18, lineHeight: 1.55, color: "#38414d", margin: 0, marginBottom: 56, maxWidth: "60ch", fontVariationSettings: '"opsz" 14' }}>
          Six wall-shaped landing pages, all sharing Bureau&rsquo;s DNA — italic Source Serif titles, monospace caps kickers, hairlines for shadows, sharp corners for rounded — but each composed as a different kind of door. Pick the wall that feels most like &ldquo;you have to be inside.&rdquo;
        </p>

        <div style={{ display: "flex", flexDirection: "column", borderTop: "1px solid #0d0f12" }}>
          {VARIANTS.map((v) => (
            <Link
              key={v.slug}
              href={`/preview/landing/${v.slug}`}
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(180px, 220px) 1fr",
                gap: "clamp(24px, 3vw, 48px)",
                padding: "clamp(28px, 3.5vw, 40px) 0",
                borderBottom: "1px solid #0d0f12",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div>
                <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "#7d8da0", marginBottom: 10 }}>
                  {v.subtitle}
                </div>
                <div style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(22px, 2.4vw, 28px)", lineHeight: 1.05, letterSpacing: "-0.014em", fontVariationSettings: '"opsz" 36' }}>
                  {v.label}
                </div>
              </div>
              <div>
                <p style={{ fontFamily: SERIF, fontSize: 16, lineHeight: 1.6, color: "#38414d", margin: 0, fontVariationSettings: '"opsz" 14' }}>
                  {v.note}
                </p>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 16, fontFamily: SANS, fontSize: 13, fontWeight: 500, color: "#0d0f12" }}>
                  Open
                  <span aria-hidden style={{ opacity: 0.7 }}>→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
