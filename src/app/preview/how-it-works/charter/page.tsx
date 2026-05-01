import { getViewer } from "@/lib/role";
import { PageShell } from "../_shared";
import { CharterBody } from "./CharterBody";

export const metadata = { title: "How it works · Charter · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function CharterHowItWorks() {
  const viewer = await getViewer();
  const showCta = !viewer;
  return (
    <PageShell active="charter" showCta={showCta}>
      <CharterBody showCta={showCta} />
    </PageShell>
  );
}
