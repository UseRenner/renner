"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { createClient } from "@/lib/supabase/client";

type Props = {
  taskId: string;
  applicationId: string;
  applicantId: string;
};

export function BookButton({ taskId, applicationId, applicantId }: Props) {
  const router = useRouter();
  const supabase = createClient();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleBook() {
    setSubmitting(true);
    setError(null);

    const nowIso = new Date().toISOString();

    const { error: taskError } = await supabase
      .from("tasks")
      .update({
        status: "Booked",
        booked_runner: applicantId,
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

    const { error: declineError } = await supabase
      .from("applications")
      .update({ status: "Declined" })
      .eq("task_id", taskId)
      .neq("id", applicationId);

    if (declineError) {
      setError(declineError.message);
      setSubmitting(false);
      return;
    }

    router.push("/my-tasks");
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        className="btn-dark"
        onClick={handleBook}
        disabled={submitting}
        style={{ width: "auto", padding: "10px 16px" }}
      >
        {submitting ? <LoadingSpinner size={18} tone="light" /> : "Book & pay"}
      </button>
      {error && (
        <p style={{ color: "#c0392b", fontSize: "12px" }}>{error}</p>
      )}
    </div>
  );
}
