import { Wordmark } from "@/components/Wordmark";

export default function BrowsePage() {
  return (
    <main className="min-h-screen pt-10 pb-20 px-6">
      <div className="mx-auto" style={{ maxWidth: "1100px" }}>
        <div className="flex items-center justify-between mb-12">
          <Wordmark />
        </div>

        <div className="micro-label" style={{ marginBottom: "12px" }}>
          Marketplace
        </div>
        <h1
          className="font-display-tight"
          style={{
            fontSize: "56px",
            lineHeight: 1.05,
            color: "#0d0f12",
            marginBottom: "16px",
            maxWidth: "720px",
          }}
        >
          Browse <span className="headline-em">open tasks</span>
        </h1>
        <p
          style={{
            color: "#647589",
            fontSize: "16px",
            lineHeight: 1.6,
            maxWidth: "560px",
          }}
        >
          Tasks posted by clients in your area will appear here. Listings are
          coming online soon.
        </p>
      </div>
    </main>
  );
}
