import { BureauLetterBody } from "./BureauLetterBody";
import { readTone, VariantSwitcher } from "../_shared";

export const metadata = { title: "Landing · Bureau · Letter · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function BureauLetterLanding({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <>
      <BureauLetterBody tone={tone} />
      <VariantSwitcher active="letter" />
    </>
  );
}
