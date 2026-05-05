import { BureauPivotBody } from "../bureau-pivot-ink/BureauPivotBody";
import { readTone, VariantSwitcher } from "../_shared";

export const metadata = { title: "Landing · Bureau · Pivot · C · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

// Pivot · C — Pivot · A's architecture (INK spine + steel
// horizontals) with Quarter · B's stacked task feed in the
// middle row instead of a categories list. Three sample tasks
// (kicker, italic title, location stamp) sit on the right side
// of the spine; the left side of that row is open whitespace
// that the spine bisects on its own.

export default async function BureauPivotCLanding({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <>
      <BureauPivotBody
        tone={tone}
        rules={{ spine: "ink", aboveCategories: "steel", aboveSignup: "steel" }}
        content="tasks"
      />
      <VariantSwitcher active="pivot-c" />
    </>
  );
}
