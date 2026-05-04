import { BureauGlyphBody } from "./BureauGlyphBody";
import { readTone, VariantSwitcher } from "../_shared";

export const metadata = { title: "Landing · Bureau · Glyph · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function BureauGlyphLanding({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <>
      <BureauGlyphBody tone={tone} />
      <VariantSwitcher active="glyph" />
    </>
  );
}
