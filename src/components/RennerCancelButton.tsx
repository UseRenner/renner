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

const POST_START_REASONS = [
  "Safety concern",
  "Personal emergency",
  "Can't access property",
  "Other",
] as const;

type Phase = "Booked" | "Started";

export function RennerCancelButton({
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
  const [reason, setReason] = useState<(typeof POST_START_REASONS)[number] | "">(
    "",
  );
  const [explanation, setExplanation] = useState("");

  async function handleBefore() {
    setSubmitting(true);
    setError(null);
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
    router.push("/my-applications");
    router.refresh();
  }

  async function handleAfter(e: React.FormEvent) {
    e.preventDefault();
    if (!reason) {
      setError("Please pick a reason.");
      return;
    }
    if (explanation.trim().length < 50) {
      setError("Please write at least 50 characters describing what happened.");
      return;
    }
    setSubmitting(true);
    setError(null);

    const safetyFlag = reason === "Safety concern";
    const { error: updateError } = await supabase
      .from("tasks")
      .update({
        status: "Closed",
        payment_status: "released",
        completed_date: new Date().toISOString(),
        dispute_reason: `Renner cancelled (${reason}): ${explanation.trim()}`,
        safety_flag: safetyFlag,
      })
      .eq("id", taskId);
    if (updateError) {
      setError(updateError.message);
      setSubmitting(false);
      return;
    }
    const newCount = await incrementCancellationCount(supabase, userId);
    if (safetyFlag) {
      await notifyAdmin({ event: "safety_flag", taskId });
    }
    if (newCount > CANCELLATION_THRESHOLD) {
      await notifyAdmin({
        event: "cancellation_threshold",
        userId,
        count: newCount,
      });
    }
    setSubmitting(false);
    setOpen(false);
    router.push("/my-applications");
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
          setReason("");
          setExplanation("");
        }}
        style={{ width: "100%" }}
      >
        Cancel booking
      </button>

      {open && (
        <ModalShell onClose={() => setOpen(false)}>
          {phase === "Booked" ? (
            <>
              <h2
                className="font-display"
                style={{
                  fontSize: "22px",
                  color: "#0d0f12",
                  marginBottom: "10px",
                }}
              >
                Cancel this booking?
              </h2>
              <p
                style={{
                  fontFamily:
                    "var(--font-source-sans), ui-sans-serif, system-ui",
                  fontSize: "14px",
                  color: "#4d5b6a",
                  lineHeight: 1.65,
                  marginBottom: "20px",
                }}
              >
                The client will be fully refunded and the task will reopen
                for other Renners. Repeated cancellations may result in
                account review.
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
                  Keep booking
                </button>
                <button
                  type="button"
                  className="btn-danger"
                  onClick={handleBefore}
                  disabled={submitting}
                  style={{ flex: 1 }}
                >
                  {submitting ? "Cancelling…" : "Cancel booking"}
                </button>
              </div>
            </>
          ) : (
            <form onSubmit={handleAfter}>
              <h2
                className="font-display"
                style={{
                  fontSize: "22px",
                  color: "#0d0f12",
                  marginBottom: "8px",
                }}
              >
                Cancel after starting
              </h2>
              <p
                style={{
                  fontFamily:
                    "var(--font-source-sans), ui-sans-serif, system-ui",
                  fontSize: "13px",
                  color: "#647589",
                  lineHeight: 1.6,
                  marginBottom: "16px",
                }}
              >
                You&apos;ll receive 50% of the task pay; 50% will be refunded
                to the client. A written explanation is required.
              </p>

              <div style={{ marginBottom: "12px" }}>
                <label className="input-label">Reason</label>
                <div className="flex flex-col gap-2">
                  {POST_START_REASONS.map((r) => {
                    const selected = reason === r;
                    return (
                      <button
                        type="button"
                        key={r}
                        onClick={() => setReason(r)}
                        style={{
                          textAlign: "left",
                          border: selected
                            ? "1px solid #0d0f12"
                            : "1px solid #cad1d8",
                          backgroundColor: selected ? "#f6f7f9" : "#fbfbfc",
                          color: "#0d0f12",
                          borderRadius: "8px",
                          padding: "10px 14px",
                          cursor: "pointer",
                          fontFamily:
                            "var(--font-source-sans), ui-sans-serif, system-ui",
                          fontSize: "14px",
                        }}
                      >
                        {r}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div style={{ marginBottom: "12px" }}>
                <label className="input-label" htmlFor="renner-explanation">
                  What happened?
                </label>
                <textarea
                  id="renner-explanation"
                  className="input"
                  value={explanation}
                  onChange={(e) => setExplanation(e.target.value)}
                  placeholder="Please describe what happened in detail."
                  style={{ minHeight: "120px", resize: "vertical" }}
                  required
                />
                <div
                  style={{
                    fontFamily:
                      "var(--font-source-sans), ui-sans-serif, system-ui",
                    fontSize: "11px",
                    color:
                      explanation.trim().length >= 50 ? "#647589" : "#c0392b",
                    marginTop: "4px",
                  }}
                >
                  {explanation.trim().length}/50 characters minimum
                </div>
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

              <div className="flex gap-2">
                <button
                  type="button"
                  className="btn-light"
                  onClick={() => setOpen(false)}
                  disabled={submitting}
                  style={{ flex: 1 }}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="btn-danger"
                  disabled={submitting}
                  style={{ flex: 1 }}
                >
                  {submitting ? "Submitting…" : "Submit cancellation"}
                </button>
              </div>
            </form>
          )}
        </ModalShell>
      )}
    </>
  );
}
