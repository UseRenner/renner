import { getViewer } from "@/lib/role";
import { PageShell } from "../_shared";
import { QuarterBody } from "./QuarterBody";

export const metadata = { title: "How it works · Quarter · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function QuarterHowItWorks() {
  const viewer = await getViewer();
  const showCta = !viewer;
  return (
    <PageShell active="quarter" showCta={showCta}>
      <QuarterBody showCta={showCta} />
    </PageShell>
  );
}
