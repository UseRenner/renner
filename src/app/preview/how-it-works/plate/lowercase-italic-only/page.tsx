import { PlatePage } from "../_PlatePage";

export const metadata = {
  title: "How it works · Plate · Lowercase Italic, No Symbol · Renner",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function PlateLowercaseItalicOnlyPage() {
  return <PlatePage mark="lowercase-italic-only" />;
}
