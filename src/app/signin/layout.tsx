import type { Metadata } from "next";

// Sign-in is a private surface even though it's pre-auth — keep it
// out of the search index so the form doesn't get harvested as a
// landing page above the real / page.
export const metadata: Metadata = {
  title: "Sign in · Renner",
  robots: { index: false, follow: false },
};

export default function SigninLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
