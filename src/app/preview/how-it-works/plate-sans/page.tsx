import Link from "next/link";
import { getViewer } from "@/lib/role";
import { FAQS, RennerMark, VariantSwitcher } from "../_shared";
import { PlateSansBody } from "./PlateSansBody";

export const metadata = {
  title: "How it works · Plate Sans · Renner",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

const SERIF = "var(--font-source-serif), ui-serif, Georgia, serif";
const SANS =
  "var(--font-source-sans), ui-sans-serif, system-ui, sans-serif";
const MONO =
  "var(--font-source-code), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const INK = "#0d0f12";
const STEEL_700 = "#4d5b6a";
const STEEL_600 = "#647589";
const STEEL_500 = "#7d8da0";
const STEEL_300 = "#cad1d8";
const PAPER = "#fbfbfc";

export default async function PlateSansHowItWorks() {
  const viewer = await getViewer();
  const showCta = !viewer;

  return (
    <div style={{ backgroundColor: PAPER, color: INK, minHeight: "100vh" }}>
      <VariantSwitcher active="plate-sans" />

      <header
        style={{
          padding: "clamp(28px, 3.5vw, 48px) clamp(28px, 4vw, 64px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          borderBottom: `1px solid ${STEEL_300}`,
        }}
      >
        <RennerMark />
        {showCta ? (
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <Link
              href="/signin"
              style={{
                fontFamily: MONO,
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: STEEL_600,
                textDecoration: "none",
              }}
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              style={{
                fontFamily: SANS,
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: PAPER,
                backgroundColor: INK,
                border: `1px solid ${INK}`,
                borderRadius: 0,
                padding: "10px 22px",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              Sign up
            </Link>
          </div>
        ) : (
          <Link
            href="/dashboard"
            style={{
              fontFamily: MONO,
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: INK,
              textDecoration: "none",
            }}
          >
            Dashboard →
          </Link>
        )}
      </header>

      <main
        style={{
          padding:
            "clamp(56px, 8vw, 96px) clamp(28px, 4vw, 64px) clamp(96px, 12vw, 160px)",
        }}
      >
        <div className="mx-auto" style={{ maxWidth: "1200px" }}>
          <PlateSansBody showCta={showCta} />

          <section style={{ marginTop: "clamp(96px, 14vw, 160px)" }}>
            <div
              style={{
                fontFamily: MONO,
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: STEEL_500,
                marginBottom: 32,
              }}
            >
              Common questions
            </div>
            <div>
              {FAQS.map((item, idx) => (
                <details
                  key={item.q}
                  className="faq-item"
                  style={{
                    padding: "22px 0",
                    borderBottom: `1px solid ${STEEL_300}`,
                    borderTop: idx === 0 ? `1px solid ${STEEL_300}` : "none",
                  }}
                >
                  <summary
                    style={{
                      cursor: "pointer",
                      listStyle: "none",
                      display: "grid",
                      gridTemplateColumns: "minmax(48px, 56px) 1fr auto",
                      gap: 24,
                      alignItems: "baseline",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: MONO,
                        fontSize: 11,
                        fontWeight: 500,
                        letterSpacing: "0.22em",
                        color: STEEL_500,
                      }}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span
                      style={{
                        fontFamily: SERIF,
                        fontWeight: 400,
                        fontSize: 18,
                        lineHeight: 1.35,
                        color: INK,
                        letterSpacing: "-0.005em",
                        fontVariationSettings: '"opsz" 14',
                      }}
                    >
                      {item.q}
                    </span>
                    <span
                      className="faq-toggle"
                      style={{
                        fontFamily: SANS,
                        fontSize: 18,
                        color: STEEL_500,
                        transition: "transform 120ms ease",
                      }}
                      aria-hidden
                    >
                      +
                    </span>
                  </summary>
                  <p
                    style={{
                      fontFamily: SERIF,
                      fontSize: 16,
                      color: STEEL_700,
                      lineHeight: 1.7,
                      marginTop: 16,
                      marginLeft: 80,
                      marginBottom: 0,
                      maxWidth: 680,
                      fontVariationSettings: '"opsz" 14',
                    }}
                  >
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </section>
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
        }}
      >
        <RennerMark />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            fontFamily: MONO,
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: STEEL_500,
          }}
        >
          <Link href="/contact" style={{ color: STEEL_600, textDecoration: "none" }}>
            Contact
          </Link>
          <Link href="/terms" style={{ color: STEEL_600, textDecoration: "none" }}>
            Terms
          </Link>
          <Link href="/privacy" style={{ color: STEEL_600, textDecoration: "none" }}>
            Privacy
          </Link>
          <span style={{ color: STEEL_300 }}>·</span>
          <span>© 2026</span>
        </div>
      </footer>
    </div>
  );
}
