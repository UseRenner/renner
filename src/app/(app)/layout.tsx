import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { TopNav } from "@/components/TopNav";

// Authenticated app surface — never indexed. Search engines should
// not crawl any task data, profile, message, or settings page. The
// noindex/nofollow meta tag is reinforced by an X-Robots-Tag header
// in middleware for protected paths.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopNav />
      {children}
      <SiteFooter />
    </>
  );
}
