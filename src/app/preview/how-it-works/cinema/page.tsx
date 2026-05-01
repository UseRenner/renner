import { getViewer } from "@/lib/role";
import { PageShell } from "../_shared";
import { CinemaBody } from "./CinemaBody";

export const metadata = { title: "How it works · Cinema · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function CinemaHowItWorks() {
  const viewer = await getViewer();
  const showCta = !viewer;
  return (
    <PageShell active="cinema" showCta={showCta}>
      <CinemaBody showCta={showCta} />
    </PageShell>
  );
}
