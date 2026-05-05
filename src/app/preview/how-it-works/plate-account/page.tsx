import { getViewer } from "@/lib/role";
import { PageShell, type ShellTone } from "../_shared";
import { PlateBody } from "../plate/PlateBody";

export const metadata = { title: "How it works · Plate · Account · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

function readTone(v: unknown): ShellTone {
  return v === "ink" || v === "steel" || v === "haze" || v === "mist" || v === "chalk" || v === "paper" ? v : "paper";
}

export default async function PlateAccountHowItWorks({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const viewer = await getViewer();
  const showCta = !viewer;
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <PageShell active="plate-account" showCta={showCta} tone={tone}>
      <PlateBody showCta={showCta} audiencePrompt="Have an account?" />
    </PageShell>
  );
}
