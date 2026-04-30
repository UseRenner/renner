import { PlatePage } from "../_PlatePage";

export const metadata = {
  title: "How it works · Plate · Lowercase Italic 400 · Renner",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function PlateLowercaseItalic400Page() {
  return <PlatePage mark="lowercase-italic-400" />;
}
