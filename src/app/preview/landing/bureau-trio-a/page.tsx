import { BureauTrioABody } from "./BureauTrioABody";
import { readTone, VariantSwitcher } from "../_shared";

export const metadata = { title: "Landing · Bureau · Trio · A · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function BureauTrioALanding({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <>
      <BureauTrioABody tone={tone} />
      <VariantSwitcher active="trio-a" />
    </>
  );
}
