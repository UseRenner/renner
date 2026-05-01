import { getViewer } from "@/lib/role";
import { PageShell } from "../_shared";
import { CompactBody } from "./CompactBody";

export const metadata = { title: "How it works · Compact · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function CompactHowItWorks() {
  const viewer = await getViewer();
  const showCta = !viewer;
  return (
    <PageShell active="compact" showCta={showCta}>
      <CompactBody showCta={showCta} />
    </PageShell>
  );
}
