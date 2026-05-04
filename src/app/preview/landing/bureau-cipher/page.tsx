import { BureauCipherBody } from "./BureauCipherBody";
import { readTone, VariantSwitcher } from "../_shared";

export const metadata = { title: "Landing · Bureau · Cipher · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function BureauCipherLanding({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <>
      <BureauCipherBody tone={tone} />
      <VariantSwitcher active="cipher" />
    </>
  );
}
