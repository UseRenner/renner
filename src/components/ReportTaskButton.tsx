"use client";

import { useState } from "react";
import { notifyAdmin } from "@/lib/notifyAdmin";
import { createClient } from "@/lib/supabase/client";

export function ReportTaskButton({
  taskId,
  raisedBy,
  against,
}: {
  taskId: string;
  raisedBy: string;
  against: string | null;
}) {
  const supabase = createClient();
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!reason.trim()) {
      setError("Please describe what's wrong with this task.");
      return;
    }
    setError(null);
    setSubmitting(true);
    const { data: inserted, error: insertError } = await supabase
      .from("disputes")
      .insert({
        task_id: taskId,
        raised_by: raisedBy,
        against,
        reason,
        status: "Open",
      })
      .select("id")
      .single();
    setSubmitting(false);
    if (insertError) {
      setError(insertError.message);
      return;
    }
    if (inserted?.id) {
      await notifyAdmin({ event: "dispute_filed", disputeId: inserted.id });
    }
    setSubmitted(true);
  }

  return (
    <>
      <button
        type="button"
        className="text-link"
        onClick={() => {
          setOpen(true);
          setSubmitted(false);
          setError(null);
        }}
        style={{
          background: "none",
          border: "none",
          padding: 0,
          fontFamily: "var(--font-public-sans), ui-sans-serif, system-ui",
          fontSize: "12px",
          color: "#7d8da0",
          cursor: "pointer",
        }}
      >
        Task miscategorized? Report it
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(13, 15, 18, 0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            zIndex: 100,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#fbfbfc",
              border: "1px solid #dce0e5",
              borderRadius: "16px",
              padding: "28px",
              width: "100%",
              maxWidth: "480px",
            }}
          >
            {submitted ? (
              <>
                <h2
                  className="font-display"
                  style={{
                    fontSize: "22px",
                    color: "#0d0f12",
                    marginBottom: "10px",
                  }}
                >
                  Thanks for reporting
                </h2>
                <p
                  style={{
                    fontFamily:
                      "var(--font-public-sans), ui-sans-serif, system-ui",
                    fontSize: "14px",
                    color: "#4d5b6a",
                    lineHeight: 1.6,
                    marginBottom: "20px",
                  }}
                >
                  We&apos;ll review this task.
                </p>
                <button
                  type="button"
                  className="btn-dark"
                  onClick={() => setOpen(false)}
                >
                  Close
                </button>
              </>
            ) : (
              <form onSubmit={handleSubmit}>
                <h2
                  className="font-display"
                  style={{
                    fontSize: "22px",
                    color: "#0d0f12",
                    marginBottom: "8px",
                  }}
                >
                  Report this task
                </h2>
                <p
                  style={{
                    fontFamily:
                      "var(--font-public-sans), ui-sans-serif, system-ui",
                    fontSize: "13px",
                    color: "#647589",
                    lineHeight: 1.6,
                    marginBottom: "16px",
                  }}
                >
                  Tell us what&apos;s wrong. We review every report and may
                  reach out for more details.
                </p>
                <label className="input-label" htmlFor="report-reason">
                  Reason
                </label>
                <textarea
                  id="report-reason"
                  className="input"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="e.g. This task involves showing property but isn't marked as license-required."
                  style={{ minHeight: "100px", resize: "vertical" }}
                  required
                />
                {error && (
                  <p
                    style={{
                      color: "#c0392b",
                      fontSize: "13px",
                      marginTop: "10px",
                    }}
                  >
                    {error}
                  </p>
                )}
                <div className="flex gap-2" style={{ marginTop: "16px" }}>
                  <button
                    type="button"
                    className="btn-light"
                    onClick={() => setOpen(false)}
                    style={{ flex: 1 }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-dark"
                    disabled={submitting}
                    style={{ flex: 1 }}
                  >
                    {submitting ? "Submitting…" : "Submit report"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
