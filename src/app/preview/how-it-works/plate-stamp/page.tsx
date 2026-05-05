import { getViewer } from "@/lib/role";
import { PageShell, type ShellTone } from "../_shared";
import { PlateBody } from "../plate/PlateBody";

export const metadata = { title: "How it works · Plate · Stamp · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

const SERIF = "var(--font-source-serif), ui-serif, Georgia, serif";
const MONO = "var(--font-source-code), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
const INK = "var(--c-text, #0d0f12)";
const STEEL_500 = "var(--c-500, #7d8da0)";

function readTone(v: unknown): ShellTone {
  return v === "ink" || v === "steel" || v === "haze" || v === "mist" || v === "chalk" || v === "paper" ? v : "paper";
}

// Pure typographic VERIFIED stamp. No card frame, no portrait —
// just an editorial mono-caps mark with a hairline rule. Reads
// like a notarized document stamp. Lightest possible move.
function VerifiedStamp() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10, paddingTop: 24 }}>
      <div style={{ fontFamily: MONO, fontSize: 14, fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: INK, paddingBottom: 12, borderBottom: `1px solid ${INK}`, minWidth: 160, textAlign: "right" }}>
        Verified · 002
      </div>
      <div style={{ fontFamily: MONO, fontSize: 9, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: STEEL_500 }}>
        Persona · Checkr
      </div>
    </div>
  );
}

export default async function PlateStampHowItWorks({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const viewer = await getViewer();
  const showCta = !viewer;
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <PageShell active="plate-stamp" showCta={showCta} tone={tone}>
      <PlateBody showCta={showCta} audiencePrompt="How to —" audienceUpright step1Illustration={<VerifiedStamp />} />
    </PageShell>
  );
}
