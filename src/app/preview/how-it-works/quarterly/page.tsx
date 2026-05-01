import { getViewer } from "@/lib/role";
import { PageShell, type ShellTone } from "../_shared";
import { QuarterlyBody } from "./QuarterlyBody";

export const metadata = { title: "How it works · Quarterly · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

function readTone(v: unknown): ShellTone {
  return v === "ink" || v === "steel" || v === "paper" ? v : "paper";
}

export default async function QuarterlyHowItWorks({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const viewer = await getViewer();
  const showCta = !viewer;
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <PageShell active="quarterly" showCta={showCta} tone={tone}>
      <QuarterlyBody showCta={showCta} />
    </PageShell>
  );
}
