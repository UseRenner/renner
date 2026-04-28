import { TASKS } from "../data";
import { CategoryBadge, ClientName, PageTitle, StatusPill } from "../ui";

export default function RennerDashboardExample() {
  const active = TASKS.filter(
    (t) => t.status === "Booked" || t.status === "Started",
  );
  const upcoming = [
    {
      title: "Showing at 1290 Pearl St",
      when: "Apr 27, 11:30 AM",
      category: "Showing",
      pay: 120,
    },
    {
      title: "Sign install at 18 Kalamath",
      when: "Apr 29, 9:00 AM",
      category: "Signs",
      pay: 45,
    },
    {
      title: "Open house at 902 Cherry Hills",
      when: "May 4, 12:00 – 4:00 PM",
      category: "Open house",
      pay: 220,
    },
  ];

  return (
    <div className="mx-auto" style={{ maxWidth: "1100px" }}>
      <PageTitle eyebrow="Renner dashboard" title="Welcome back, Marcus." />

      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          marginBottom: "32px",
        }}
      >
        <Stat label="Active tasks" value="2" />
        <Stat label="This week" value="$385" sub="3 tasks" />
        <Stat label="This month" value="$1,640" sub="14 tasks" />
        <Stat label="All time" value="$7,945" sub="87 tasks" />
      </div>

      <h2
        className="font-display"
        style={{ fontSize: "22px", marginBottom: "16px" }}
      >
        Active
      </h2>
      <div
        className="flex flex-col gap-3"
        style={{ marginBottom: "32px" }}
      >
        {active.map((task) => (
          <div
            key={task.id}
            className="card"
            style={{ padding: "20px 24px" }}
          >
            <div
              className="flex items-center justify-between"
              style={{ marginBottom: "8px" }}
            >
              <div className="flex items-center gap-2 flex-wrap">
                <CategoryBadge>{task.category}</CategoryBadge>
                <StatusPill status={task.status} />
              </div>
              <span
                className="font-display"
                style={{
                  fontSize: "20px",
                  fontWeight: 500,
                  color: "#0d0f12",
                }}
              >
                ${task.pay}
              </span>
            </div>
            <div
              style={{
                fontFamily: "var(--font-work-sans), ui-sans-serif, system-ui",
                fontSize: "15px",
                fontWeight: 500,
                marginBottom: "4px",
              }}
            >
              {task.title}
            </div>
            <div
              style={{
                fontFamily: "var(--font-work-sans), ui-sans-serif, system-ui",
                fontSize: "12px",
                color: "#7d8da0",
              }}
            >
              {task.date_label} · {task.city}, {task.state} · for{" "}
              <ClientName client={task.posted_by} />
            </div>
          </div>
        ))}
      </div>

      <h2
        className="font-display"
        style={{ fontSize: "22px", marginBottom: "16px" }}
      >
        Upcoming
      </h2>
      <div className="flex flex-col gap-2">
        {upcoming.map((u, i) => (
          <div
            key={i}
            className="card flex items-center justify-between"
            style={{ padding: "14px 20px" }}
          >
            <div className="flex items-center gap-3 flex-wrap">
              <CategoryBadge>{u.category}</CategoryBadge>
              <span
                style={{
                  fontFamily:
                    "var(--font-work-sans), ui-sans-serif, system-ui",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                {u.title}
              </span>
            </div>
            <div
              style={{
                fontFamily:
                  "var(--font-work-sans), ui-sans-serif, system-ui",
                fontSize: "13px",
                color: "#647589",
              }}
            >
              {u.when} · ${u.pay}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="card" style={{ padding: "20px 24px" }}>
      <div className="micro-label" style={{ marginBottom: "8px" }}>
        {label}
      </div>
      <div
        className="font-display"
        style={{
          fontSize: "32px",
          fontWeight: 500,
          color: "#0d0f12",
          lineHeight: 1,
          marginBottom: "4px",
        }}
      >
        {value}
      </div>
      {sub && (
        <div
          style={{
            fontFamily: "var(--font-work-sans), ui-sans-serif, system-ui",
            fontSize: "12px",
            color: "#7d8da0",
          }}
        >
          {sub}
        </div>
      )}
    </div>
  );
}
