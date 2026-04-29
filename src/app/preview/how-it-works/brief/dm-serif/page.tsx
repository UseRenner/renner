import { DM_Serif_Text } from "next/font/google";
import { FontBriefPage } from "../_FontBriefPage";

// DM Serif Text is the lighter sibling of DM Serif Display. Using
// Text alone (rather than pairing the heavy Display cut on the H1)
// keeps the page in DM Serif's lighter register throughout. Both
// cuts only ship at weight 400, so all weights here resolve to 400.
const dm = DM_Serif_Text({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-test",
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata = {
  title: "How it works · Brief · DM Serif · Renner",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function BriefDmSerifPage() {
  const family = "var(--font-test), Georgia, serif";
  return (
    <FontBriefPage
      fontKey="dm-serif"
      fontVariableClass={dm.variable}
      font={{
        display: family,
        body: family,
        italicWeight: 400,
        displayWeight: 400,
        bodyWeight: 400,
        labelWeight: 400,
        // DM Serif Text only ships at weight 400, so we shrink the
        // H1 to make the page read lighter overall.
        displaySize: "clamp(32px, 4.4vw, 56px)",
      }}
    />
  );
}
