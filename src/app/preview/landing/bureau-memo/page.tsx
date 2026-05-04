import { BureauMemoBody } from "./BureauMemoBody";
import { readTone, VariantSwitcher } from "../_shared";

export const metadata = { title: "Landing · Bureau · Memo · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function BureauMemoLanding({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <>
      <BureauMemoBody tone={tone} />
      <VariantSwitcher active="memo" />
    </>
  );
}
