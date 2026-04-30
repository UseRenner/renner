import { NetworkPage } from "../_NetworkPage";

export const metadata = {
  title: "How it works · Network · Italic, No Symbol · Renner",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function NetworkItalicOnlyPage() {
  return <NetworkPage mark="italic-only" />;
}
