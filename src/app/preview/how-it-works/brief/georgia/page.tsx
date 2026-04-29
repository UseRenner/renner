import { FontBriefPage } from "../_FontBriefPage";

// Georgia is a system font shipped on macOS, iOS, Windows, and most
// Android distributions, so no Google Fonts download is required —
// we just specify the family stack directly. Where Georgia is not
// available the stack falls through to the platform's default
// serif, which on every supported platform looks similar.
//
// Georgia ships 400 / 700 with matching italics on most systems.

export const metadata = {
  title: "How it works · Brief · Georgia · Renner",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function BriefGeorgiaPage() {
  const family = "Georgia, 'Times New Roman', Times, serif";
  return (
    <FontBriefPage
      fontKey="georgia"
      fontVariableClass=""
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
