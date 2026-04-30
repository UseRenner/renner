import Link from "next/link";
import { Logo } from "./Logo";

// Wordmark + logo lockup. The wordmark size defaults to 22px to
// match the lockup sizing in the spec; pass a different size to
// scale the lockup (the disc tracks `size + 2` so the symbol stays
// proportionally just heavier than the wordmark, and the gap scales
// with size as well).
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
  const logoSize = size + 2;
  const gap = Math.max(10, Math.round(size * 0.5));

  return (
    <Link
      href="/"
      className="inline-flex items-center"
      style={{
        gap: `${gap}px`,
        textDecoration: "none",
        color: wordColor,
      }}
      aria-label="Renner"
    >
      <Logo size={logoSize} fill={logoFill} slotColor={resolvedSlot} />
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
