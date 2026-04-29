import { PT_Serif } from "next/font/google";
import { FontBriefPage } from "../_FontBriefPage";

// PT Serif ships 400 / 700 with matching italics — bump italic to
// 400 since there is no light italic.
const pt = PT_Serif({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-test",
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

export const metadata = {
  title: "How it works · Brief · PT Serif · Renner",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function BriefPtSerifPage() {
  const family = "var(--font-test), Georgia, serif";
  return (
    <FontBriefPage
      fontKey="pt-serif"
      fontVariableClass={pt.variable}
      font={{
        display: family,
        body: family,
        italicWeight: 400,
      }}
    />
  );
}
