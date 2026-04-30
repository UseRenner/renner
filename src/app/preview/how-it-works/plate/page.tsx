import { PlatePage } from "./_PlatePage";

export const metadata = {
  title: "How it works · Plate · Renner",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function PlateSerifPage() {
  return <PlatePage mark="serif" />;
}
