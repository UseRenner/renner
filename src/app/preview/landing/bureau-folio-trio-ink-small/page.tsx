import { BureauFolioTrioBody } from "../bureau-folio-trio/BureauFolioTrioBody";
import { readTone, VariantSwitcher } from "../_shared";

export const metadata = { title: "Landing · Bureau · Folio · Trio · Ink · Small · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

// Same size as the dek but in INK. Signup heading reads as a
// small declarative stamp — color-escalated only.

export default async function BureauFolioTrioInkSmallLanding({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <>
      <BureauFolioTrioBody
        tone={tone}
        signupHeadingStyle={{
          fontSize: "clamp(17px, 1.7vw, 20px)",
          color: "var(--c-text, #0d0f12)",
          fontWeight: 375,
        }}
      />
      <VariantSwitcher active="folio-trio-ink-small" />
    </>
  );
}
