import { BureauPivotBody } from "../bureau-pivot/BureauPivotBody";
import { readTone, VariantSwitcher } from "../_shared";

export const metadata = { title: "Landing · Bureau · Pivot · Lift · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function BureauPivotLiftLanding({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <>
      <BureauPivotBody tone={tone} rules={{ spine: "ink", aboveCategories: "ink", aboveSignup: "none" }} />
      <VariantSwitcher active="pivot-lift" />
    </>
  );
}
