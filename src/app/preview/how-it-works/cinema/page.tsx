import { getViewer } from "@/lib/role";
import { PageShell, type ShellTone } from "../_shared";
import { CinemaBody } from "./CinemaBody";

export const metadata = { title: "How it works · Cinema · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

function readTone(v: unknown): ShellTone {
  return v === "ink" || v === "steel" || v === "paper" ? v : "paper";
}

export default async function CinemaHowItWorks({ searchParams }: { searchParams: Promise<{ tone?: string }> }) {
  const viewer = await getViewer();
  const showCta = !viewer;
  const sp = await searchParams;
  const tone = readTone(sp?.tone);
  return (
    <PageShell active="cinema" showCta={showCta} tone={tone}>
      <CinemaBody showCta={showCta} />
    </PageShell>
  );
}
