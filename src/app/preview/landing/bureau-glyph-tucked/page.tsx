import { BureauGlyphTuckedBody } from "./BureauGlyphTuckedBody";
import { readTone, VariantSwitcher } from "../_shared";

export const metadata = { title: "Landing · Bureau · Glyph · Tucked · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function BureauGlyphTuckedLanding({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <>
      <BureauGlyphTuckedBody tone={tone} />
      <VariantSwitcher active="glyph-tucked" />
    </>
  );
}
