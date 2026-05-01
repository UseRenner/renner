import Link from "next/link";
import { VariantSwitcher } from "./_variant-switcher";

export { VariantSwitcher };

// Faqs are stable across all preview variants — they are the same
// product. Step copy and CTA voice live inside each variant so each
// direction can speak in its own register without leaking.

export const FAQS: Array<{ q: string; a: string }> = [
  {
    q: "What is Renner?",
    a: "Renner is a marketplace built specifically for real-estate task work. Clients post short jobs — sign placement, document delivery, property prep, guest check-ins, showings — and Renners apply, get booked, and get paid through the platform. Both clients and Renners are ID-verified and background-checked before they can post or book.",
  },
  {
    q: "How much does it cost?",
    a: "Renner adds a 10% service fee for clients. Renners keep 100% of the task pay. Both numbers are shown to both parties before a booking is confirmed — no hidden charges.",
  },
  {
    q: "Who is on the platform?",
    a: "People who work in real estate, or who want to. Every party — clients and Renners alike — is ID-verified and clears a Checkr background check before posting or booking. Showings and other license-required tasks additionally require a verified real-estate license on the Renner side.",
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

export type VariantKey =
  | "rail"
  | "atelier"
  | "plate"
  | "marketplace"
  | "network"
  | "showcase"
  | "frame"
  | "scene"
  | "mast"
  | "pivot"
  | "tape"
  | "fold"
  | "cinema"
  | "anchor"
  | "quarter"
  | "lead"
  | "stack"
  | "top"
  | "compact"
  | "center";

export const VARIANTS: ReadonlyArray<{ href: string; key: VariantKey; label: string }> = [
  { href: "/preview/how-it-works/lead", key: "lead", label: "Lead" },
  { href: "/preview/how-it-works/stack", key: "stack", label: "Stack" },
  { href: "/preview/how-it-works/top", key: "top", label: "Top" },
  { href: "/preview/how-it-works/compact", key: "compact", label: "Compact" },
  { href: "/preview/how-it-works/center", key: "center", label: "Center" },
  { href: "/preview/how-it-works-2", key: "rail", label: "Rail" },
  { href: "/preview/how-it-works/atelier", key: "atelier", label: "Atelier" },
  { href: "/preview/how-it-works/plate", key: "plate", label: "Plate" },
  { href: "/preview/how-it-works/marketplace", key: "marketplace", label: "Marketplace" },
  { href: "/preview/how-it-works/network", key: "network", label: "Network" },
  { href: "/preview/how-it-works/showcase", key: "showcase", label: "Showcase" },
  { href: "/preview/how-it-works/frame", key: "frame", label: "Frame" },
  { href: "/preview/how-it-works/scene", key: "scene", label: "Scene" },
  { href: "/preview/how-it-works/mast", key: "mast", label: "Mast" },
  { href: "/preview/how-it-works/pivot", key: "pivot", label: "Pivot" },
  { href: "/preview/how-it-works/tape", key: "tape", label: "Tape" },
  { href: "/preview/how-it-works/fold", key: "fold", label: "Fold" },
  { href: "/preview/how-it-works/cinema", key: "cinema", label: "Cinema" },
  { href: "/preview/how-it-works/anchor", key: "anchor", label: "Anchor" },
  { href: "/preview/how-it-works/quarter", key: "quarter", label: "Quarter" },
];

// The canonical Renner wordmark across every preview variant:
// lowercase italic Source Serif 4, weight 300, no symbol. Pass `size`
// to scale the wordmark in headers, footers, mastheads. The italic
// slant tracks the brand symbol's 12° tilt so even when the disc
// isn't on the page its geometry is in every letter.
export function RennerMark({
  size = 36,
  weight = 300,
}: {
  size?: number;
  weight?: number;
}) {
  return (
    <Link
      href="/"
      aria-label="renner"
      style={{
        display: "inline-flex",
        alignItems: "center",
        textDecoration: "none",
        color: "#0d0f12",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-source-serif), ui-serif, Georgia, serif",
          fontStyle: "italic",
          fontWeight: weight,
          fontSize: `${size}px`,
          letterSpacing: "-0.02em",
          color: "#0d0f12",
          lineHeight: 1,
          fontVariationSettings: '"opsz" 60',
        }}
      >
        renner
      </span>
    </Link>
  );
}

// A thin review-only strip that lets the reviewer flip between the
// preview directions. Now lives as a floating, almost-invisible
// pill at the bottom-right of the viewport — see _variant-switcher.tsx.

// A unified page shell so every variant shares one horizontal datum:
// the wordmark, body content, FAQ, and footer all align to the same
// left edge at every viewport, set by `gutter` (matches the wordmark
// padding) and capped by `maxWidth` (1280 across the system).
//
// The body's children are dropped into the main slot. The FAQ is
// constrained to a 720px reading column but left-aligned within the
// page's max-width so its left edge matches the wordmark.

const SERIF_FONT = "var(--font-source-serif), ui-serif, Georgia, serif";
const SANS_FONT = "var(--font-source-sans), ui-sans-serif, system-ui, sans-serif";
const MONO_FONT = "var(--font-source-code), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const SHELL_INK = "#0d0f12";
const SHELL_SLATE = "#2a2f36";
const SHELL_STEEL = "#647589";
const SHELL_FOG = "#7d8da0";
const SHELL_MIST = "#cad1d8";
const SHELL_RULE = "#eaedf0";
const SHELL_PAPER = "#fbfbfc";

export function PageShell({
  active,
  showCta,
  children,
  maxWidth = 1280,
}: {
  active: VariantKey;
  showCta: boolean;
  children: React.ReactNode;
  maxWidth?: number;
}) {
  const GUTTER = "clamp(28px, 4vw, 64px)";
  return (
    <div style={{ backgroundColor: SHELL_PAPER, color: SHELL_INK, minHeight: "100vh" }}>
      <VariantSwitcher active={active} />

      <header style={{ paddingTop: "clamp(28px, 3.5vw, 48px)", paddingBottom: "clamp(28px, 3.5vw, 48px)", paddingLeft: GUTTER, paddingRight: GUTTER }}>
        <div className="mx-auto" style={{ maxWidth, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <RennerMark />
          {showCta ? (
            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
              <Link href="/signin" style={{ fontFamily: SANS_FONT, fontSize: 13, fontWeight: 500, color: SHELL_STEEL, textDecoration: "none" }}>Sign in</Link>
              <Link href="/signup" style={{ fontFamily: SANS_FONT, fontSize: 13, fontWeight: 500, color: SHELL_PAPER, backgroundColor: SHELL_INK, border: `1px solid ${SHELL_INK}`, borderRadius: 4, padding: "10px 18px", textDecoration: "none", whiteSpace: "nowrap" }}>Sign up</Link>
            </div>
          ) : (
            <Link href="/dashboard" style={{ fontFamily: SANS_FONT, fontSize: 13, fontWeight: 500, color: SHELL_INK, textDecoration: "none" }}>Dashboard →</Link>
          )}
        </div>
      </header>

      <main style={{ paddingTop: "clamp(40px, 6vw, 80px)", paddingBottom: "clamp(64px, 8vw, 112px)", paddingLeft: GUTTER, paddingRight: GUTTER }}>
        <div className="mx-auto" style={{ maxWidth }}>
          {children}
        </div>
      </main>

      <section style={{ paddingTop: "clamp(48px, 6vw, 80px)", paddingBottom: "clamp(96px, 12vw, 160px)", paddingLeft: GUTTER, paddingRight: GUTTER, borderTop: `1px solid ${SHELL_RULE}` }}>
        <div className="mx-auto" style={{ maxWidth: 720 }}>
          <div style={{ fontFamily: MONO_FONT, fontSize: 10, fontWeight: 500, letterSpacing: "0.24em", textTransform: "uppercase", color: SHELL_FOG, marginBottom: 40 }}>Common questions</div>
          {FAQS.map((item, idx) => (
            <details key={item.q} className="faq-item" style={{ padding: "24px 0", borderBottom: `1px solid ${SHELL_RULE}`, borderTop: idx === 0 ? `1px solid ${SHELL_RULE}` : "none" }}>
              <summary style={{ cursor: "pointer", listStyle: "none", display: "grid", gridTemplateColumns: "minmax(48px, 56px) 1fr auto", gap: 24, alignItems: "baseline" }}>
                <span style={{ fontFamily: MONO_FONT, fontSize: 11, fontWeight: 500, letterSpacing: "0.2em", color: SHELL_FOG }}>{String(idx + 1).padStart(2, "0")}</span>
                <span style={{ fontFamily: SERIF_FONT, fontWeight: 400, fontSize: 19, lineHeight: 1.35, color: SHELL_INK, fontVariationSettings: '"opsz" 14' }}>{item.q}</span>
                <span className="faq-toggle" style={{ fontFamily: SANS_FONT, fontSize: 18, color: SHELL_FOG }} aria-hidden>+</span>
              </summary>
              <p style={{ fontFamily: SERIF_FONT, fontSize: 16, color: SHELL_SLATE, lineHeight: 1.65, marginTop: 18, marginLeft: 80, marginBottom: 0, maxWidth: 600, fontVariationSettings: '"opsz" 14' }}>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <footer style={{ paddingTop: "clamp(40px, 5vw, 64px)", paddingBottom: "clamp(40px, 5vw, 64px)", paddingLeft: GUTTER, paddingRight: GUTTER, borderTop: `1px solid ${SHELL_RULE}` }}>
        <div className="mx-auto" style={{ maxWidth, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
          <RennerMark />
          <div style={{ display: "flex", alignItems: "center", gap: 24, fontFamily: MONO_FONT, fontSize: 10, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: SHELL_FOG }}>
            <Link href="/contact" style={{ color: SHELL_STEEL, textDecoration: "none" }}>Contact</Link>
            <Link href="/terms" style={{ color: SHELL_STEEL, textDecoration: "none" }}>Terms</Link>
            <Link href="/privacy" style={{ color: SHELL_STEEL, textDecoration: "none" }}>Privacy</Link>
            <span style={{ color: SHELL_MIST }}>·</span>
            <span>© 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
