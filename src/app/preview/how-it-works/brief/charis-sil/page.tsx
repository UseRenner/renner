import { Charis_SIL } from "next/font/google";
import { FontBriefPage } from "../_FontBriefPage";

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
      }}
    />
  );
}
