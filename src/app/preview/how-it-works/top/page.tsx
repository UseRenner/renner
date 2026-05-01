import { getViewer } from "@/lib/role";
import { PageShell } from "../_shared";
import { TopBody } from "./TopBody";

export const metadata = { title: "How it works · Top · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function TopHowItWorks() {
  const viewer = await getViewer();
  const showCta = !viewer;
  return (
    <PageShell active="top" showCta={showCta}>
      <TopBody showCta={showCta} />
    </PageShell>
  );
}
