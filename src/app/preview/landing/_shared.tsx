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
  | "lede"
  | "compact"
  | "pivot"
  | "pivot-ink"
  | "pivot-steel"
  | "pivot-spine"
  | "pivot-lift"
  | "pivot-cap"
  | "pivot-soft"
  | "folio"
  | "quarter";

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
  { href: "/preview/landing/bureau-lede", key: "lede", label: "Lede" },
  { href: "/preview/landing/bureau-compact", key: "compact", label: "Compact" },
  { href: "/preview/landing/bureau-pivot", key: "pivot", label: "Pivot" },
  { href: "/preview/landing/bureau-pivot-ink", key: "pivot-ink", label: "Pivot · Ink" },
  { href: "/preview/landing/bureau-pivot-steel", key: "pivot-steel", label: "Pivot · Steel" },
  { href: "/preview/landing/bureau-pivot-spine", key: "pivot-spine", label: "Pivot · Spine" },
  { href: "/preview/landing/bureau-pivot-lift", key: "pivot-lift", label: "Pivot · Lift" },
  { href: "/preview/landing/bureau-pivot-cap", key: "pivot-cap", label: "Pivot · Cap" },
  { href: "/preview/landing/bureau-pivot-soft", key: "pivot-soft", label: "Pivot · Soft" },
  { href: "/preview/landing/bureau-folio", key: "folio", label: "Folio" },
  { href: "/preview/landing/bureau-quarter", key: "quarter", label: "Quarter" },
];

import type { ShellTone } from "../how-it-works/_shared";

// Read a tone string from a search-param value, defaulting to
// "paper" for anything unrecognized.
export function readTone(v: unknown): ShellTone {
  return v === "ink" || v === "steel" || v === "haze" || v === "mist" || v === "chalk" || v === "paper" ? v : "paper";
}
