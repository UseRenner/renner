"use client";

import { useEffect, useState } from "react";

// Floating "DS preview" pill in the bottom-right when the v2 design
// system is active. Click it to flip the toggle off — adds ?ds=off
// to the URL (the layout script clears the cookie + the data-ds
// attribute on the next render).
//
// Only renders after mount, so the initial paint is whatever the
// inline layout script decided. No flicker for users who don't have
// the cookie set.

export function DSPreviewBadge() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(document.documentElement.getAttribute("data-ds") === "v2");
  }, []);

  if (!active) return null;

  function turnOff() {
    const url = new URL(window.location.href);
    url.searchParams.set("ds", "off");
    window.location.href = url.toString();
  }

  return (
    <button
      type="button"
      onClick={turnOff}
      className="ds-preview-badge"
      aria-label="Turn off design system preview"
      title="Turn off design system preview"
    >
      <span className="ds-preview-dot" aria-hidden />
      DS preview
      <span className="ds-preview-x" aria-hidden>
        ×
      </span>
    </button>
  );
}
