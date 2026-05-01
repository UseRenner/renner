import { getViewer } from "@/lib/role";
import { PageShell, type ShellTone } from "../_shared";
import { AtelierBody } from "./AtelierBody";

export const metadata = { title: "How it works · Atelier · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

function readTone(v: unknown): ShellTone {
  return v === "ink" || v === "steel" || v === "paper" ? v : "paper";
}

export default async function AtelierHowItWorks({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const viewer = await getViewer();
  const showCta = !viewer;
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <PageShell active="atelier" showCta={showCta} tone={tone}>
      <AtelierBody showCta={showCta} />
    </PageShell>
  );
}
