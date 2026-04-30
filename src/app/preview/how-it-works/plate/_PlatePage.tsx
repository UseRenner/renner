import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Wordmark } from "@/components/Wordmark";
import { getViewer } from "@/lib/role";
import { FAQS, VariantSwitcher, type PlateMarkKey } from "../_shared";
import { PlateBody } from "./PlateBody";

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

// MarkLockup renders the brand mark for the header / footer per the
// active treatment. Twelve options span title-case, all-caps, paired,
// standalone, large, and small registers — all within Source Serif,
// Source Sans, and Source Code Pro.
function MarkLockup({ mark }: { mark: PlateMarkKey }) {
  // ─── Symbol only ─── disc alone, large
  if (mark === "symbol") {
    return (
      <Link
        href="/"
        aria-label="Renner"
        style={{ display: "inline-flex", alignItems: "center" }}
      >
        <Logo size={44} fill={INK} slotColor={PAPER} />
      </Link>
    );
  }

  // ─── Standalone wordmarks ─── no symbol
  if (mark === "italic-only") {
    return (
      <Link
        href="/"
        aria-label="Renner"
        style={{ display: "inline-flex", alignItems: "center", textDecoration: "none", color: INK }}
      >
        <span
          style={{
            fontFamily: SERIF,
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: 40,
            letterSpacing: "-0.015em",
            color: INK,
            lineHeight: 1,
            fontVariationSettings: '"opsz" 36',
          }}
        >
          Renner
        </span>
      </Link>
    );
  }

  // ─── Lowercase italic, no symbol ─── the open-territory move:
  // lowercase tier in real estate is uniformly sans (realtor.com,
  // redfin, trulia). Lowercase italic serif is unoccupied and pairs
  // with the mark's 12° italic-axis tilt and Renner's motion concept.
  // At weight 300 the wordmark reads as if it were dashed off, not
  // set — effort drops out of it.
  if (mark === "lowercase-italic-only") {
    return (
      <Link
        href="/"
        aria-label="renner"
        style={{ display: "inline-flex", alignItems: "center", textDecoration: "none", color: INK }}
      >
        <span
          style={{
            fontFamily: SERIF,
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: 48,
            letterSpacing: "-0.02em",
            color: INK,
            lineHeight: 1,
            fontVariationSettings: '"opsz" 144',
          }}
        >
          renner
        </span>
      </Link>
    );
  }

  // Same wordmark, weight 200 — extralight. Closer to handwriting,
  // furthest from "set." May be too thin at small sizes; included for
  // comparison.
  if (mark === "lowercase-italic-only-200") {
    return (
      <Link
        href="/"
        aria-label="renner"
        style={{ display: "inline-flex", alignItems: "center", textDecoration: "none", color: INK }}
      >
        <span
          style={{
            fontFamily: SERIF,
            fontStyle: "italic",
            fontWeight: 200,
            fontSize: 48,
            letterSpacing: "-0.02em",
            color: INK,
            lineHeight: 1,
            fontVariationSettings: '"opsz" 144',
          }}
        >
          renner
        </span>
      </Link>
    );
  }

  if (mark === "sans-caps-only") {
    return (
      <Link
        href="/"
        aria-label="Renner"
        style={{ display: "inline-flex", alignItems: "center", textDecoration: "none", color: INK }}
      >
        <span
          style={{
            fontFamily: SANS,
            fontWeight: 500,
            fontSize: 16,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: INK,
            lineHeight: 1,
          }}
        >
          Renner
        </span>
      </Link>
    );
  }

  if (mark === "tiny-mono") {
    return (
      <Link
        href="/"
        aria-label="Renner"
        style={{ display: "inline-flex", alignItems: "center", textDecoration: "none", color: INK }}
      >
        <span
          style={{
            fontFamily: MONO,
            fontWeight: 500,
            fontSize: 11,
            letterSpacing: "0.36em",
            textTransform: "uppercase",
            color: INK,
            lineHeight: 1,
          }}
        >
          Renner
        </span>
      </Link>
    );
  }

  if (mark === "massive-serif") {
    return (
      <Link
        href="/"
        aria-label="Renner"
        style={{ display: "inline-flex", alignItems: "center", textDecoration: "none", color: INK }}
      >
        <span
          style={{
            fontFamily: SERIF,
            fontWeight: 400,
            fontSize: 56,
            letterSpacing: "-0.035em",
            color: INK,
            lineHeight: 1,
            fontVariationSettings: '"opsz" 144',
          }}
        >
          Renner
        </span>
      </Link>
    );
  }

  // ─── Paired lockups ─── symbol + wordmark
  if (mark === "serif") {
    return <Wordmark size={32} />;
  }

  // Italic serif paired
  if (mark === "italic") {
    return (
      <Link
        href="/"
        aria-label="Renner"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 16,
          textDecoration: "none",
          color: INK,
        }}
      >
        <Logo size={34} fill={INK} slotColor={PAPER} />
        <span
          style={{
            fontFamily: SERIF,
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: 34,
            letterSpacing: "-0.015em",
            color: INK,
            lineHeight: 1,
            fontVariationSettings: '"opsz" 36',
          }}
        >
          Renner
        </span>
      </Link>
    );
  }

  // Lowercase italic serif paired — disc + lowercase wordmark. The
  // symbol's 12° tilt and the wordmark's italic slant move together.
  // Weight 300 — the lockup reads handed-off rather than set.
  if (mark === "lowercase-italic") {
    return (
      <Link
        href="/"
        aria-label="renner"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 16,
          textDecoration: "none",
          color: INK,
        }}
      >
        <Logo size={36} fill={INK} slotColor={PAPER} />
        <span
          style={{
            fontFamily: SERIF,
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: 38,
            letterSpacing: "-0.018em",
            color: INK,
            lineHeight: 1,
            fontVariationSettings: '"opsz" 60',
          }}
        >
          renner
        </span>
      </Link>
    );
  }

  // Same lockup, weight 200 — the extralight test.
  if (mark === "lowercase-italic-200") {
    return (
      <Link
        href="/"
        aria-label="renner"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 16,
          textDecoration: "none",
          color: INK,
        }}
      >
        <Logo size={36} fill={INK} slotColor={PAPER} />
        <span
          style={{
            fontFamily: SERIF,
            fontStyle: "italic",
            fontWeight: 200,
            fontSize: 38,
            letterSpacing: "-0.018em",
            color: INK,
            lineHeight: 1,
            fontVariationSettings: '"opsz" 60',
          }}
        >
          renner
        </span>
      </Link>
    );
  }

  // Sans paired
  if (mark === "sans") {
    return (
      <Link
        href="/"
        aria-label="Renner"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 16,
          textDecoration: "none",
          color: INK,
        }}
      >
        <Logo size={34} fill={INK} slotColor={PAPER} />
        <span
          style={{
            fontFamily: SANS,
            fontWeight: 500,
            fontSize: 32,
            letterSpacing: "-0.025em",
            color: INK,
            lineHeight: 1,
          }}
        >
          Renner
        </span>
      </Link>
    );
  }

  // Mono paired
  if (mark === "mono") {
    return (
      <Link
        href="/"
        aria-label="Renner"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 16,
          textDecoration: "none",
          color: INK,
        }}
      >
        <Logo size={32} fill={INK} slotColor={PAPER} />
        <span
          style={{
            fontFamily: MONO,
            fontWeight: 500,
            fontSize: 22,
            letterSpacing: "0.02em",
            color: INK,
            lineHeight: 1,
          }}
        >
          Renner
        </span>
      </Link>
    );
  }

  // ─── Caps treatments ─── paired
  if (mark === "serif-caps") {
    return (
      <Link
        href="/"
        aria-label="Renner"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 16,
          textDecoration: "none",
          color: INK,
        }}
      >
        <Logo size={34} fill={INK} slotColor={PAPER} />
        <span
          style={{
            fontFamily: SERIF,
            fontWeight: 500,
            fontSize: 24,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: INK,
            lineHeight: 1,
            fontVariationSettings: '"opsz" 36',
          }}
        >
          Renner
        </span>
      </Link>
    );
  }

  if (mark === "sans-caps") {
    return (
      <Link
        href="/"
        aria-label="Renner"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 16,
          textDecoration: "none",
          color: INK,
        }}
      >
        <Logo size={34} fill={INK} slotColor={PAPER} />
        <span
          style={{
            fontFamily: SANS,
            fontWeight: 500,
            fontSize: 22,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: INK,
            lineHeight: 1,
          }}
        >
          Renner
        </span>
      </Link>
    );
  }

  if (mark === "mono-caps") {
    return (
      <Link
        href="/"
        aria-label="Renner"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 16,
          textDecoration: "none",
          color: INK,
        }}
      >
        <Logo size={32} fill={INK} slotColor={PAPER} />
        <span
          style={{
            fontFamily: MONO,
            fontWeight: 500,
            fontSize: 18,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: INK,
            lineHeight: 1,
          }}
        >
          Renner
        </span>
      </Link>
    );
  }

  return null;
}

export async function PlatePage({ mark }: { mark: PlateMarkKey }) {
  const viewer = await getViewer();
  const showCta = !viewer;

  return (
    <div style={{ backgroundColor: PAPER, color: INK, minHeight: "100vh" }}>
      <VariantSwitcher active="plate" plateMark={mark} />

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
        <MarkLockup mark={mark} />
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
          <PlateBody showCta={showCta} />

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
        <MarkLockup mark={mark} />
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
