import { BureauFolioTrioBody } from "../bureau-folio-trio/BureauFolioTrioBody";
import { readTone, VariantSwitcher } from "../_shared";

export const metadata = { title: "Landing · Bureau · Folio · Trio · Match · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

// Heading exactly matches the dek: small, STEEL_700, weight 375,
// upright. The signup heading sits at the same register as the
// dek — quietest possible read.

export default async function BureauFolioTrioMatchLanding({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <>
      <BureauFolioTrioBody
        tone={tone}
        signupHeadingStyle={{
          fontSize: "clamp(17px, 1.7vw, 20px)",
          color: "var(--c-700, #38414d)",
          fontWeight: 375,
          lineHeight: 1.55,
          letterSpacing: 0,
          fontVariationSettings: '"opsz" 14',
        }}
      />
      <VariantSwitcher active="folio-trio-match" />
    </>
  );
}
