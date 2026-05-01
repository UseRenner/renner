import { getViewer } from "@/lib/role";
import { PageShell } from "../_shared";
import { NetworkBody } from "./NetworkBody";

export const metadata = { title: "How it works · Network · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function NetworkHowItWorks() {
  const viewer = await getViewer();
  const showCta = !viewer;
  return (
    <PageShell active="network" showCta={showCta} tone="steel">
      <NetworkBody showCta={showCta} />
    </PageShell>
  );
}
