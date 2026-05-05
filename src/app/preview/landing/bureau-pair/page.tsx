import { BureauPairBody } from "./BureauPairBody";
import { readTone, VariantSwitcher } from "../_shared";

export const metadata = { title: "Landing · Bureau · Pair · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function BureauPairLanding({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <>
      <BureauPairBody tone={tone} />
      <VariantSwitcher active="pair" />
    </>
  );
}
