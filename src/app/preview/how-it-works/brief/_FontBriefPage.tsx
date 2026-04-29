import Link from "next/link";
import { Logo } from "@/components/Logo";
import { getViewer } from "@/lib/role";
import { FAQS, VariantSwitcher, type BriefFontKey } from "../_shared";
import { FontBriefBody, type FontStack } from "./_FontBriefBody";

const INK = "#0d0f12";
const SLATE = "#2a2f36";
const STEEL = "#647589";
const FOG = "#7d8da0";
const MIST = "#cad1d8";
const PAPER = "#fbfbfc";

// Server-side wrapper for the 8 font test variants. Renders the full
// Brief page chrome — header, body, FAQ, footer — with every typeface
// inherited from the FontStack the variant page passes in. The
// wordmark text is drawn inline (rather than via the shared Wordmark
// component) so the variant's font controls it too.

export async function FontBriefPage({
  font,
  fontKey,
  fontVariableClass,
}: {
  font: FontStack;
  fontKey: BriefFontKey;
  fontVariableClass: string;
}) {
  const viewer = await getViewer();
  const showCta = !viewer;

  const displayWeight = font.displayWeight ?? 400;
  const bodyWeight = font.bodyWeight ?? 400;
  const labelWeight = font.labelWeight ?? 500;

  return (
    <div
      className={fontVariableClass}
      style={{
        backgroundColor: PAPER,
        color: INK,
        minHeight: "100vh",
        fontFamily: font.body,
      }}
    >
      <VariantSwitcher active="brief" briefFont={fontKey} />

      {/* ─── Header ─── inline wordmark + sign-in / sign-up */}
      <header
        style={{
          padding: "clamp(20px, 2.5vw, 32px) clamp(28px, 4vw, 64px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            textDecoration: "none",
            color: INK,
          }}
          aria-label="Renner"
        >
          <Logo size={24} fill={INK} slotColor={PAPER} />
          <span
            style={{
              fontFamily: font.display,
              fontSize: 22,
              fontWeight: displayWeight,
              letterSpacing: "-0.02em",
              color: INK,
              lineHeight: 1,
            }}
          >
            Renner
          </span>
        </Link>

        {showCta ? (
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <Link
              href="/signin"
              style={{
                fontFamily: font.body,
                fontSize: 11,
                fontWeight: labelWeight,
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
                fontFamily: font.body,
                fontSize: 13,
                fontWeight: bodyWeight,
                letterSpacing: "0.01em",
                color: PAPER,
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
              fontFamily: font.body,
              fontSize: 11,
              fontWeight: labelWeight,
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
        <div className="mx-auto" style={{ maxWidth: "960px" }}>
          <FontBriefBody showCta={showCta} font={font} />

          {/* ─── FAQ ─── quiet hairline accordion */}
          <section style={{ marginTop: "clamp(96px, 14vw, 168px)" }}>
            <div
              style={{
                fontFamily: font.body,
                fontSize: 10,
                fontWeight: labelWeight,
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
                        fontFamily: font.body,
                        fontSize: 11,
                        fontWeight: labelWeight,
                        letterSpacing: "0.2em",
                        color: FOG,
                      }}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span
                      style={{
                        fontFamily: font.body,
                        fontWeight: bodyWeight,
                        fontSize: 19,
                        lineHeight: 1.35,
                        color: INK,
                        letterSpacing: "-0.005em",
                      }}
                    >
                      {item.q}
                    </span>
                    <span
                      className="faq-toggle"
                      style={{
                        fontFamily: font.body,
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
                      fontFamily: font.body,
                      fontSize: 16,
                      color: SLATE,
                      lineHeight: 1.65,
                      marginTop: 18,
                      marginLeft: 80,
                      marginBottom: 0,
                      maxWidth: 680,
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

      {/* ─── Footer ─── inline wordmark + colophon */}
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
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            textDecoration: "none",
            color: INK,
          }}
          aria-label="Renner"
        >
          <Logo size={24} fill={INK} slotColor={PAPER} />
          <span
            style={{
              fontFamily: font.display,
              fontSize: 22,
              fontWeight: displayWeight,
              letterSpacing: "-0.02em",
              color: INK,
              lineHeight: 1,
            }}
          >
            Renner
          </span>
        </Link>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            fontFamily: font.body,
            fontSize: 10,
            fontWeight: labelWeight,
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
