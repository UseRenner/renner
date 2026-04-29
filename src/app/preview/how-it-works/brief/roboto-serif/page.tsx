import { Roboto_Serif } from "next/font/google";
import { FontBriefPage } from "../_FontBriefPage";

// Roboto Serif is a variable font with opsz, wght, wdth, GRAD axes —
// next/font picks them up automatically when no weight is specified.
const roboto = Roboto_Serif({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-test",
  style: ["normal", "italic"],
});

export const metadata = {
  title: "How it works · Brief · Roboto Serif · Renner",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function BriefRobotoSerifPage() {
  const family = "var(--font-test), Georgia, serif";
  return (
    <FontBriefPage
      fontKey="roboto-serif"
      fontVariableClass={roboto.variable}
      font={{
        display: family,
        body: family,
        italicWeight: 300,
      }}
    />
  );
}
