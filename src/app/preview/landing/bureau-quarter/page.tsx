import { BureauQuarterBody } from "./BureauQuarterBody";
import { readTone, VariantSwitcher } from "../_shared";

export const metadata = { title: "Landing · Bureau · Quarter · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function BureauQuarterLanding({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <>
      <BureauQuarterBody tone={tone} />
      <VariantSwitcher active="quarter" />
    </>
  );
}
