import { NetworkPage } from "./_NetworkPage";

export const metadata = {
  title: "How it works · Network · Renner",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function NetworkSerifPage() {
  return <NetworkPage mark="serif" />;
}
