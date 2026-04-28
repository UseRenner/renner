"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ModalShell } from "@/components/ModalShell";
import { notifyAdmin } from "@/lib/notifyAdmin";
import { createClient } from "@/lib/supabase/client";

type Mode = "idle" | "accept" | "counter" | "disputed";

export function DamageResponseButton({
  disputeId,
  damageAmount,
}: {
  disputeId: string;
  damageAmount: number;
}) {
  const router = useRouter();
  const supabase = createClient();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("idle");
  const [counterAmount, setCounterAmount] = useState("");
  const [explanation, setExplanation] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function reset() {
    setMode("idle");
    setCounterAmount("");
    setExplanation("");
    setError(null);
  }

  async function commit(payload: {
    damage_response: "accepted" | "countered" | "disputed";
    damage_counter_amount?: number | null;
    admin_notes?: string;
  }) {
    setSubmitting(true);
    setError(null);
    const { error: updateError } = await supabase
      .from("disputes")
      .update(payload)
      .eq("id", disputeId);
    setSubmitting(false);
    if (updateError) {
      setError(updateError.message);
      return false;
    }
    return true;
  }

  async function handleAccept() {
    const ok = await commit({ damage_response: "accepted" });
    if (!ok) return;
    setOpen(false);
    reset();
    router.refresh();
  }

  async function handleCounter(e: React.FormEvent) {
    e.preventDefault();
    const parsed = Number(counterAmount);
    if (!counterAmount || Number.isNaN(parsed) || parsed < 0) {
      setError("Enter a counter-offer amount.");
      return;
    }
    if (explanation.trim().length < 20) {
      setError("Tell the client why — at least 20 characters.");
      return;
    }
    const ok = await commit({
      damage_response: "countered",
      damage_counter_amount: parsed,
      admin_notes: explanation.trim(),
    });
    if (!ok) return;
    setOpen(false);
    reset();
    router.refresh();
  }

  async function handleDispute(e: React.FormEvent) {
    e.preventDefault();
    if (explanation.trim().length < 20) {
      setError("Tell us what happened — at least 20 characters.");
      return;
    }
    const ok = await commit({
      damage_response: "disputed",
      admin_notes: explanation.trim(),
    });
    if (!ok) return;
    await notifyAdmin({
      event: "dispute_escalated",
      disputeId,
      explanation: explanation.trim(),
    });
    setOpen(false);
    reset();
    router.refresh();
  }

  return (
    <>
      <button
        type="button"
        className="btn-dark"
        onClick={() => {
          setOpen(true);
          reset();
        }}
        style={{ width: "100%" }}
      >
        Respond to claim
      </button>

      {open && (
        <ModalShell onClose={() => setOpen(false)} width={520}>
          {mode === "idle" && (
            <>
              <h2
                className="font-display"
                style={{
                  fontSize: "22px",
                  color: "#0d0f12",
                  marginBottom: "8px",
                }}
              >
                Respond to the claim
              </h2>
              <p
                style={{
                  fontFamily:
                    "var(--font-work-sans), ui-sans-serif, system-ui",
                  fontSize: "13px",
                  color: "#647589",
                  lineHeight: 1.6,
                  marginBottom: "20px",
                }}
              >
                The client is claiming{" "}
                <strong style={{ color: "#0d0f12" }}>
                  ${Number(damageAmount).toLocaleString("en-US")}
                </strong>{" "}
                in damages. You have 48 hours to respond. Unresolved claims
                escalate to Renner for review.
              </p>

              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  className="btn-dark"
                  onClick={handleAccept}
                  disabled={submitting}
                >
                  {submitting ? "Submitting…" : `Accept $${Number(damageAmount).toLocaleString("en-US")}`}
                </button>
                <button
                  type="button"
                  className="btn-light"
                  onClick={() => setMode("counter")}
                  style={{ width: "100%", padding: "12px 16px" }}
                >
                  Propose a different amount
                </button>
                <button
                  type="button"
                  className="btn-danger-outline"
                  onClick={() => setMode("disputed")}
                  style={{ width: "100%", padding: "12px 16px" }}
                >
                  Dispute this claim
                </button>
              </div>

              {error && (
                <p
                  style={{
                    color: "#c0392b",
                    fontSize: "13px",
                    marginTop: "12px",
                  }}
                >
                  {error}
                </p>
              )}
            </>
          )}

          {mode === "counter" && (
            <form onSubmit={handleCounter}>
              <h2
                className="font-display"
                style={{
                  fontSize: "22px",
                  color: "#0d0f12",
                  marginBottom: "12px",
                }}
              >
                Propose a different amount
              </h2>

              <div style={{ marginBottom: "14px" }}>
                <label className="input-label" htmlFor="counterAmount">
                  Your counter offer
                </label>
                <input
                  id="counterAmount"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="1"
                  className="input"
                  placeholder="$"
                  value={counterAmount}
                  onChange={(e) => setCounterAmount(e.target.value)}
                  required
                />
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label
                  className="input-label"
                  htmlFor="counterExplanation"
                >
                  Explanation
                </label>
                <textarea
                  id="counterExplanation"
                  className="input"
                  value={explanation}
                  onChange={(e) => setExplanation(e.target.value)}
                  placeholder="Why is this a fair amount?"
                  style={{ minHeight: "100px", resize: "vertical" }}
                  required
                />
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
                  onClick={() => setMode("idle")}
                  disabled={submitting}
                  style={{ flex: 1 }}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="btn-dark"
                  disabled={submitting}
                  style={{ flex: 1 }}
                >
                  {submitting ? "Sending…" : "Send counter"}
                </button>
              </div>
            </form>
          )}

          {mode === "disputed" && (
            <form onSubmit={handleDispute}>
              <h2
                className="font-display"
                style={{
                  fontSize: "22px",
                  color: "#0d0f12",
                  marginBottom: "12px",
                }}
              >
                Dispute this claim
              </h2>

              <div style={{ marginBottom: "16px" }}>
                <label className="input-label" htmlFor="disputeExplanation">
                  Explanation
                </label>
                <textarea
                  id="disputeExplanation"
                  className="input"
                  value={explanation}
                  onChange={(e) => setExplanation(e.target.value)}
                  placeholder="Tell us why you don't believe you're responsible."
                  style={{ minHeight: "100px", resize: "vertical" }}
                  required
                />
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
                  onClick={() => setMode("idle")}
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
                  {submitting ? "Sending…" : "Submit dispute"}
                </button>
              </div>
            </form>
          )}
        </ModalShell>
      )}
    </>
  );
}
