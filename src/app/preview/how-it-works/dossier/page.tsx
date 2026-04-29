import Link from "next/link";
import { Wordmark } from "@/components/Wordmark";
import { getViewer } from "@/lib/role";
import { FAQS, VariantSwitcher } from "../_shared";
import { DossierBody } from "./DossierBody";

export const metadata = {
  title: "How it works · Dossier · Renner",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

const SERIF = "var(--font-source-serif), ui-serif, Georgia, serif";
const SANS =
  "var(--font-source-sans), ui-sans-serif, system-ui, sans-serif";
const MONO =
  "var(--font-source-code), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const INK = "#0d0f12";
const SLATE = "#3a414a";
const STEEL = "#5b6878";
const FOG = "#8a93a0";
const RULE = "#0d0f12";
const HAIRLINE = "rgba(13,15,18,0.14)";
const PAPER = "#ffffff";

export default async function DossierHowItWorks() {
  const viewer = await getViewer();
  const showCta = !viewer;

  return (
    <div
      style={{
        backgroundColor: PAPER,
        color: INK,
        minHeight: "100vh",
        fontFamily: SANS,
      }}
    >
      <VariantSwitcher active="dossier" />

      {/* ─── Letterhead ─── ruled top with wordmark + meta */}
      <header style={{ borderBottom: `1px solid ${RULE}` }}>
        <div
          style={{
            maxWidth: 1080,
            margin: "0 auto",
            padding: "20px clamp(20px, 4vw, 48px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <Wordmark slotColor={PAPER} />
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
              color: STEEL,
            }}
          >
            {showCta ? (
              <>
                <Link
                  href="/signin"
                  style={{ color: INK, textDecoration: "none" }}
                >
                  Sign in
                </Link>
                <span aria-hidden style={{ color: FOG }}>
                  ·
                </span>
                <Link
                  href="/signup"
                  style={{ color: INK, textDecoration: "none" }}
                >
                  Sign up →
                </Link>
              </>
            ) : (
              <Link
                href="/dashboard"
                style={{ color: INK, textDecoration: "none" }}
              >
                Dashboard →
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* ─── Sub-letterhead strip ─── */}
      <div
        style={{
          borderBottom: `1px solid ${HAIRLINE}`,
          padding: "10px 0",
        }}
      >
        <div
          style={{
            maxWidth: 1080,
            margin: "0 auto",
            padding: "0 clamp(20px, 4vw, 48px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            fontFamily: MONO,
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: FOG,
          }}
        >
          <span>Renner, Inc. · Operations</span>
          <span>Real estate · Task work</span>
          <span>Denver · Continuous</span>
        </div>
      </div>

      <main
        style={{
          padding:
            "clamp(56px, 8vw, 96px) 0 clamp(96px, 12vw, 160px)",
        }}
      >
        <DossierBody showCta={showCta} />

        {/* ─── Appendix · FAQ ─── */}
        <section
          style={{
            maxWidth: 1080,
            margin: "clamp(96px, 12vw, 144px) auto 0",
            padding: "0 clamp(20px, 4vw, 48px)",
          }}
        >
          <div
            style={{
              fontFamily: MONO,
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: FOG,
              marginBottom: 16,
            }}
          >
            Appendix · A
          </div>
          <h2
            style={{
              fontFamily: SERIF,
              fontWeight: 400,
              fontSize: "clamp(28px, 3vw, 36px)",
              lineHeight: 1.1,
              letterSpacing: "-0.022em",
              color: INK,
              margin: 0,
              marginBottom: 40,
              fontVariationSettings: '"opsz" 60',
            }}
          >
            Common questions.
          </h2>
          <div>
            {FAQS.map((item, idx) => (
              <details
                key={item.q}
                className="faq-item"
                style={{
                  padding: "20px 0",
                  borderTop:
                    idx === 0 ? `1px solid ${RULE}` : `1px solid ${HAIRLINE}`,
                  borderBottom:
                    idx === FAQS.length - 1 ? `1px solid ${RULE}` : "none",
                }}
              >
                <summary
                  style={{
                    cursor: "pointer",
                    listStyle: "none",
                    display: "grid",
                    gridTemplateColumns: "minmax(60px, 72px) 1fr auto",
                    gap: 24,
                    alignItems: "baseline",
                  }}
                >
                  <span
                    style={{
                      fontFamily: MONO,
                      fontSize: 11,
                      fontWeight: 500,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: FOG,
                    }}
                  >
                    A.{idx + 1}
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
                    marginTop: 16,
                    marginLeft: 96,
                    marginBottom: 0,
                    maxWidth: 720,
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

      {/* ─── Signature footer ─── */}
      <footer
        style={{
          borderTop: `1px solid ${RULE}`,
          padding: "32px 0",
        }}
      >
        <div
          style={{
            maxWidth: 1080,
            margin: "0 auto",
            padding: "0 clamp(20px, 4vw, 48px)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 20,
            flexWrap: "wrap",
            fontFamily: MONO,
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: STEEL,
          }}
        >
          <span>© 2026 Renner, Inc. · Issued from Denver</span>
          <span style={{ display: "inline-flex", gap: 24 }}>
            <Link
              href="/contact"
              style={{ color: INK, textDecoration: "none" }}
            >
              Contact
            </Link>
            <Link
              href="/terms"
              style={{ color: INK, textDecoration: "none" }}
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              style={{ color: INK, textDecoration: "none" }}
            >
              Privacy
            </Link>
          </span>
          <span>Document · 01 / 01</span>
        </div>
      </footer>
    </div>
  );
}
