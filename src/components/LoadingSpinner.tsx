import { Logo } from "./Logo";

// Logo-mark spinner. The Renner mark spins continuously at the
// requested size, used as the loading indicator wherever the app
// shows a wait state — page loads, form submissions, async actions.
//
// `tone="dark"` (default) renders a dark disc on a light slot for
// light surfaces. `tone="light"` flips the colors for dark surfaces
// (the disc fills with #fbfbfc, the slot fills with #0d0f12) and
// is what the dark Sign-up button uses inline.

export function LoadingSpinner({
  size = 24,
  tone = "dark",
}: {
  size?: number;
  tone?: "dark" | "light";
}) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className="renner-spinner"
      style={{
        display: "inline-flex",
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <Logo
        size={size}
        fill={tone === "light" ? "#fbfbfc" : "#0d0f12"}
        slotColor={tone === "light" ? "#0d0f12" : "#fbfbfc"}
      />
    </span>
  );
}
