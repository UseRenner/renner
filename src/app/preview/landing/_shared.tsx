// Cache-buster: deploy nudge 2026-05-05T00:00Z
// Shared infrastructure for the landing-page previews. Mirrors
// the how-it-works/_shared.tsx pattern: a single source of truth
// for the variant list, the tone reader, and re-exports of the
// tone-vars helpers from the how-it-works system so landings
// theme through the same tokens.

export { getToneVars, isToneDark, RennerMark, type ShellTone } from "../how-it-works/_shared";
export { VariantSwitcher } from "./_variant-switcher";

export type LandingVariantKey =
  | "trio"
  | "letter"
  | "specimen"
  | "glyph"
  | "index"
  | "plate"
  | "lead"
  | "compact"
  | "pivot-steel"
  | "pivot-ink"
  | "pivot-trio-steel"
  | "pivot-trio-capped"
  | "folio"
  | "folio-trio"
  | "folio-trio-match"
  | "folio-trio-ink-small"
  | "folio-trio-larger"
  | "quarter"
  | "quarter-trio";

export const LANDING_VARIANTS: ReadonlyArray<{
  href: string;
  key: LandingVariantKey;
  label: string;
}> = [
  { href: "/preview/landing/bureau-trio", key: "trio", label: "Trio" },
  { href: "/preview/landing/bureau-letter", key: "letter", label: "Letter" },
  { href: "/preview/landing/bureau-specimen", key: "specimen", label: "Specimen" },
  { href: "/preview/landing/bureau-glyph", key: "glyph", label: "Glyph" },
  { href: "/preview/landing/bureau-index", key: "index", label: "Index" },
  { href: "/preview/landing/bureau-plate", key: "plate", label: "Plate" },
  { href: "/preview/landing/bureau-lead", key: "lead", label: "Lead" },
  { href: "/preview/landing/bureau-compact", key: "compact", label: "Compact" },
  { href: "/preview/landing/bureau-pivot-steel", key: "pivot-steel", label: "Pivot · Steel" },
  { href: "/preview/landing/bureau-pivot-ink", key: "pivot-ink", label: "Pivot · Ink" },
  { href: "/preview/landing/bureau-pivot-trio-steel", key: "pivot-trio-steel", label: "Pivot · Trio · Steel" },
  { href: "/preview/landing/bureau-pivot-trio-capped", key: "pivot-trio-capped", label: "Pivot · Trio · Capped" },
  { href: "/preview/landing/bureau-folio", key: "folio", label: "Folio" },
  { href: "/preview/landing/bureau-folio-trio", key: "folio-trio", label: "Folio · Trio" },
  { href: "/preview/landing/bureau-folio-trio-match", key: "folio-trio-match", label: "Folio · Trio · Match" },
  { href: "/preview/landing/bureau-folio-trio-ink-small", key: "folio-trio-ink-small", label: "Folio · Trio · Ink Small" },
  { href: "/preview/landing/bureau-folio-trio-larger", key: "folio-trio-larger", label: "Folio · Trio · Larger" },
  { href: "/preview/landing/bureau-quarter", key: "quarter", label: "Quarter" },
  { href: "/preview/landing/bureau-quarter-trio", key: "quarter-trio", label: "Quarter · Trio" },
];

import type { ShellTone } from "../how-it-works/_shared";

// Read a tone string from a search-param value, defaulting to
// "paper" for anything unrecognized.
export function readTone(v: unknown): ShellTone {
  return v === "ink" || v === "steel" || v === "haze" || v === "mist" || v === "chalk" || v === "paper" ? v : "paper";
}
