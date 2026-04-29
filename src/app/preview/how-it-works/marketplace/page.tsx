import Link from "next/link";
import { Wordmark } from "@/components/Wordmark";
import { getViewer } from "@/lib/role";
import { FAQS, VariantSwitcher } from "../_shared";
import { MarketplaceBody } from "./MarketplaceBody";

export const metadata = {
  title: "How it works · Marketplace · Renner",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

const SERIF = "var(--font-source-serif), ui-serif, Georgia, serif";
const SANS =
  "var(--font-source-sans), ui-sans-serif, system-ui, sans-serif";
const MONO =
  "var(--font-source-code), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const INK = "#0d0f12";
const SLATE = "#2a2f36";
const STEEL = "#647589";
const FOG = "#7d8da0";
const MIST = "#cad1d8";

export default async function MarketplaceHowItWorks() {
  const viewer = await getViewer();
  const showCta = !viewer;

  return (
    <div style={{ backgroundColor: "#fbfbfc", color: INK, minHeight: "100vh" }}>
      <VariantSwitcher active="marketplace" />

      <header
        style={{
          padding: "clamp(20px, 2.5vw, 32px) clamp(28px, 4vw, 64px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <Wordmark />
        {showCta ? (
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <Link
              href="/signin"
              style={{
                fontFamily: MONO,
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: STEEL,
                textDecoration: "none",
              }}
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              style={{
                fontFamily: SANS,
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: "0.01em",
                color: "#fbfbfc",
                backgroundColor: INK,
                border: `1px solid ${INK}`,
                borderRadius: 4,
                padding: "10px 18px",
                textDecoration: "none",
                whiteSpace: "nowrap",
                transition:
                  "background-color 150ms ease, border-color 150ms ease",
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
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.18em",
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
        <div className="mx-auto" style={{ maxWidth: "1240px" }}>
          <MarketplaceBody showCta={showCta} />

          <section style={{ marginTop: "clamp(96px, 14vw, 168px)" }}>
            <div
              style={{
                fontFamily: MONO,
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: FOG,
                marginBottom: 40,
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
                    padding: "24px 0",
                    borderBottom: `1px solid #eaedf0`,
                    borderTop: idx === 0 ? "1px solid #eaedf0" : "none",
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
                        letterSpacing: "0.2em",
                        color: FOG,
                      }}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span
                      style={{
                        fontFamily: SERIF,
                        fontWeight: 400,
                        fontSize: 19,
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
                        color: FOG,
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
                      color: SLATE,
                      lineHeight: 1.65,
                      marginTop: 18,
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
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        <Wordmark />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            fontFamily: MONO,
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: FOG,
          }}
        >
          <Link href="/contact" style={{ color: STEEL, textDecoration: "none" }}>
            Contact
          </Link>
          <Link href="/terms" style={{ color: STEEL, textDecoration: "none" }}>
            Terms
          </Link>
          <Link href="/privacy" style={{ color: STEEL, textDecoration: "none" }}>
            Privacy
          </Link>
          <span style={{ color: MIST }}>·</span>
          <span>© 2026</span>
        </div>
      </footer>
    </div>
  );
}
