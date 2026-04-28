import Link from "next/link";
import { EmptyState } from "@/components/EmptyState";
import { PaymentIndicator, StatusBadge } from "@/components/StatusBadge";
import { formatPay, formatTaskTiming } from "@/lib/format";
import { requireClient } from "@/lib/role";
import { createClient } from "@/lib/supabase/server";
import type { Task } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function MyTasksPage() {
  const user = await requireClient();
  const supabase = createClient();

  const { data: tasksData } = await supabase
    .from("tasks")
    .select(
      "id, title, description, category, pay, pay_type, zip_code, date, task_timing_type, task_time, window_start, window_end, time_estimate, status, requires_license, posted_by, booked_runner, created_date, booked_date, started_date, marked_finished_date, completed_date, payment_status, completion_photos, completion_notes, dispute_reason, auto_release_date, unable_to_complete_reason, unable_to_complete_explanation, unable_to_complete_photo, unable_to_complete_date, safety_flag",
    )
    .eq("posted_by", user.id)
    .order("created_date", { ascending: false });

  const tasks = (tasksData ?? []) as Task[];

  const taskIds = tasks.map((t) => t.id);
  let counts: Record<string, number> = {};
  if (taskIds.length > 0) {
    const { data: applicationsData } = await supabase
      .from("applications")
      .select("task_id")
      .in("task_id", taskIds);
    counts = (applicationsData ?? []).reduce<Record<string, number>>(
      (acc, row) => {
        const id = row.task_id as string;
        acc[id] = (acc[id] ?? 0) + 1;
        return acc;
      },
      {},
    );
  }

  return (
    <main className="pt-10 pb-20 px-6">
      <div className="mx-auto" style={{ maxWidth: "1100px" }}>
        <div className="micro-label" style={{ marginBottom: "8px" }}>
          {tasks.length} {tasks.length === 1 ? "task" : "tasks"} posted
        </div>
        <h1 className="page-title" style={{ marginBottom: "24px" }}>
          My <span className="headline-em">tasks</span>
        </h1>

        {tasks.length === 0 ? (
          <EmptyState
            message="Post your first task."
            action={{ label: "Post a task", href: "/post" }}
          />
        ) : (
          <div className="flex flex-col gap-3">
            {tasks.map((task) => {
              const count = counts[task.id] ?? 0;
              const href =
                task.status === "Open"
                  ? `/my-tasks/${task.id}/applicants`
                  : `/tasks/${task.id}`;
              return (
                <Link
                  key={task.id}
                  href={href}
                  className="task-row block"
                  style={{
                    backgroundColor: "#fbfbfc",
                    border: "1px solid #dce0e5",
                    borderRadius: "10px",
                    padding: "24px 28px",
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1 min-w-0">
                      <div
                        className="flex items-center gap-2 flex-wrap"
                        style={{ marginBottom: "10px" }}
                      >
                        <StatusBadge status={task.status} />
                        <PaymentIndicator status={task.payment_status} />
                      </div>
                      <h3
                        style={{
                          fontFamily:
                            "var(--font-source-sans), ui-sans-serif, system-ui",
                          fontSize: "16px",
                          fontWeight: 500,
                          color: "#0d0f12",
                          marginBottom: "6px",
                          lineHeight: 1.35,
                        }}
                      >
                        {task.title}
                      </h3>
                      <p
                        className="meta-mono"
                        style={{
                          fontFamily:
                            "var(--font-source-sans), ui-sans-serif, system-ui",
                          fontSize: "13px",
                          color: "#647589",
                        }}
                      >
                        {[
                          formatTaskTiming(task) ?? "Flexible",
                          `${count} ${count === 1 ? "applicant" : "applicants"}`,
                        ].join("  ·  ")}
                      </p>
                    </div>
                    <div
                      className="font-display stat-num"
                      style={{
                        fontSize: "22px",
                        fontWeight: 500,
                        color: "#0d0f12",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {formatPay(task.pay)}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
