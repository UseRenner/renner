import { BureauStackBody } from "./BureauStackBody";
import { readTone, VariantSwitcher } from "../_shared";

export const metadata = { title: "Landing · Bureau · Stack · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function BureauStackLanding({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <>
      <BureauStackBody tone={tone} />
      <VariantSwitcher active="stack" />
    </>
  );
}
