"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ModalShell } from "@/components/ModalShell";
import { createClient } from "@/lib/supabase/client";

type OpenTask = { id: string; title: string };

export function InviteToTaskButton({
  rennerId,
  clientId,
  rennerName,
}: {
  rennerId: string;
  clientId: string;
  rennerName: string;
}) {
  const router = useRouter();
  const supabase = createClient();
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState<OpenTask[] | null>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!open || tasks !== null) return;
    (async () => {
      const { data } = await supabase
        .from("tasks")
        .select("id, title")
        .eq("posted_by", clientId)
        .eq("status", "Open")
        .order("created_date", { ascending: false });
      setTasks((data ?? []) as OpenTask[]);
      if (data && data.length > 0) setSelectedTaskId(data[0].id);
    })();
  }, [open, supabase, clientId, tasks]);

  async function handleInviteToExisting() {
    if (!selectedTaskId) {
      setError("Pick a task to invite to.");
      return;
    }
    setError(null);
    setSubmitting(true);

    // Skip if an application already exists for this task/applicant.
    const { data: existing } = await supabase
      .from("applications")
      .select("id")
      .eq("task_id", selectedTaskId)
      .eq("applicant_id", rennerId)
      .maybeSingle();
    if (existing) {
      setError("This Renner already has an application on that task.");
      setSubmitting(false);
      return;
    }

    const { error: insertError } = await supabase
      .from("applications")
      .insert({
        task_id: selectedTaskId,
        applicant_id: rennerId,
        status: "Invited",
      });
    if (insertError) {
      setError(insertError.message);
      setSubmitting(false);
      return;
    }
    setSubmitting(false);
    setSuccess(`Invited ${rennerName}. They'll see it in My Applications.`);
    router.refresh();
  }

  function handleStartNewTask() {
    setOpen(false);
    router.push(`/post?invite=${rennerId}`);
  }

  return (
    <>
      <button
        type="button"
        className="btn-dark"
        onClick={() => {
          setOpen(true);
          setError(null);
          setSuccess(null);
        }}
        style={{ flex: 1 }}
      >
        Invite to task
      </button>

      {open && (
        <ModalShell onClose={() => setOpen(false)} width={460}>
          <h2
            className="font-display"
            style={{
              fontSize: "22px",
              color: "#0d0f12",
              marginBottom: "8px",
            }}
          >
            Invite {rennerName}
          </h2>
          <p
            style={{
              fontFamily: "var(--font-public-sans), ui-sans-serif, system-ui",
              fontSize: "13px",
              color: "#647589",
              lineHeight: 1.6,
              marginBottom: "20px",
            }}
          >
            Pick one of your open tasks, or start a new one with this Renner
            pre-assigned.
          </p>

          {success ? (
            <>
              <p
                style={{
                  fontFamily:
                    "var(--font-public-sans), ui-sans-serif, system-ui",
                  fontSize: "14px",
                  color: "#2d8a4e",
                  marginBottom: "20px",
                }}
              >
                {success}
              </p>
              <button
                type="button"
                className="btn-dark"
                onClick={() => {
                  setOpen(false);
                  setSuccess(null);
                }}
              >
                Close
              </button>
            </>
          ) : (
            <>
              <div style={{ marginBottom: "16px" }}>
                <label className="input-label" htmlFor="invite-task">
                  Existing open task
                </label>
                {tasks === null ? (
                  <div
                    style={{
                      padding: "20px 0",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <LoadingSpinner size={20} />
                  </div>
                ) : tasks.length === 0 ? (
                  <p
                    style={{
                      fontFamily:
                        "var(--font-public-sans), ui-sans-serif, system-ui",
                      fontSize: "13px",
                      color: "#7d8da0",
                    }}
                  >
                    You don&apos;t have any open tasks. Start a new one
                    below.
                  </p>
                ) : (
                  <select
                    id="invite-task"
                    className="input"
                    value={selectedTaskId}
                    onChange={(e) => setSelectedTaskId(e.target.value)}
                  >
                    {tasks.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.title}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {error && (
                <p
                  style={{
                    color: "#c0392b",
                    fontSize: "13px",
                    marginBottom: "12px",
                  }}
                >
                  {error}
                </p>
              )}

              <div className="flex flex-col gap-2">
                {tasks && tasks.length > 0 && (
                  <button
                    type="button"
                    className="btn-dark"
                    onClick={handleInviteToExisting}
                    disabled={submitting}
                  >
                    {submitting ? "Inviting…" : "Send invitation"}
                  </button>
                )}
                <button
                  type="button"
                  className="btn-light"
                  onClick={handleStartNewTask}
                  style={{ width: "100%" }}
                >
                  Start a new task
                </button>
                <button
                  type="button"
                  className="btn-light"
                  onClick={() => setOpen(false)}
                  style={{ width: "100%", marginTop: "4px" }}
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </ModalShell>
      )}
    </>
  );
}
