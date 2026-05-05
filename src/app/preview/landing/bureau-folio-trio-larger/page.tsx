import { BureauFolioTrioBody } from "../bureau-folio-trio/BureauFolioTrioBody";
import { readTone, VariantSwitcher } from "../_shared";

export const metadata = { title: "Landing · Bureau · Folio · Trio · Larger · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

// Larger size than the dek but same color (STEEL_700) and weight
// (375). Signup heading is escalated by size only — same quiet
// register, just bigger.

export default async function BureauFolioTrioLargerLanding({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <>
      <BureauFolioTrioBody
        tone={tone}
        signupHeadingStyle={{
          color: "var(--c-700, #38414d)",
          fontWeight: 375,
        }}
      />
      <VariantSwitcher active="folio-trio-larger" />
    </>
  );
}
