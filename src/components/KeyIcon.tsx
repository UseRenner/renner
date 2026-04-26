// Horizontal skeleton-key glyph rendered as a single solid fill:
//   - solid circle bow on the left (no inner cutout)
//   - horizontal shaft that overlaps the bow, so the join has no seam
//   - two identical-length teeth (1.5 wide x 4 tall) flush against each
//     other at the right end, overlapping the shaft top-to-bottom
//
// The four subpaths overlap, so under the default nonzero fill rule the
// whole glyph renders as one continuous solid shape with no gaps and no
// disconnected parts. Both states use the same path; only the fill changes:
// #a7b2be when unsaved, #0d0f12 when saved. No stroke.

const KEY_PATH = [
  // Solid bow: full disc at center (5, 8), radius 3
  "M 2 8 A 3 3 0 1 0 8 8 A 3 3 0 1 0 2 8 Z",
  // Shaft: starts inside the bow (x=5) and runs to x=22
  "M 5 7.25 H 22 V 8.75 H 5 Z",
  // Tooth 1 (left of the pair)
  "M 19 7.25 H 20.5 V 12 H 19 Z",
  // Tooth 2 (flush against tooth 1, identical length)
  "M 20.5 7.25 H 22 V 12 H 20.5 Z",
].join(" ");

export function KeyIcon({
  filled,
  size = 16,
}: {
  filled: boolean;
  size?: number;
}) {
  return (
    <svg
      width={size * 1.5}
      height={size}
      viewBox="0 0 24 16"
      aria-hidden
    >
      <path d={KEY_PATH} fill={filled ? "#0d0f12" : "#a7b2be"} />
    </svg>
  );
}
