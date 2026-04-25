"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Props = {
  taskId: string;
  userId: string;
  alreadyApplied: boolean;
};

export function ApplyButton({ taskId, userId, alreadyApplied }: Props) {
  const router = useRouter();
  const supabase = createClient();
  const [submitting, setSubmitting] = useState(false);
  const [applied, setApplied] = useState(alreadyApplied);
  const [error, setError] = useState<string | null>(null);

  async function handleApply() {
    setSubmitting(true);
    setError(null);
    const { error: insertError } = await supabase.from("applications").insert({
      task_id: taskId,
      applicant_id: userId,
      status: "Applied",
    });
    if (insertError) {
      setError(insertError.message);
      setSubmitting(false);
      return;
    }
    setApplied(true);
    setSubmitting(false);
    router.refresh();
  }

  if (applied) {
    return (
      <button
        type="button"
        className="btn-light"
        disabled
        style={{ width: "100%", padding: "13px 18px" }}
      >
        Applied
      </button>
    );
  }

  return (
    <>
      <button
        type="button"
        className="btn-dark"
        onClick={handleApply}
        disabled={submitting}
      >
        {submitting ? "Applying…" : "Apply for this task"}
      </button>
      {error && (
        <p style={{ color: "#c0392b", fontSize: "12px", marginTop: "8px" }}>
          {error}
        </p>
      )}
    </>
  );
}
