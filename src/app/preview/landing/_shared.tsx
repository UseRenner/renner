// Shared infrastructure for the landing-page previews. Mirrors
// the how-it-works/_shared.tsx pattern: a single source of truth
// for the variant list, the tone reader, and re-exports of the
// tone-vars helpers from the how-it-works system so landings
// theme through the same tokens.

export { getToneVars, isToneDark, RennerMark, type ShellTone } from "../how-it-works/_shared";
export { VariantSwitcher } from "./_variant-switcher";

export type LandingVariantKey =
  | "iteration"
  | "trio"
  | "stark"
  | "vault"
  | "column"
  | "window"
  | "stack"
  | "letter"
  | "specimen";

export const LANDING_VARIANTS: ReadonlyArray<{
  href: string;
  key: LandingVariantKey;
  label: string;
}> = [
  { href: "/preview/landing/bureau-iteration", key: "iteration", label: "Iteration" },
  { href: "/preview/landing/bureau-trio", key: "trio", label: "Trio" },
  { href: "/preview/landing/bureau-stark", key: "stark", label: "Stark" },
  { href: "/preview/landing/bureau-vault", key: "vault", label: "Vault" },
  { href: "/preview/landing/bureau-column", key: "column", label: "Column" },
  { href: "/preview/landing/bureau-window", key: "window", label: "Window" },
  { href: "/preview/landing/bureau-stack", key: "stack", label: "Stack" },
  { href: "/preview/landing/bureau-letter", key: "letter", label: "Letter" },
  { href: "/preview/landing/bureau-specimen", key: "specimen", label: "Specimen" },
];

import type { ShellTone } from "../how-it-works/_shared";

// Read a tone string from a search-param value, defaulting to
// "paper" for anything unrecognized.
export function readTone(v: unknown): ShellTone {
  return v === "ink" || v === "steel" || v === "haze" || v === "mist" || v === "chalk" || v === "paper" ? v : "paper";
}
