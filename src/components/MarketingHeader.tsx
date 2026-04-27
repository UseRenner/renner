import Link from "next/link";
import { Wordmark } from "./Wordmark";

const NAV_LINKS = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/post", label: "Post a task" },
  { href: "/signin", label: "Sign in" },
];

export function MarketingHeader() {
  return (
    <header
      className="sticky top-0 z-50"
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
        <div className="flex items-center gap-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link"
              style={{
                fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
                fontSize: "13px",
                fontWeight: 500,
                color: "#647589",
                padding: "8px 12px",
                textDecoration: "none",
                borderRadius: "6px",
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/signup"
            className="btn-light"
            style={{
              fontSize: "13px",
              padding: "9px 16px",
              textDecoration: "none",
              marginLeft: "4px",
            }}
          >
            Become a Renner
          </Link>
        </div>
      </div>
    </header>
  );
}
