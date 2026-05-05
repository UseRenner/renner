import { BureauSceneBody } from "./BureauSceneBody";
import { readTone, VariantSwitcher } from "../_shared";

export const metadata = { title: "Landing · Bureau · Scene · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function BureauSceneLanding({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <>
      <BureauSceneBody tone={tone} />
      <VariantSwitcher active="scene" />
    </>
  );
}
