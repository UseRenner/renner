import Link from "next/link";

// Faqs are stable across all three preview variants — they are the
// same product. Step copy and CTA voice live inside each variant so
// each direction can speak in its own register without leaking.

export const FAQS: Array<{ q: string; a: string }> = [
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

export type VariantKey =
  | "direct"
  | "brief"
  | "verse"
  | "chapter"
  | "rail";

export const VARIANTS: ReadonlyArray<{ href: string; key: VariantKey; label: string }> = [
  { href: "/preview/how-it-works", key: "direct", label: "Direct" },
  { href: "/preview/how-it-works/brief", key: "brief", label: "Brief" },
  { href: "/preview/how-it-works/verse", key: "verse", label: "Verse" },
  { href: "/preview/how-it-works/chapter", key: "chapter", label: "Chapter" },
  { href: "/preview/how-it-works-2", key: "rail", label: "Rail" },
];

// Brief-only secondary row. The original Brief lives at the root
// `/brief` URL and is keyed `source-serif` here so the active state
// tracks correctly across the font test set. The 8 fonts are siblings
// at /brief/<slug>.
export type BriefFontKey =
  | "source-serif"
  | "inria-serif"
  | "roboto-serif"
  | "noto-serif"
  | "pt-serif"
  | "charis-sil"
  | "dm-serif"
  | "judson"
  | "castoro";

export const BRIEF_FONTS: ReadonlyArray<{
  href: string;
  key: BriefFontKey;
  label: string;
}> = [
  { href: "/preview/how-it-works/brief", key: "source-serif", label: "Source Serif" },
  { href: "/preview/how-it-works/brief/inria-serif", key: "inria-serif", label: "Inria Serif" },
  { href: "/preview/how-it-works/brief/roboto-serif", key: "roboto-serif", label: "Roboto Serif" },
  { href: "/preview/how-it-works/brief/noto-serif", key: "noto-serif", label: "Noto Serif" },
  { href: "/preview/how-it-works/brief/pt-serif", key: "pt-serif", label: "PT Serif" },
  { href: "/preview/how-it-works/brief/charis-sil", key: "charis-sil", label: "Charis SIL" },
  { href: "/preview/how-it-works/brief/dm-serif", key: "dm-serif", label: "DM Serif" },
  { href: "/preview/how-it-works/brief/judson", key: "judson", label: "Judson" },
  { href: "/preview/how-it-works/brief/castoro", key: "castoro", label: "Castoro" },
];

// A thin review-only strip that lets the reviewer flip between the
// preview directions. Lives outside the design itself — sticky to the
// top in mono with hairline rules — so it never fights the page it
// sits above. Wraps on narrow viewports.
//
// When `briefFont` is provided the strip shows a secondary row of the
// 8 font test variants and highlights the active font.
export function VariantSwitcher({
  active,
  briefFont,
}: {
  active: VariantKey;
  briefFont?: BriefFontKey;
}) {
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

      {briefFont !== undefined && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            padding: "8px clamp(20px, 4vw, 64px)",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            fontFamily:
              "var(--font-source-code), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)",
            flexWrap: "wrap",
          }}
        >
          <span>Brief · Font</span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            {BRIEF_FONTS.map((f, i) => {
              const isActive = f.key === briefFont;
              return (
                <span
                  key={f.href}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  {i > 0 && (
                    <span style={{ color: "rgba(255,255,255,0.18)" }}>·</span>
                  )}
                  <Link
                    href={f.href}
                    style={{
                      color: isActive ? "#fbfbfc" : "rgba(255,255,255,0.42)",
                      textDecoration: "none",
                      transition: "color 150ms ease",
                    }}
                  >
                    {f.label}
                  </Link>
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
