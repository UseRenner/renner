// Cache-buster: deploy nudge 2026-05-04T19:18Z
// Shared infrastructure for the landing-page previews. Mirrors
// the how-it-works/_shared.tsx pattern: a single source of truth
// for the variant list, the tone reader, and re-exports of the
// tone-vars helpers from the how-it-works system so landings
// theme through the same tokens.

export { getToneVars, isToneDark, RennerMark, type ShellTone } from "../how-it-works/_shared";
export { VariantSwitcher } from "./_variant-switcher";

export type LandingVariantKey =
  | "trio"
  | "trio-a"
  | "trio-b"
  | "window"
  | "window-a"
  | "window-b"
  | "window-c"
  | "window-d"
  | "letter"
  | "specimen"
  | "glyph"
  | "index";

export const LANDING_VARIANTS: ReadonlyArray<{
  href: string;
  key: LandingVariantKey;
  label: string;
}> = [
  { href: "/preview/landing/bureau-trio", key: "trio", label: "Trio" },
  { href: "/preview/landing/bureau-trio-a", key: "trio-a", label: "Trio · A — Serif titlecase labels" },
  { href: "/preview/landing/bureau-trio-b", key: "trio-b", label: "Trio · B — Serif allcaps labels" },
  { href: "/preview/landing/bureau-window", key: "window", label: "Window" },
  { href: "/preview/landing/bureau-window-a", key: "window-a", label: "Window · A — Italic serif" },
  { href: "/preview/landing/bureau-window-b", key: "window-b", label: "Window · B — Source Code Pro" },
  { href: "/preview/landing/bureau-window-c", key: "window-c", label: "Window · C — Small serif" },
  { href: "/preview/landing/bureau-window-d", key: "window-d", label: "Window · D — Sans italic" },
  { href: "/preview/landing/bureau-letter", key: "letter", label: "Letter" },
  { href: "/preview/landing/bureau-specimen", key: "specimen", label: "Specimen" },
  { href: "/preview/landing/bureau-glyph", key: "glyph", label: "Glyph" },
  { href: "/preview/landing/bureau-index", key: "index", label: "Index" },
];

import type { ShellTone } from "../how-it-works/_shared";

// Read a tone string from a search-param value, defaulting to
// "paper" for anything unrecognized.
export function readTone(v: unknown): ShellTone {
  return v === "ink" || v === "steel" || v === "haze" || v === "mist" || v === "chalk" || v === "paper" ? v : "paper";
}
