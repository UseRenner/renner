import { TASKS } from "../data";
import {
  CategoryBadge,
  PageTitle,
  RennerName,
  StatusPill,
} from "../ui";

export default function ClientDashboardExample() {
  const open = TASKS.filter((t) => t.status === "Open");
  const active = TASKS.filter(
    (t) => t.status === "Booked" || t.status === "Started",
  );
  const past = TASKS.filter((t) => t.status === "Complete");

  return (
    <div className="mx-auto" style={{ maxWidth: "1100px" }}>
      <PageTitle eyebrow="Client dashboard" title="Hi Whitney." />

      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          marginBottom: "32px",
        }}
      >
        <Stat label="Open tasks" value={String(open.length)} />
        <Stat label="In progress" value={String(active.length)} />
        <Stat label="Completed (30d)" value="9" sub="$745 paid out" />
        <Stat label="Saved Renners" value="5" />
      </div>

      <Section title="Open">
        {open.length === 0 ? (
          <Empty text="No open tasks. Post one to get started." />
        ) : (
          open.map((task) => <TaskRow key={task.id} task={task} />)
        )}
      </Section>

      <Section title="In progress">
        {active.map((task) => (
          <TaskRow key={task.id} task={task} />
        ))}
      </Section>

      <Section title="Past">
        {past.map((task) => (
          <TaskRow key={task.id} task={task} />
        ))}
      </Section>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: "32px" }}>
      <h2
        className="font-display"
        style={{ fontSize: "22px", marginBottom: "16px" }}
      >
        {title}
      </h2>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}

function TaskRow({
  task,
}: {
  task: (typeof import("../data").TASKS)[number];
}) {
  return (
    <div className="card" style={{ padding: "20px 24px" }}>
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
          fontFamily: "var(--font-source-sans), ui-sans-serif, system-ui",
          fontSize: "15px",
          fontWeight: 500,
          marginBottom: "4px",
        }}
      >
        {task.title}
      </div>
      <div
        style={{
          fontFamily: "var(--font-source-sans), ui-sans-serif, system-ui",
          fontSize: "12px",
          color: "#7d8da0",
        }}
      >
        {task.date_label} · {task.city}, {task.state}
        {task.booked_runner && (
          <>
            {" · "}
            <RennerName renner={task.booked_runner} />
          </>
        )}
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
            fontFamily: "var(--font-source-sans), ui-sans-serif, system-ui",
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

function Empty({ text }: { text: string }) {
  return (
    <div
      className="card"
      style={{
        padding: "32px",
        textAlign: "center",
        color: "#647589",
        fontSize: "14px",
      }}
    >
      {text}
    </div>
  );
}
