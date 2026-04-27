import { SiteFooter } from "@/components/SiteFooter";
import { TopNav } from "@/components/TopNav";

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
