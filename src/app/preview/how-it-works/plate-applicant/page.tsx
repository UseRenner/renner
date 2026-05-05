import { getViewer } from "@/lib/role";
import { PageShell, type ShellTone } from "../_shared";
import { PlateBody } from "../plate/PlateBody";
import { Mini } from "../_illustrations";

export const metadata = { title: "How it works · Plate · Applicant · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

function readTone(v: unknown): ShellTone {
  return v === "ink" || v === "steel" || v === "haze" || v === "mist" || v === "chalk" || v === "paper" ? v : "paper";
}

// Reuses the existing MiniApplicant illustration (initials disc,
// italic name, rating, quote, ID-verified + background-checked
// footer) for step 1. Most product-truthful — this is what an
// applicant card looks like in the actual app.

export default async function PlateApplicantHowItWorks({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const viewer = await getViewer();
  const showCta = !viewer;
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <PageShell active="plate-applicant" showCta={showCta} tone={tone}>
      <PlateBody showCta={showCta} audiencePrompt="How to —" audienceUpright step1Illustration={<Mini kind="applicant" />} />
    </PageShell>
  );
}
