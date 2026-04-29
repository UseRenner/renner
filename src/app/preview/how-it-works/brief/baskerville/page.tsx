import { Libre_Baskerville } from "next/font/google";
import { FontBriefPage } from "../_FontBriefPage";

// "Baskerville" maps to Libre Baskerville on the web — an open
// digital revival cut for screen reading. System Baskerville is
// Apple-only and inconsistent across platforms, so this gives
// every visitor the same Baskerville-family feel reliably.
//
// Libre Baskerville ships 400 / 700 with a 400 italic. Labels at
// 400 to stay in range.
const baskerville = Libre_Baskerville({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-test",
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

export const metadata = {
  title: "How it works · Brief · Baskerville · Renner",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function BriefBaskervillePage() {
  const family = "var(--font-test), Georgia, serif";
  return (
    <FontBriefPage
      fontKey="baskerville"
      fontVariableClass={baskerville.variable}
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
