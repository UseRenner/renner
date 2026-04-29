import { Charis_SIL } from "next/font/google";
import { FontBriefPage } from "../_FontBriefPage";

// Charis SIL ships only 400 and 700, so 400 is the lightest available.
// Drop labels from the default 500 to 400 to keep the page from going
// synthetic-bold and feeling heavier than intended.
const charis = Charis_SIL({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-test",
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

export const metadata = {
  title: "How it works · Brief · Charis SIL · Renner",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function BriefCharisSilPage() {
  const family = "var(--font-test), Georgia, serif";
  return (
    <FontBriefPage
      fontKey="charis-sil"
      fontVariableClass={charis.variable}
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
