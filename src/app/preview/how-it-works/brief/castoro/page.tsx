import { Castoro } from "next/font/google";
import { FontBriefPage } from "../_FontBriefPage";

// Castoro alone — the previous pairing with Castoro Titling pushed
// the H1 into Titling's all-caps small-cap proportions, which read
// as "weird capitalization" on lowercase clauses. The text cut
// handles the H1 cleanly at clamp(40 / 80px) and ships a real
// italic for the closer emphasis. Weight 400 throughout.
const castoro = Castoro({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-test",
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata = {
  title: "How it works · Brief · Castoro · Renner",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function BriefCastoroPage() {
  const family = "var(--font-test), Georgia, serif";
  return (
    <FontBriefPage
      fontKey="castoro"
      fontVariableClass={castoro.variable}
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
