import type { Metadata } from "next";

// Profile-setup is the post-signup onboarding form — strictly
// authenticated and never useful to a search engine.
export const metadata: Metadata = {
  title: "Set up your profile · Renner",
  robots: { index: false, follow: false },
};

export default function ProfileSetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
