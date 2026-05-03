import { BureauLooseBody } from "./BureauLooseBody";

export const metadata = { title: "Landing · Bureau · Loose · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default function BureauLooseLanding() {
  return <BureauLooseBody />;
}
