import { Wordmark } from "./Wordmark";

// Signed-out header. Logo lockup only — no nav links, no CTA.
// Signed-in users see the full TopNav instead; the marketing
// layout switches between the two based on auth state.

export function MarketingHeader() {
  return (
    <header
      style={{
        backgroundColor: "#fbfbfc",
        borderBottom: "1px solid #dce0e5",
        padding: "16px 32px",
      }}
    >
      <div
        className="flex items-center mx-auto"
        style={{ maxWidth: "1200px" }}
      >
        <Wordmark />
      </div>
    </header>
  );
}
