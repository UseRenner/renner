import { redirect } from "next/navigation";

export const metadata = {
  title: "How it works · Renner",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default function PreviewHowItWorksIndex() {
  redirect("/preview/how-it-works/atelier");
}
