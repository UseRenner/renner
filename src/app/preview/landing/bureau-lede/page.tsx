import { BureauLedeBody } from "./BureauLedeBody";
import { readTone, VariantSwitcher } from "../_shared";

export const metadata = { title: "Landing · Bureau · Lede · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function BureauLedeLanding({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <>
      <BureauLedeBody tone={tone} />
      <VariantSwitcher active="lede" />
    </>
  );
}
