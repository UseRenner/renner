import { Tinos } from "next/font/google";
import { FontBriefPage } from "../_FontBriefPage";

// Tinos ships 400 / 700 with matching italics (Times-metrics-
// compatible). Labels drop from 500 to 400 to stay in range.
const tinos = Tinos({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-test",
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

export const metadata = {
  title: "How it works · Brief · Tinos · Renner",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function BriefTinosPage() {
  const family = "var(--font-test), Georgia, serif";
  return (
    <FontBriefPage
      fontKey="tinos"
      fontVariableClass={tinos.variable}
      font={{
        display: family,
        body: family,
        italicWeight: 400,
        displayWeight: 400,
        bodyWeight: 400,
        labelWeight: 400,
      }}
    />
  );
}
