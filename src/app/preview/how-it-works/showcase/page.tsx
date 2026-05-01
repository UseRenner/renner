import { getViewer } from "@/lib/role";
import { PageShell } from "../_shared";
import { ShowcaseBody } from "./ShowcaseBody";

export const metadata = { title: "How it works · Showcase · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function ShowcaseHowItWorks() {
  const viewer = await getViewer();
  const showCta = !viewer;
  return (
    <PageShell active="showcase" showCta={showCta} tone="steel">
      <ShowcaseBody showCta={showCta} />
    </PageShell>
  );
}
