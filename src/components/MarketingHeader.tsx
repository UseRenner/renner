import Link from "next/link";
import { Wordmark } from "./Wordmark";

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
        className="flex items-center justify-between mx-auto"
        style={{ maxWidth: "1100px" }}
      >
        <Wordmark />
        <Link
          href="/signin"
          style={{
            fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
            fontSize: "13px",
            fontWeight: 500,
            color: "#647589",
            textDecoration: "none",
          }}
        >
          Sign in
        </Link>
      </div>
    </header>
  );
}
