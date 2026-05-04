import { BureauWindowBody } from "./BureauWindowBody";
import { readTone, VariantSwitcher } from "../_shared";

export const metadata = { title: "Landing · Bureau · Window · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function BureauWindowLanding({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <>
      <BureauWindowBody tone={tone} />
      <VariantSwitcher active="window" />
    </>
  );
}
