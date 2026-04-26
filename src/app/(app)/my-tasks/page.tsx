import Link from "next/link";
import { redirect } from "next/navigation";
import { PaymentIndicator, StatusBadge } from "@/components/StatusBadge";
import { formatDate, formatPay } from "@/lib/format";
import { createClient } from "@/lib/supabase/server";
import type { Task } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function MyTasksPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/signin");

  const { data: tasksData } = await supabase
    .from("tasks")
    .select(
      "id, title, description, category, pay, pay_type, zip_code, property_address, date, time_estimate, status, requires_license, posted_by, booked_runner, created_date, booked_date, marked_finished_date, completed_date, payment_status, completion_photo, completion_notes, dispute_reason, auto_release_date",
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
    <main className="pt-12 pb-20 px-6">
      <div className="mx-auto" style={{ maxWidth: "1100px" }}>
        <div className="micro-label" style={{ marginBottom: "12px" }}>
          {tasks.length} {tasks.length === 1 ? "task" : "tasks"} posted
        </div>
        <h1
          className="font-display-tight"
          style={{
            fontSize: "48px",
            lineHeight: 1.05,
            color: "#0d0f12",
            marginBottom: "32px",
          }}
        >
          My <span className="headline-em">tasks</span>
        </h1>

        {tasks.length === 0 ? (
          <div
            className="card"
            style={{
              padding: "48px 32px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                color: "#647589",
                fontSize: "14px",
                marginBottom: "16px",
              }}
            >
              You haven&apos;t posted any tasks yet.
            </p>
            <Link
              href="/post"
              className="btn-dark"
              style={{
                width: "auto",
                padding: "10px 18px",
                textDecoration: "none",
                display: "inline-flex",
              }}
            >
              Post your first task
            </Link>
          </div>
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
                  style={{
                    backgroundColor: "#fbfbfc",
                    border: "1px solid #dce0e5",
                    borderRadius: "10px",
                    padding: "24px 28px",
                    textDecoration: "none",
                    color: "inherit",
                    display: "block",
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
                            "var(--font-inter), ui-sans-serif, system-ui",
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
                        style={{
                          fontFamily:
                            "var(--font-inter), ui-sans-serif, system-ui",
                          fontSize: "13px",
                          color: "#647589",
                        }}
                      >
                        {[
                          formatDate(task.date) ?? "Flexible",
                          `${count} ${count === 1 ? "applicant" : "applicants"}`,
                        ].join("  ·  ")}
                      </p>
                    </div>
                    <div
                      className="font-display"
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
