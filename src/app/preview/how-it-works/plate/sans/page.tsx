import { PlatePage } from "../_PlatePage";

export const metadata = {
  title: "How it works · Plate · Sans · Renner",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function PlateSansPage() {
  return <PlatePage mark="sans" />;
}
