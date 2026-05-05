import { BureauPivotBody } from "../bureau-pivot-steel/BureauPivotBody";
import { readTone, VariantSwitcher } from "../_shared";

export const metadata = { title: "Landing · Bureau · Pivot · Ink · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function BureauPivotInkLanding({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <>
      <BureauPivotBody tone={tone} rules={{ spine: "ink", aboveCategories: "steel", aboveSignup: "steel" }} />
      <VariantSwitcher active="pivot-ink" />
    </>
  );
}
