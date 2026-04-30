import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Wordmark } from "@/components/Wordmark";
import { getViewer } from "@/lib/role";
import { FAQS, VariantSwitcher, type NetworkMarkKey } from "../_shared";
import { NetworkBody } from "./NetworkBody";

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
const PAPER = "#fbfbfc";

// MarkLockup renders the brand mark for the header / footer per the
// active treatment. Serif and Italic-serif use the standard logo +
// wordmark lockup at the same size; Sans swaps the wordmark family;
// Symbol-only drops the wordmark text and bumps the disc to 30px.
function MarkLockup({ mark }: { mark: NetworkMarkKey }) {
  if (mark === "symbol") {
    return (
      <Link
        href="/"
        aria-label="Renner"
        style={{ display: "inline-flex", alignItems: "center" }}
      >
        <Logo size={30} fill={INK} slotColor={PAPER} />
      </Link>
    );
  }

  if (mark === "serif") {
    return <Wordmark />;
  }

  // Italic-serif and Sans share a custom lockup since the shared
  // Wordmark component is hard-coded to upright serif via globals.css.
  const isItalic = mark === "italic";
  return (
    <Link
      href="/"
      aria-label="Renner"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
        textDecoration: "none",
        color: INK,
      }}
    >
      <Logo size={24} fill={INK} slotColor={PAPER} />
      <span
        style={{
          fontFamily: isItalic ? SERIF : SANS,
          fontStyle: isItalic ? "italic" : "normal",
          fontWeight: isItalic ? 400 : 500,
          fontSize: isItalic ? 24 : 22,
          letterSpacing: isItalic ? "-0.01em" : "-0.02em",
          color: INK,
          lineHeight: 1,
          fontVariationSettings: isItalic ? '"opsz" 36' : undefined,
        }}
      >
        Renner
      </span>
    </Link>
  );
}

export async function NetworkPage({ mark }: { mark: NetworkMarkKey }) {
  const viewer = await getViewer();
  const showCta = !viewer;

  return (
    <div style={{ backgroundColor: PAPER, color: INK, minHeight: "100vh" }}>
      <VariantSwitcher active="network" networkMark={mark} />

      <header
        style={{
          padding: "clamp(20px, 2.5vw, 32px) clamp(28px, 4vw, 64px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <MarkLockup mark={mark} />
        {showCta ? (
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <Link
              href="/signin"
              style={{
                fontFamily: SANS,
                fontSize: 13,
                fontWeight: 500,
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
              fontFamily: SANS,
              fontSize: 13,
              fontWeight: 500,
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
        <div className="mx-auto" style={{ maxWidth: "1180px" }}>
          <NetworkBody showCta={showCta} />

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
                        fontFamily: SANS,
                        fontWeight: 500,
                        fontSize: 17,
                        lineHeight: 1.4,
                        color: INK,
                        letterSpacing: "-0.005em",
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
                      fontFamily: SANS,
                      fontSize: 15,
                      color: SLATE,
                      lineHeight: 1.65,
                      marginTop: 14,
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
        <MarkLockup mark={mark} />
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
