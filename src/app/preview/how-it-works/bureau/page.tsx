import { getViewer } from "@/lib/role";
import { PageShell } from "../_shared";
import { BureauBody } from "./BureauBody";

export const metadata = { title: "How it works · Bureau · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function BureauHowItWorks() {
  const viewer = await getViewer();
  const showCta = !viewer;
  return (
    <PageShell active="bureau" showCta={showCta}>
      <BureauBody showCta={showCta} />
    </PageShell>
  );
}
