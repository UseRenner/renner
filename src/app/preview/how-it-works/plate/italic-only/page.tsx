import { PlatePage } from "../_PlatePage";

export const metadata = {
  title: "How it works · Plate · Italic, No Symbol · Renner",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function PlateItalicOnlyPage() {
  return <PlatePage mark="italic-only" />;
}
