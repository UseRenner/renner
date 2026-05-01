import { getViewer } from "@/lib/role";
import { PageShell } from "../_shared";
import { AnchorBody } from "./AnchorBody";

export const metadata = { title: "How it works · Anchor · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AnchorHowItWorks() {
  const viewer = await getViewer();
  const showCta = !viewer;
  return (
    <PageShell active="anchor" showCta={showCta}>
      <AnchorBody showCta={showCta} />
    </PageShell>
  );
}
