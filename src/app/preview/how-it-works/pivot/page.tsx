import { getViewer } from "@/lib/role";
import { PageShell } from "../_shared";
import { PivotBody } from "./PivotBody";

export const metadata = { title: "How it works · Pivot · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function PivotHowItWorks() {
  const viewer = await getViewer();
  const showCta = !viewer;
  return (
    <PageShell active="pivot" showCta={showCta}>
      <PivotBody showCta={showCta} />
    </PageShell>
  );
}
