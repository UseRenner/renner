import Link from "next/link";
import { Wordmark } from "@/components/Wordmark";
import { getViewer } from "@/lib/role";
import { VariantSwitcher } from "../how-it-works/_shared";
import { SpreadBody } from "./SpreadBody";

export const metadata = {
  title: "How it works · Pane · Renner",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

const SERIF = "var(--font-source-serif), ui-serif, Georgia, serif";
const SANS =
  "var(--font-source-sans), ui-sans-serif, system-ui, sans-serif";
const MONO =
  "var(--font-source-code), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const INK = "#0d0f12";
const STEEL = "#647589";
const FOG = "#7d8da0";
const MIST = "#cad1d8";

export default async function PreviewHowItWorksSpread() {
  const viewer = await getViewer();
  const showCta = !viewer;

  return (
    <div style={{ backgroundColor: "#fbfbfc", color: INK, minHeight: "100vh" }}>
      <VariantSwitcher active="pane" />
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
                padding: "9px 16px",
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
          padding: "clamp(56px, 7vw, 112px) clamp(28px, 4vw, 64px)",
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        <SpreadBody showCta={showCta} />
      </main>

      <footer
        style={{
          padding: "32px clamp(28px, 4vw, 64px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 20,
          borderTop: `1px solid #eaedf0`,
          marginTop: "clamp(64px, 8vw, 120px)",
        }}
      >
        <Wordmark />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            fontFamily: MONO,
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: FOG,
          }}
        >
          <Link
            href="/contact"
            style={{ color: STEEL, textDecoration: "none" }}
          >
            Contact
          </Link>
          <Link
            href="/terms"
            style={{ color: STEEL, textDecoration: "none" }}
          >
            Terms
          </Link>
          <Link
            href="/privacy"
            style={{ color: STEEL, textDecoration: "none" }}
          >
            Privacy
          </Link>
          <span style={{ color: MIST }}>·</span>
          <span>© 2026</span>
        </div>
      </footer>
    </div>
  );
}
