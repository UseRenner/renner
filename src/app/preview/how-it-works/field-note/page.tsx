import Link from "next/link";
import { Wordmark } from "@/components/Wordmark";
import { getViewer } from "@/lib/role";
import { FAQS, VariantSwitcher } from "../_shared";
import { FieldNoteBody } from "./FieldNoteBody";

export const metadata = {
  title: "How it works · Field Note · Renner",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

const SERIF = "var(--font-source-serif), ui-serif, Georgia, serif";
const SANS =
  "var(--font-source-sans), ui-sans-serif, system-ui, sans-serif";
const MONO =
  "var(--font-source-code), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const INK = "#1a1a1a";
const STEEL = "#647589";
const MUTED = "#9b9486";
const OXBLOOD = "#7a2c2c";
const RULE = "#1a1a1a";
const HAIRLINE = "rgba(26,26,26,0.16)";
const IVORY = "#f6f3ed";

export default async function FieldNoteHowItWorks() {
  const viewer = await getViewer();
  const showCta = !viewer;

  return (
    <div
      style={{
        backgroundColor: IVORY,
        color: INK,
        minHeight: "100vh",
        fontFamily: SANS,
      }}
    >
      <VariantSwitcher active="field-note" />

      {/* ─── Masthead bar ─── volume / date / sign-in */}
      <header
        style={{
          borderBottom: `1px solid ${RULE}`,
          padding: "14px clamp(20px, 4vw, 40px)",
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          gap: 16,
        }}
      >
        <span
          style={{
            fontFamily: MONO,
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: INK,
            justifySelf: "start",
          }}
        >
          Vol. I · No. 02
        </span>
        <Wordmark slotColor={IVORY} />
        <span
          style={{
            justifySelf: "end",
            display: "inline-flex",
            alignItems: "center",
            gap: 24,
          }}
        >
          {showCta ? (
            <>
              <Link
                href="/signin"
                style={{
                  fontFamily: MONO,
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: INK,
                  textDecoration: "none",
                }}
              >
                Sign in →
              </Link>
            </>
          ) : (
            <Link
              href="/dashboard"
              style={{
                fontFamily: MONO,
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: INK,
                textDecoration: "none",
              }}
            >
              Dashboard →
            </Link>
          )}
        </span>
      </header>

      {/* ─── Date strip ─── meta line under masthead */}
      <div
        style={{
          borderBottom: `1px solid ${HAIRLINE}`,
          padding: "10px clamp(20px, 4vw, 40px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          fontFamily: MONO,
          fontSize: 10,
          fontWeight: 500,
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: STEEL,
        }}
      >
        <span>A field journal for real estate</span>
        <span>Wednesday, April 29, 2026</span>
        <span>Issued from Denver</span>
      </div>

      <main
        style={{
          padding: "clamp(64px, 8vw, 112px) clamp(20px, 4vw, 40px) clamp(96px, 12vw, 160px)",
        }}
      >
        <FieldNoteBody showCta={showCta} />

        {/* ─── FAQ ─── editorial hairline accordion */}
        <section
          style={{
            maxWidth: 1100,
            margin: "clamp(96px, 12vw, 144px) auto 0",
            padding: "0 32px",
          }}
        >
          <div
            style={{
              maxWidth: 1100,
              margin: "0 auto 48px",
              display: "flex",
              alignItems: "center",
              gap: 20,
            }}
          >
            <span style={{ flex: 1, height: 1, backgroundColor: RULE }} />
            <span
              style={{
                fontFamily: SANS,
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: INK,
                whiteSpace: "nowrap",
              }}
            >
              Correspondence · Common questions
            </span>
            <span style={{ flex: 1, height: 1, backgroundColor: RULE }} />
          </div>
          <div>
            {FAQS.map((item, idx) => (
              <details
                key={item.q}
                className="faq-item"
                style={{
                  padding: "24px 0",
                  borderBottom: `1px solid ${HAIRLINE}`,
                  borderTop: idx === 0 ? `1px solid ${HAIRLINE}` : "none",
                }}
              >
                <summary
                  style={{
                    cursor: "pointer",
                    listStyle: "none",
                    display: "grid",
                    gridTemplateColumns: "minmax(56px, 64px) 1fr auto",
                    gap: 24,
                    alignItems: "baseline",
                  }}
                >
                  <span
                    style={{
                      fontFamily: SERIF,
                      fontStyle: "italic",
                      fontWeight: 300,
                      fontSize: 22,
                      color: OXBLOOD,
                      fontVariationSettings: '"opsz" 36',
                    }}
                  >
                    {idx + 1}.
                  </span>
                  <span
                    style={{
                      fontFamily: SERIF,
                      fontWeight: 500,
                      fontSize: 19,
                      lineHeight: 1.3,
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
                      color: MUTED,
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
                    fontSize: 17,
                    color: INK,
                    lineHeight: 1.65,
                    marginTop: 16,
                    marginLeft: 88,
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

      {/* ─── Colophon footer ─── set-in-Source mark */}
      <footer
        style={{
          borderTop: `1px solid ${RULE}`,
          padding: "48px clamp(20px, 4vw, 40px) 32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 20,
          fontFamily: MONO,
          fontSize: 10,
          fontWeight: 500,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: STEEL,
        }}
      >
        <span>© 2026 Renner · Denver</span>
        <span style={{ display: "inline-flex", gap: 24 }}>
          <Link href="/contact" style={{ color: INK, textDecoration: "none" }}>
            Contact
          </Link>
          <Link href="/terms" style={{ color: INK, textDecoration: "none" }}>
            Terms
          </Link>
          <Link href="/privacy" style={{ color: INK, textDecoration: "none" }}>
            Privacy
          </Link>
        </span>
        <span>Set in Source Serif 4</span>
      </footer>
    </div>
  );
}
