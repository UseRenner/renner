import { Gelasio } from "next/font/google";
import { FontBriefPage } from "../_FontBriefPage";

// Gelasio ships 400 / 500 / 600 / 700 with matching italics
// (Georgia-metrics-compatible). 400 is the lightest available;
// labels stay at 400 instead of stepping up to 500 so the page
// reads in one register.
const gelasio = Gelasio({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-test",
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
});

export const metadata = {
  title: "How it works · Brief · Gelasio · Renner",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function BriefGelasioPage() {
  const family = "var(--font-test), Georgia, serif";
  return (
    <FontBriefPage
      fontKey="gelasio"
      fontVariableClass={gelasio.variable}
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
