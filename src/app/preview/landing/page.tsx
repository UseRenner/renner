import Link from "next/link";

export const metadata = { title: "Landing previews · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

const SERIF = "var(--font-source-serif), ui-serif, Georgia, serif";
const SANS = "var(--font-source-sans), ui-sans-serif, system-ui, sans-serif";
const MONO = "var(--font-source-code), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const VARIANTS: Array<{ slug: string; label: string; subtitle: string; note: string }> = [
  {
    slug: "bureau-loose",
    label: "Bureau · Loose",
    subtitle: "Bureau's atmosphere across the page",
    note: "Carries Bureau's typography, palette, kicker style, and voice — but each section uses whatever pattern fits the content. Easier to make polished; less distinctive.",
  },
  {
    slug: "bureau-tight",
    label: "Bureau · Tight",
    subtitle: "Bureau's structural pattern, repeated",
    note: "Every section uses Bureau's signature: two-column hero, four-column rule-bordered tables for categories and testimonials, three-up grids elsewhere. Most distinctive; hardest to wear out gracefully.",
  },
  {
    slug: "bureau-iteration",
    label: "Bureau · Iteration of Live",
    subtitle: "The current live page, reskinned in Bureau's DNA",
    note: "Same 50/50 split structure as renner-zeta.vercel.app — wordmark + headline + sample card + signup form — but with Bureau's hairlines, italic serif, mono kickers, sharp corners, and no shadows.",
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
          Three Bureau landings.
        </h1>
        <p style={{ fontFamily: SERIF, fontSize: 18, lineHeight: 1.55, color: "#38414d", margin: 0, marginBottom: 56, maxWidth: "60ch", fontVariationSettings: '"opsz" 14' }}>
          Three ways to read the question &ldquo;does Bureau&rsquo;s DNA scale to a full home page?&rdquo; Pick a direction; the other ten variants will follow whichever model wins.
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
                padding: "clamp(32px, 4vw, 48px) 0",
                borderBottom: "1px solid #0d0f12",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div>
                <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "#7d8da0", marginBottom: 10 }}>
                  {v.subtitle}
                </div>
                <div style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(24px, 2.6vw, 32px)", lineHeight: 1.05, letterSpacing: "-0.014em", fontVariationSettings: '"opsz" 36' }}>
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
