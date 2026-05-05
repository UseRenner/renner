import { BureauPivotBody } from "../bureau-pivot-ink/BureauPivotBody";
import { readTone, VariantSwitcher } from "../_shared";

export const metadata = { title: "Landing · Bureau · Pivot · E · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

// Pivot · E — Pivot · C with the "Things handled" row kicker
// kept on the left, but the per-task category kickers (SIGNS,
// GUEST ACCESS, SHOWING) dropped. Tasks read as italic title +
// location stamp only — no mono caps competing with the row
// kicker on the spine's other side.

export default async function BureauPivotELanding({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <>
      <BureauPivotBody
        tone={tone}
        rules={{ spine: "ink", aboveCategories: "steel", aboveSignup: "steel" }}
        content="tasks"
        showTaskKicker={false}
      />
      <VariantSwitcher active="pivot-e" />
    </>
  );
}
