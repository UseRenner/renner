import { BureauCenterBody } from "./BureauCenterBody";
import { readTone, VariantSwitcher } from "../_shared";

export const metadata = { title: "Landing · Bureau · Center · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function BureauCenterLanding({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <>
      <BureauCenterBody tone={tone} />
      <VariantSwitcher active="center" />
    </>
  );
}
