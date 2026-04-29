import { Instrument_Serif } from "next/font/google";
import { FontBriefPage } from "../_FontBriefPage";

// Instrument Serif ships a single weight (400) with italic. Drop
// labels from the default 500 to 400 to keep the page in the
// family's actual range and avoid synthetic-bold escalation.
const instrument = Instrument_Serif({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-test",
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata = {
  title: "How it works · Brief · Instrument Serif · Renner",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function BriefInstrumentSerifPage() {
  const family = "var(--font-test), Georgia, serif";
  return (
    <FontBriefPage
      fontKey="instrument-serif"
      fontVariableClass={instrument.variable}
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
