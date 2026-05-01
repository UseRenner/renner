import { getViewer } from "@/lib/role";
import { PageShell, type ShellTone } from "../_shared";
import { StackBody } from "./StackBody";

export const metadata = { title: "How it works · Stack · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

function readTone(v: unknown): ShellTone {
  return v === "ink" || v === "steel" || v === "paper" ? v : "paper";
}

export default async function StackHowItWorks({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const viewer = await getViewer();
  const showCta = !viewer;
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <PageShell active="stack" showCta={showCta} tone={tone}>
      <StackBody showCta={showCta} />
    </PageShell>
  );
}
