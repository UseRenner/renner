import { BrowseTabs } from "@/components/BrowseTabs";

export default function BrowseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="pt-12 pb-20 px-6">
      <div className="mx-auto" style={{ maxWidth: "1100px" }}>
        <h1
          className="font-display-tight"
          style={{
            fontSize: "48px",
            lineHeight: 1.05,
            color: "#0d0f12",
            marginBottom: "20px",
          }}
        >
          Browse
        </h1>
        <BrowseTabs />
        {children}
      </div>
    </main>
  );
}
