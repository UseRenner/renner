export function CategoryBadge({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        backgroundColor: "#eaedf0",
        color: "#4d5b6a",
        fontFamily: "var(--font-work-sans), ui-sans-serif, system-ui",
        fontSize: "10px",
        fontWeight: 500,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        padding: "4px 8px",
        borderRadius: "3px",
      }}
    >
      {children}
    </span>
  );
}

export function LicenseBadge() {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        backgroundColor: "#0d0f12",
        color: "#fbfbfc",
        fontFamily: "var(--font-work-sans), ui-sans-serif, system-ui",
        fontSize: "10px",
        fontWeight: 500,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        padding: "4px 8px",
        borderRadius: "3px",
      }}
    >
      License required
    </span>
  );
}
