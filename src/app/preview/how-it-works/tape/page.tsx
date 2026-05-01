import { getViewer } from "@/lib/role";
import { PageShell } from "../_shared";
import { TapeBody } from "./TapeBody";

export const metadata = { title: "How it works · Tape · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function TapeHowItWorks() {
  const viewer = await getViewer();
  const showCta = !viewer;
  return (
    <PageShell active="tape" showCta={showCta}>
      <TapeBody showCta={showCta} />
    </PageShell>
  );
}
