import { BureauQuarterTrioBody } from "./BureauQuarterTrioBody";
import { readTone, VariantSwitcher } from "../_shared";

export const metadata = { title: "Landing · Bureau · Quarter · Trio · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function BureauQuarterTrioLanding({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <>
      <BureauQuarterTrioBody tone={tone} />
      <VariantSwitcher active="quarter-trio" />
    </>
  );
}
