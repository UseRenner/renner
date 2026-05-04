import { BureauLetterInkedBody } from "./BureauLetterInkedBody";
import { readTone, VariantSwitcher } from "../_shared";

export const metadata = { title: "Landing · Bureau · Letter · Inked · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function BureauLetterInkedLanding({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <>
      <BureauLetterInkedBody tone={tone} />
      <VariantSwitcher active="letter-inked" />
    </>
  );
}
