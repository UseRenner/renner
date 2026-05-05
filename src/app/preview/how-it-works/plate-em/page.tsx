import { getViewer } from "@/lib/role";
import { PageShell, type ShellTone } from "../_shared";
import { PlateBody } from "../plate/PlateBody";

export const metadata = { title: "How it works · Plate · Em-dash · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

function readTone(v: unknown): ShellTone {
  return v === "ink" || v === "steel" || v === "haze" || v === "mist" || v === "chalk" || v === "paper" ? v : "paper";
}

export default async function PlateEmHowItWorks({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const viewer = await getViewer();
  const showCta = !viewer;
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <PageShell active="plate" showCta={showCta} tone={tone}>
      <PlateBody showCta={showCta} audiencePrompt="How do I —" />
    </PageShell>
  );
}
