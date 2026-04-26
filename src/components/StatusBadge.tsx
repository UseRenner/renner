import type { TaskStatus } from "@/lib/types";

const STYLES: Record<
  TaskStatus,
  { background: string; color: string }
> = {
  Open: { background: "#eaedf0", color: "#0d0f12" },
  Booked: { background: "rgba(45,138,78,0.08)", color: "#2d8a4e" },
  "Pending approval": { background: "#eaedf0", color: "#4d5b6a" },
  Complete: { background: "rgba(45,138,78,0.08)", color: "#2d8a4e" },
  Disputed: { background: "rgba(192,57,43,0.08)", color: "#c0392b" },
  Closed: { background: "#f6f7f9", color: "#7d8da0" },
};

const LABELS: Record<TaskStatus, string> = {
  Open: "Open",
  Booked: "Booked",
  "Pending approval": "Pending confirmation",
  Complete: "Complete",
  Disputed: "Disputed",
  Closed: "Closed",
};

export function StatusBadge({ status }: { status: TaskStatus }) {
  const style = STYLES[status] ?? STYLES.Open;
  const label = LABELS[status] ?? status;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        backgroundColor: style.background,
        color: style.color,
        fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
        fontSize: "11px",
        fontWeight: 500,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        padding: "5px 10px",
        borderRadius: "999px",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}

export function PaymentIndicator({
  status,
}: {
  status: string | null | undefined;
}) {
  if (!status || status === "unpaid") return null;

  let label = "";
  let color = "#647589";
  switch (status) {
    case "held":
      label = "Payment held";
      color = "#647589";
      break;
    case "released":
      label = "Payment released";
      color = "#2d8a4e";
      break;
    case "refunded":
      label = "Payment refunded";
      color = "#647589";
      break;
    case "disputed":
      label = "Disputed";
      color = "#c0392b";
      break;
    default:
      return null;
  }

  return (
    <span
      style={{
        fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
        fontSize: "12px",
        color,
        fontWeight: 500,
      }}
    >
      {label}
    </span>
  );
}
