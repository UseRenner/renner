import { getViewer } from "@/lib/role";
import { PageShell, type ShellTone } from "../_shared";
import { MastBody } from "./MastBody";

export const metadata = { title: "How it works · Mast · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

function readTone(v: unknown): ShellTone {
  return v === "ink" || v === "steel" || v === "paper" ? v : "paper";
}

export default async function MastHowItWorks({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const viewer = await getViewer();
  const showCta = !viewer;
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <PageShell active="mast" showCta={showCta} tone={tone}>
      <MastBody showCta={showCta} />
    </PageShell>
  );
}
