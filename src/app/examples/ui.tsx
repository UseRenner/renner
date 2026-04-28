// Shared UI bits used across the /examples scenes.
import { formatDisplayName, formatDisplayNameWithCompany, formatInitials } from "@/lib/displayName";
import type { ExampleClient, ExampleRenner } from "./data";

export function Avatar({
  user,
  size = 44,
}: {
  user: ExampleRenner | ExampleClient;
  size?: number;
}) {
  return (
    <div
      className="flex items-center justify-center"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "9999px",
        backgroundColor: "#0d0f12",
        color: "#fbfbfc",
        fontFamily: "var(--font-work-sans), ui-sans-serif, system-ui",
        fontSize: `${Math.round(size * 0.32)}px`,
        fontWeight: 500,
        flexShrink: 0,
      }}
    >
      {formatInitials(user)}
    </div>
  );
}

export function ClientName({ client }: { client: ExampleClient }) {
  return <>{formatDisplayNameWithCompany(client)}</>;
}

export function RennerName({ renner }: { renner: ExampleRenner }) {
  return <>{formatDisplayName(renner)}</>;
}

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

export function StatusPill({
  status,
}: {
  status:
    | "Open"
    | "Booked"
    | "Started"
    | "Pending approval"
    | "Complete"
    | "Closed";
}) {
  const palette: Record<string, { bg: string; fg: string }> = {
    Open: { bg: "#eaedf0", fg: "#4d5b6a" },
    Booked: { bg: "rgba(13,15,18,0.06)", fg: "#0d0f12" },
    Started: { bg: "rgba(45,138,78,0.10)", fg: "#2d8a4e" },
    "Pending approval": { bg: "rgba(234,179,8,0.10)", fg: "#7a5b09" },
    Complete: { bg: "rgba(45,138,78,0.10)", fg: "#2d8a4e" },
    Closed: { bg: "#eaedf0", fg: "#4d5b6a" },
  };
  const p = palette[status] ?? palette["Open"];
  return (
    <span
      style={{
        backgroundColor: p.bg,
        color: p.fg,
        fontFamily: "var(--font-work-sans), ui-sans-serif, system-ui",
        fontSize: "10px",
        fontWeight: 500,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        padding: "3px 7px",
        borderRadius: "3px",
      }}
    >
      {status}
    </span>
  );
}

export function VerifiedTag() {
  return (
    <span
      style={{
        backgroundColor: "rgba(45,138,78,0.10)",
        color: "#2d8a4e",
        fontFamily: "var(--font-work-sans), ui-sans-serif, system-ui",
        fontSize: "10px",
        fontWeight: 500,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        padding: "3px 7px",
        borderRadius: "3px",
      }}
    >
      Background-checked
    </span>
  );
}

export function LicensedTag() {
  return (
    <span
      style={{
        backgroundColor: "#0d0f12",
        color: "#fbfbfc",
        fontFamily: "var(--font-work-sans), ui-sans-serif, system-ui",
        fontSize: "10px",
        fontWeight: 500,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        padding: "3px 7px",
        borderRadius: "3px",
      }}
    >
      Licensed
    </span>
  );
}

export function PageTitle({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <>
      <div className="micro-label" style={{ marginBottom: "12px" }}>
        {eyebrow}
      </div>
      <h1
        className="font-display-tight"
        style={{
          fontSize: "44px",
          lineHeight: 1.05,
          color: "#0d0f12",
          marginBottom: "32px",
        }}
      >
        {title}
      </h1>
    </>
  );
}

export function MutedRow({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontFamily: "var(--font-work-sans), ui-sans-serif, system-ui",
        fontSize: "13px",
        color: "#647589",
        lineHeight: 1.55,
      }}
    >
      {children}
    </div>
  );
}
