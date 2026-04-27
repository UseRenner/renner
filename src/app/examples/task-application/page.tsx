import { TASKS } from "../data";
import {
  CategoryBadge,
  ClientName,
  PageTitle,
} from "../ui";

export default function TaskApplicationExample() {
  const task = TASKS[0];
  const otherTasks = TASKS.slice(1, 4);

  return (
    <div className="mx-auto" style={{ maxWidth: "1100px" }}>
      <PageTitle eyebrow="Browse · open task" title="Apply to this task" />

      <div
        className="grid gap-10"
        style={{ gridTemplateColumns: "minmax(0, 1fr) 320px" }}
      >
        <div>
          <div
            className="card"
            style={{ padding: "28px", marginBottom: "24px" }}
          >
            <div
              className="flex items-center justify-between"
              style={{ marginBottom: "14px" }}
            >
              <CategoryBadge>{task.category}</CategoryBadge>
              <span
                className="font-display"
                style={{
                  fontSize: "26px",
                  fontWeight: 500,
                  color: "#0d0f12",
                }}
              >
                ${task.pay}
              </span>
            </div>
            <h2
              className="font-display"
              style={{ fontSize: "24px", marginBottom: "8px" }}
            >
              {task.title}
            </h2>
            <div
              style={{
                fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
                fontSize: "13px",
                color: "#647589",
                marginBottom: "20px",
              }}
            >
              {task.city}, {task.state} {task.zip} · {task.date_label}
            </div>
            <p
              style={{
                fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
                fontSize: "15px",
                color: "#0d0f12",
                lineHeight: 1.65,
                marginBottom: "20px",
              }}
            >
              {task.description}
            </p>
            <div
              style={{
                fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
                fontSize: "13px",
                color: "#7d8da0",
                lineHeight: 1.55,
                paddingTop: "16px",
                borderTop: "1px solid #eaedf0",
              }}
            >
              Posted by <ClientName client={task.posted_by} /> · 2 hours ago
            </div>
          </div>

          <div className="card" style={{ padding: "24px" }}>
            <h3
              className="font-display"
              style={{ fontSize: "18px", marginBottom: "12px" }}
            >
              Apply
            </h3>
            <label className="input-label" htmlFor="msg">
              Note to client <span style={{ color: "#7d8da0", fontWeight: 400 }}>(optional)</span>
            </label>
            <textarea
              id="msg"
              className="input"
              style={{ minHeight: "100px", resize: "vertical" }}
              placeholder="Quick intro or anything they should know."
              defaultValue={
                "I'm five minutes from this address and have rider stock on hand. Can be there inside the window."
              }
            />
            <button
              type="button"
              className="btn-dark"
              style={{
                marginTop: "16px",
                padding: "11px 20px",
                width: "auto",
              }}
            >
              Submit application
            </button>
          </div>
        </div>

        <aside className="card" style={{ padding: "24px", height: "fit-content" }}>
          <div className="micro-label" style={{ marginBottom: "12px" }}>
            Other open tasks
          </div>
          <div className="flex flex-col gap-2">
            {otherTasks.map((t) => (
              <div
                key={t.id}
                style={{
                  padding: "12px",
                  border: "1px solid #eaedf0",
                  borderRadius: "8px",
                }}
              >
                <div
                  style={{
                    fontFamily:
                      "var(--font-inter), ui-sans-serif, system-ui",
                    fontSize: "13px",
                    fontWeight: 500,
                    marginBottom: "2px",
                  }}
                >
                  {t.title}
                </div>
                <div
                  style={{
                    fontFamily:
                      "var(--font-inter), ui-sans-serif, system-ui",
                    fontSize: "12px",
                    color: "#7d8da0",
                  }}
                >
                  {t.category} · ${t.pay} · {t.city}
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
