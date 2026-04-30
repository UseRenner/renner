import { PlatePage } from "../_PlatePage";

export const metadata = {
  title: "How it works · Plate · Sans Caps, No Symbol · Renner",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function PlateSansCapsOnlyPage() {
  return <PlatePage mark="sans-caps-only" />;
}
