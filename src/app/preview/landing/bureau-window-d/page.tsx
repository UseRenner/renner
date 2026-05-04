import { BureauWindowDBody } from "./BureauWindowDBody";
import { readTone, VariantSwitcher } from "../_shared";

export const metadata = { title: "Landing · Bureau · Window · D · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function BureauWindowDLanding({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <>
      <BureauWindowDBody tone={tone} />
      <VariantSwitcher active="window-d" />
    </>
  );
}
