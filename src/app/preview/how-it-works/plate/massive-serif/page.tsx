import { PlatePage } from "../_PlatePage";

export const metadata = {
  title: "How it works · Plate · Massive Serif · Renner",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function PlateMassiveSerifPage() {
  return <PlatePage mark="massive-serif" />;
}
