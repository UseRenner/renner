import { SiteFooter } from "@/components/SiteFooter";
import { TopNav } from "@/components/TopNav";

export default function MarketingLayout({
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
