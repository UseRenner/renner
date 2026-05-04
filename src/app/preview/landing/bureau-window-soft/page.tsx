import { BureauWindowSoftBody } from "./BureauWindowSoftBody";
import { readTone, VariantSwitcher } from "../_shared";

export const metadata = { title: "Landing · Bureau · Window · Soft · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function BureauWindowSoftLanding({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <>
      <BureauWindowSoftBody tone={tone} />
      <VariantSwitcher active="window-soft" />
    </>
  );
}
