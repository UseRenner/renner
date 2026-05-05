import { BureauPivotTrioBody } from "../bureau-pivot-trio-steel/BureauPivotTrioBody";
import { readTone, VariantSwitcher } from "../_shared";

export const metadata = { title: "Landing · Bureau · Pivot · Trio · Upright · 400 · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function BureauPivotTrioUpright400Landing({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <>
      <BureauPivotTrioBody tone={tone} rules={{ spine: "steel", rows: "steel" }} uprightSignupHeading uprightTextWeight={400} />
      <VariantSwitcher active="pivot-trio-upright-400" />
    </>
  );
}
