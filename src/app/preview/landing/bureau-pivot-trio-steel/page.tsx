import { BureauPivotTrioBody } from "./BureauPivotTrioBody";
import { readTone, VariantSwitcher } from "../_shared";

export const metadata = { title: "Landing · Bureau · Pivot · Trio · Steel · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function BureauPivotTrioSteelLanding({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <>
      <BureauPivotTrioBody tone={tone} rules={{ spine: "steel", rows: "steel" }} />
      <VariantSwitcher active="pivot-trio-steel" />
    </>
  );
}
