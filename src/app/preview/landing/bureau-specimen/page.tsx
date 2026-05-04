import { BureauSpecimenBody } from "./BureauSpecimenBody";
import { readTone, VariantSwitcher } from "../_shared";

export const metadata = { title: "Landing · Bureau · Specimen · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function BureauSpecimenLanding({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <>
      <BureauSpecimenBody tone={tone} />
      <VariantSwitcher active="specimen" />
    </>
  );
}
