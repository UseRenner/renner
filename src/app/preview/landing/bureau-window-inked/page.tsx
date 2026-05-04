import { BureauWindowInkedBody } from "./BureauWindowInkedBody";
import { readTone, VariantSwitcher } from "../_shared";

export const metadata = { title: "Landing · Bureau · Window · Inked · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function BureauWindowInkedLanding({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <>
      <BureauWindowInkedBody tone={tone} />
      <VariantSwitcher active="window-inked" />
    </>
  );
}
