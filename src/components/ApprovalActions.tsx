"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Mode = "idle" | "review" | "dispute";

export function ApprovalActions({
  taskId,
  reviewerId,
  runnerId,
}: {
  taskId: string;
  reviewerId: string;
  runnerId: string;
}) {
  const router = useRouter();
  const supabase = createClient();

  const [mode, setMode] = useState<Mode>("idle");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleApprove() {
    setError(null);
    setSubmitting(true);

    const now = new Date().toISOString();
    const { error: updateError } = await supabase
      .from("tasks")
      .update({
        status: "Complete",
        payment_status: "released",
        completed_date: now,
      })
      .eq("id", taskId);

    if (updateError) {
      setError(updateError.message);
      setSubmitting(false);
      return;
    }

    setSubmitting(false);
    setMode("review");
  }

  async function handleSubmitReview(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const { error: insertError } = await supabase.from("reviews").insert({
      task_id: taskId,
      reviewer_id: reviewerId,
      reviewed_user_id: runnerId,
      rating,
      comment: comment || null,
    });

    if (insertError) {
      setError(insertError.message);
      setSubmitting(false);
      return;
    }

    router.push("/my-tasks");
    router.refresh();
  }

  async function handleSubmitDispute(e: React.FormEvent) {
    e.preventDefault();
    if (!reason.trim()) {
      setError("Please describe the issue.");
      return;
    }
    setError(null);
    setSubmitting(true);

    const { error: disputeError } = await supabase.from("disputes").insert({
      task_id: taskId,
      raised_by: reviewerId,
      against: runnerId,
      reason,
      status: "Open",
    });

    if (disputeError) {
      setError(disputeError.message);
      setSubmitting(false);
      return;
    }

    const { error: taskError } = await supabase
      .from("tasks")
      .update({
        status: "Disputed",
        payment_status: "disputed",
        dispute_reason: reason,
      })
      .eq("id", taskId);

    if (taskError) {
      setError(taskError.message);
      setSubmitting(false);
      return;
    }

    router.push("/my-tasks");
    router.refresh();
  }

  if (mode === "review") {
    return (
      <form onSubmit={handleSubmitReview} className="flex flex-col gap-4">
        <div>
          <div className="micro-label" style={{ marginBottom: "10px" }}>
            Rate your Renner
          </div>
          <StarPicker value={rating} onChange={setRating} />
        </div>
        <div>
          <label className="input-label" htmlFor="comment">
            Comment (optional)
          </label>
          <textarea
            id="comment"
            className="input"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="What went well?"
            style={{ minHeight: "80px", resize: "vertical" }}
          />
        </div>
        {error && (
          <p style={{ color: "#c0392b", fontSize: "13px" }}>{error}</p>
        )}
        <button
          type="submit"
          className="btn-dark"
          disabled={submitting}
        >
          {submitting ? "Saving review…" : "Save review"}
        </button>
      </form>
    );
  }

  if (mode === "dispute") {
    return (
      <form onSubmit={handleSubmitDispute} className="flex flex-col gap-4">
        <div>
          <label className="input-label" htmlFor="reason">
            What went wrong?
          </label>
          <textarea
            id="reason"
            className="input"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Describe the issue. An admin will review."
            style={{ minHeight: "120px", resize: "vertical" }}
            required
          />
        </div>
        {error && (
          <p style={{ color: "#c0392b", fontSize: "13px" }}>{error}</p>
        )}
        <div className="flex gap-2">
          <button
            type="button"
            className="btn-light"
            onClick={() => {
              setMode("idle");
              setError(null);
            }}
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
            {submitting ? "Submitting…" : "Submit dispute"}
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {error && (
        <p style={{ color: "#c0392b", fontSize: "13px" }}>{error}</p>
      )}
      <button
        type="button"
        onClick={handleApprove}
        disabled={submitting}
        className="inline-flex items-center justify-center"
        style={{
          backgroundColor: "#2d8a4e",
          color: "#fbfbfc",
          fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
          fontSize: "15px",
          fontWeight: 500,
          borderRadius: "6px",
          padding: "13px 18px",
          border: "1px solid #2d8a4e",
          cursor: submitting ? "not-allowed" : "pointer",
          opacity: submitting ? 0.6 : 1,
        }}
      >
        {submitting ? "Releasing payment…" : "Approve & release payment"}
      </button>
      <button
        type="button"
        className="btn-light"
        onClick={() => setMode("dispute")}
        style={{ width: "100%", padding: "12px 16px" }}
      >
        Report an issue
      </button>
    </div>
  );
}

function StarPicker({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          aria-label={`${n} star${n === 1 ? "" : "s"}`}
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "6px",
            border: "1px solid #cad1d8",
            backgroundColor: n <= value ? "#0d0f12" : "#fbfbfc",
            color: n <= value ? "#fbfbfc" : "#647589",
            fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
            fontSize: "16px",
            cursor: "pointer",
            transition: "background-color 120ms ease",
          }}
        >
          ★
        </button>
      ))}
    </div>
  );
}
