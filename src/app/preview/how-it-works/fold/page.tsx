import { getViewer } from "@/lib/role";
import { PageShell } from "../_shared";
import { FoldBody } from "./FoldBody";

export const metadata = { title: "How it works · Fold · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function FoldHowItWorks() {
  const viewer = await getViewer();
  const showCta = !viewer;
  return (
    <PageShell active="fold" showCta={showCta}>
      <FoldBody showCta={showCta} />
    </PageShell>
  );
}
