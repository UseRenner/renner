// Horizontal skeleton-key glyph rendered as a single fill path:
//   - ring bow on the left (outer circle r=3 minus inner circle r=1.5
//     via fill-rule="evenodd")
//   - 1.5-unit-thick horizontal shaft from x=8 to x=22
//   - two identical-length teeth (1.5 × 4) dropping from the shaft
//
// Both states use the same path. Only the fill color changes:
// #a7b2be when unsaved, #0d0f12 when saved. No stroke rendering.

const KEY_PATH = [
  // Bow outer ring
  "M 2 8 A 3 3 0 1 0 8 8 A 3 3 0 1 0 2 8 Z",
  // Bow inner cutout (hole, evenodd)
  "M 3.5 8 A 1.5 1.5 0 1 0 6.5 8 A 1.5 1.5 0 1 0 3.5 8 Z",
  // Shaft
  "M 8 7.25 H 22 V 8.75 H 8 Z",
  // Tooth 1
  "M 16 8 H 17.5 V 12 H 16 Z",
  // Tooth 2 (same length as Tooth 1)
  "M 20 8 H 21.5 V 12 H 20 Z",
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
      <path
        d={KEY_PATH}
        fill={filled ? "#0d0f12" : "#a7b2be"}
        fillRule="evenodd"
      />
    </svg>
  );
}
