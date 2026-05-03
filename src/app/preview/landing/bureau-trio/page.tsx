import { BureauTrioBody } from "./BureauTrioBody";

export const metadata = { title: "Landing · Bureau · Trio wall · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default function BureauTrioLanding() {
  return <BureauTrioBody />;
}
