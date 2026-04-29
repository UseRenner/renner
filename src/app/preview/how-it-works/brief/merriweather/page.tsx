import { Merriweather } from "next/font/google";
import { FontBriefPage } from "../_FontBriefPage";

// Merriweather ships 300 / 400 / 700 / 900 with matching italics.
// Lean light: 300 on the H1 / wordmark / display elements, 400 on
// body and labels, 300 italic on the closer emphasis.
const merriweather = Merriweather({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-test",
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
});

export const metadata = {
  title: "How it works · Brief · Merriweather · Renner",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function BriefMerriweatherPage() {
  const family = "var(--font-test), Georgia, serif";
  return (
    <FontBriefPage
      fontKey="merriweather"
      fontVariableClass={merriweather.variable}
      font={{
        display: family,
        body: family,
        italicWeight: 300,
        displayWeight: 300,
        bodyWeight: 400,
        labelWeight: 400,
      }}
    />
  );
}
