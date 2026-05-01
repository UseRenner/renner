import { getViewer } from "@/lib/role";
import { VariantSwitcher, getToneVars, type ShellTone } from "../how-it-works/_shared";
import { RailBody } from "./RailBody";

export const metadata = {
  title: "How it works · Rail · Renner",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

function readTone(v: unknown): ShellTone {
  return v === "ink" || v === "steel" || v === "haze" || v === "mist" || v === "paper" ? v : "paper";
}

export default async function PreviewHowItWorksRail({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const viewer = await getViewer();
  const showCta = !viewer;
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  const cssVars = getToneVars(tone);
  return (
    <div style={{ ...cssVars, minHeight: "100vh", backgroundColor: "var(--c-bg)", color: "var(--c-text)" }}>
      <VariantSwitcher active="rail" />
      <RailBody showCta={showCta} />
    </div>
  );
}
