import { getViewer } from "@/lib/role";
import { PageShell, type ShellTone } from "../_shared";
import { NetworkBody } from "./NetworkBody";

export const metadata = { title: "How it works · Network · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

function readTone(v: unknown): ShellTone {
  return v === "ink" || v === "steel" || v === "paper" ? v : "paper";
}

export default async function NetworkHowItWorks({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const viewer = await getViewer();
  const showCta = !viewer;
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <PageShell active="network" showCta={showCta} tone={tone}>
      <NetworkBody showCta={showCta} />
    </PageShell>
  );
}
