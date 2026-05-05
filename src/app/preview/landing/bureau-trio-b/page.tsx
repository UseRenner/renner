import { BureauTrioBBody } from "./BureauTrioBBody";
import { readTone, VariantSwitcher } from "../_shared";

export const metadata = { title: "Landing · Bureau · Trio · B · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function BureauTrioBLanding({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <>
      <BureauTrioBBody tone={tone} />
      <VariantSwitcher active="trio-b" />
    </>
  );
}
