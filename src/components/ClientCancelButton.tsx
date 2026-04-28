"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ModalShell } from "@/components/ModalShell";
import {
  CANCELLATION_THRESHOLD,
  incrementCancellationCount,
} from "@/lib/cancellation";
import { notifyAdmin } from "@/lib/notifyAdmin";
import { createClient } from "@/lib/supabase/client";

type Phase = "Booked" | "Started";

export function ClientCancelButton({
  taskId,
  userId,
  phase,
}: {
  taskId: string;
  userId: string;
  phase: Phase;
}) {
  const router = useRouter();
  const supabase = createClient();
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCancel() {
    setSubmitting(true);
    setError(null);

    if (phase === "Booked") {
      const { error: updateError } = await supabase
        .from("tasks")
        .update({
          status: "Open",
          booked_runner: null,
          booked_date: null,
          payment_status: "refunded",
        })
        .eq("id", taskId);
      if (updateError) {
        setError(updateError.message);
        setSubmitting(false);
        return;
      }
    } else {
      const { error: updateError } = await supabase
        .from("tasks")
        .update({
          status: "Closed",
          payment_status: "released",
          completed_date: new Date().toISOString(),
        })
        .eq("id", taskId);
      if (updateError) {
        setError(updateError.message);
        setSubmitting(false);
        return;
      }
    }

    const newCount = await incrementCancellationCount(supabase, userId);
    if (newCount > CANCELLATION_THRESHOLD) {
      await notifyAdmin({
        event: "cancellation_threshold",
        userId,
        count: newCount,
      });
    }

    setSubmitting(false);
    setOpen(false);
    router.push("/my-tasks");
    router.refresh();
  }

  return (
    <>
      <button
        type="button"
        className="btn-danger-outline"
        onClick={() => {
          setOpen(true);
          setError(null);
        }}
        style={{ width: "100%" }}
      >
        Cancel task
      </button>

      {open && (
        <ModalShell onClose={() => setOpen(false)}>
          <h2
            className="font-display"
            style={{
              fontSize: "22px",
              color: "#0d0f12",
              marginBottom: "10px",
            }}
          >
            {phase === "Booked"
              ? "Cancel this task?"
              : "Cancel after the Renner started?"}
          </h2>
          <p
            style={{
              fontFamily: "var(--font-source-sans), ui-sans-serif, system-ui",
              fontSize: "14px",
              color: "#4d5b6a",
              lineHeight: 1.65,
              marginBottom: "20px",
            }}
          >
            {phase === "Booked"
              ? "You'll receive a full refund including the platform fee. The task will reopen for new applicants."
              : "Your Renner has already started this task. Cancelling now will refund 50% of the task pay to you and release 50% to the Renner."}
          </p>
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
          <div className="flex gap-2">
            <button
              type="button"
              className="btn-light"
              onClick={() => setOpen(false)}
              disabled={submitting}
              style={{ flex: 1 }}
            >
              Keep task
            </button>
            <button
              type="button"
              className="btn-danger"
              onClick={handleCancel}
              disabled={submitting}
              style={{ flex: 1 }}
            >
              {submitting
                ? "Cancelling…"
                : phase === "Booked"
                  ? "Cancel & refund"
                  : "Cancel with 50/50 split"}
            </button>
          </div>
        </ModalShell>
      )}
    </>
  );
}
