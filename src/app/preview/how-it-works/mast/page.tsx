import { getViewer } from "@/lib/role";
import { PageShell } from "../_shared";
import { MastBody } from "./MastBody";

export const metadata = { title: "How it works · Mast · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function MastHowItWorks() {
  const viewer = await getViewer();
  const showCta = !viewer;
  return (
    <PageShell active="mast" showCta={showCta}>
      <MastBody showCta={showCta} />
    </PageShell>
  );
}
