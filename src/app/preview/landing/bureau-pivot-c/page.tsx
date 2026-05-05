import { BureauPivotBody } from "../bureau-pivot-ink/BureauPivotBody";
import { readTone, VariantSwitcher } from "../_shared";

export const metadata = { title: "Landing · Bureau · Pivot · C · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

// Pivot · C — Pivot · A's architecture with a stacked task feed
// in the middle row. "Things handled" row kicker on the left;
// each task reads as italic title + location stamp only (no
// mono caps per-task category kicker competing with the row
// kicker across the spine).

export default async function BureauPivotCLanding({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
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
      <VariantSwitcher active="pivot-c" />
    </>
  );
}
