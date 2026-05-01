import { getViewer } from "@/lib/role";
import { PageShell, type ShellTone } from "../_shared";
import { FoldBody } from "./FoldBody";

export const metadata = { title: "How it works · Fold · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

function readTone(v: unknown): ShellTone {
  return v === "ink" || v === "steel" || v === "paper" ? v : "paper";
}

export default async function FoldHowItWorks({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const viewer = await getViewer();
  const showCta = !viewer;
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <PageShell active="fold" showCta={showCta} tone={tone}>
      <FoldBody showCta={showCta} />
    </PageShell>
  );
}
