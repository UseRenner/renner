import { getViewer } from "@/lib/role";
import { PageShell } from "../_shared";
import { QuarterlyBody } from "./QuarterlyBody";

export const metadata = { title: "How it works · Quarterly · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function QuarterlyHowItWorks() {
  const viewer = await getViewer();
  const showCta = !viewer;
  return (
    <PageShell active="quarterly" showCta={showCta}>
      <QuarterlyBody showCta={showCta} />
    </PageShell>
  );
}
