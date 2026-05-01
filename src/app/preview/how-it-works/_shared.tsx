import Link from "next/link";

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
  | "atlas"
  | "letter"
  | "hours"
  | "triptych"
  | "watermark"
  | "pair";

export const VARIANTS: ReadonlyArray<{ href: string; key: VariantKey; label: string }> = [
  { href: "/preview/how-it-works/atlas", key: "atlas", label: "Atlas" },
  { href: "/preview/how-it-works/letter", key: "letter", label: "Letter" },
  { href: "/preview/how-it-works/hours", key: "hours", label: "Hours" },
  { href: "/preview/how-it-works/triptych", key: "triptych", label: "Triptych" },
  { href: "/preview/how-it-works/watermark", key: "watermark", label: "Watermark" },
  { href: "/preview/how-it-works/pair", key: "pair", label: "Pair" },
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
// preview directions. Lives outside the design itself — sticky to
// the top in mono with hairline rules — so it never fights the page
// it sits above. Wraps on narrow viewports.
export function VariantSwitcher({ active }: { active: VariantKey }) {
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backgroundColor: "rgba(13,15,18,0.94)",
        backdropFilter: "saturate(140%) blur(8px)",
        WebkitBackdropFilter: "saturate(140%) blur(8px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          padding: "10px clamp(20px, 4vw, 64px)",
          fontFamily:
            "var(--font-source-code), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
          fontSize: 10,
          fontWeight: 500,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.55)",
          flexWrap: "wrap",
        }}
      >
        <span>Preview · How it works</span>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          {VARIANTS.map((v, i) => {
            const isActive = v.key === active;
            return (
              <span
                key={v.href}
                style={{ display: "inline-flex", alignItems: "center", gap: 12 }}
              >
                {i > 0 && <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>}
                <Link
                  href={v.href}
                  style={{
                    color: isActive ? "#fbfbfc" : "rgba(255,255,255,0.55)",
                    textDecoration: "none",
                    transition: "color 150ms ease",
                  }}
                >
                  {v.label}
                </Link>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
