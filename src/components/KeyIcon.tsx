// Horizontal skeleton-key glyph rendered as ONE continuous closed
// path. The path traces the silhouette clockwise starting from the
// leftmost point of the bow:
//
//   1. arc clockwise along the top of the circular bow to the point
//      where the shaft's top edge meets the circle
//   2. line right along the top of the shaft to the far end (x=22)
//   3. down the right end of the shaft
//   4. step left along the shaft underside, drop down the right side
//      of tooth 2, across the bottom, back up the left side
//   5. step left to tooth 1, down/across/up the same way (identical
//      length to tooth 2)
//   6. continue left along the underside of the shaft back to the
//      circle, then arc clockwise along the bottom of the bow back
//      to the start
//
// One closed outline, no inner cutouts. Both states fill this same
// path with a single color: #a7b2be when unsaved, #0d0f12 when saved.

const KEY_PATH =
  "M 2 8 " +
  "A 3 3 0 0 1 7.9 7.25 " +
  "H 22 V 8.75 " +
  "H 21.5 V 12.75 H 20 V 8.75 " +
  "H 17.5 V 12.75 H 16 V 8.75 " +
  "H 7.9 " +
  "A 3 3 0 0 1 2 8 Z";

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
