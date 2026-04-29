import { Castoro, Castoro_Titling } from "next/font/google";
import { FontBriefPage } from "../_FontBriefPage";

// Castoro ships as a paired family — Castoro Titling for display
// settings and Castoro for body. Castoro Titling is regular only
// (no italic); Castoro has italic. Pair them so the H1 uses the
// titling cut and the rest of the page uses the body cut.
const castoroTitling = Castoro_Titling({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-test-display",
  weight: "400",
});

const castoro = Castoro({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-test-body",
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata = {
  title: "How it works · Brief · Castoro · Renner",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function BriefCastoroPage() {
  return (
    <FontBriefPage
      fontKey="castoro"
      fontVariableClass={`${castoroTitling.variable} ${castoro.variable}`}
      font={{
        display: "var(--font-test-display), Georgia, serif",
        // Italic emphasis lives in body text, so the body cut handles
        // both upright and italic — Castoro Titling has no italic.
        body: "var(--font-test-body), Georgia, serif",
        italicWeight: 400,
      }}
    />
  );
}
