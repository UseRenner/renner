import { getViewer } from "@/lib/role";
import { PageShell } from "../_shared";
import { AtelierBody } from "./AtelierBody";

export const metadata = { title: "How it works · Atelier · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AtelierHowItWorks() {
  const viewer = await getViewer();
  const showCta = !viewer;
  return (
    <PageShell active="atelier" showCta={showCta}>
      <AtelierBody showCta={showCta} />
    </PageShell>
  );
}
