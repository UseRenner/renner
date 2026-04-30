import { PlatePage } from "../_PlatePage";

export const metadata = {
  title: "How it works · Plate · Mono · Renner",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function PlateMonoPage() {
  return <PlatePage mark="mono" />;
}
