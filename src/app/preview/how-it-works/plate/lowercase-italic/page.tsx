import { PlatePage } from "../_PlatePage";

export const metadata = {
  title: "How it works · Plate · Lowercase Italic · Renner",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function PlateLowercaseItalicPage() {
  return <PlatePage mark="lowercase-italic" />;
}
