// The Renner mark: a solid disc with an edge-to-edge capsule cut
// through the center, tilted exactly 12° clockwise (matching Source
// Serif 4's italicAngle).
//
// `fill` colors the disc and defaults to currentColor so a parent
// can drive the disc color via CSS (and animate fill transitions
// through `color`). `slotColor` is the cutout color — pass the
// background color the logo sits on for a transparent-cutout look.

export function Logo({
  size = 20,
  fill = "currentColor",
  slotColor = "#fbfbfc",
}: {
  size?: number;
  fill?: string;
  slotColor?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="10" cy="10" r="10" fill={fill} />
      <g transform="rotate(12 10 10)">
        <rect x="8" y="1" width="4" height="18" rx="2" fill={slotColor} />
      </g>
    </svg>
  );
}
