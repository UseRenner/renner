import { BureauPivotBody } from "../bureau-pivot-ink/BureauPivotBody";
import { readTone, VariantSwitcher } from "../_shared";

export const metadata = { title: "Landing · Bureau · Pivot · D · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

// Pivot · D — Pivot · C minus the "Things handled" row kicker.
// Stacked task feed on the right, blank left. The spine bisects
// open whitespace on the task row's left side; no mono kicker
// competing with the per-task category labels.

export default async function BureauPivotDLanding({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <>
      <BureauPivotBody
        tone={tone}
        rules={{ spine: "ink", aboveCategories: "steel", aboveSignup: "steel" }}
        content="tasks"
        showRowKicker={false}
      />
      <VariantSwitcher active="pivot-d" />
    </>
  );
}
