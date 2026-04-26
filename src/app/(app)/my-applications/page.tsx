import Link from "next/link";
import { InvitationActions } from "@/components/InvitationActions";
import { PaymentIndicator } from "@/components/StatusBadge";
import {
  formatPay,
  formatRelativeDate,
  formatTaskTiming,
} from "@/lib/format";
import { requireRenner } from "@/lib/role";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type ApplicationRow = {
  id: string;
  status: "Applied" | "Invited" | "Accepted" | "Declined";
  applied_date: string;
  task: {
    id: string;
    title: string;
    pay: number | null;
    status: string;
    payment_status: string | null;
    booked_runner: string | null;
    zip_code: string | null;
    date: string | null;
    task_timing_type: "exact" | "window" | null;
    task_time: string | null;
    window_start: string | null;
    window_end: string | null;
  } | null;
};

const STATUS_PALETTE: Record<
  ApplicationRow["status"],
  { background: string; color: string; label: string }
> = {
  Applied: { background: "#eaedf0", color: "#0d0f12", label: "Applied" },
  Invited: { background: "#fbfbfc", color: "#4d5b6a", label: "Invited" },
  Accepted: {
    background: "rgba(45,138,78,0.08)",
    color: "#2d8a4e",
    label: "Accepted",
  },
  Declined: {
    background: "#f6f7f9",
    color: "#7d8da0",
    label: "Declined",
  },
};

export default async function MyApplicationsPage() {
  const user = await requireRenner();
  const supabase = createClient();

  const { data: appsData } = await supabase
    .from("applications")
    .select(
      `id, status, applied_date,
       task:tasks (
         id, title, pay, status, payment_status,
         booked_runner, zip_code, date,
         task_timing_type, task_time, window_start, window_end
       )`,
    )
    .eq("applicant_id", user.id)
    .order("applied_date", { ascending: false });

  const applications = (appsData ?? []) as unknown as ApplicationRow[];

  return (
    <main className="pt-12 pb-20 px-6">
      <div className="mx-auto" style={{ maxWidth: "900px" }}>
        <div className="micro-label" style={{ marginBottom: "12px" }}>
          {applications.length}{" "}
          {applications.length === 1 ? "application" : "applications"}
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
          My <span className="headline-em">applications</span>
        </h1>

        {applications.length === 0 ? (
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
              You haven&apos;t applied to any tasks yet.
            </p>
            <Link
              href="/browse"
              className="btn-dark"
              style={{
                width: "auto",
                padding: "10px 18px",
                textDecoration: "none",
                display: "inline-flex",
              }}
            >
              Browse open tasks
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {applications.map((app) => {
              if (!app.task) return null;
              const statusStyle = STATUS_PALETTE[app.status];
              const isBookedToMe =
                app.status === "Accepted" &&
                app.task.booked_runner === user.id &&
                (app.task.status === "Booked" ||
                  app.task.status === "Pending approval");

              return (
                <div
                  key={app.id}
                  className="card task-row"
                  style={{ padding: "24px 28px" }}
                >
                  <div className="flex items-start justify-between gap-6">
                    <Link
                      href={`/tasks/${app.task.id}`}
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                        flex: 1,
                        minWidth: 0,
                      }}
                    >
                      <div
                        className="flex items-center gap-2 flex-wrap"
                        style={{ marginBottom: "10px" }}
                      >
                        <span
                          style={{
                            backgroundColor: statusStyle.background,
                            color: statusStyle.color,
                            border:
                              app.status === "Invited"
                                ? "1px solid #cad1d8"
                                : undefined,
                            fontFamily:
                              "var(--font-inter), ui-sans-serif, system-ui",
                            fontSize: "11px",
                            fontWeight: 500,
                            letterSpacing: "0.06em",
                            textTransform: "uppercase",
                            padding: "5px 10px",
                            borderRadius: "999px",
                          }}
                        >
                          {statusStyle.label}
                        </span>
                        {isBookedToMe && (
                          <PaymentIndicator
                            status={app.task.payment_status}
                          />
                        )}
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
                        {app.task.title}
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
                          app.task.zip_code ? `Zip code ${app.task.zip_code}` : null,
                          formatTaskTiming(app.task) ?? "Flexible",
                          `${app.status === "Invited" ? "Invited" : "Applied"} ${formatRelativeDate(app.applied_date) ?? ""}`,
                        ]
                          .filter(Boolean)
                          .join("  ·  ")}
                      </p>
                    </Link>

                    <div
                      className="flex flex-col items-end gap-2"
                      style={{ flexShrink: 0 }}
                    >
                      <div
                        className="font-display"
                        style={{
                          fontSize: "22px",
                          fontWeight: 500,
                          color: "#0d0f12",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {formatPay(app.task.pay)}
                      </div>
                      {isBookedToMe && (
                        <Link
                          href={`/tasks/${app.task.id}/review`}
                          className="text-link"
                          style={{
                            fontFamily:
                              "var(--font-inter), ui-sans-serif, system-ui",
                            fontSize: "13px",
                            fontWeight: 500,
                            color: "#0d0f12",
                          }}
                        >
                          Mark complete →
                        </Link>
                      )}
                      {app.status === "Invited" && (
                        <InvitationActions
                          applicationId={app.id}
                          taskId={app.task.id}
                          rennerId={user.id}
                        />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
