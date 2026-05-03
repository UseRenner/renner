import { BureauStackBody } from "./BureauStackBody";

export const metadata = { title: "Landing · Bureau · Stack wall · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default function BureauStackLanding() {
  return <BureauStackBody />;
}
