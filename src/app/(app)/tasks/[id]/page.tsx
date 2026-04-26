import Link from "next/link";
import { notFound } from "next/navigation";
import { ApplyButton } from "@/components/ApplyButton";
import { CategoryBadge, LicenseBadge } from "@/components/CategoryBadge";
import { ClientCancelButton } from "@/components/ClientCancelButton";
import { DamageResponseButton } from "@/components/DamageResponseButton";
import { RennerCancelButton } from "@/components/RennerCancelButton";
import { ReportTaskButton } from "@/components/ReportTaskButton";
import { StartTaskButton } from "@/components/StartTaskButton";
import { StatusBadge } from "@/components/StatusBadge";
import { UnableToCompleteButton } from "@/components/UnableToCompleteButton";
import {
  formatDate,
  formatPay,
  formatTaskTiming,
  startsAvailableAt,
} from "@/lib/format";
import { createClient } from "@/lib/supabase/server";
import type { Task } from "@/lib/types";

export const dynamic = "force-dynamic";

type PageProps = { params: { id: string } };

export default async function TaskDetailPage({ params }: PageProps) {
  const supabase = createClient();

  const { data: task } = await supabase
    .from("tasks")
    .select(
      "id, title, description, category, pay, pay_type, zip_code, street_address, unit, task_city, task_state, task_zip, date, task_timing_type, task_time, window_start, window_end, time_estimate, status, requires_license, posted_by, booked_runner, created_date, booked_date, started_date, marked_finished_date, completed_date, payment_status, completion_photos, completion_notes, dispute_reason, auto_release_date, unable_to_complete_reason, unable_to_complete_explanation, unable_to_complete_photo, unable_to_complete_date, safety_flag",
    )
    .eq("id", params.id)
    .maybeSingle();

  if (!task) notFound();
  const t = task as Task;

  const [{ data: poster }, { data: { user } }] = await Promise.all([
    t.posted_by
      ? supabase
          .from("users")
          .select("display_name, first_name, last_name, city, state")
          .eq("id", t.posted_by)
          .maybeSingle()
      : Promise.resolve({ data: null }),
    supabase.auth.getUser(),
  ]);

  let viewerProfile: {
    role: "renner" | "client" | null;
    licensed: boolean;
  } | null = null;
  let alreadyApplied = false;

  if (user) {
    const { data: profile } = await supabase
      .from("users")
      .select("role, licensed")
      .eq("id", user.id)
      .maybeSingle();
    viewerProfile = profile
      ? { role: profile.role, licensed: !!profile.licensed }
      : { role: null, licensed: false };

    const { data: existing } = await supabase
      .from("applications")
      .select("id")
      .eq("task_id", t.id)
      .eq("applicant_id", user.id)
      .maybeSingle();
    alreadyApplied = !!existing;
  }

  type LatestDispute = {
    id: string;
    raised_by: string | null;
    against: string | null;
    reason: string | null;
    damage_amount: number | null;
    damage_counter_amount: number | null;
    damage_response: "accepted" | "countered" | "disputed" | null;
    damage_photos: string[] | null;
    admin_notes: string | null;
  };
  let latestDispute: LatestDispute | null = null;
  if (t.status === "Disputed") {
    const { data: disputeData } = await supabase
      .from("disputes")
      .select(
        "id, raised_by, against, reason, damage_amount, damage_counter_amount, damage_response, damage_photos, admin_notes",
      )
      .eq("task_id", t.id)
      .order("created_date", { ascending: false })
      .limit(1)
      .maybeSingle();
    latestDispute = (disputeData as LatestDispute | null) ?? null;
  }

  const posterName =
    (poster?.display_name as string | undefined) ??
    [poster?.first_name, poster?.last_name].filter(Boolean).join(" ") ??
    "Anonymous";

  const posterInitials = (() => {
    const n = (posterName || "?").trim();
    const parts = n.split(/\s+/);
    return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? ""))
      .toUpperCase()
      .slice(0, 2) || "?";
  })();

  const isPoster = !!user && t.posted_by === user.id;
  const isBookedRunner = !!user && t.booked_runner === user.id;
  const isRenner = viewerProfile?.role === "renner";
  const isOpen = t.status === "Open";
  const licenseBlocked = t.requires_license && !viewerProfile?.licensed;
  const canApply =
    !!user && isRenner && isOpen && !licenseBlocked && t.posted_by !== user.id;

  return (
    <main className="pt-10 pb-20 px-6">
      <div className="mx-auto" style={{ maxWidth: "1100px" }}>
        <Link
          href="/browse"
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
          ← Back to tasks
        </Link>

        <div
          className="grid gap-10"
          style={{ gridTemplateColumns: "minmax(0, 1fr) 360px" }}
        >
          <div>
            <div
              className="flex items-center gap-2 flex-wrap"
              style={{ marginBottom: "16px" }}
            >
              {t.category && <CategoryBadge>{t.category}</CategoryBadge>}
              {t.requires_license && <LicenseBadge />}
              {t.status !== "Open" && <StatusBadge status={t.status} />}
            </div>

            <h1
              className="font-display"
              style={{
                fontSize: "32px",
                lineHeight: 1.15,
                color: "#0d0f12",
                marginBottom: "32px",
              }}
            >
              {t.title}
            </h1>

            <div className="card" style={{ padding: "28px", marginBottom: "28px" }}>
              <div className="grid grid-cols-2 gap-y-6 gap-x-8">
                <MetaItem label="Category" value={t.category ?? "—"} />
                <MetaItem
                  label="Zip code"
                  value={t.zip_code ?? "—"}
                />
                <MetaItem
                  label="When"
                  value={formatTaskTiming(t) ?? "Flexible"}
                />
                <MetaItem
                  label="Time estimate"
                  value={t.time_estimate ?? "—"}
                />
              </div>

              {isBookedRunner && (t.street_address || t.task_city) ? (
                <div
                  style={{
                    marginTop: "24px",
                    paddingTop: "20px",
                    borderTop: "1px solid #eaedf0",
                  }}
                >
                  <div className="micro-label" style={{ marginBottom: "6px" }}>
                    Task address
                  </div>
                  <div
                    style={{
                      fontFamily:
                        "var(--font-inter), ui-sans-serif, system-ui",
                      fontSize: "15px",
                      fontWeight: 500,
                      color: "#0d0f12",
                      lineHeight: 1.5,
                    }}
                  >
                    {[
                      t.street_address,
                      t.unit ? `Unit ${t.unit}` : null,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                    <br />
                    {[
                      t.task_city,
                      [t.task_state, t.task_zip].filter(Boolean).join(" "),
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  </div>
                  <div
                    style={{
                      fontFamily:
                        "var(--font-inter), ui-sans-serif, system-ui",
                      fontSize: "12px",
                      color: "#7d8da0",
                      marginTop: "6px",
                    }}
                  >
                    Shared because you&apos;re booked on this task.
                  </div>
                </div>
              ) : null}
            </div>

            <div
              className="card"
              style={{ padding: "28px", marginBottom: "28px" }}
            >
              <h2 className="micro-label" style={{ marginBottom: "12px" }}>
                Description
              </h2>
              <p
                style={{
                  fontFamily:
                    "var(--font-inter), ui-sans-serif, system-ui",
                  fontSize: "15px",
                  color: "#4d5b6a",
                  lineHeight: 1.65,
                  whiteSpace: "pre-wrap",
                }}
              >
                {t.description ?? "No description provided."}
              </p>
            </div>

            <div className="card" style={{ padding: "24px 28px" }}>
              <h2 className="micro-label" style={{ marginBottom: "14px" }}>
                Posted by
              </h2>
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "9999px",
                    backgroundColor: "#0d0f12",
                    color: "#fbfbfc",
                    fontFamily:
                      "var(--font-inter), ui-sans-serif, system-ui",
                    fontSize: "13px",
                    fontWeight: 500,
                  }}
                >
                  {posterInitials}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily:
                        "var(--font-inter), ui-sans-serif, system-ui",
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#0d0f12",
                    }}
                  >
                    {posterName}
                  </div>
                  {(poster?.city || poster?.state) && (
                    <div
                      style={{
                        fontFamily:
                          "var(--font-inter), ui-sans-serif, system-ui",
                        fontSize: "12px",
                        color: "#7d8da0",
                      }}
                    >
                      {[poster?.city, poster?.state]
                        .filter(Boolean)
                        .join(", ")}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {isRenner && user && (
              <div style={{ marginTop: "20px" }}>
                <ReportTaskButton
                  taskId={t.id}
                  raisedBy={user.id}
                  against={t.posted_by}
                />
              </div>
            )}
          </div>

          <aside>
            <div className="card sticky" style={{ padding: "28px", top: "96px" }}>
              <div
                className="font-display"
                style={{
                  fontSize: "44px",
                  fontWeight: 500,
                  color: "#0d0f12",
                  lineHeight: 1,
                  marginBottom: "10px",
                }}
              >
                {formatPay(t.pay)}
              </div>
              <p
                style={{
                  fontFamily:
                    "var(--font-inter), ui-sans-serif, system-ui",
                  fontSize: "12px",
                  color: "#647589",
                  marginBottom: "24px",
                  lineHeight: 1.5,
                }}
              >
                Payment held by Stripe until confirmed
              </p>

              <div className="divider" style={{ marginBottom: "20px" }} />

              <div
                className="flex flex-col gap-3"
                style={{ marginBottom: "24px" }}
              >
                <SummaryRow label="Category" value={t.category ?? "—"} />
                <SummaryRow
                  label="Status"
                  value={
                    t.status === "Pending approval"
                      ? "Pending confirmation"
                      : t.status
                  }
                />
                <SummaryRow
                  label="Posted"
                  value={formatDate(t.created_date) ?? "—"}
                />
              </div>

              <SidebarActions
                task={t}
                user={user}
                isPoster={isPoster}
                isBookedRunner={isBookedRunner}
                isRenner={isRenner}
                canApply={canApply}
                alreadyApplied={alreadyApplied}
                licenseBlocked={licenseBlocked}
                latestDispute={latestDispute}
              />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

type LatestDispute = {
  id: string;
  raised_by: string | null;
  against: string | null;
  reason: string | null;
  damage_amount: number | null;
  damage_counter_amount: number | null;
  damage_response: "accepted" | "countered" | "disputed" | null;
  damage_photos: string[] | null;
  admin_notes: string | null;
};

function SidebarActions({
  task,
  user,
  isPoster,
  isBookedRunner,
  isRenner,
  canApply,
  alreadyApplied,
  licenseBlocked,
  latestDispute,
}: {
  task: Task;
  user: { id: string } | null;
  isPoster: boolean;
  isBookedRunner: boolean;
  isRenner: boolean;
  canApply: boolean;
  alreadyApplied: boolean;
  licenseBlocked: boolean;
  latestDispute: LatestDispute | null;
}) {
  if (!user) {
    return (
      <Link
        href="/signin"
        className="btn-dark"
        style={{ textDecoration: "none" }}
      >
        Sign in to apply
      </Link>
    );
  }

  if (task.status === "Booked") {
    if (isBookedRunner) {
      const availableAtIso = startsAvailableAt(task)?.toISOString() ?? null;
      return (
        <div className="flex flex-col gap-2">
          <StartTaskButton
            taskId={task.id}
            availableAtIso={availableAtIso}
          />
          <RennerCancelButton
            taskId={task.id}
            userId={user.id}
            phase="Booked"
          />
        </div>
      );
    }
    if (isPoster) {
      return (
        <div className="flex flex-col gap-2">
          <DisabledLightButton text="Waiting on Renner to start" />
          <ClientCancelButton
            taskId={task.id}
            userId={user.id}
            phase="Booked"
          />
        </div>
      );
    }
    return <DisabledLightButton text="Task already booked" />;
  }

  if (task.status === "Started") {
    if (isBookedRunner) {
      return (
        <div className="flex flex-col gap-2">
          <Link
            href={`/tasks/${task.id}/review`}
            className="btn-dark"
            style={{ textDecoration: "none" }}
          >
            Mark complete →
          </Link>
          <UnableToCompleteButton taskId={task.id} userId={user.id} />
          <RennerCancelButton
            taskId={task.id}
            userId={user.id}
            phase="Started"
          />
        </div>
      );
    }
    if (isPoster) {
      return (
        <div className="flex flex-col gap-2">
          <DisabledLightButton text="Renner is on the task" />
          <ClientCancelButton
            taskId={task.id}
            userId={user.id}
            phase="Started"
          />
        </div>
      );
    }
    return <DisabledLightButton text="Task in progress" />;
  }

  if (task.status === "Pending approval") {
    if (isPoster) {
      return (
        <Link
          href={`/tasks/${task.id}/review`}
          className="btn-dark"
          style={{ textDecoration: "none" }}
        >
          Review submitted work
        </Link>
      );
    }
    if (isBookedRunner) {
      return <DisabledLightButton text="Awaiting client confirmation" />;
    }
    return <DisabledLightButton text="Pending confirmation" />;
  }

  if (task.status === "Complete") {
    return (
      <SuccessNotice
        title="Task complete"
        body="Payment has been released to the Renner."
      />
    );
  }

  if (task.status === "Unable to complete") {
    return (
      <SuccessNotice
        title="Reported as unable to complete"
        body="50% of the pay was released to the Renner; the other 50% was refunded."
      />
    );
  }

  if (task.status === "Disputed") {
    return (
      <DisputeBlock
        latestDispute={latestDispute}
        viewerId={user.id}
        isBookedRunner={isBookedRunner}
        isPoster={isPoster}
      />
    );
  }

  if (task.status === "Closed") {
    return <DisabledLightButton text="Task closed" />;
  }

  // Open
  if (isPoster) {
    return <DisabledLightButton text="You posted this task" />;
  }
  if (!isRenner) {
    return <DisabledLightButton text="Switch to a Renner account to apply" />;
  }
  if (licenseBlocked) {
    return (
      <>
        <DisabledLightButton text="License required" />
        <p
          style={{
            fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
            fontSize: "12px",
            color: "#7d8da0",
            marginTop: "10px",
            lineHeight: 1.5,
          }}
        >
          Add a verified real estate license to your profile to apply for
          licensed tasks.
        </p>
      </>
    );
  }
  if (canApply) {
    return (
      <ApplyButton
        taskId={task.id}
        userId={user.id}
        alreadyApplied={alreadyApplied}
        requiresLicense={task.requires_license}
      />
    );
  }
  return <DisabledLightButton text="Unable to apply" />;
}

function DisabledLightButton({ text }: { text: string }) {
  return (
    <button
      type="button"
      className="btn-light"
      disabled
      style={{ width: "100%", padding: "13px 18px" }}
    >
      {text}
    </button>
  );
}

function SuccessNotice({
  title,
  body,
  tone = "green",
}: {
  title: string;
  body: string;
  tone?: "green" | "red";
}) {
  const palette =
    tone === "green"
      ? { background: "rgba(45,138,78,0.08)", color: "#2d8a4e" }
      : { background: "rgba(192,57,43,0.08)", color: "#c0392b" };
  return (
    <div
      style={{
        backgroundColor: palette.background,
        color: palette.color,
        borderRadius: "10px",
        padding: "14px 16px",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
          fontSize: "13px",
          fontWeight: 500,
          marginBottom: "2px",
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
          fontSize: "12px",
          color: "#647589",
          lineHeight: 1.5,
        }}
      >
        {body}
      </div>
    </div>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div
        style={{
          fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
          fontSize: "10px",
          fontWeight: 500,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "#7d8da0",
          marginBottom: "6px",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
          fontSize: "15px",
          fontWeight: 500,
          color: "#0d0f12",
        }}
      >
        {value}
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span
        style={{
          fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
          fontSize: "12px",
          color: "#7d8da0",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
          fontSize: "13px",
          fontWeight: 500,
          color: "#0d0f12",
        }}
      >
        {value}
      </span>
    </div>
  );
}

function DisputeBlock({
  latestDispute,
  viewerId,
  isBookedRunner,
  isPoster,
}: {
  latestDispute: LatestDispute | null;
  viewerId: string;
  isBookedRunner: boolean;
  isPoster: boolean;
}) {
  const isDamageClaim =
    !!latestDispute && latestDispute.damage_amount != null;
  const renderResponseStatus = () => {
    if (!latestDispute) return null;
    if (latestDispute.damage_response === "accepted") {
      return "Renner accepted the claim. Awaiting payout.";
    }
    if (latestDispute.damage_response === "countered") {
      return `Renner proposed $${Number(
        latestDispute.damage_counter_amount ?? 0,
      ).toLocaleString("en-US")}. Awaiting client review.`;
    }
    if (latestDispute.damage_response === "disputed") {
      return "Renner disputed the claim. Escalated to Renner support.";
    }
    return "Awaiting Renner response.";
  };

  return (
    <div className="flex flex-col gap-3">
      <div
        style={{
          backgroundColor: "rgba(192,57,43,0.08)",
          color: "#c0392b",
          borderRadius: "10px",
          padding: "14px 16px",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
            fontSize: "13px",
            fontWeight: 500,
            marginBottom: "4px",
          }}
        >
          Task disputed
        </div>
        <div
          style={{
            fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
            fontSize: "12px",
            color: "#7d8da0",
            lineHeight: 1.55,
          }}
        >
          {isDamageClaim
            ? `Damage claim filed for $${Number(
                latestDispute?.damage_amount ?? 0,
              ).toLocaleString("en-US")}. ${renderResponseStatus()}`
            : "An admin is reviewing this task."}
        </div>
      </div>

      {isDamageClaim &&
        latestDispute?.damage_response === null &&
        isBookedRunner &&
        latestDispute?.against === viewerId && (
          <DamageResponseButton
            disputeId={latestDispute.id}
            damageAmount={Number(latestDispute.damage_amount ?? 0)}
          />
        )}

      {isDamageClaim &&
        latestDispute?.damage_response === "countered" &&
        isPoster && (
          <p
            style={{
              fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
              fontSize: "12px",
              color: "#647589",
              lineHeight: 1.55,
            }}
          >
            Renner&apos;s counter offer:{" "}
            <strong style={{ color: "#0d0f12" }}>
              $
              {Number(
                latestDispute.damage_counter_amount ?? 0,
              ).toLocaleString("en-US")}
            </strong>
            {latestDispute.admin_notes
              ? ` — "${latestDispute.admin_notes}"`
              : ""}
          </p>
        )}
    </div>
  );
}
