import { getViewer } from "@/lib/role";
import { PageShell } from "../_shared";
import { LeadBody } from "./LeadBody";

export const metadata = { title: "How it works · Lead · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function LeadHowItWorks() {
  const viewer = await getViewer();
  const showCta = !viewer;
  return (
    <PageShell active="lead" showCta={showCta}>
      <LeadBody showCta={showCta} />
    </PageShell>
  );
}
