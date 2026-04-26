// Skeleton-key silhouette reduced to a head and a shaft.
// At rest the strokes use the steel-400 outline; when filled it
// becomes a solid steel-black shape. The CSS hover transition is
// owned by the .favorite-toggle class in globals.css so timing
// stays in sync with the rest of the system.
export function KeyIcon({
  filled,
  size = 16,
}: {
  filled: boolean;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle
        cx="5"
        cy="8"
        r="3"
        fill={filled ? "currentColor" : "none"}
      />
      <line x1="8" y1="8" x2="14" y2="8" />
    </svg>
  );
}
