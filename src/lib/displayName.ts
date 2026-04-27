// Display-name presentation rules for Renner.
//
// Names are stored as Title Case `first_name` and `last_name`. The
// public `display_name` is derived ("Marcus K." by default, or
// "Marcus King" if the user opts in via `show_full_last_name`).
// Clients may also surface a `company` after the personal name.

const NAME_CHAR_REGEX = /^[A-Za-zÀ-ÖØ-öø-ÿ\-' ]+$/;

// Title-case a single name part, preserving hyphens and apostrophes
// (so "anne-marie" -> "Anne-Marie", "o'brien" -> "O'Brien").
export function toTitleCase(part: string): string {
  return part
    .toLowerCase()
    .split(/(\s+|-|')/)
    .map((seg) => {
      if (seg.length === 0) return seg;
      if (/^\s+$/.test(seg) || seg === "-" || seg === "'") return seg;
      return seg.charAt(0).toUpperCase() + seg.slice(1);
    })
    .join("");
}

// Strip any disallowed characters, collapse whitespace, and Title-Case
// the result. Used as the user types so the field can never hold
// invalid characters.
export function normalizeNameInput(raw: string): string {
  const stripped = raw
    .replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\-' ]/g, "")
    .replace(/\s+/g, " ");
  return toTitleCase(stripped);
}

// True only when every character in the trimmed value is a letter,
// hyphen, apostrophe, or space. Empty strings fail.
export function isValidNameInput(raw: string): boolean {
  const trimmed = raw.trim();
  if (!trimmed) return false;
  return NAME_CHAR_REGEX.test(trimmed);
}

export type NameSource = {
  first_name?: string | null;
  last_name?: string | null;
  display_name?: string | null;
  show_full_last_name?: boolean | null;
  company?: string | null;
};

// Public display name: "Marcus K." by default, "Marcus King" when the
// user opts in. Falls back to whatever legacy `display_name` exists
// for accounts that pre-date the new fields.
export function formatDisplayName(user: NameSource | null | undefined): string {
  if (!user) return "Renner";
  const first = (user.first_name ?? "").trim();
  const last = (user.last_name ?? "").trim();
  if (first) {
    if (user.show_full_last_name && last) {
      return `${first} ${last}`;
    }
    if (last) {
      return `${first} ${last.charAt(0).toUpperCase()}.`;
    }
    return first;
  }
  const legacy = (user.display_name ?? "").trim();
  if (legacy) {
    const parts = legacy.split(/\s+/);
    if (parts.length >= 2) {
      return `${parts[0]} ${parts[1].charAt(0).toUpperCase()}.`;
    }
    return legacy;
  }
  return "Renner";
}

// Display name + optional company suffix, used on client-side surfaces.
// Renners never show a company suffix — they're always shown as a person.
export function formatDisplayNameWithCompany(
  user: NameSource | null | undefined,
): string {
  const base = formatDisplayName(user);
  const company = (user?.company ?? "").trim();
  if (!company) return base;
  return `${base} · ${company}`;
}

export function formatInitials(user: NameSource | null | undefined): string {
  if (!user) return "?";
  const first = (user.first_name ?? "").trim();
  const last = (user.last_name ?? "").trim();
  if (first || last) {
    return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase() || "?";
  }
  const legacy = (user.display_name ?? "").trim();
  if (legacy) {
    const parts = legacy.split(/\s+/);
    return `${parts[0]?.charAt(0) ?? ""}${parts[1]?.charAt(0) ?? ""}`
      .toUpperCase() || "?";
  }
  return "?";
}
