import { Inria_Serif } from "next/font/google";
import { FontBriefPage } from "../_FontBriefPage";

const inria = Inria_Serif({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-test",
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
});

export const metadata = {
  title: "How it works · Brief · Inria Serif · Renner",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function BriefInriaSerifPage() {
  const family = "var(--font-test), Georgia, serif";
  return (
    <FontBriefPage
      fontKey="inria-serif"
      fontVariableClass={inria.variable}
      font={{
        display: family,
        body: family,
        italicWeight: 300,
      }}
    />
  );
}
