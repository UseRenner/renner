import Link from "next/link";
import { Wordmark } from "./Wordmark";

const COLUMNS = [
  {
    title: "Platform",
    links: [
      { href: "/how-it-works", label: "How it works" },
      { href: "/signup", label: "Become a Renner" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/how-it-works", label: "About" },
      { href: "/how-it-works", label: "FAQ" },
      { href: "mailto:hello@renner.app", label: "Contact" },
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
    <footer
      style={{
        backgroundColor: "#0d0f12",
        color: "#cad1d8",
        padding: "72px 32px 32px",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: "1200px" }}>
        <div
          className="grid gap-10"
          style={{ gridTemplateColumns: "1.4fr repeat(3, 1fr)" }}
        >
          <div>
            <Wordmark tone="light" />
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <div
                style={{
                  fontFamily:
                    "var(--font-inter), ui-sans-serif, system-ui",
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
                          "var(--font-inter), ui-sans-serif, system-ui",
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
        <div
          style={{
            marginTop: "56px",
            paddingTop: "20px",
            borderTop: "1px solid #272d35",
            fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
            fontSize: "12px",
            color: "#7d8da0",
          }}
        >
          © 2026 Renner
        </div>
      </div>
    </footer>
  );
}
