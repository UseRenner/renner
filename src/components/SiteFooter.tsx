import Link from "next/link";
import { Wordmark } from "./Wordmark";

const COLUMNS = [
  {
    title: "Platform",
    links: [
      { href: "/how-it-works", label: "How it works" },
      { href: "/become-a-renner", label: "Become a Renner" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/terms", label: "Terms" },
      { href: "/privacy", label: "Privacy" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-row">
        <div className="site-footer-brand">
          <Wordmark tone="light" />
        </div>
        <div className="site-footer-cols">
          {COLUMNS.map((col) => (
            <div key={col.title} className="site-footer-col">
              <div
                style={{
                  fontFamily:
                    "var(--font-public-sans), ui-sans-serif, system-ui",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#7d8da0",
                  marginBottom: "16px",
                }}
              >
                {col.title}
              </div>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="footer-link"
                      style={{
                        fontFamily:
                          "var(--font-public-sans), ui-sans-serif, system-ui",
                        fontSize: "14px",
                        color: "#cad1d8",
                        textDecoration: "none",
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="site-footer-meta">© 2026 Renner</div>
    </footer>
  );
}
