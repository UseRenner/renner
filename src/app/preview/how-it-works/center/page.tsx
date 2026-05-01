import { getViewer } from "@/lib/role";
import { PageShell } from "../_shared";
import { CenterBody } from "./CenterBody";

export const metadata = { title: "How it works · Center · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function CenterHowItWorks() {
  const viewer = await getViewer();
  const showCta = !viewer;
  return (
    <PageShell active="center" showCta={showCta}>
      <CenterBody showCta={showCta} />
    </PageShell>
  );
}
