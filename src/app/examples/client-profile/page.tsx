import { CLIENTS, TASKS } from "../data";
import {
  Avatar,
  CategoryBadge,
  ClientName,
  PageTitle,
} from "../ui";

export default function ClientProfileExample() {
  const client = CLIENTS[0]; // Whitney P. · Compass
  const recentTasks = TASKS.slice(0, 4);

  return (
    <div className="mx-auto" style={{ maxWidth: "900px" }}>
      <PageTitle eyebrow="Client profile" title="Whitney P. · Compass" />

      <div
        className="card"
        style={{
          padding: "28px",
          marginBottom: "24px",
          display: "flex",
          alignItems: "flex-start",
          gap: "20px",
        }}
      >
        <Avatar user={client} size={64} />
        <div style={{ flex: 1 }}>
          <h2
            className="font-display"
            style={{ fontSize: "26px", marginBottom: "8px" }}
          >
            <ClientName client={client} />
          </h2>
          <div
            style={{
              fontFamily: "var(--font-public-sans), ui-sans-serif, system-ui",
              fontSize: "13px",
              color: "#647589",
              marginBottom: "8px",
            }}
          >
            {client.tasks_posted} tasks posted · Member since Jan 2025 ·{" "}
            {client.city}, {client.state}
          </div>
          <p
            style={{
              fontFamily: "var(--font-public-sans), ui-sans-serif, system-ui",
              fontSize: "14px",
              color: "#0d0f12",
              lineHeight: 1.6,
            }}
          >
            Compass agent specializing in central Denver. Books Renners
            most weeks for signs, lockboxes, and showings.
          </p>
        </div>
      </div>

      <h2
        className="font-display"
        style={{ fontSize: "22px", marginBottom: "16px" }}
      >
        Recent tasks
      </h2>
      <div className="flex flex-col gap-3">
        {recentTasks.map((task) => (
          <div
            key={task.id}
            className="card"
            style={{ padding: "16px 20px" }}
          >
            <div
              className="flex items-center justify-between gap-3"
              style={{ marginBottom: "6px" }}
            >
              <div
                className="flex items-center gap-2 flex-wrap"
                style={{ flex: 1, minWidth: 0 }}
              >
                <CategoryBadge>{task.category}</CategoryBadge>
                <span
                  style={{
                    fontFamily:
                      "var(--font-public-sans), ui-sans-serif, system-ui",
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                >
                  {task.title}
                </span>
              </div>
              <span
                className="font-display"
                style={{
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "#0d0f12",
                  whiteSpace: "nowrap",
                }}
              >
                ${task.pay}
              </span>
            </div>
            <div
              style={{
                fontFamily:
                  "var(--font-public-sans), ui-sans-serif, system-ui",
                fontSize: "12px",
                color: "#7d8da0",
              }}
            >
              {task.date_label} · {task.city}, {task.state}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
