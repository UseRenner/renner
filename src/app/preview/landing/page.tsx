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
    subtitle: "50/50 split, paper",
    note: "The current live page in Bureau's DNA. Wordmark + headline + interactive sample card + category pills on the left; signup form on the right.",
  },
  {
    slug: "bureau-trio",
    label: "Bureau · Trio",
    subtitle: "50/50 with three sample tasks",
    note: "Left side stacks three sample task cards — Signs, Lockbox, Showings — clearly framed as samples. Right side is the signup form.",
  },
  {
    slug: "bureau-stark",
    label: "Bureau · Stark",
    subtitle: "Two-tone 50/50 (ink + paper)",
    note: "Left half is ink with paper headline and dek; no peek imagery. Right half is paper with the signup form. Strongest contrast of all the side-by-sides.",
  },
  {
    slug: "bureau-vault",
    label: "Bureau · Vault",
    subtitle: "50/50 split, ink tone",
    note: "Same wall as Iteration, rendered in Bureau's dark register.",
  },
  {
    slug: "bureau-column",
    label: "Bureau · Column",
    subtitle: "Centered narrow column, paper",
    note: "Single vertical axis down the page. Wordmark, headline, one sample card, signup form, footer.",
  },
  {
    slug: "bureau-window",
    label: "Bureau · Window",
    subtitle: "Bordered panel on chalk",
    note: "One ink-bordered panel at the center of a chalk page contains everything — wordmark, headline, sample card, and signup form.",
  },
  {
    slug: "bureau-stack",
    label: "Bureau · Stack",
    subtitle: "Two horizontal bands",
    note: "Upper band (paper) holds the wordmark, headline, and sample. Lower band (chalk) holds the signup form.",
  },
  {
    slug: "bureau-letter",
    label: "Bureau · Letter",
    subtitle: "Editorial stationery",
    note: "Reads as a single piece of letter paper. Double-rule masthead at the top, narrow centered reading column, and form fields integrated directly into the body — no wrapping form box, no enclosing border. Each input is just a fill-in-the-blank line. The most original of the eight.",
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
          Eight Bureau walls.
        </h1>
        <p style={{ fontFamily: SERIF, fontSize: 18, lineHeight: 1.55, color: "#38414d", margin: 0, marginBottom: 56, maxWidth: "60ch", fontVariationSettings: '"opsz" 14' }}>
          Eight wall-shaped landing pages in Bureau&rsquo;s DNA. Same content, different layouts. The first four are side-by-sides; the last four are other shapes. Every wall offers both pathways — sign up to hire, or apply as a Renner.
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
