import { getViewer } from "@/lib/role";
import { PageShell } from "../_shared";
import { FrameBody } from "./FrameBody";

export const metadata = { title: "How it works · Frame · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function FrameHowItWorks() {
  const viewer = await getViewer();
  const showCta = !viewer;
  return (
    <PageShell active="frame" showCta={showCta} tone="steel">
      <FrameBody showCta={showCta} />
    </PageShell>
  );
}
