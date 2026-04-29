import { Judson } from "next/font/google";
import { FontBriefPage } from "../_FontBriefPage";

// Judson ships 400 / 700 with a 400 italic.
const judson = Judson({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-test",
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

export const metadata = {
  title: "How it works · Brief · Judson · Renner",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function BriefJudsonPage() {
  const family = "var(--font-test), Georgia, serif";
  return (
    <FontBriefPage
      fontKey="judson"
      fontVariableClass={judson.variable}
      font={{
        display: family,
        body: family,
        italicWeight: 400,
      }}
    />
  );
}
