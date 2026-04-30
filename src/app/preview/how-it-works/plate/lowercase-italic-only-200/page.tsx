import { PlatePage } from "../_PlatePage";

export const metadata = {
  title: "How it works · Plate · Lowercase Italic 200, No Symbol · Renner",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function PlateLowercaseItalicOnly200Page() {
  return <PlatePage mark="lowercase-italic-only-200" />;
}
