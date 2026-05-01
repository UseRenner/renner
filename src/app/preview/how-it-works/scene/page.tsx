import { getViewer } from "@/lib/role";
import { PageShell } from "../_shared";
import { SceneBody } from "./SceneBody";

export const metadata = { title: "How it works · Scene · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function SceneHowItWorks() {
  const viewer = await getViewer();
  const showCta = !viewer;
  return (
    <PageShell active="scene" showCta={showCta}>
      <SceneBody showCta={showCta} />
    </PageShell>
  );
}
