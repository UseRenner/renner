import { DM_Serif_Display, DM_Serif_Text } from "next/font/google";
import { FontBriefPage } from "../_FontBriefPage";

// DM Serif ships as two paired families — Display for the heavy
// hairline-thin H1 and Text for everything else. Both are weight 400
// with italic. Pair them so the page uses the family across its
// intended range.
const dmDisplay = DM_Serif_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-test-display",
  weight: "400",
  style: ["normal", "italic"],
});

const dmText = DM_Serif_Text({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-test-body",
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata = {
  title: "How it works · Brief · DM Serif · Renner",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function BriefDmSerifPage() {
  return (
    <FontBriefPage
      fontKey="dm-serif"
      fontVariableClass={`${dmDisplay.variable} ${dmText.variable}`}
      font={{
        display: "var(--font-test-display), Georgia, serif",
        body: "var(--font-test-body), Georgia, serif",
        italicWeight: 400,
      }}
    />
  );
}
