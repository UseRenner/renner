import { BureauSpecimenBoldBody } from "./BureauSpecimenBoldBody";
import { readTone, VariantSwitcher } from "../_shared";

export const metadata = { title: "Landing · Bureau · Specimen · Bold · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function BureauSpecimenBoldLanding({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <>
      <BureauSpecimenBoldBody tone={tone} />
      <VariantSwitcher active="specimen-bold" />
    </>
  );
}
