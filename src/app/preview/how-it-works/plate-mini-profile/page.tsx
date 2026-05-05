import { getViewer } from "@/lib/role";
import { PageShell, type ShellTone } from "../_shared";
import { PlateBody } from "../plate/PlateBody";
import { Mini } from "../_illustrations";

export const metadata = { title: "How it works · Plate · Mini Profile · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

function readTone(v: unknown): ShellTone {
  return v === "ink" || v === "steel" || v === "haze" || v === "mist" || v === "chalk" || v === "paper" ? v : "paper";
}

// Reuses the existing MiniProfile illustration (the "Onboarding"
// kicker variant — initials disc, name, service area, categories,
// task minimum, ID-verified + background-checked footer). Even
// more verification-specific than MiniApplicant since the kicker
// is literally "Onboarding."

export default async function PlateMiniProfileHowItWorks({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const viewer = await getViewer();
  const showCta = !viewer;
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <PageShell active="plate-mini-profile" showCta={showCta} tone={tone}>
      <PlateBody showCta={showCta} audiencePrompt="How to —" audienceUpright step1Illustration={<Mini kind="profile" />} />
    </PageShell>
  );
}
