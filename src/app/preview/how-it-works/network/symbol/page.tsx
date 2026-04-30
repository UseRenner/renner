import { NetworkPage } from "../_NetworkPage";

export const metadata = {
  title: "How it works · Network · Symbol Only · Renner",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function NetworkSymbolPage() {
  return <NetworkPage mark="symbol" />;
}
