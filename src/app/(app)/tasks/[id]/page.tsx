import Link from "next/link";
import { notFound } from "next/navigation";
import { ApplyButton } from "@/components/ApplyButton";
import { CategoryBadge, LicenseBadge } from "@/components/CategoryBadge";
import { formatDate, formatPay } from "@/lib/format";
import { createClient } from "@/lib/supabase/server";
import type { Task } from "@/lib/types";

export const dynamic = "force-dynamic";

type PageProps = { params: { id: string } };

export default async function TaskDetailPage({ params }: PageProps) {
  const supabase = createClient();

  const { data: task } = await supabase
    .from("tasks")
    .select(
      "id, title, description, category, pay, pay_type, location, city, date, time_estimate, status, requires_license, posted_by, booked_runner, created_date, payment_status",
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
            <div className="flex items-center gap-2 flex-wrap" style={{ marginBottom: "16px" }}>
              {t.category && <CategoryBadge>{t.category}</CategoryBadge>}
              {t.requires_license && <LicenseBadge />}
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

            <div
              className="card"
              style={{ padding: "28px", marginBottom: "28px" }}
            >
              <div
                className="grid grid-cols-2 gap-y-6 gap-x-8"
              >
                <MetaItem label="Category" value={t.category ?? "—"} />
                <MetaItem label="Location" value={t.location ?? "—"} />
                <MetaItem label="Date" value={formatDate(t.date) ?? "Flexible"} />
                <MetaItem
                  label="Time estimate"
                  value={t.time_estimate ?? "—"}
                />
              </div>
            </div>

            <div className="card" style={{ padding: "28px", marginBottom: "28px" }}>
              <h2
                className="micro-label"
                style={{ marginBottom: "12px" }}
              >
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
              <h2
                className="micro-label"
                style={{ marginBottom: "14px" }}
              >
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
          </div>

          <aside>
            <div
              className="card sticky"
              style={{ padding: "28px", top: "96px" }}
            >
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
                {formatPay(t.pay, t.pay_type)}
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
                Payment held by Stripe until approved
              </p>

              <div
                className="divider"
                style={{ marginBottom: "20px" }}
              />

              <div className="flex flex-col gap-3" style={{ marginBottom: "24px" }}>
                <SummaryRow label="Category" value={t.category ?? "—"} />
                <SummaryRow label="Status" value={t.status} />
                <SummaryRow
                  label="Posted"
                  value={formatDate(t.created_date) ?? "—"}
                />
              </div>

              {!user ? (
                <Link href="/signin" className="btn-dark" style={{ textDecoration: "none" }}>
                  Sign in to apply
                </Link>
              ) : !isRenner ? (
                <button
                  type="button"
                  className="btn-light"
                  disabled
                  style={{ width: "100%", padding: "13px 18px" }}
                >
                  Switch to a Renner account to apply
                </button>
              ) : !isOpen ? (
                <button
                  type="button"
                  className="btn-light"
                  disabled
                  style={{ width: "100%", padding: "13px 18px" }}
                >
                  Task is no longer open
                </button>
              ) : licenseBlocked ? (
                <>
                  <button
                    type="button"
                    className="btn-light"
                    disabled
                    style={{ width: "100%", padding: "13px 18px" }}
                  >
                    License required
                  </button>
                  <p
                    style={{
                      fontFamily:
                        "var(--font-inter), ui-sans-serif, system-ui",
                      fontSize: "12px",
                      color: "#7d8da0",
                      marginTop: "10px",
                      lineHeight: 1.5,
                    }}
                  >
                    Add a verified real estate license to your profile to apply
                    for licensed tasks.
                  </p>
                </>
              ) : canApply ? (
                <ApplyButton
                  taskId={t.id}
                  userId={user.id}
                  alreadyApplied={alreadyApplied}
                />
              ) : (
                <button
                  type="button"
                  className="btn-light"
                  disabled
                  style={{ width: "100%", padding: "13px 18px" }}
                >
                  You posted this task
                </button>
              )}
            </div>
          </aside>
        </div>
      </div>
    </main>
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
