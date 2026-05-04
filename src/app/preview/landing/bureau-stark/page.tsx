import { BureauStarkBody } from "./BureauStarkBody";
import { readTone, VariantSwitcher } from "../_shared";

export const metadata = { title: "Landing · Bureau · Stark · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function BureauStarkLanding({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <>
      <BureauStarkBody tone={tone} />
      <VariantSwitcher active="stark" />
    </>
  );
}
