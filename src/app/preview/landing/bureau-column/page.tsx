import { BureauColumnBody } from "./BureauColumnBody";
import { readTone, VariantSwitcher } from "../_shared";

export const metadata = { title: "Landing · Bureau · Column · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function BureauColumnLanding({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <>
      <BureauColumnBody tone={tone} />
      <VariantSwitcher active="column" />
    </>
  );
}
