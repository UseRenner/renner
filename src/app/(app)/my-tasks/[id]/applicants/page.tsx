import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { BookButton } from "@/components/BookButton";
import { formatDate, formatPay } from "@/lib/format";
import { createClient } from "@/lib/supabase/server";
import type { Task } from "@/lib/types";

export const dynamic = "force-dynamic";

type Applicant = {
  id: string;
  status: "Applied" | "Accepted" | "Declined";
  message: string | null;
  applied_date: string;
  applicant: {
    id: string;
    first_name: string | null;
    last_name: string | null;
    display_name: string | null;
    licensed: boolean;
    background_verified: boolean;
    completed_tasks: number;
    rating: number | null;
    city: string | null;
    state: string | null;
  } | null;
};

export default async function ApplicantsPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/signin");

  const { data: task } = await supabase
    .from("tasks")
    .select(
      "id, title, description, category, pay, pay_type, zip_code, date, time_estimate, status, requires_license, posted_by, booked_runner, created_date, booked_date, marked_finished_date, completed_date, payment_status, completion_photo, completion_notes, dispute_reason, auto_release_date",
    )
    .eq("id", params.id)
    .maybeSingle();

  if (!task) notFound();
  if (task.posted_by !== user.id) redirect("/my-tasks");
  const t = task as Task;

  const { data: applicationsData } = await supabase
    .from("applications")
    .select(
      `id, status, message, applied_date,
       applicant:users (
         id, first_name, last_name, display_name, licensed,
         background_verified, completed_tasks, rating, city, state
       )`,
    )
    .eq("task_id", t.id)
    .order("applied_date", { ascending: false });

  const applicants = (applicationsData ?? []) as unknown as Applicant[];

  return (
    <main className="pt-10 pb-20 px-6">
      <div className="mx-auto" style={{ maxWidth: "900px" }}>
        <Link
          href="/my-tasks"
          style={{
            fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#7d8da0",
            display: "inline-block",
            marginBottom: "32px",
          }}
        >
          ← Back to my tasks
        </Link>

        <div className="flex items-start justify-between gap-6 mb-12">
          <div>
            <div className="micro-label" style={{ marginBottom: "8px" }}>
              Applicants  ·  {applicants.length}
            </div>
            <h1
              className="font-display"
              style={{
                fontSize: "36px",
                lineHeight: 1.1,
                color: "#0d0f12",
                marginBottom: "8px",
              }}
            >
              {t.title}
            </h1>
            <p
              style={{
                fontFamily:
                  "var(--font-inter), ui-sans-serif, system-ui",
                fontSize: "13px",
                color: "#647589",
              }}
            >
              {[
                t.zip_code ? `Zip code ${t.zip_code}` : null,
                formatDate(t.date) ?? "Flexible",
              ]
                .filter(Boolean)
                .join("  ·  ")}
            </p>
          </div>
          <div
            className="font-display"
            style={{
              fontSize: "32px",
              fontWeight: 500,
              color: "#0d0f12",
              whiteSpace: "nowrap",
            }}
          >
            {formatPay(t.pay)}
          </div>
        </div>

        {applicants.length === 0 ? (
          <div
            className="card"
            style={{
              padding: "48px 32px",
              textAlign: "center",
              color: "#647589",
              fontSize: "14px",
            }}
          >
            No one has applied yet. Renners will see this listing on the
            browse page.
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {applicants.map((app) => (
              <ApplicantRow
                key={app.id}
                taskId={t.id}
                taskOpen={t.status === "Open"}
                application={app}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

function ApplicantRow({
  taskId,
  taskOpen,
  application,
}: {
  taskId: string;
  taskOpen: boolean;
  application: Applicant;
}) {
  const a = application.applicant;
  const name =
    a?.display_name ??
    [a?.first_name, a?.last_name].filter(Boolean).join(" ") ??
    "Anonymous";
  const initials = (() => {
    const parts = (name || "?").trim().split(/\s+/);
    return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? ""))
      .toUpperCase()
      .slice(0, 2) || "?";
  })();
  const rating = a?.rating ?? 0;
  const completed = a?.completed_tasks ?? 0;
  const accepted = application.status === "Accepted";

  return (
    <div
      className="card"
      style={{ padding: "20px 24px" }}
    >
      <div className="flex items-center gap-4 flex-wrap">
        <div
          className="flex items-center justify-center"
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "9999px",
            backgroundColor: "#0d0f12",
            color: "#fbfbfc",
            fontFamily:
              "var(--font-inter), ui-sans-serif, system-ui",
            fontSize: "14px",
            fontWeight: 500,
            flexShrink: 0,
          }}
        >
          {initials}
        </div>

        <div className="flex-1 min-w-0">
          <div
            className="flex items-center gap-2 flex-wrap"
            style={{ marginBottom: "4px" }}
          >
            <span
              style={{
                fontFamily:
                  "var(--font-inter), ui-sans-serif, system-ui",
                fontSize: "15px",
                fontWeight: 500,
                color: "#0d0f12",
              }}
            >
              {name}
            </span>
            {a?.background_verified && (
              <SmallBadge label="Background verified" tone="green" />
            )}
            {a?.licensed && <SmallBadge label="Licensed" tone="dark" />}
          </div>
          <div
            style={{
              fontFamily:
                "var(--font-inter), ui-sans-serif, system-ui",
              fontSize: "12px",
              color: "#7d8da0",
            }}
          >
            {`${completed} task${completed === 1 ? "" : "s"} completed  ·  ${
              rating ? `${Number(rating).toFixed(1)}★` : "No ratings yet"
            }`}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {accepted ? (
            <span
              style={{
                fontFamily:
                  "var(--font-inter), ui-sans-serif, system-ui",
                fontSize: "13px",
                color: "#2d8a4e",
                fontWeight: 500,
              }}
            >
              Booked
            </span>
          ) : taskOpen ? (
            <>
              <BookButton
                taskId={taskId}
                applicationId={application.id}
                applicantId={a?.id ?? ""}
              />
              <Link
                href={`/messages?with=${a?.id ?? ""}&task=${taskId}`}
                className="btn-light"
                style={{
                  padding: "10px 16px",
                  textDecoration: "none",
                }}
              >
                Message
              </Link>
            </>
          ) : (
            <span
              style={{
                fontFamily:
                  "var(--font-inter), ui-sans-serif, system-ui",
                fontSize: "12px",
                color: "#7d8da0",
              }}
            >
              {application.status}
            </span>
          )}
        </div>
      </div>

      {application.message && (
        <p
          style={{
            fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
            fontSize: "13px",
            color: "#4d5b6a",
            marginTop: "16px",
            paddingTop: "16px",
            borderTop: "1px solid #eaedf0",
            lineHeight: 1.6,
          }}
        >
          {application.message}
        </p>
      )}
    </div>
  );
}

function SmallBadge({
  label,
  tone,
}: {
  label: string;
  tone: "green" | "dark";
}) {
  const palette =
    tone === "green"
      ? { background: "rgba(45,138,78,0.10)", color: "#2d8a4e" }
      : { background: "#0d0f12", color: "#fbfbfc" };
  return (
    <span
      style={{
        backgroundColor: palette.background,
        color: palette.color,
        fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
        fontSize: "10px",
        fontWeight: 500,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        padding: "3px 7px",
        borderRadius: "3px",
      }}
    >
      {label}
    </span>
  );
}
