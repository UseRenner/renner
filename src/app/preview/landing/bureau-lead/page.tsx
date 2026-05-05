import { BureauLeadBody } from "./BureauLeadBody";
import { readTone, VariantSwitcher } from "../_shared";

export const metadata = { title: "Landing · Bureau · Lead · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function BureauLeadLanding({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <>
      <BureauLeadBody tone={tone} />
      <VariantSwitcher active="lead" />
    </>
  );
}
