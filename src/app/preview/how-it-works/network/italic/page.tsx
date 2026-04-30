import { NetworkPage } from "../_NetworkPage";

export const metadata = {
  title: "How it works · Network · Italic Wordmark · Renner",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function NetworkItalicPage() {
  return <NetworkPage mark="italic" />;
}
