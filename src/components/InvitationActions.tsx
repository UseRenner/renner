"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function InvitationActions({
  applicationId,
  taskId,
  rennerId,
}: {
  applicationId: string;
  taskId: string;
  rennerId: string;
}) {
  const router = useRouter();
  const supabase = createClient();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAccept() {
    setSubmitting(true);
    setError(null);
    const nowIso = new Date().toISOString();

    const { error: taskError } = await supabase
      .from("tasks")
      .update({
        status: "Booked",
        booked_runner: rennerId,
        booked_date: nowIso,
      })
      .eq("id", taskId);
    if (taskError) {
      setError(taskError.message);
      setSubmitting(false);
      return;
    }

    const { error: acceptError } = await supabase
      .from("applications")
      .update({ status: "Accepted" })
      .eq("id", applicationId);
    if (acceptError) {
      setError(acceptError.message);
      setSubmitting(false);
      return;
    }

    await supabase
      .from("applications")
      .update({ status: "Declined" })
      .eq("task_id", taskId)
      .neq("id", applicationId);

    setSubmitting(false);
    router.refresh();
  }

  async function handleDecline() {
    setSubmitting(true);
    setError(null);
    const { error: declineError } = await supabase
      .from("applications")
      .update({ status: "Declined" })
      .eq("id", applicationId);
    if (declineError) {
      setError(declineError.message);
      setSubmitting(false);
      return;
    }
    setSubmitting(false);
    router.refresh();
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <div className="flex gap-2">
        <button
          type="button"
          className="btn-light"
          onClick={handleDecline}
          disabled={submitting}
          style={{ padding: "8px 14px", fontSize: "13px" }}
        >
          Decline
        </button>
        <button
          type="button"
          className="btn-dark"
          onClick={handleAccept}
          disabled={submitting}
          style={{
            width: "auto",
            padding: "8px 14px",
            fontSize: "13px",
          }}
        >
          {submitting ? "Accepting…" : "Accept invitation"}
        </button>
      </div>
      {error && (
        <p style={{ color: "#c0392b", fontSize: "12px" }}>{error}</p>
      )}
    </div>
  );
}
