import { BureauTrioBody } from "./BureauTrioBody";
import { readTone, VariantSwitcher } from "../_shared";

export const metadata = { title: "Landing · Bureau · Trio · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function BureauTrioLanding({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <>
      <BureauTrioBody tone={tone} />
      <VariantSwitcher active="trio" />
    </>
  );
}
