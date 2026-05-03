import { BureauArchiveBody } from "./BureauArchiveBody";

export const metadata = { title: "Landing · Bureau · Archive wall · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default function BureauArchiveLanding() {
  return <BureauArchiveBody />;
}
