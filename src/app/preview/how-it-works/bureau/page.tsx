import { getViewer } from "@/lib/role";
import { PageShell, type ShellTone } from "../_shared";
import { BureauBody } from "./BureauBody";

export const metadata = { title: "How it works · Bureau · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

function readTone(v: unknown): ShellTone {
  return v === "ink" || v === "steel" || v === "haze" || v === "mist" || v === "paper" ? v : "paper";
}

export default async function BureauHowItWorks({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const viewer = await getViewer();
  const showCta = !viewer;
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <PageShell active="bureau" showCta={showCta} tone={tone}>
      <BureauBody showCta={showCta} />
    </PageShell>
  );
}
