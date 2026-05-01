import { getViewer } from "@/lib/role";
import { PageShell, type ShellTone } from "../_shared";
import { FrameBody } from "./FrameBody";

export const metadata = { title: "How it works · Frame · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

function readTone(v: unknown): ShellTone {
  return v === "ink" || v === "steel" || v === "paper" ? v : "paper";
}

export default async function FrameHowItWorks({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const viewer = await getViewer();
  const showCta = !viewer;
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <PageShell active="frame" showCta={showCta} tone={tone}>
      <FrameBody showCta={showCta} />
    </PageShell>
  );
}
