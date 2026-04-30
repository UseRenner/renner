import { PlatePage } from "../_PlatePage";

export const metadata = {
  title: "How it works · Plate · Symbol Only · Renner",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function PlateSymbolPage() {
  return <PlatePage mark="symbol" />;
}
