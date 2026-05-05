import { BureauPivotTrioBody } from "../bureau-pivot-trio-steel/BureauPivotTrioBody";
import { readTone, VariantSwitcher } from "../_shared";

export const metadata = { title: "Landing · Bureau · Pivot · Trio · Upright · 375 · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function BureauPivotTrioUpright375Landing({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <>
      <BureauPivotTrioBody tone={tone} rules={{ spine: "steel", rows: "steel" }} uprightSignupHeading uprightTextWeight={375} />
      <VariantSwitcher active="pivot-trio-upright-375" />
    </>
  );
}
