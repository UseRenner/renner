import { getViewer } from "@/lib/role";
import { PageShell } from "../_shared";
import { MarketplaceBody } from "./MarketplaceBody";

export const metadata = { title: "How it works · Marketplace · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function MarketplaceHowItWorks() {
  const viewer = await getViewer();
  const showCta = !viewer;
  return (
    <PageShell active="marketplace" showCta={showCta}>
      <MarketplaceBody showCta={showCta} />
    </PageShell>
  );
}
