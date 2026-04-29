import Link from "next/link";
import { Wordmark } from "@/components/Wordmark";
import { getViewer } from "@/lib/role";
import { ArchitectBody } from "./ArchitectBody";

export const metadata = {
  title: "How it works · Renner",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

const FAQS = [
  {
    q: "What is Renner?",
    a: "Renner is a marketplace built specifically for real-estate task work. Clients post short jobs — sign placement, document delivery, property prep, guest check-ins, showings — and background-checked Renners apply, get booked, and get paid through the platform.",
  },
  {
    q: "How much does it cost?",
    a: "Renner adds a 10% service fee for clients. Renners keep 90% of the task pay. Both numbers are shown to both parties before a booking is confirmed — no hidden charges.",
  },
  {
    q: "Who can become a Renner?",
    a: "Independent contractors who can pass a background check. Every Renner clears a Checkr background check before booking any task — licensed or not. Showings and other license-required tasks additionally require a verified real-estate license.",
  },
  {
    q: "Are Renners employees?",
    a: "No. Renner is a marketplace and Renners are independent contractors. They set their own schedule, choose which tasks to apply to, and aren't directed in how the work gets done.",
  },
  {
    q: "What types of tasks can I post?",
    a: "Anything real estate — sign installs, lockbox swaps, courier runs, property prep, photo-ready setup, guest check-ins, host assistance, property access for inspectors and contractors, showings, open houses, and more. If it's a short, location-based job tied to a listing or property, it fits.",
  },
  {
    q: "How do payments work?",
    a: "When you book a Renner, your card is charged and the funds are held in escrow by Stripe. After the Renner submits proof of completion, you have 48 hours to confirm or open a dispute. Confirmed funds release immediately to the Renner; if the 48 hours pass with no action, payment auto-releases.",
  },
  {
    q: "What if something is damaged or stolen during a task?",
    a: "Document the damage with photos and file a report within 48 hours. The Renner has 48 hours to accept, counter, or dispute the claim. We facilitate resolution using completion photos and the message thread as evidence; unresolved claims escalate to Renner support.",
  },
  {
    q: "What if I need to cancel a task?",
    a: "Clients can cancel before the Renner starts — full refund, task reopens. After the Renner starts, the task pay is split 50/50. Renners can cancel before starting with no penalty; after starting the same 50/50 split applies regardless of reason.",
  },
];

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
const RULE = "#eaedf0";

export default async function PreviewHowItWorksArchitect() {
  const viewer = await getViewer();
  const showCta = !viewer;

  return (
    <div style={{ backgroundColor: "#fbfbfc", color: INK, minHeight: "100vh" }}>
      {/* ─── Header ─── sandwiched between two thin black rules ─── */}
      <header
        style={{
          padding: "clamp(16px, 2vw, 24px) clamp(28px, 4vw, 64px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          borderTop: `1px solid ${INK}`,
          borderBottom: `1px solid ${INK}`,
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
          padding: "clamp(48px, 6vw, 96px) clamp(28px, 4vw, 64px) clamp(96px, 12vw, 144px)",
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        <ArchitectBody showCta={showCta} />

        {/* ─── FAQ ─── numbered list framed by black rules ─── */}
        <div
          style={{
            marginTop: "clamp(96px, 12vw, 144px)",
            borderTop: `1px solid ${INK}`,
            paddingTop: "clamp(40px, 5vw, 64px)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(180px, 220px) 1fr",
              gap: "clamp(24px, 4vw, 56px)",
              alignItems: "baseline",
              marginBottom: 40,
            }}
            className="arch-faq-header"
          >
            <div
              style={{
                fontFamily: MONO,
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: FOG,
              }}
            >
              Common questions
            </div>
            <h2
              style={{
                fontFamily: SERIF,
                fontWeight: 400,
                fontSize: "clamp(28px, 3.5vw, 40px)",
                lineHeight: 1.1,
                letterSpacing: "-0.022em",
                color: INK,
                margin: 0,
                fontVariationSettings: '"opsz" 72',
              }}
            >
              Everything else.
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(180px, 220px) 1fr",
              gap: "clamp(24px, 4vw, 56px)",
              alignItems: "start",
            }}
            className="arch-faq-body"
          >
            <div aria-hidden />
            <div>
              {FAQS.map((item, idx) => (
                <details
                  key={item.q}
                  className="faq-item"
                  style={{
                    padding: "22px 0",
                    borderTop: idx === 0 ? `1px solid ${RULE}` : "none",
                    borderBottom: `1px solid ${RULE}`,
                  }}
                >
                  <summary
                    style={{
                      cursor: "pointer",
                      listStyle: "none",
                      display: "grid",
                      gridTemplateColumns: "minmax(48px, 56px) 1fr auto",
                      gap: 20,
                      alignItems: "baseline",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: MONO,
                        fontSize: 11,
                        fontWeight: 500,
                        letterSpacing: "0.22em",
                        color: FOG,
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
                        fontSize: 16,
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
                      lineHeight: 1.6,
                      marginTop: 14,
                      marginLeft: 76,
                      marginBottom: 0,
                      maxWidth: 640,
                      fontVariationSettings: '"opsz" 14',
                    }}
                  >
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 880px) {
            .arch-faq-header,
            .arch-faq-body {
              grid-template-columns: 1fr !important;
              gap: 20px !important;
            }
            .arch-faq-body > :first-child {
              display: none;
            }
          }
        `}</style>
      </main>

      {/* ─── Footer ─── sandwiched between thin black rules ─── */}
      <footer
        style={{
          padding: "clamp(16px, 2vw, 24px) clamp(28px, 4vw, 64px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 20,
          borderTop: `1px solid ${INK}`,
          borderBottom: `1px solid ${INK}`,
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
