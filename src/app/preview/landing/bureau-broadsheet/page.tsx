import { BureauBroadsheetBody } from "./BureauBroadsheetBody";

export const metadata = { title: "Landing · Bureau · Broadsheet wall · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default function BureauBroadsheetLanding() {
  return <BureauBroadsheetBody />;
}
