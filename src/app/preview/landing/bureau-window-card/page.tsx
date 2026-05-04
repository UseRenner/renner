import { BureauWindowCardBody } from "./BureauWindowCardBody";
import { readTone, VariantSwitcher } from "../_shared";

export const metadata = { title: "Landing · Bureau · Window · Card · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function BureauWindowCardLanding({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <>
      <BureauWindowCardBody tone={tone} />
      <VariantSwitcher active="window-card" />
    </>
  );
}
