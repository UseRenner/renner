import { RENNERS, TASKS } from "../data";
import {
  Avatar,
  CategoryBadge,
  LicensedTag,
  PageTitle,
  RennerName,
  StatusPill,
  VerifiedTag,
} from "../ui";

export default function PostedTaskExample() {
  const task = TASKS[0]; // Open Signs task
  const applicants = [RENNERS[1], RENNERS[4], RENNERS[2]];

  return (
    <div className="mx-auto" style={{ maxWidth: "1100px" }}>
      <PageTitle eyebrow="Posted task" title={task.title} />

      <div
        className="grid gap-10"
        style={{ gridTemplateColumns: "minmax(0,1fr) 360px" }}
      >
        <div>
          <div
            className="flex items-center gap-2 flex-wrap"
            style={{ marginBottom: "16px" }}
          >
            <CategoryBadge>{task.category}</CategoryBadge>
            <StatusPill status={task.status} />
          </div>
          <p
            style={{
              fontFamily: "var(--font-source-sans), ui-sans-serif, system-ui",
              fontSize: "16px",
              color: "#0d0f12",
              lineHeight: 1.6,
              marginBottom: "32px",
            }}
          >
            {task.description}
          </p>

          <h2
            className="font-display"
            style={{ fontSize: "22px", marginBottom: "16px" }}
          >
            Applicants
          </h2>
          <div className="flex flex-col gap-3">
            {applicants.map((r) => (
              <div
                key={r.id}
                className="card flex items-center gap-4"
                style={{ padding: "16px 20px" }}
              >
                <Avatar user={r} size={40} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    className="flex items-center gap-2 flex-wrap"
                    style={{ marginBottom: "4px" }}
                  >
                    <span
                      style={{
                        fontFamily:
                          "var(--font-source-sans), ui-sans-serif, system-ui",
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                    >
                      <RennerName renner={r} />
                    </span>
                    {r.background_verified && <VerifiedTag />}
                    {r.licensed && <LicensedTag />}
                  </div>
                  <div
                    style={{
                      fontFamily:
                        "var(--font-source-sans), ui-sans-serif, system-ui",
                      fontSize: "12px",
                      color: "#7d8da0",
                    }}
                  >
                    {r.completed_tasks} tasks · {r.rating.toFixed(1)}★ ·{" "}
                    {r.city}, {r.state}
                  </div>
                </div>
                <button
                  type="button"
                  className="btn-dark"
                  style={{ padding: "9px 16px", fontSize: "13px" }}
                >
                  Book
                </button>
              </div>
            ))}
          </div>
        </div>

        <aside className="card" style={{ padding: "24px", height: "fit-content" }}>
          <div className="micro-label" style={{ marginBottom: "8px" }}>
            Task summary
          </div>
          <Row label="Pay" value={`$${task.pay} flat`} />
          <Row label="When" value={task.date_label} />
          <Row
            label="Where"
            value={`${task.street_address}, ${task.city}, ${task.state} ${task.zip}`}
          />
          <Row label="Posted" value="2 hours ago" />
          <Row label="Applications" value={`${applicants.length}`} />
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ marginBottom: "12px" }}>
      <div
        style={{
          fontFamily: "var(--font-source-sans), ui-sans-serif, system-ui",
          fontSize: "11px",
          fontWeight: 500,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#7d8da0",
          marginBottom: "2px",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: "var(--font-source-sans), ui-sans-serif, system-ui",
          fontSize: "14px",
          color: "#0d0f12",
        }}
      >
        {value}
      </div>
    </div>
  );
}
