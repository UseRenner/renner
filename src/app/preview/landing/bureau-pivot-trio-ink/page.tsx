import { BureauPivotTrioBody } from "./BureauPivotTrioBody";
import { readTone, VariantSwitcher } from "../_shared";

export const metadata = { title: "Landing · Bureau · Pivot · Trio · Ink · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

// Pivot · Trio with an INK spine and steel row dividers. The
// architectural commitment of the spine plus the quiet rows.

export default async function BureauPivotTrioInkLanding({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <>
      <BureauPivotTrioBody tone={tone} rules={{ spine: "ink", rows: "steel" }} />
      <VariantSwitcher active="pivot-trio-ink" />
    </>
  );
}
