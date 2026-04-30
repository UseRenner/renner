import Link from "next/link";
import { getViewer } from "@/lib/role";
import { FAQS, RennerMark, VariantSwitcher } from "../_shared";
import { SuiteBody } from "./SuiteBody";

export const metadata = {
  title: "How it works · Suite · Renner",
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

export default async function SuiteHowItWorks() {
  const viewer = await getViewer();
  const showCta = !viewer;

  return (
    <div style={{ backgroundColor: PAPER, color: INK, minHeight: "100vh" }}>
      <VariantSwitcher active="suite" />

      {/* ─── Header ─── lowercase italic wordmark on the left */}
      <header
        style={{
          padding: "clamp(28px, 3.5vw, 48px) clamp(28px, 4vw, 48px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
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
            "clamp(64px, 9vw, 120px) clamp(28px, 4vw, 48px) clamp(96px, 12vw, 160px)",
        }}
      >
        <SuiteBody showCta={showCta} />

        {/* ─── FAQ ─── centered hairline accordion, smaller scale */}
        <section
          style={{
            maxWidth: 640,
            margin: "clamp(96px, 14vw, 160px) auto 0",
          }}
        >
          <div
            aria-hidden
            style={{
              width: 64,
              height: 1,
              backgroundColor: STEEL_300,
              margin: "0 auto",
              marginBottom: "clamp(40px, 5vw, 56px)",
            }}
          />
          <div
            style={{
              fontFamily: MONO,
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: STEEL_500,
              marginBottom: 32,
              textAlign: "center",
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
                  padding: "20px 0",
                  borderBottom: `1px solid ${STEEL_300}`,
                  borderTop: idx === 0 ? `1px solid ${STEEL_300}` : "none",
                }}
              >
                <summary
                  style={{
                    cursor: "pointer",
                    listStyle: "none",
                    display: "grid",
                    gridTemplateColumns: "minmax(40px, 48px) 1fr auto",
                    gap: 18,
                    alignItems: "baseline",
                  }}
                >
                  <span
                    style={{
                      fontFamily: MONO,
                      fontSize: 10,
                      fontWeight: 500,
                      letterSpacing: "0.24em",
                      color: STEEL_500,
                    }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span
                    style={{
                      fontFamily: SERIF,
                      fontWeight: 400,
                      fontSize: 17,
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
                      fontSize: 16,
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
                    fontSize: 15,
                    color: STEEL_700,
                    lineHeight: 1.7,
                    marginTop: 14,
                    marginLeft: 66,
                    marginBottom: 0,
                    maxWidth: 580,
                    fontVariationSettings: '"opsz" 14',
                  }}
                >
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </section>
      </main>

      {/* ─── Colophon footer ─── centered */}
      <footer
        style={{
          padding: "clamp(40px, 5vw, 64px) clamp(28px, 4vw, 48px)",
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
