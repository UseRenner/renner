import { TASKS } from "../data";
import {
  Avatar,
  CategoryBadge,
  PageTitle,
  RennerName,
  StatusPill,
  VerifiedTag,
} from "../ui";

export default function TaskInProgressExample() {
  const task = TASKS[2]; // Started Prep task
  const renner = task.booked_runner!;

  const timeline = [
    { label: "Posted", time: "Apr 26, 7:14 PM", done: true },
    { label: "Booked", time: "Apr 26, 9:02 PM", done: true },
    { label: "Started", time: "Apr 29, 7:58 AM", done: true },
    { label: "Completion submitted", time: "—", done: false },
    { label: "Confirmed", time: "—", done: false },
  ];

  return (
    <div className="mx-auto" style={{ maxWidth: "1100px" }}>
      <PageTitle eyebrow="In progress" title={task.title} />

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
              fontFamily: "var(--font-work-sans), ui-sans-serif, system-ui",
              fontSize: "16px",
              color: "#0d0f12",
              lineHeight: 1.6,
              marginBottom: "32px",
            }}
          >
            {task.description}
          </p>

          <div
            className="card"
            style={{
              padding: "20px 24px",
              marginBottom: "24px",
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <Avatar user={renner} />
            <div style={{ flex: 1 }}>
              <div
                className="flex items-center gap-2"
                style={{ marginBottom: "2px" }}
              >
                <span
                  style={{
                    fontFamily:
                      "var(--font-work-sans), ui-sans-serif, system-ui",
                    fontSize: "15px",
                    fontWeight: 500,
                  }}
                >
                  <RennerName renner={renner} /> is on this task
                </span>
                <VerifiedTag />
              </div>
              <div
                style={{
                  fontFamily: "var(--font-work-sans), ui-sans-serif, system-ui",
                  fontSize: "13px",
                  color: "#647589",
                }}
              >
                Started 8 minutes ago. Photos arrive when the task is
                marked complete.
              </div>
            </div>
            <button type="button" className="btn-light" style={{ padding: "9px 16px" }}>
              Message
            </button>
          </div>

          <h2
            className="font-display"
            style={{ fontSize: "22px", marginBottom: "16px" }}
          >
            Timeline
          </h2>
          <ol style={{ paddingLeft: 0, listStyle: "none" }}>
            {timeline.map((step, i) => (
              <li
                key={step.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 0",
                  borderBottom:
                    i === timeline.length - 1 ? "none" : "1px solid #eaedf0",
                }}
              >
                <span
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "999px",
                    backgroundColor: step.done ? "#0d0f12" : "#cad1d8",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    flex: 1,
                    fontFamily:
                      "var(--font-work-sans), ui-sans-serif, system-ui",
                    fontSize: "14px",
                    color: step.done ? "#0d0f12" : "#7d8da0",
                  }}
                >
                  {step.label}
                </span>
                <span
                  style={{
                    fontFamily:
                      "var(--font-work-sans), ui-sans-serif, system-ui",
                    fontSize: "12px",
                    color: "#7d8da0",
                  }}
                >
                  {step.time}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <aside className="card" style={{ padding: "24px", height: "fit-content" }}>
          <div className="micro-label" style={{ marginBottom: "8px" }}>
            Task summary
          </div>
          <Row label="Pay" value={`$${task.pay} flat (held in escrow)`} />
          <Row label="When" value={task.date_label} />
          <Row
            label="Where"
            value={`${task.street_address}, ${task.city}, ${task.state} ${task.zip}`}
          />
          <Row label="Estimated" value="1.5 hours" />
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
          fontFamily: "var(--font-work-sans), ui-sans-serif, system-ui",
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
          fontFamily: "var(--font-work-sans), ui-sans-serif, system-ui",
          fontSize: "14px",
          color: "#0d0f12",
        }}
      >
        {value}
      </div>
    </div>
  );
}
