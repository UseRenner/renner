import { NetworkPage } from "../_NetworkPage";

export const metadata = {
  title: "How it works · Network · Sans Wordmark · Renner",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function NetworkSansPage() {
  return <NetworkPage mark="sans" />;
}
