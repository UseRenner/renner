import { getViewer } from "@/lib/role";
import { VariantSwitcher } from "../how-it-works/_shared";
import { RailBody } from "./RailBody";

export const metadata = {
  title: "How it works · Rail · Renner",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function PreviewHowItWorksRail() {
  const viewer = await getViewer();
  const showCta = !viewer;
  return (
    <>
      <VariantSwitcher active="rail" />
      <RailBody showCta={showCta} />
    </>
  );
}
