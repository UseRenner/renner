"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Mode = "idle" | "review" | "dispute";

const DISPUTE_CATEGORIES = [
  {
    value: "Quality issue",
    label: "Quality issue",
    description: "Work wasn't done as agreed.",
  },
  {
    value: "Property damage",
    label: "Property damage",
    description: "Something on the property was damaged.",
  },
  {
    value: "Theft",
    label: "Theft",
    description: "Something is missing from the property.",
  },
  {
    value: "Other",
    label: "Other",
    description: "Tell us what happened.",
  },
] as const;

type DisputeCategory = (typeof DISPUTE_CATEGORIES)[number]["value"];

function isDamageCategory(c: DisputeCategory | "") {
  return c === "Property damage" || c === "Theft";
}

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
  const photoInputRef = useRef<HTMLInputElement | null>(null);

  const [mode, setMode] = useState<Mode>("idle");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Dispute fields
  const [category, setCategory] = useState<DisputeCategory | "">("");
  const [reason, setReason] = useState("");
  const [damageAmount, setDamageAmount] = useState("");
  const [damagePhotos, setDamagePhotos] = useState<
    Array<{ id: string; file: File; preview: string }>
  >([]);

  function addPhotos(e: React.ChangeEvent<HTMLInputElement>) {
    const incoming = Array.from(e.target.files ?? []);
    const next = incoming.map((file) => ({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      file,
      preview: URL.createObjectURL(file),
    }));
    setDamagePhotos((prev) => [...prev, ...next].slice(0, 10));
    e.target.value = "";
  }

  function removePhoto(id: string) {
    setDamagePhotos((prev) => {
      const removed = prev.find((p) => p.id === id);
      if (removed) URL.revokeObjectURL(removed.preview);
      return prev.filter((p) => p.id !== id);
    });
  }

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
    if (!category) {
      setError("Pick a category for this report.");
      return;
    }
    if (!reason.trim()) {
      setError("Please describe what happened.");
      return;
    }

    let amountValue: number | null = null;
    let uploadedPhotoUrls: string[] = [];

    if (isDamageCategory(category)) {
      const parsed = Number(damageAmount);
      if (!damageAmount || Number.isNaN(parsed) || parsed <= 0) {
        setError(
          "Enter the estimated repair or replacement cost (greater than $0).",
        );
        return;
      }
      amountValue = parsed;
      if (damagePhotos.length === 0) {
        setError("Upload at least one photo of the damage.");
        return;
      }
    }

    setError(null);
    setSubmitting(true);

    if (isDamageCategory(category) && damagePhotos.length > 0) {
      for (const photo of damagePhotos) {
        const ext = photo.file.name.split(".").pop() || "jpg";
        const path = `${reviewerId}/${taskId}/dispute-${Date.now()}-${Math.random()
          .toString(36)
          .slice(2, 8)}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from("completions")
          .upload(path, photo.file, {
            upsert: false,
            contentType: photo.file.type,
          });
        if (uploadError) {
          setError(uploadError.message);
          setSubmitting(false);
          return;
        }
        const { data: publicUrl } = supabase.storage
          .from("completions")
          .getPublicUrl(path);
        uploadedPhotoUrls.push(publicUrl.publicUrl);
      }
    }

    const fullReason = `${category}: ${reason.trim()}`;

    const { error: disputeError } = await supabase.from("disputes").insert({
      task_id: taskId,
      raised_by: reviewerId,
      against: runnerId,
      reason: fullReason,
      status: "Open",
      damage_amount: amountValue,
      damage_photos: uploadedPhotoUrls,
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
        dispute_reason: fullReason,
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
        <button type="submit" className="btn-dark" disabled={submitting}>
          {submitting ? "Saving review…" : "Save review"}
        </button>
      </form>
    );
  }

  if (mode === "dispute") {
    const damageMode = isDamageCategory(category);
    return (
      <form onSubmit={handleSubmitDispute} className="flex flex-col gap-4">
        <div>
          <label className="input-label">Report category</label>
          <div className="flex flex-col gap-2">
            {DISPUTE_CATEGORIES.map((c) => {
              const selected = category === c.value;
              return (
                <button
                  type="button"
                  key={c.value}
                  onClick={() => setCategory(c.value)}
                  style={{
                    textAlign: "left",
                    border: selected
                      ? "1px solid #0d0f12"
                      : "1px solid #cad1d8",
                    backgroundColor: selected ? "#f6f7f9" : "#fbfbfc",
                    borderRadius: "10px",
                    padding: "10px 14px",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      fontFamily:
                        "var(--font-inter), ui-sans-serif, system-ui",
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#0d0f12",
                      marginBottom: "2px",
                    }}
                  >
                    {c.label}
                  </div>
                  <div
                    style={{
                      fontFamily:
                        "var(--font-inter), ui-sans-serif, system-ui",
                      fontSize: "12px",
                      color: "#7d8da0",
                      lineHeight: 1.5,
                    }}
                  >
                    {c.description}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="input-label" htmlFor="reason">
            {damageMode ? "Description of damage" : "What went wrong?"}
          </label>
          <textarea
            id="reason"
            className="input"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder={
              damageMode
                ? "Describe what was damaged or missing."
                : "Describe the issue. An admin will review."
            }
            style={{ minHeight: "120px", resize: "vertical" }}
            required
          />
        </div>

        {damageMode && (
          <>
            <div>
              <label className="input-label" htmlFor="damageAmount">
                Estimated repair or replacement cost
              </label>
              <input
                id="damageAmount"
                type="number"
                inputMode="decimal"
                min="0"
                step="1"
                className="input"
                placeholder="$"
                value={damageAmount}
                onChange={(e) => setDamageAmount(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="input-label">Photos of the damage</label>
              <input
                ref={photoInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={addPhotos}
                className="sr-only"
                style={{
                  position: "absolute",
                  width: 1,
                  height: 1,
                  opacity: 0,
                }}
              />
              {damagePhotos.length === 0 ? (
                <button
                  type="button"
                  onClick={() => photoInputRef.current?.click()}
                  style={{
                    display: "block",
                    width: "100%",
                    border: "1px dashed #cad1d8",
                    borderRadius: "10px",
                    padding: "28px 16px",
                    textAlign: "center",
                    backgroundColor: "#f6f7f9",
                    cursor: "pointer",
                    fontFamily:
                      "var(--font-inter), ui-sans-serif, system-ui",
                    fontSize: "13px",
                    color: "#0d0f12",
                  }}
                >
                  Upload photos of the damage
                </button>
              ) : (
                <div className="flex flex-col gap-3">
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(96px, 1fr))",
                      gap: "8px",
                    }}
                  >
                    {damagePhotos.map((p) => (
                      <div
                        key={p.id}
                        style={{
                          position: "relative",
                          aspectRatio: "1 / 1",
                          borderRadius: "10px",
                          overflow: "hidden",
                          border: "1px solid #dce0e5",
                        }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={p.preview}
                          alt={p.file.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(p.id)}
                          aria-label={`Remove ${p.file.name}`}
                          style={{
                            position: "absolute",
                            top: "4px",
                            right: "4px",
                            width: "20px",
                            height: "20px",
                            borderRadius: "9999px",
                            border: "none",
                            backgroundColor: "rgba(13,15,18,0.75)",
                            color: "#fbfbfc",
                            fontSize: "12px",
                            lineHeight: 1,
                            cursor: "pointer",
                          }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  {damagePhotos.length < 10 && (
                    <button
                      type="button"
                      className="btn-light"
                      onClick={() => photoInputRef.current?.click()}
                      style={{
                        padding: "8px 14px",
                        fontSize: "13px",
                        alignSelf: "flex-start",
                      }}
                    >
                      Add more
                    </button>
                  )}
                </div>
              )}
            </div>
          </>
        )}

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
            {submitting ? "Submitting…" : "Submit report"}
          </button>
        </div>

        {damageMode && (
          <p
            style={{
              fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
              fontSize: "12px",
              color: "#7d8da0",
              lineHeight: 1.55,
            }}
          >
            The Renner has 48 hours to accept, propose a different amount, or
            dispute the claim. Unresolved claims escalate to Renner for
            review.
          </p>
        )}
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
        {submitting ? "Releasing payment…" : "Confirm & release payment"}
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
