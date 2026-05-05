import { BureauFolioTrioBody } from "./BureauFolioTrioBody";
import { readTone, VariantSwitcher } from "../_shared";

export const metadata = { title: "Landing · Bureau · Folio · Trio · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function BureauFolioTrioLanding({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <>
      <BureauFolioTrioBody tone={tone} />
      <VariantSwitcher active="folio-trio" />
    </>
  );
}
