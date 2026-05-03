import { BureauVaultBody } from "./BureauVaultBody";

export const metadata = { title: "Landing · Bureau · Vault wall · Renner", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default function BureauVaultLanding() {
  return <BureauVaultBody />;
}
