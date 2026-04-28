"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/browse", label: "Tasks" },
  { href: "/browse/renners", label: "Renners" },
  { href: "/browse/clients", label: "Clients" },
];

export function BrowseTabs() {
  const pathname = usePathname();
  return (
    <nav
      className="flex items-center gap-1"
      style={{
        marginBottom: "32px",
        borderBottom: "1px solid #eaedf0",
      }}
      aria-label="Browse sections"
    >
      {TABS.map((tab) => {
        const active = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            style={{
              fontFamily: "var(--font-source-sans), ui-sans-serif, system-ui",
              fontSize: "14px",
              fontWeight: 500,
              color: active ? "#0d0f12" : "#7d8da0",
              padding: "10px 14px",
              borderBottom: active
                ? "2px solid #0d0f12"
                : "2px solid transparent",
              marginBottom: "-1px",
              textDecoration: "none",
              transition: "color 150ms ease, border-color 150ms ease",
            }}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
