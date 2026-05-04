import { BureauGlyphLightBody } from "./BureauGlyphLightBody";
import { readTone, VariantSwitcher } from "../_shared";

export const metadata = { title: "Landing · Bureau · Glyph · Light · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function BureauGlyphLightLanding({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <>
      <BureauGlyphLightBody tone={tone} />
      <VariantSwitcher active="glyph-light" />
    </>
  );
}
