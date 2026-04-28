import Link from "next/link";
import { MarketingHeader } from "@/components/MarketingHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = {
  title: "Examples · Renner",
  robots: { index: false, follow: false },
};

export default function ExamplesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MarketingHeader />
      <div
        style={{
          backgroundColor: "#fef9c3",
          borderBottom: "1px solid #facc15",
          padding: "10px 20px",
          textAlign: "center",
          fontFamily: "var(--font-public-sans), ui-sans-serif, system-ui",
          fontSize: "12px",
          color: "#713f12",
        }}
      >
        Internal preview — populated mockups for design review. Not real
        data.{" "}
        <Link
          href="/examples"
          style={{ color: "#713f12", textDecoration: "underline" }}
        >
          Index
        </Link>
      </div>
      <main className="pt-10 pb-20 px-6">{children}</main>
      <SiteFooter />
    </>
  );
}
