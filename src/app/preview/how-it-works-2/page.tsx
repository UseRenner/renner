import { getViewer } from "@/lib/role";
import { RailBody } from "./RailBody";

export const metadata = {
  title: "How it works · Renner",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function PreviewHowItWorksRail() {
  const viewer = await getViewer();
  const showCta = !viewer;
  return <RailBody showCta={showCta} />;
}
