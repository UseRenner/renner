import Link from "next/link";
import { Logo } from "./Logo";

// Wordmark + logo lockup. The Logo sits to the left of the wordmark
// at 24px with a 12px gap. The wordmark size defaults to 22px to
// match the lockup sizing in the spec; pass a different size to
// scale both pieces together.
//
// `tone` toggles dark- vs light-on-* variants:
//   - "dark"  → black disc, light slot (default; pass slotColor to
//              match a non-default page background like #f6f7f9).
//   - "light" → light disc, dark slot (footer / dark backgrounds).

export function Wordmark({
  size = 22,
  tone = "dark",
  slotColor,
}: {
  size?: number;
  tone?: "dark" | "light";
  slotColor?: string;
}) {
  const logoFill = tone === "light" ? "#fbfbfc" : "#0d0f12";
  const resolvedSlot = slotColor ?? (tone === "light" ? "#0d0f12" : "#fbfbfc");
  const wordColor = tone === "light" ? "#fbfbfc" : "#0d0f12";

  return (
    <Link
      href="/"
      className="inline-flex items-center"
      style={{
        gap: "12px",
        textDecoration: "none",
        color: wordColor,
      }}
      aria-label="Renner"
    >
      <Logo size={24} fill={logoFill} slotColor={resolvedSlot} />
      <span
        className="wordmark"
        style={{
          fontSize: `${size}px`,
          lineHeight: 1,
          letterSpacing: "-0.03em",
          color: wordColor,
        }}
      >
        Renner
      </span>
    </Link>
  );
}
