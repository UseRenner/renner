import { BureauSpecimenInkedBody } from "./BureauSpecimenInkedBody";
import { readTone, VariantSwitcher } from "../_shared";

export const metadata = { title: "Landing · Bureau · Specimen · Inked · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function BureauSpecimenInkedLanding({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <>
      <BureauSpecimenInkedBody tone={tone} />
      <VariantSwitcher active="specimen-inked" />
    </>
  );
}
