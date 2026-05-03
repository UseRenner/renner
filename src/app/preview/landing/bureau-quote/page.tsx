import { BureauQuoteBody } from "./BureauQuoteBody";

export const metadata = { title: "Landing · Bureau · Quote wall · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default function BureauQuoteLanding() {
  return <BureauQuoteBody />;
}
