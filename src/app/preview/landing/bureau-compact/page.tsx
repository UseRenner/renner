import { BureauCompactBody } from "./BureauCompactBody";
import { readTone, VariantSwitcher } from "../_shared";

export const metadata = { title: "Landing · Bureau · Compact · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function BureauCompactLanding({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <>
      <BureauCompactBody tone={tone} />
      <VariantSwitcher active="compact" />
    </>
  );
}
