import { BureauStarkBody } from "./BureauStarkBody";

export const metadata = { title: "Landing · Bureau · Stark wall · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default function BureauStarkLanding() {
  return <BureauStarkBody />;
}
