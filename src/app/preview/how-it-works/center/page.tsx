import { getViewer } from "@/lib/role";
import { PageShell, type ShellTone } from "../_shared";
import { CenterBody } from "./CenterBody";

export const metadata = { title: "How it works · Center · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

function readTone(v: unknown): ShellTone {
  return v === "ink" || v === "steel" || v === "haze" || v === "paper" ? v : "paper";
}

export default async function CenterHowItWorks({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const viewer = await getViewer();
  const showCta = !viewer;
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <PageShell active="center" showCta={showCta} tone={tone}>
      <CenterBody showCta={showCta} />
    </PageShell>
  );
}
