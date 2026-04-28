"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ModalShell } from "@/components/ModalShell";
import { createClient } from "@/lib/supabase/client";

const REASONS = [
  {
    value: "Other party no-show",
    label: "Other party no-show",
    description: "Guest, inspector, or contractor didn't arrive.",
  },
  {
    value: "Can't access property",
    label: "Can't access property",
    description:
      "Wrong code, locked gate, missing key, broken lockbox, or wrong address.",
  },
  {
    value: "Other",
    label: "Other",
    description: "Tell us what happened in the explanation.",
  },
] as const;

export function UnableToCompleteButton({
  taskId,
  userId,
}: {
  taskId: string;
  userId: string;
}) {
  const router = useRouter();
  const supabase = createClient();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState<(typeof REASONS)[number]["value"] | "">(
    "",
  );
  const [explanation, setExplanation] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function reset() {
    setReason("");
    setExplanation("");
    setPhoto(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setError(null);
  }

  function pickFile(e: React.ChangeEvent<HTMLInputElement>) {
    const next = e.target.files?.[0] ?? null;
    setPhoto(next);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(next ? URL.createObjectURL(next) : null);
    e.target.value = "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!reason) {
      setError("Please pick a reason.");
      return;
    }
    if (explanation.trim().length < 50) {
      setError("Please write at least 50 characters describing what happened.");
      return;
    }
    if (!photo) {
      setError("Please upload a photo as proof.");
      return;
    }
    setError(null);
    setSubmitting(true);

    const ext = photo.name.split(".").pop() || "jpg";
    const path = `${userId}/${taskId}/unable-${Date.now()}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from("completions")
      .upload(path, photo, { contentType: photo.type, upsert: false });
    if (uploadError) {
      setError(uploadError.message);
      setSubmitting(false);
      return;
    }
    const { data: publicUrl } = supabase.storage
      .from("completions")
      .getPublicUrl(path);

    const safetyFlag = false; // safety_flag is reserved for renner-cancel safety reports.
    const { error: updateError } = await supabase
      .from("tasks")
      .update({
        status: "Unable to complete",
        payment_status: "released",
        unable_to_complete_reason: reason,
        unable_to_complete_explanation: explanation.trim(),
        unable_to_complete_photo: publicUrl.publicUrl,
        unable_to_complete_date: new Date().toISOString(),
        safety_flag: safetyFlag,
      })
      .eq("id", taskId);
    if (updateError) {
      setError(updateError.message);
      setSubmitting(false);
      return;
    }

    setSubmitting(false);
    setOpen(false);
    reset();
    router.push("/my-applications");
    router.refresh();
  }

  return (
    <>
      <button
        type="button"
        className="btn-light"
        onClick={() => {
          setOpen(true);
          reset();
        }}
        style={{ width: "100%", padding: "13px 18px" }}
      >
        Unable to complete
      </button>

      {open && (
        <ModalShell onClose={() => setOpen(false)} width={520}>
          <form onSubmit={handleSubmit}>
            <h2
              className="font-display"
              style={{
                fontSize: "22px",
                color: "#0d0f12",
                marginBottom: "8px",
              }}
            >
              Report unable to complete
            </h2>
            <p
              style={{
                fontFamily: "var(--font-roboto), ui-sans-serif, system-ui",
                fontSize: "13px",
                color: "#647589",
                lineHeight: 1.6,
                marginBottom: "16px",
              }}
            >
              You&apos;ll receive 50% of the task pay; 50% will be refunded
              to the client. A reason, written explanation, and photo are
              required.
            </p>

            <div style={{ marginBottom: "14px" }}>
              <label className="input-label">Reason</label>
              <div className="flex flex-col gap-2">
                {REASONS.map((r) => {
                  const selected = reason === r.value;
                  return (
                    <button
                      type="button"
                      key={r.value}
                      onClick={() => setReason(r.value)}
                      style={{
                        textAlign: "left",
                        border: selected
                          ? "1px solid #0d0f12"
                          : "1px solid #cad1d8",
                        backgroundColor: selected ? "#f6f7f9" : "#fbfbfc",
                        color: "#0d0f12",
                        borderRadius: "10px",
                        padding: "12px 14px",
                        cursor: "pointer",
                      }}
                    >
                      <div
                        style={{
                          fontFamily:
                            "var(--font-roboto), ui-sans-serif, system-ui",
                          fontSize: "14px",
                          fontWeight: 500,
                          marginBottom: "2px",
                        }}
                      >
                        {r.label}
                      </div>
                      <div
                        style={{
                          fontFamily:
                            "var(--font-roboto), ui-sans-serif, system-ui",
                          fontSize: "12px",
                          color: "#7d8da0",
                          lineHeight: 1.5,
                        }}
                      >
                        {r.description}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={{ marginBottom: "14px" }}>
              <label className="input-label" htmlFor="utc-explanation">
                What happened?
              </label>
              <textarea
                id="utc-explanation"
                className="input"
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
                placeholder="Please describe what happened in detail."
                style={{ minHeight: "120px", resize: "vertical" }}
                required
              />
              <div
                style={{
                  fontFamily: "var(--font-roboto), ui-sans-serif, system-ui",
                  fontSize: "11px",
                  color:
                    explanation.trim().length >= 50 ? "#647589" : "#c0392b",
                  marginTop: "4px",
                }}
              >
                {explanation.trim().length}/50 characters minimum
              </div>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label className="input-label">Photo proof</label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={pickFile}
                className="sr-only"
                style={{ position: "absolute", width: 1, height: 1, opacity: 0 }}
              />
              {previewUrl ? (
                <div
                  style={{
                    border: "1px solid #dce0e5",
                    borderRadius: "10px",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={previewUrl}
                    alt="Proof"
                    style={{
                      width: "100%",
                      maxHeight: "260px",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPhoto(null);
                      if (previewUrl) URL.revokeObjectURL(previewUrl);
                      setPreviewUrl(null);
                    }}
                    aria-label="Remove photo"
                    style={{
                      position: "absolute",
                      top: "8px",
                      right: "8px",
                      width: "26px",
                      height: "26px",
                      borderRadius: "9999px",
                      border: "none",
                      backgroundColor: "rgba(13, 15, 18, 0.75)",
                      color: "#fbfbfc",
                      fontSize: "14px",
                      cursor: "pointer",
                    }}
                  >
                    ×
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    display: "block",
                    width: "100%",
                    border: "1px dashed #cad1d8",
                    borderRadius: "10px",
                    padding: "32px 16px",
                    textAlign: "center",
                    backgroundColor: "#f6f7f9",
                    cursor: "pointer",
                    fontFamily:
                      "var(--font-roboto), ui-sans-serif, system-ui",
                    fontSize: "13px",
                    color: "#0d0f12",
                  }}
                >
                  Upload a photo (locked door, empty room, wrong address)
                </button>
              )}
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
        </ModalShell>
      )}
    </>
  );
}
