import { getViewer } from "@/lib/role";
import { PageShell } from "../_shared";
import { PlateBody } from "./PlateBody";

export const metadata = { title: "How it works · Plate · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function PlateHowItWorks() {
  const viewer = await getViewer();
  const showCta = !viewer;
  return (
    <PageShell active="plate" showCta={showCta}>
      <PlateBody showCta={showCta} />
    </PageShell>
  );
}
