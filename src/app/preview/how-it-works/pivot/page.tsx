import { getViewer } from "@/lib/role";
import { PageShell, type ShellTone } from "../_shared";
import { PivotBody } from "./PivotBody";

export const metadata = { title: "How it works · Pivot · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

function readTone(v: unknown): ShellTone {
  return v === "ink" || v === "steel" || v === "paper" ? v : "paper";
}

export default async function PivotHowItWorks({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const viewer = await getViewer();
  const showCta = !viewer;
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <PageShell active="pivot" showCta={showCta} tone={tone}>
      <PivotBody showCta={showCta} />
    </PageShell>
  );
}
