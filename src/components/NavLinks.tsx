"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/browse", label: "Browse" },
  { href: "/post", label: "Post a task" },
  { href: "/my-tasks", label: "My tasks" },
  { href: "/messages", label: "Messages" },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-1">
      {LINKS.map((link) => {
        const active =
          pathname === link.href || pathname.startsWith(`${link.href}/`);
        return (
          <Link
            key={link.href}
            href={link.href}
            className="nav-link"
            style={{
              fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
              fontSize: "13px",
              fontWeight: 500,
              padding: "8px 12px",
              color: active ? "#0d0f12" : "#647589",
              backgroundColor: active ? "#f6f7f9" : "transparent",
            }}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
