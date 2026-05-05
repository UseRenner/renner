import Link from "next/link";
import { VariantSwitcher } from "./_variant-switcher";

export { VariantSwitcher };

// Faqs are stable across all preview variants — they are the same
// product. Step copy and CTA voice live inside each variant so each
// direction can speak in its own register without leaking.

export const FAQS: Array<{ q: string; a: string }> = [
  {
    q: "What is Renner?",
    a: "Renner is a marketplace built specifically for real-estate task work. Clients post short jobs — sign placement, document delivery, property prep, guest check-ins, showings — and Renners apply, get booked, and get paid through the platform. Both clients and Renners clear ID verification and a Checkr background check before they can post or book.",
  },
  {
    q: "How much does it cost?",
    a: "Renner adds a 10% service fee for clients. Renners keep 100% of the task pay. Both numbers are shown to both sides before a booking is confirmed — no hidden charges.",
  },
  {
    q: "Who is on the platform?",
    a: "People who work in real estate, or who want to. Every person — clients and Renners alike — is ID-verified and clears a background check before posting or booking. Showings and other license-required tasks additionally require a verified real-estate license on the Renner side.",
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
    a: "When you book a Renner, your card is charged and the funds are held in escrow. After the Renner submits proof of completion, you have 48 hours to confirm or open a dispute. Confirmed funds release immediately to the Renner; if the 48 hours pass with no action, payment auto-releases.",
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
  | "plate"
  | "plate-em"
  | "plate-colon"
  | "plate-plain"
  | "scene"
  | "pivot"
  | "quarter"
  | "lead"
  | "compact"
  | "center"
  | "folio"
  | "brief"
  | "bureau";

export const VARIANTS: ReadonlyArray<{ href: string; key: VariantKey; label: string }> = [
  { href: "/preview/how-it-works/bureau", key: "bureau", label: "Bureau" },
  { href: "/preview/how-it-works/lead", key: "lead", label: "Lead" },
  { href: "/preview/how-it-works/compact", key: "compact", label: "Compact" },
  { href: "/preview/how-it-works/center", key: "center", label: "Center" },
  { href: "/preview/how-it-works/folio", key: "folio", label: "Folio" },
  { href: "/preview/how-it-works/brief", key: "brief", label: "Brief" },
  { href: "/preview/how-it-works-2", key: "rail", label: "Rail" },
  { href: "/preview/how-it-works/plate", key: "plate", label: "Plate" },
  { href: "/preview/how-it-works/plate-em", key: "plate-em", label: "Plate · How to —" },
  { href: "/preview/how-it-works/plate-colon", key: "plate-colon", label: "Plate · How to:" },
  { href: "/preview/how-it-works/plate-plain", key: "plate-plain", label: "Plate · Plain" },
  { href: "/preview/how-it-works/scene", key: "scene", label: "Scene" },
  { href: "/preview/how-it-works/pivot", key: "pivot", label: "Pivot" },
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
        color: "inherit",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-source-serif), ui-serif, Georgia, serif",
          fontStyle: "italic",
          fontWeight: weight,
          fontSize: `${size}px`,
          letterSpacing: "-0.02em",
          color: "inherit",
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
const SHELL_STEEL_800 = "#38414d";
const SHELL_SLATE = "#2a2f36";
const SHELL_STEEL = "#647589";
const SHELL_FOG = "#7d8da0";
const SHELL_400 = "#a7b2be";
const SHELL_MIST = "#cad1d8";
const SHELL_RULE = "#eaedf0";
const SHELL_100 = "#eaedf0";
const SHELL_PAPER = "#fbfbfc";

export type ShellTone = "paper" | "chalk" | "mist" | "haze" | "steel" | "ink";

export function getToneVars(tone: ShellTone): React.CSSProperties {
  return TOKENS[tone] as React.CSSProperties;
}

export function isToneDark(tone: ShellTone): boolean {
  return tone === "ink" || tone === "steel" || tone === "haze";
}

// Token map per tone. Bodies reference these via var(--c-…); the
// PageShell sets the values on its outer container so a single
// prop flips every body's palette in step.
const TOKENS: Record<ShellTone, Record<string, string>> = {
  paper: {
    "--c-text": "#0d0f12",
    "--c-bg": "#fbfbfc",
    "--c-700": "#38414d",
    "--c-600": "#647589",
    "--c-500": "#7d8da0",
    "--c-300": "#cad1d8",
    "--c-rule": "#eaedf0",
    "--c-panel": "#eaedf0",
    "--c-hover": "#eaedf0",
    "--c-paper": "#fbfbfc",
    "--c-ink": "#0d0f12",
    // Illustration surface — matches paper tone
    "--ill-bg": "#fbfbfc",
    "--ill-text": "#0d0f12",
    "--ill-text-dim": "#4d5b6a",
    "--ill-text-fog": "#7d8da0",
    "--ill-border": "#cad1d8",
    "--ill-rule": "#eaedf0",
    "--ill-photo-bg": "#f6f7f9",
    "--ill-photo-text": "#a7b2be",
    "--ill-disc-bg": "#cad1d8",
    "--ill-disc-text": "#0d0f12",
    // Callout — always a high-contrast dark panel
    "--c-callout-bg": "#0d0f12",
    "--c-callout-text": "#fbfbfc",
    "--c-callout-fog": "rgba(251,251,252,0.6)",
    "--c-callout-dim": "rgba(251,251,252,0.78)",
  },
  chalk: {
    // Chalk tone — Steel 100 page (#eaedf0) with ink text. The
    // lightest non-paper tone, just a step off the page.
    "--c-text": "#0d0f12",
    "--c-bg": "#eaedf0",
    "--c-700": "#38414d",
    "--c-600": "#647589",
    "--c-500": "#7d8da0",
    "--c-300": "#cad1d8",
    "--c-rule": "#cad1d8",
    "--c-panel": "#cad1d8",
    "--c-hover": "#cad1d8",
    "--c-paper": "#fbfbfc",
    "--c-ink": "#0d0f12",
    "--ill-bg": "#eaedf0",
    "--ill-text": "#0d0f12",
    "--ill-text-dim": "#4d5b6a",
    "--ill-text-fog": "#7d8da0",
    "--ill-border": "#cad1d8",
    "--ill-rule": "#cad1d8",
    "--ill-photo-bg": "#cad1d8",
    "--ill-photo-text": "#7d8da0",
    "--ill-disc-bg": "#647589",
    "--ill-disc-text": "#fbfbfc",
    "--c-callout-bg": "#0d0f12",
    "--c-callout-text": "#fbfbfc",
    "--c-callout-fog": "rgba(251,251,252,0.6)",
    "--c-callout-dim": "rgba(251,251,252,0.78)",
  },
  mist: {
    // Mist tone — Steel 400 page (#a7b2be) with ink text. A light
    // mid-tone that sits between paper and haze.
    "--c-text": "#0d0f12",
    "--c-bg": "#a7b2be",
    "--c-700": "#38414d",
    "--c-600": "#647589",
    "--c-500": "#7d8da0",
    "--c-300": "#cad1d8",
    "--c-rule": "rgba(13,15,18,0.18)",
    "--c-panel": "#cad1d8",
    "--c-hover": "#cad1d8",
    "--c-paper": "#fbfbfc",
    "--c-ink": "#0d0f12",
    "--ill-bg": "#a7b2be",
    "--ill-text": "#0d0f12",
    "--ill-text-dim": "#38414d",
    "--ill-text-fog": "#647589",
    "--ill-border": "rgba(13,15,18,0.22)",
    "--ill-rule": "rgba(13,15,18,0.12)",
    "--ill-photo-bg": "#cad1d8",
    "--ill-photo-text": "#647589",
    "--ill-disc-bg": "#647589",
    "--ill-disc-text": "#fbfbfc",
    "--c-callout-bg": "#0d0f12",
    "--c-callout-text": "#fbfbfc",
    "--c-callout-fog": "rgba(251,251,252,0.6)",
    "--c-callout-dim": "rgba(251,251,252,0.78)",
  },
  haze: {
    // Haze tone — Steel 600 page (#647589, the brand root) with
    // paper text. Sits between paper and steel as a mid-tone.
    "--c-text": "#fbfbfc",
    "--c-bg": "#647589",
    "--c-700": "#fbfbfc",
    "--c-600": "#eaedf0",
    "--c-500": "#cad1d8",
    "--c-300": "#7d8da0",
    "--c-rule": "rgba(251,251,252,0.18)",
    "--c-panel": "#7d8da0",
    "--c-hover": "#7d8da0",
    "--c-paper": "#fbfbfc",
    "--c-ink": "#0d0f12",
    "--ill-bg": "#647589",
    "--ill-text": "#fbfbfc",
    "--ill-text-dim": "rgba(251,251,252,0.78)",
    "--ill-text-fog": "rgba(251,251,252,0.55)",
    "--ill-border": "rgba(251,251,252,0.22)",
    "--ill-rule": "rgba(251,251,252,0.12)",
    "--ill-photo-bg": "#7d8da0",
    "--ill-photo-text": "rgba(251,251,252,0.42)",
    "--ill-disc-bg": "#38414d",
    "--ill-disc-text": "#fbfbfc",
    "--c-callout-bg": "#0d0f12",
    "--c-callout-text": "#fbfbfc",
    "--c-callout-fog": "rgba(251,251,252,0.6)",
    "--c-callout-dim": "rgba(251,251,252,0.78)",
  },
  steel: {
    // Steel tone — Steel 800 page (#38414d) with paper text. A mid-
    // dark surface that reads as steel, not as nearly-paper.
    "--c-text": "#fbfbfc",
    "--c-bg": "#38414d",
    "--c-700": "#fbfbfc",
    "--c-600": "#cad1d8",
    "--c-500": "#a7b2be",
    "--c-300": "#647589",
    "--c-rule": "rgba(251,251,252,0.18)",
    "--c-panel": "#4d5b6a",
    "--c-hover": "#4d5b6a",
    "--c-paper": "#fbfbfc",
    "--c-ink": "#0d0f12",
    // Illustration follows the steel colorway — card surface stays
    // Steel 800 (matches page), defined by a paper-tinted border.
    // Photo placeholder lifts to Steel 700 so it's still legible.
    "--ill-bg": "#38414d",
    "--ill-text": "#fbfbfc",
    "--ill-text-dim": "rgba(251,251,252,0.78)",
    "--ill-text-fog": "rgba(251,251,252,0.55)",
    "--ill-border": "rgba(251,251,252,0.22)",
    "--ill-rule": "rgba(251,251,252,0.12)",
    "--ill-photo-bg": "#4d5b6a",
    "--ill-photo-text": "rgba(251,251,252,0.42)",
    "--ill-disc-bg": "#647589",
    "--ill-disc-text": "#fbfbfc",
    "--c-callout-bg": "#0d0f12",
    "--c-callout-text": "#fbfbfc",
    "--c-callout-fog": "rgba(251,251,252,0.6)",
    "--c-callout-dim": "rgba(251,251,252,0.78)",
  },
  ink: {
    "--c-text": "#fbfbfc",
    "--c-bg": "#0d0f12",
    "--c-700": "#fbfbfc",
    "--c-600": "#cad1d8",
    "--c-500": "#a7b2be",
    "--c-300": "#647589",
    "--c-rule": "rgba(251,251,252,0.18)",
    "--c-panel": "#38414d",
    "--c-hover": "#38414d",
    "--c-paper": "#fbfbfc",
    "--c-ink": "#0d0f12",
    // Illustration follows the ink colorway — card surface stays
    // ink, defined by a slightly stronger paper-tinted border so
    // the card reads as a card without lifting to a lighter shade.
    "--ill-bg": "#0d0f12",
    "--ill-text": "#fbfbfc",
    "--ill-text-dim": "rgba(251,251,252,0.78)",
    "--ill-text-fog": "rgba(251,251,252,0.55)",
    "--ill-border": "rgba(251,251,252,0.22)",
    "--ill-rule": "rgba(251,251,252,0.12)",
    "--ill-photo-bg": "#2a2f36",
    "--ill-photo-text": "rgba(251,251,252,0.42)",
    "--ill-disc-bg": "#38414d",
    "--ill-disc-text": "#fbfbfc",
    // On ink mode the callout flips polarity — lighter than page
    "--c-callout-bg": "#fbfbfc",
    "--c-callout-text": "#0d0f12",
    "--c-callout-fog": "rgba(13,15,18,0.6)",
    "--c-callout-dim": "rgba(13,15,18,0.78)",
  },
};

export function PageShell({
  active,
  showCta,
  children,
  maxWidth = 1280,
  tone = "paper",
}: {
  active: VariantKey;
  showCta: boolean;
  children: React.ReactNode;
  maxWidth?: number;
  tone?: ShellTone;
}) {
  const GUTTER = "clamp(28px, 4vw, 64px)";
  const tokens = TOKENS[tone];
  const isDark = isToneDark(tone);
  const pageBg = tokens["--c-bg"];
  const textInk = tokens["--c-text"];
  const textMuted = isDark ? "rgba(251,251,252,0.62)" : tokens["--c-700"];
  const textFog = isDark ? "rgba(251,251,252,0.42)" : tokens["--c-500"];
  const ruleColor = tokens["--c-rule"];
  const ctaBg = isDark ? SHELL_PAPER : SHELL_INK;
  const ctaFg = isDark ? SHELL_INK : SHELL_PAPER;
  const cssVars = tokens as React.CSSProperties;

  return (
    <div style={{ ...cssVars, backgroundColor: pageBg, color: textInk, minHeight: "100vh" }}>
      <VariantSwitcher active={active} />

      <header style={{ paddingTop: "clamp(28px, 3.5vw, 48px)", paddingBottom: "clamp(28px, 3.5vw, 48px)", paddingLeft: GUTTER, paddingRight: GUTTER }}>
        <div className="mx-auto" style={{ maxWidth, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <RennerMark size={36} weight={300} />
          <p style={{ fontFamily: SERIF_FONT, fontSize: 15, color: textFog, margin: 0, fontVariationSettings: '"opsz" 14', fontWeight: 375 }}>
            Have an account?{" "}
            <Link href="/signin" style={{ color: textMuted, textDecoration: "none" }}>
              Sign in
            </Link>
          </p>
        </div>
      </header>

      <main style={{ paddingTop: "clamp(24px, 3vw, 48px)", paddingBottom: "clamp(64px, 8vw, 112px)", paddingLeft: GUTTER, paddingRight: GUTTER }}>
        <div className="mx-auto" style={{ maxWidth }}>
          {children}
        </div>
      </main>

      <section style={{ paddingTop: "clamp(48px, 6vw, 80px)", paddingBottom: "clamp(96px, 12vw, 160px)", paddingLeft: GUTTER, paddingRight: GUTTER, borderTop: `1px solid ${ruleColor}` }}>
        <div className="mx-auto" style={{ maxWidth: 720 }}>
          <div style={{ fontFamily: MONO_FONT, fontSize: 10, fontWeight: 500, letterSpacing: "0.24em", textTransform: "uppercase", color: textFog, marginBottom: 40 }}>Common questions</div>
          {FAQS.map((item, idx) => (
            <details key={item.q} className="faq-item" style={{ padding: "24px 0", borderBottom: `1px solid ${ruleColor}`, borderTop: idx === 0 ? `1px solid ${ruleColor}` : "none" }}>
              <summary style={{ cursor: "pointer", listStyle: "none", display: "grid", gridTemplateColumns: "minmax(48px, 56px) 1fr auto", gap: 24, alignItems: "baseline" }}>
                <span style={{ fontFamily: MONO_FONT, fontSize: 11, fontWeight: 500, letterSpacing: "0.2em", color: textFog }}>{String(idx + 1).padStart(2, "0")}</span>
                <span style={{ fontFamily: SERIF_FONT, fontWeight: 400, fontSize: 19, lineHeight: 1.35, color: textInk, fontVariationSettings: '"opsz" 14' }}>{item.q}</span>
                <span className="faq-toggle" style={{ fontFamily: SANS_FONT, fontSize: 18, color: textFog }} aria-hidden>+</span>
              </summary>
              <p style={{ fontFamily: SERIF_FONT, fontSize: 16, color: isDark ? "rgba(251,251,252,0.78)" : tokens["--c-700"], lineHeight: 1.65, marginTop: 18, marginLeft: 80, marginBottom: 0, maxWidth: 600, fontVariationSettings: '"opsz" 14' }}>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <footer style={{ paddingTop: "clamp(20px, 2.5vw, 28px)", paddingBottom: "clamp(20px, 2.5vw, 28px)", paddingLeft: GUTTER, paddingRight: GUTTER }}>
        <div className="mx-auto" style={{ maxWidth, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <RennerMark size={28} weight={300} />
          <div style={{ display: "flex", alignItems: "center", gap: 18, fontFamily: SERIF_FONT, fontSize: 15, color: textMuted, fontVariationSettings: '"opsz" 14', fontWeight: 375 }}>
            <Link href="/contact" style={{ color: textInk, textDecoration: "none" }}>Contact</Link>
            <Link href="/terms" style={{ color: textInk, textDecoration: "none" }}>Terms</Link>
            <Link href="/privacy" style={{ color: textInk, textDecoration: "none" }}>Privacy</Link>
            <span>·</span>
            <span>© 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
