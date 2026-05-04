import { BureauIterationBody } from "./BureauIterationBody";
import { readTone, VariantSwitcher } from "../_shared";

export const metadata = { title: "Landing · Bureau · Iteration · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function BureauIterationLanding({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <>
      <BureauIterationBody tone={tone} />
      <VariantSwitcher active="iteration" />
    </>
  );
}
