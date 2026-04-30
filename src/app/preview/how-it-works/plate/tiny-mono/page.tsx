import { PlatePage } from "../_PlatePage";

export const metadata = {
  title: "How it works · Plate · Tiny Mono · Renner",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function PlateTinyMonoPage() {
  return <PlatePage mark="tiny-mono" />;
}
