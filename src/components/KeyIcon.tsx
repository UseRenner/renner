// Horizontal skeleton-key glyph: circle bow on the left, a long
// horizontal shaft, and two short rectangular teeth dropping from
// the right end of the shaft. Rendered against a 24x16 viewBox so
// it reads naturally inline with text. currentColor everywhere so
// the wrapping element controls outlined vs filled appearance.
//
// `size` is the rendered height; the SVG width scales 1.5x to
// preserve the wide aspect.

export function KeyIcon({
  filled,
  size = 16,
}: {
  filled: boolean;
  size?: number;
}) {
  const width = size * 1.5;
  return (
    <svg
      width={width}
      height={size}
      viewBox="0 0 24 16"
      aria-hidden
    >
      {filled ? (
        <g fill="currentColor">
          {/* Bow */}
          <circle cx="5" cy="8" r="3" />
          {/* Shaft */}
          <rect x="8" y="7" width="14" height="2" />
          {/* Teeth */}
          <rect x="16" y="9" width="1.5" height="3" />
          <rect x="20" y="9" width="1.5" height="4" />
        </g>
      ) : (
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Bow */}
          <circle cx="5" cy="8" r="3" />
          {/* Shaft */}
          <line x1="8" y1="8" x2="22" y2="8" />
          {/* Teeth */}
          <line x1="16" y1="8" x2="16" y2="12" />
          <line x1="20" y1="8" x2="20" y2="13" />
        </g>
      )}
    </svg>
  );
}
