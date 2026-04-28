"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wordmark } from "./Wordmark";

// Signed-out header. Logo lockup on the left, a small "Sign in"
// text link on the right. Signed-in users see the full TopNav
// instead; the marketing layout switches between the two based on
// auth state.
//
// The Sign in link is suppressed on /signin itself — pointing a link
// at the page you're already on is just noise.

export function MarketingHeader() {
  const pathname = usePathname();
  const showSignIn = pathname !== "/signin";

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
        style={{ maxWidth: "1200px" }}
      >
        <Wordmark />
        {showSignIn && (
          <Link
            href="/signin"
            className="nav-link"
            style={{
              fontFamily: "var(--font-work-sans), ui-sans-serif, system-ui",
              fontSize: "13px",
              fontWeight: 500,
              color: "#647589",
              padding: "8px 12px",
              textDecoration: "none",
            }}
          >
            Sign in
          </Link>
        )}
      </div>
    </header>
  );
}
