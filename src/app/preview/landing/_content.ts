// Shared content for the landing-page previews. Every variant
// draws from this so the comparison is about *form*, not copy.
// When/if we extend to the remaining eight variants, we'll keep
// adding to this file — it's the single source of truth for
// landing-page copy in the preview system.

export const HEADLINE_LEAD = "Keep real estate";
export const HEADLINE_TAIL = "running."; // italicized in display
export const HEADLINE_FULL = "Keep real estate running.";

export const DEK = "A marketplace for the small jobs real estate runs on — sign installs, lockboxes, showings, courier runs, walkthrough photos, guest check-ins. Posted by clients, picked up by ID-verified Renners, paid through escrow.";

export const SHORT_DEK = "From sign installs to showings — there's a Renner.";

export type Category = {
  id: string;
  label: string;
  title: string;
  detail: string;
};

// Mirrors the canonical task categories in src/lib/types.ts —
// same labels, same order, minus "Other" (catch-all bucket; not
// shown as a marketing category).
export const CATEGORIES: Category[] = [
  { id: "signs", label: "Signs", title: "Sign installs", detail: "Sign riders, post installs, removals." },
  { id: "lockbox", label: "Lockbox", title: "Lockbox swaps", detail: "Combination resets, lockbox swaps, key drops." },
  { id: "courier", label: "Courier", title: "Courier runs", detail: "Closing docs, key drops, contract relays." },
  { id: "visuals", label: "Visuals", title: "Walkthrough photos", detail: "Photo-ready setup, walkthrough captures, virtual tours." },
  { id: "property-access", label: "Property access", title: "Property access", detail: "Owner walk-ins, contractor access, key drops." },
  { id: "guest-access", label: "Guest access", title: "Guest check-ins", detail: "Guest check-ins, host assistance, property access." },
  { id: "host-assistance", label: "Host assistance", title: "Host assistance", detail: "Turnover prep, restock, light tidying between guests." },
  { id: "showing", label: "Showing", title: "Licensed showings", detail: "Buyer showings, on-call coverage." },
  { id: "open-house", label: "Open house", title: "Open house coverage", detail: "Open house sit-ins, sign-in, lights and lockup." },
];

// The trimmed list every landing-variant strip displays — six
// descriptive titles, identical across all variants. Drops three
// of the longer / more-niche entries so the row reads cleanly
// even in the narrower walls. Render via `c.title` in the
// descriptive register, never `c.label`.
const STRIP_OMIT_IDS = new Set(["property-access", "host-assistance", "open-house"]);
export const CATEGORY_STRIP: Category[] = CATEGORIES.filter((c) => !STRIP_OMIT_IDS.has(c.id));

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "We saved fifteen hours a week on sign work alone. The Renners we've worked with twice now feel like part of the team.",
    name: "Sarah K.",
    role: "Broker · Cherry Creek, CO",
  },
  {
    quote: "First time hosting on Airbnb. I was nervous about the keys. A verified Renner showed up at noon, sent me photos, and I never thought about it again.",
    name: "James M.",
    role: "Host · Buckhead, ATL",
  },
  {
    quote: "I'm at closings most afternoons. Renner covers showings I'd otherwise lose. Direct deposit hits the same day.",
    name: "Linda R.",
    role: "Agent · Lincoln Park, CHI",
  },
];

export const TRUST_PILLARS: Array<[string, string]> = [
  ["Verified on both sides", "Clients and Renners pass ID and background checks before posting or booking."],
  ["License-gated work", "Tasks that require a license go only to licensed Renners."],
  ["Escrow payments", "Funds held until proof of completion. Released the moment work is confirmed."],
];

export const TRUST_PARAGRAPH =
  "Clients and Renners pass ID and background checks before posting or booking. Tasks that require a license go only to licensed Renners. Save Renners you like and invite them to your tasks.";

export const PRICING_CLAIM = "10% client service fee. Renners keep 100% of the task pay.";
export const PRICING_DETAIL = "Both numbers are shown to both sides before a booking is confirmed. No hidden charges.";

export const FINAL_CTA_HEAD = "Take care of it.";
export const FINAL_CTA_DEK = "Sign up to post your first task or apply as a Renner.";

export const SAMPLE_TASKS: Array<{ category: string; title: string; location: string; price: string }> = [
  { category: "Signs", title: "Install sign rider", location: "RiNo, Denver 80205 · 2:00 – 5:00 PM", price: "$45" },
  { category: "Lockbox", title: "Swap lockbox at listing", location: "Buckhead, Atlanta 30305 · 10:00 AM – 12:00 PM", price: "$35" },
  { category: "Showing", title: "Show property to buyer", location: "Lincoln Park, Chicago 60614 · 1:00 PM", price: "$75" },
  { category: "Courier", title: "Deliver closing docs", location: "SoHo, New York 10012 · 1:00 – 3:00 PM", price: "$45" },
  { category: "Visuals", title: "Walkthrough photos", location: "West Hollywood, Los Angeles 90046 · 8:00 AM", price: "$75" },
  { category: "Guest access", title: "Guest check-in", location: "South Beach, Miami 33139 · 4:00 PM", price: "$40" },
];
