import { getViewer } from "@/lib/role";
import { PageShell, type ShellTone } from "../_shared";
import { ShowcaseBody } from "./ShowcaseBody";

export const metadata = { title: "How it works · Showcase · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

function readTone(v: unknown): ShellTone {
  return v === "ink" || v === "steel" || v === "haze" || v === "paper" ? v : "paper";
}

export default async function ShowcaseHowItWorks({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const viewer = await getViewer();
  const showCta = !viewer;
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <PageShell active="showcase" showCta={showCta} tone={tone}>
      <ShowcaseBody showCta={showCta} />
    </PageShell>
  );
}
