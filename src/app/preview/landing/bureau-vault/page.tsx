import { BureauVaultBody } from "./BureauVaultBody";
import { readTone, VariantSwitcher } from "../_shared";

export const metadata = { title: "Landing · Bureau · Vault · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function BureauVaultLanding({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const sp = await searchParams;
  // Vault defaults to ink — its identity is the dark register —
  // but accepts any tone from the URL via the variant switcher.
  const tone = readTone(sp?.tone ?? "ink");
  return (
    <>
      <BureauVaultBody tone={tone} />
      <VariantSwitcher active="vault" />
    </>
  );
}
