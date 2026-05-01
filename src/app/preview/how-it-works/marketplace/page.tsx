import { getViewer } from "@/lib/role";
import { PageShell, type ShellTone } from "../_shared";
import { MarketplaceBody } from "./MarketplaceBody";

export const metadata = { title: "How it works · Marketplace · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

function readTone(v: unknown): ShellTone {
  return v === "ink" || v === "steel" || v === "paper" ? v : "paper";
}

export default async function MarketplaceHowItWorks({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const viewer = await getViewer();
  const showCta = !viewer;
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <PageShell active="marketplace" showCta={showCta} tone={tone}>
      <MarketplaceBody showCta={showCta} />
    </PageShell>
  );
}
