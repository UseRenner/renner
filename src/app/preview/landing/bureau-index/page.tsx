import { BureauIndexBody } from "./BureauIndexBody";
import { readTone, VariantSwitcher } from "../_shared";

export const metadata = { title: "Landing · Bureau · Index · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function BureauIndexLanding({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <>
      <BureauIndexBody tone={tone} />
      <VariantSwitcher active="index" />
    </>
  );
}
