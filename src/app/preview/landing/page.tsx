import Link from "next/link";

export const metadata = { title: "Landing previews · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

const SERIF = "var(--font-source-serif), ui-serif, Georgia, serif";
const SANS = "var(--font-source-sans), ui-sans-serif, system-ui, sans-serif";
const MONO = "var(--font-source-code), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const VARIANTS: Array<{ slug: string; label: string; subtitle: string; note: string }> = [
  {
    slug: "bureau-trio",
    label: "Bureau · Trio",
    subtitle: "Typographic triptych",
    note: "Headline above a three-column triptych — kicker, italic title, location stamp — separated by floor-to-ceiling hairlines. Form sits beneath as the closing section.",
  },
  {
    slug: "bureau-window",
    label: "Bureau · Window",
    subtitle: "Single panel on chalk",
    note: "One paper panel at the center of a chalk page, framed by light steel hairlines. Inside, everything stacks down a single vertical axis — mark above the rule, headline, dek, categories edge to edge between two rules, form, secondary path.",
  },
  {
    slug: "bureau-letter",
    label: "Bureau · Letter",
    subtitle: "Editorial stationery",
    note: "Reads as a single piece of letter paper. Hairline masthead, narrow centered reading column, fields-in-page form integrated directly into the body. Categories sit in italic serif at a generous INK size as the editorial body's list of what Renner handles.",
  },
  {
    slug: "bureau-specimen",
    label: "Bureau · Specimen",
    subtitle: "Categories as a lane",
    note: "The categories block reads like a lane on a road — two ink rules above and below as the lane lines, italic-serif categories distributed edge to edge between them as the dashed center stripe. Headline and form sit above and below the lane, separated only by whitespace.",
  },
  {
    slug: "bureau-glyph",
    label: "Bureau · Glyph",
    subtitle: "Wordmark as architecture",
    note: "The wordmark renders large across the top of the page — italic, low-opsz, generous letter-spacing — anchoring the composition. Categories tucked inside the headline column with a hairline that shrinks to span only the categories' width — content-symmetric.",
  },
  {
    slug: "bureau-index",
    label: "Bureau · Index",
    subtitle: "Editorial table of contents",
    note: "Page is a TOC. Six italic category entries down a single column between two ink rules; the seventh entry is the signup itself, expanded inline. The form is the last entry — what the reader arrives at when they reach the end.",
  },
];

export default function LandingPreviewIndex() {
  return (
    <div style={{ backgroundColor: "#fbfbfc", minHeight: "100vh", color: "#0d0f12" }}>
      <main style={{ maxWidth: 960, margin: "0 auto", padding: "clamp(48px, 8vw, 96px) clamp(28px, 4vw, 64px)" }}>
        <div style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: "#7d8da0", marginBottom: 24 }}>
          Landing previews · Bureau
        </div>
        <h1 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(36px, 4.5vw, 56px)", lineHeight: 1.1, letterSpacing: "-0.02em", margin: 0, marginBottom: 16, fontVariationSettings: '"opsz" 60' }}>
          Six Bureau walls.
        </h1>
        <p style={{ fontFamily: SERIF, fontSize: 18, lineHeight: 1.55, color: "#38414d", margin: 0, marginBottom: 56, maxWidth: "60ch", fontVariationSettings: '"opsz" 14' }}>
          Six wall-shaped landing pages in Bureau&rsquo;s DNA. Same content, different layouts. Every wall offers both pathways — sign up to hire, or apply as a Renner.
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
