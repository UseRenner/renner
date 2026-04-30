import { PlatePage } from "../_PlatePage";

export const metadata = {
  title: "How it works · Plate · Sans Caps · Renner",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function PlateSansCapsPage() {
  return <PlatePage mark="sans-caps" />;
}
