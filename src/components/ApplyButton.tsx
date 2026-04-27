"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { createClient } from "@/lib/supabase/client";

type Props = {
  taskId: string;
  userId: string;
  alreadyApplied: boolean;
  requiresLicense: boolean;
};

export function ApplyButton({
  taskId,
  userId,
  alreadyApplied,
  requiresLicense,
}: Props) {
  const router = useRouter();
  const supabase = createClient();
  const [submitting, setSubmitting] = useState(false);
  const [applied, setApplied] = useState(alreadyApplied);
  const [error, setError] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);

  async function submitApplication() {
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
    setConfirming(false);
    router.refresh();
  }

  function handleClick() {
    if (requiresLicense) {
      setConfirming(true);
    } else {
      submitApplication();
    }
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
        onClick={handleClick}
        disabled={submitting}
      >
        {submitting ? <LoadingSpinner size={18} tone="light" /> : "Apply for this task"}
      </button>
      {error && (
        <p style={{ color: "#c0392b", fontSize: "12px", marginTop: "8px" }}>
          {error}
        </p>
      )}
      {confirming && (
        <ModalShell onClose={() => setConfirming(false)}>
          <h2
            className="font-display"
            style={{
              fontSize: "22px",
              color: "#0d0f12",
              marginBottom: "12px",
            }}
          >
            Confirm your license
          </h2>
          <p
            style={{
              fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
              fontSize: "14px",
              color: "#4d5b6a",
              lineHeight: 1.65,
              marginBottom: "20px",
            }}
          >
            By applying, I confirm that my real estate license is currently
            active and valid in the state where this task will be performed.
          </p>
          {error && (
            <p style={{ color: "#c0392b", fontSize: "13px", marginBottom: "12px" }}>
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
              onClick={submitApplication}
              disabled={submitting}
              style={{ flex: 1 }}
            >
              {submitting ? <LoadingSpinner size={18} tone="light" /> : "Confirm & apply"}
            </button>
          </div>
        </ModalShell>
      )}
    </>
  );
}

function ModalShell({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-modal
      onClick={onClose}
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
          maxWidth: "440px",
        }}
      >
        {children}
      </div>
    </div>
  );
}
