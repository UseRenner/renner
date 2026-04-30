import Link from "next/link";
import { VariantSwitcher } from "../../_shared";

export const metadata = {
  title: "How it works · Plate · Italic Weights · Renner",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

const SERIF = "var(--font-source-serif), ui-serif, Georgia, serif";
const MONO =
  "var(--font-source-code), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const INK = "#0d0f12";
const STEEL_700 = "#4d5b6a";
const STEEL_600 = "#647589";
const STEEL_500 = "#7d8da0";
const STEEL_300 = "#cad1d8";
const RULE = "#eaedf0";
const PAPER = "#fbfbfc";

const WEIGHTS = [200, 300, 400, 500, 600, 700, 800, 900] as const;

const WEIGHT_LABELS: Record<(typeof WEIGHTS)[number], string> = {
  200: "Extralight",
  300: "Light",
  400: "Regular",
  500: "Medium",
  600: "Semibold",
  700: "Bold",
  800: "Extrabold",
  900: "Black",
};

export default function PlateItalicWeightsPage() {
  return (
    <div style={{ backgroundColor: PAPER, color: INK, minHeight: "100vh" }}>
      <VariantSwitcher active="plate" plateMark="italic-weights" />

      <header
        style={{
          padding: "clamp(28px, 3.5vw, 48px) clamp(28px, 4vw, 64px)",
          borderBottom: `1px solid ${STEEL_300}`,
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <h1
          style={{
            fontFamily: SERIF,
            fontWeight: 400,
            fontStyle: "italic",
            fontSize: "clamp(28px, 3.4vw, 40px)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: INK,
            margin: 0,
            fontVariationSettings: '"opsz" 36',
          }}
        >
          Italic serif · all weights · no symbol
        </h1>
        <div
          style={{
            fontFamily: MONO,
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: STEEL_600,
          }}
        >
          Source Serif 4 · italic axis
        </div>
      </header>

      <main
        style={{
          padding:
            "clamp(56px, 8vw, 96px) clamp(28px, 4vw, 64px) clamp(96px, 12vw, 160px)",
        }}
      >
        <div className="mx-auto" style={{ maxWidth: 1080 }}>
          {/* Column headers */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(80px, 100px) minmax(180px, 220px) 1fr 1fr",
              gap: 32,
              alignItems: "baseline",
              paddingBottom: 16,
              borderBottom: `1px solid ${STEEL_300}`,
              marginBottom: 8,
              fontFamily: MONO,
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: STEEL_500,
            }}
          >
            <span>Weight</span>
            <span>Name</span>
            <span>Titlecase</span>
            <span>Lowercase</span>
          </div>

          {WEIGHTS.map((weight) => (
            <div
              key={weight}
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(80px, 100px) minmax(180px, 220px) 1fr 1fr",
                gap: 32,
                alignItems: "baseline",
                padding: "clamp(20px, 2.4vw, 32px) 0",
                borderBottom: `1px solid ${RULE}`,
              }}
            >
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: "0.18em",
                  color: STEEL_600,
                }}
              >
                {weight}
              </span>
              <span
                style={{
                  fontFamily: SERIF,
                  fontStyle: "italic",
                  fontWeight: weight,
                  fontSize: 18,
                  color: STEEL_700,
                  fontVariationSettings: '"opsz" 14',
                }}
              >
                {WEIGHT_LABELS[weight]}
              </span>
              <span
                style={{
                  fontFamily: SERIF,
                  fontStyle: "italic",
                  fontWeight: weight,
                  fontSize: "clamp(40px, 5vw, 64px)",
                  letterSpacing: "-0.018em",
                  color: INK,
                  lineHeight: 1,
                  fontVariationSettings: '"opsz" 144',
                }}
              >
                Renner
              </span>
              <span
                style={{
                  fontFamily: SERIF,
                  fontStyle: "italic",
                  fontWeight: weight,
                  fontSize: "clamp(40px, 5vw, 64px)",
                  letterSpacing: "-0.018em",
                  color: INK,
                  lineHeight: 1,
                  fontVariationSettings: '"opsz" 144',
                }}
              >
                renner
              </span>
            </div>
          ))}
        </div>
      </main>

      <footer
        style={{
          padding: "clamp(40px, 5vw, 64px) clamp(28px, 4vw, 64px)",
          borderTop: `1px solid ${STEEL_300}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 20,
          fontFamily: MONO,
          fontSize: 10,
          fontWeight: 500,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: STEEL_500,
        }}
      >
        <Link
          href="/preview/how-it-works/plate"
          style={{ color: STEEL_600, textDecoration: "none" }}
        >
          ← Back to Plate
        </Link>
        <span>Source Serif 4 · variable italic, opsz 144</span>
      </footer>
    </div>
  );
}
