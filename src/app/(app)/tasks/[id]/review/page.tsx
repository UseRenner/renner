import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ApprovalActions } from "@/components/ApprovalActions";
import { CompletionForm } from "@/components/CompletionForm";
import { FavoriteButton } from "@/components/FavoriteButton";
import { formatDisplayName, formatInitials } from "@/lib/displayName";
import {
  formatHoursLeft,
  formatPay,
  formatTaskTiming,
} from "@/lib/format";
import { createClient } from "@/lib/supabase/server";
import type { Task } from "@/lib/types";

export const dynamic = "force-dynamic";

type RunnerProfile = {
  id: string;
  display_name: string | null;
  first_name: string | null;
  last_name: string | null;
  show_full_last_name: boolean | null;
  background_verified: boolean | null;
  rating: number | null;
  completed_tasks: number | null;
};

export default async function TaskReviewPage({
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
      "id, title, description, category, pay, pay_type, zip_code, street_address, unit, task_city, task_state, task_zip, date, task_timing_type, task_time, window_start, window_end, time_estimate, status, requires_license, posted_by, booked_runner, created_date, booked_date, started_date, marked_finished_date, completed_date, payment_status, completion_photos, completion_notes, dispute_reason, auto_release_date, unable_to_complete_reason, unable_to_complete_explanation, unable_to_complete_photo, unable_to_complete_date, safety_flag",
    )
    .eq("id", params.id)
    .maybeSingle();

  if (!task) notFound();
  const t = task as Task;

  const isPoster = t.posted_by === user.id;
  const isRunner = t.booked_runner === user.id;
  if (!isPoster && !isRunner) redirect(`/tasks/${t.id}`);

  let runner: RunnerProfile | null = null;
  if (t.booked_runner) {
    const { data } = await supabase
      .from("users")
      .select(
        "id, display_name, first_name, last_name, show_full_last_name, background_verified, rating, completed_tasks",
      )
      .eq("id", t.booked_runner)
      .maybeSingle();
    runner = (data as RunnerProfile | null) ?? null;
  }

  let runnerIsSaved = false;
  if (isPoster && runner) {
    const { data: fav } = await supabase
      .from("favorites")
      .select("id")
      .eq("client_id", user.id)
      .eq("renner_id", runner.id)
      .maybeSingle();
    runnerIsSaved = !!fav;
  }

  return (
    <main className="pt-10 pb-20 px-6">
      <div className="mx-auto" style={{ maxWidth: "780px" }}>
        <Link
          href={`/tasks/${t.id}`}
          className="text-link"
          style={{
            fontFamily: "var(--font-public-sans), ui-sans-serif, system-ui",
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#7d8da0",
            display: "inline-block",
            marginBottom: "32px",
          }}
        >
          ← Back to task
        </Link>

        <div className="micro-label" style={{ marginBottom: "10px" }}>
          {t.status === "Pending approval" ? "Pending confirmation" : t.status}
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
            fontFamily: "var(--font-public-sans), ui-sans-serif, system-ui",
            fontSize: "13px",
            color: "#647589",
            marginBottom: "32px",
          }}
        >
          {[
            formatPay(t.pay),
            t.zip_code ? `Zip code ${t.zip_code}` : null,
            formatTaskTiming(t) ?? "Flexible",
          ]
            .filter(Boolean)
            .join("  ·  ")}
        </p>

        {isRunner && t.status === "Started" ? (
          <div className="card" style={{ padding: "32px" }}>
            <h2
              className="font-display"
              style={{
                fontSize: "26px",
                color: "#0d0f12",
                marginBottom: "8px",
              }}
            >
              Mark this task as complete
            </h2>
            <p
              style={{
                fontFamily:
                  "var(--font-public-sans), ui-sans-serif, system-ui",
                fontSize: "13px",
                color: "#647589",
                marginBottom: "24px",
                lineHeight: 1.6,
              }}
            >
              Upload up to 10 photos of the finished work and add any notes
              for the client. The client has 48 hours to confirm before
              payment auto-releases.
            </p>
            <CompletionForm taskId={t.id} userId={user.id} />
          </div>
        ) : isPoster && t.status === "Pending approval" ? (
          <ClientApprovalView
            task={t}
            user={user}
            runner={runner}
            runnerIsSaved={runnerIsSaved}
          />
        ) : (
          <StatusNotice task={t} isPoster={isPoster} isRunner={isRunner} />
        )}
      </div>
    </main>
  );
}

function ClientApprovalView({
  task,
  user,
  runner,
  runnerIsSaved,
}: {
  task: Task;
  user: { id: string };
  runner: RunnerProfile | null;
  runnerIsSaved: boolean;
}) {
  const runnerName = formatDisplayName(runner);
  const runnerInitials = formatInitials(runner);
  const hoursLeft = formatHoursLeft(task.auto_release_date);

  return (
    <div className="card" style={{ padding: "32px" }}>
      <h2
        className="font-display"
        style={{
          fontSize: "26px",
          color: "#0d0f12",
          marginBottom: "20px",
        }}
      >
        Review completed work
      </h2>

      <CompletionPhotoGrid photos={task.completion_photos} />

      {task.completion_notes && (
        <div style={{ marginBottom: "24px" }}>
          <div className="micro-label" style={{ marginBottom: "8px" }}>
            Renner&apos;s notes
          </div>
          <p
            style={{
              fontFamily:
                "var(--font-public-sans), ui-sans-serif, system-ui",
              fontSize: "14px",
              color: "#4d5b6a",
              lineHeight: 1.6,
              whiteSpace: "pre-wrap",
            }}
          >
            {task.completion_notes}
          </p>
        </div>
      )}

      <div
        style={{
          paddingTop: "20px",
          borderTop: "1px solid #eaedf0",
          marginBottom: "20px",
        }}
      >
        <div className="micro-label" style={{ marginBottom: "12px" }}>
          Submitted by
        </div>
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "9999px",
              backgroundColor: "#0d0f12",
              color: "#fbfbfc",
              fontFamily: "var(--font-public-sans), ui-sans-serif, system-ui",
              fontSize: "13px",
              fontWeight: 500,
            }}
          >
            {runnerInitials}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span
                style={{
                  fontFamily:
                    "var(--font-public-sans), ui-sans-serif, system-ui",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#0d0f12",
                }}
              >
                {runnerName}
              </span>
              {runner && (
                <FavoriteButton
                  rennerId={runner.id}
                  clientId={user.id}
                  initiallySaved={runnerIsSaved}
                />
              )}
              {runner?.background_verified && (
                <span
                  style={{
                    backgroundColor: "rgba(45,138,78,0.10)",
                    color: "#2d8a4e",
                    fontFamily:
                      "var(--font-public-sans), ui-sans-serif, system-ui",
                    fontSize: "10px",
                    fontWeight: 500,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    padding: "3px 7px",
                    borderRadius: "3px",
                  }}
                >
                  Background verified
                </span>
              )}
            </div>
            <div
              style={{
                fontFamily:
                  "var(--font-public-sans), ui-sans-serif, system-ui",
                fontSize: "12px",
                color: "#7d8da0",
              }}
            >
              {`${runner?.completed_tasks ?? 0} task${
                (runner?.completed_tasks ?? 0) === 1 ? "" : "s"
              } completed  ·  ${
                runner?.rating
                  ? `${Number(runner.rating).toFixed(1)}★`
                  : "No ratings yet"
              }`}
            </div>
          </div>
        </div>
      </div>

      {hoursLeft && (
        <div
          style={{
            backgroundColor: "#f6f7f9",
            border: "1px solid #eaedf0",
            borderRadius: "10px",
            padding: "12px 14px",
            marginBottom: "20px",
            fontFamily: "var(--font-public-sans), ui-sans-serif, system-ui",
            fontSize: "12px",
            color: "#4d5b6a",
          }}
        >
          Payment will auto-release in {hoursLeft}.
        </div>
      )}

      <ApprovalActions
        taskId={task.id}
        reviewerId={user.id}
        runnerId={runner?.id ?? ""}
      />
    </div>
  );
}

function StatusNotice({
  task,
  isPoster,
  isRunner,
}: {
  task: Task;
  isPoster: boolean;
  isRunner: boolean;
}) {
  let title = "Nothing to review yet";
  let body = "Come back when the task moves to the next stage.";

  if (isPoster && task.status === "Booked") {
    title = "Waiting on the Renner to start";
    body = "We'll let you know as soon as the Renner starts the task.";
  } else if (isPoster && task.status === "Started") {
    title = "Renner is on the task";
    body = "You'll be able to confirm once the Renner submits proof.";
  } else if (isRunner && task.status === "Booked") {
    title = "Booked, not yet started";
    body =
      "Use Start task on the task detail page when you're ready to begin.";
  } else if (isRunner && task.status === "Pending approval") {
    title = "Awaiting client confirmation";
    body =
      "The client has 48 hours to confirm. Payment auto-releases after that.";
  } else if (task.status === "Complete") {
    title = "Task complete";
    body = "Payment has been released. Thanks for using Renner.";
  } else if (task.status === "Unable to complete") {
    title = "Reported as unable to complete";
    body =
      "50% of the pay was released to the Renner; the other 50% was refunded.";
  } else if (task.status === "Disputed") {
    title = "Task disputed";
    body = "An admin is reviewing this task. We'll be in touch shortly.";
  } else if (task.status === "Closed") {
    title = "Task closed";
    body = "This task has been closed.";
  }

  return (
    <div
      className="card"
      style={{
        padding: "32px",
      }}
    >
      <h2
        className="font-display"
        style={{
          fontSize: "26px",
          color: "#0d0f12",
          marginBottom: "8px",
        }}
      >
        {title}
      </h2>
      <p
        style={{
          fontFamily: "var(--font-public-sans), ui-sans-serif, system-ui",
          fontSize: "14px",
          color: "#647589",
          lineHeight: 1.6,
        }}
      >
        {body}
      </p>
    </div>
  );
}

function CompletionPhotoGrid({ photos }: { photos: string[] | null }) {
  if (!photos || photos.length === 0) {
    return (
      <div
        style={{
          border: "1px solid #dce0e5",
          borderRadius: "10px",
          padding: "32px",
          textAlign: "center",
          color: "#7d8da0",
          fontSize: "13px",
          marginBottom: "20px",
        }}
      >
        No photos provided.
      </div>
    );
  }

  if (photos.length === 1) {
    return (
      <a
        href={photos[0]}
        target="_blank"
        rel="noreferrer"
        style={{
          display: "block",
          borderRadius: "10px",
          border: "1px solid #dce0e5",
          overflow: "hidden",
          marginBottom: "20px",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photos[0]}
          alt="Completed work"
          style={{ width: "100%", display: "block" }}
        />
      </a>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          photos.length === 2
            ? "repeat(2, 1fr)"
            : "repeat(auto-fit, minmax(160px, 1fr))",
        gap: "8px",
        marginBottom: "20px",
      }}
    >
      {photos.map((src, i) => (
        <a
          key={src}
          href={src}
          target="_blank"
          rel="noreferrer"
          style={{
            display: "block",
            borderRadius: "10px",
            border: "1px solid #dce0e5",
            overflow: "hidden",
            aspectRatio: "1 / 1",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={`Completion photo ${i + 1}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </a>
      ))}
    </div>
  );
}
