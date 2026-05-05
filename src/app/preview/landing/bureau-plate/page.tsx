import { BureauPlateBody } from "./BureauPlateBody";
import { readTone, VariantSwitcher } from "../_shared";

export const metadata = { title: "Landing · Bureau · Plate · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function BureauPlateLanding({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <>
      <BureauPlateBody tone={tone} />
      <VariantSwitcher active="plate" />
    </>
  );
}
