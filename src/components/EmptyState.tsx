import Link from "next/link";

// Shared empty state for authenticated list views.
//
// One line of copy, optionally one button if there's a clear next
// action. Steel palette, no illustrations, no emojis. The copy is a
// declarative statement, not a sad announcement.

type Action =
  | { label: string; href: string; tone?: "dark" | "light" }
  | undefined;

export function EmptyState({
  message,
  action,
}: {
  message: string;
  action?: Action;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
        padding: "96px 32px",
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-public-sans), ui-sans-serif, system-ui",
          fontSize: "15px",
          fontWeight: 500,
          color: "#0d0f12",
          margin: 0,
          lineHeight: 1.5,
        }}
      >
        {message}
      </p>
      {action && (
        <Link
          href={action.href}
          className={action.tone === "light" ? "btn-light" : "btn-dark"}
          style={{
            width: "auto",
            padding: "11px 20px",
            textDecoration: "none",
            display: "inline-flex",
          }}
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}
