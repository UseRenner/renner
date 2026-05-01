import { getViewer } from "@/lib/role";
import { PageShell } from "../_shared";
import { StackBody } from "./StackBody";

export const metadata = { title: "How it works · Stack · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function StackHowItWorks() {
  const viewer = await getViewer();
  const showCta = !viewer;
  return (
    <PageShell active="stack" showCta={showCta}>
      <StackBody showCta={showCta} />
    </PageShell>
  );
}
