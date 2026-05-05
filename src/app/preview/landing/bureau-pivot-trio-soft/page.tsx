import { BureauPivotTrioBody } from "../bureau-pivot-trio/BureauPivotTrioBody";
import { readTone, VariantSwitcher } from "../_shared";

export const metadata = { title: "Landing · Bureau · Pivot · Trio · Soft · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function BureauPivotTrioSoftLanding({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <>
      <BureauPivotTrioBody tone={tone} rules={{ spine: "steel", rows: "ink" }} />
      <VariantSwitcher active="pivot-trio-soft" />
    </>
  );
}
