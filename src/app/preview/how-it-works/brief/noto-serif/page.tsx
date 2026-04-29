import { Noto_Serif } from "next/font/google";
import { FontBriefPage } from "../_FontBriefPage";

// Noto Serif ships a variable wght axis with full italic coverage.
const noto = Noto_Serif({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-test",
  style: ["normal", "italic"],
});

export const metadata = {
  title: "How it works · Brief · Noto Serif · Renner",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function BriefNotoSerifPage() {
  const family = "var(--font-test), Georgia, serif";
  return (
    <FontBriefPage
      fontKey="noto-serif"
      fontVariableClass={noto.variable}
      font={{
        display: family,
        body: family,
        italicWeight: 300,
      }}
    />
  );
}
