import { PlatePage } from "../_PlatePage";

export const metadata = {
  title: "How it works · Plate · Italic Serif · Renner",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function PlateItalicPage() {
  return <PlatePage mark="italic" />;
}
