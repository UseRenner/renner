import { BureauIterationBody } from "./BureauIterationBody";

export const metadata = { title: "Landing · Bureau · Iteration · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default function BureauIterationLanding() {
  return <BureauIterationBody />;
}
