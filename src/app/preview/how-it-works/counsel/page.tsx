import { getViewer } from "@/lib/role";
import { PageShell } from "../_shared";
import { CounselBody } from "./CounselBody";

export const metadata = { title: "How it works · Counsel · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function CounselHowItWorks() {
  const viewer = await getViewer();
  const showCta = !viewer;
  return (
    <PageShell active="counsel" showCta={showCta} tone="ink">
      <CounselBody showCta={showCta} />
    </PageShell>
  );
}
