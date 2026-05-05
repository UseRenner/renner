import { BureauBriefBody } from "./BureauBriefBody";
import { readTone, VariantSwitcher } from "../_shared";

export const metadata = { title: "Landing · Bureau · Brief · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function BureauBriefLanding({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <>
      <BureauBriefBody tone={tone} />
      <VariantSwitcher active="brief" />
    </>
  );
}
