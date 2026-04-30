import { PlatePage } from "../_PlatePage";

export const metadata = {
  title: "How it works · Plate · Serif Caps · Renner",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function PlateSerifCapsPage() {
  return <PlatePage mark="serif-caps" />;
}
