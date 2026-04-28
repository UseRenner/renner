"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ModalShell } from "@/components/ModalShell";
import { createClient } from "@/lib/supabase/client";

export function StartTaskButton({
  taskId,
  availableAtIso,
}: {
  taskId: string;
  availableAtIso: string | null;
}) {
  const router = useRouter();
  const supabase = createClient();
  const [confirming, setConfirming] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [now, setNow] = useState<number>(() => Date.now());

  useEffect(() => {
    if (!availableAtIso) return;
    const id = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(id);
  }, [availableAtIso]);

  const availableAt = availableAtIso ? new Date(availableAtIso).getTime() : 0;
  const ready = !availableAtIso || now >= availableAt;

  async function handleStart() {
    setSubmitting(true);
    setError(null);
    const { error: updateError } = await supabase
      .from("tasks")
      .update({
        status: "Started",
        started_date: new Date().toISOString(),
      })
      .eq("id", taskId);
    if (updateError) {
      setError(updateError.message);
      setSubmitting(false);
      return;
    }
    setSubmitting(false);
    setConfirming(false);
    router.refresh();
  }

  if (!ready) {
    return (
      <button
        type="button"
        className="btn-light"
        disabled
        style={{ width: "100%", padding: "13px 18px" }}
      >
        Available 30 minutes before task time
      </button>
    );
  }

  return (
    <>
      <button
        type="button"
        className="btn-dark"
        onClick={() => setConfirming(true)}
      >
        Start task
      </button>
      {confirming && (
        <ModalShell onClose={() => setConfirming(false)}>
          <h2
            className="font-display"
            style={{
              fontSize: "22px",
              color: "#0d0f12",
              marginBottom: "10px",
            }}
          >
            Start this task
          </h2>
          <p
            style={{
              fontFamily: "var(--font-public-sans), ui-sans-serif, system-ui",
              fontSize: "14px",
              color: "#4d5b6a",
              lineHeight: 1.6,
              marginBottom: "20px",
            }}
          >
            Confirm you&apos;re starting this task. The client will be
            notified.
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
              onClick={() => setConfirming(false)}
              disabled={submitting}
              style={{ flex: 1 }}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn-dark"
              onClick={handleStart}
              disabled={submitting}
              style={{ flex: 1 }}
            >
              {submitting ? "Starting…" : "Confirm & start"}
            </button>
          </div>
        </ModalShell>
      )}
    </>
  );
}
