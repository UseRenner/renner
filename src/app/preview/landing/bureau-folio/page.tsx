import { BureauFolioBody } from "./BureauFolioBody";
import { readTone, VariantSwitcher } from "../_shared";

export const metadata = { title: "Landing · Bureau · Folio · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function BureauFolioLanding({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <>
      <BureauFolioBody tone={tone} />
      <VariantSwitcher active="folio" />
    </>
  );
}
