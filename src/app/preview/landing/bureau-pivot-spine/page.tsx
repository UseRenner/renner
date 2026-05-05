import { BureauPivotBody } from "../bureau-pivot/BureauPivotBody";
import { readTone, VariantSwitcher } from "../_shared";

export const metadata = { title: "Landing · Bureau · Pivot · Spine · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function BureauPivotSpineLanding({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <>
      <BureauPivotBody tone={tone} rules={{ spine: "ink", aboveCategories: "none", aboveSignup: "none" }} />
      <VariantSwitcher active="pivot-spine" />
    </>
  );
}
