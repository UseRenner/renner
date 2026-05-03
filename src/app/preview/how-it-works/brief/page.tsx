import { getViewer } from "@/lib/role";
import { PageShell, type ShellTone } from "../_shared";
import { BriefBody } from "./BriefBody";

export const metadata = { title: "How it works · Brief · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

function readTone(v: unknown): ShellTone {
  return v === "ink" || v === "steel" || v === "haze" || v === "mist" || v === "chalk" || v === "paper" ? v : "paper";
}

export default async function BriefHowItWorks({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const viewer = await getViewer();
  const showCta = !viewer;
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <PageShell active="brief" showCta={showCta} tone={tone} maxWidth={1440}>
      <BriefBody showCta={false} />
    </PageShell>
  );
}
