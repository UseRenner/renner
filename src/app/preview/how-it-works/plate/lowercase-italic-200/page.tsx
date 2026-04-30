import { PlatePage } from "../_PlatePage";

export const metadata = {
  title: "How it works · Plate · Lowercase Italic 200 · Renner",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function PlateLowercaseItalic200Page() {
  return <PlatePage mark="lowercase-italic-200" />;
}
