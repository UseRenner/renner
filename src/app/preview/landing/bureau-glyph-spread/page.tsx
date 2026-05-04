import { BureauGlyphSpreadBody } from "./BureauGlyphSpreadBody";
import { readTone, VariantSwitcher } from "../_shared";

export const metadata = { title: "Landing · Bureau · Glyph · Spread · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function BureauGlyphSpreadLanding({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <>
      <BureauGlyphSpreadBody tone={tone} />
      <VariantSwitcher active="glyph-spread" />
    </>
  );
}
