"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

const AUTO_RELEASE_HOURS = 48;

export function CompletionForm({
  taskId,
  userId,
}: {
  taskId: string;
  userId: string;
}) {
  const router = useRouter();
  const supabase = createClient();

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const next = e.target.files?.[0] ?? null;
    setFile(next);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(next ? URL.createObjectURL(next) : null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) {
      setError("Upload a photo of the completed work to continue.");
      return;
    }
    setError(null);
    setSubmitting(true);

    const ext = file.name.split(".").pop() || "jpg";
    const path = `${userId}/${taskId}/${Date.now()}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from("completions")
      .upload(path, file, { upsert: false, contentType: file.type });
    if (uploadError) {
      setError(uploadError.message);
      setSubmitting(false);
      return;
    }

    const { data: publicUrl } = supabase.storage
      .from("completions")
      .getPublicUrl(path);

    const now = new Date();
    const autoRelease = new Date(
      now.getTime() + AUTO_RELEASE_HOURS * 60 * 60 * 1000,
    );

    const { error: updateError } = await supabase
      .from("tasks")
      .update({
        status: "Pending approval",
        completion_photo: publicUrl.publicUrl,
        completion_notes: notes || null,
        marked_finished_date: now.toISOString(),
        auto_release_date: autoRelease.toISOString(),
      })
      .eq("id", taskId);

    if (updateError) {
      setError(updateError.message);
      setSubmitting(false);
      return;
    }

    router.push("/my-applications");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <label
          className="block cursor-pointer"
          style={{
            border: "1px dashed #cad1d8",
            borderRadius: "10px",
            padding: previewUrl ? "12px" : "40px 24px",
            textAlign: "center",
            backgroundColor: "#f6f7f9",
            transition: "border-color 120ms ease, background-color 120ms ease",
          }}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="sr-only"
            style={{ position: "absolute", width: 1, height: 1, opacity: 0 }}
          />
          {previewUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={previewUrl}
              alt="Completion preview"
              style={{
                maxWidth: "100%",
                maxHeight: "320px",
                margin: "0 auto",
                borderRadius: "6px",
                display: "block",
              }}
            />
          ) : (
            <>
              <div
                style={{
                  fontFamily:
                    "var(--font-inter), ui-sans-serif, system-ui",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#0d0f12",
                  marginBottom: "6px",
                }}
              >
                Upload a photo of the completed work
              </div>
              <div
                style={{
                  fontFamily:
                    "var(--font-inter), ui-sans-serif, system-ui",
                  fontSize: "12px",
                  color: "#7d8da0",
                }}
              >
                PNG or JPG, drag in or click to choose
              </div>
            </>
          )}
        </label>
        {file && (
          <div
            style={{
              fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
              fontSize: "12px",
              color: "#647589",
              marginTop: "8px",
            }}
          >
            {file.name}
          </div>
        )}
      </div>

      <div>
        <label className="input-label" htmlFor="notes">
          Completion notes
        </label>
        <textarea
          id="notes"
          className="input"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Any notes for the client? (optional)"
          style={{ minHeight: "100px", resize: "vertical" }}
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
        {submitting ? "Submitting…" : "Submit for confirmation"}
      </button>

      <p
        style={{
          fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
          fontSize: "12px",
          color: "#7d8da0",
          textAlign: "center",
          lineHeight: 1.5,
        }}
      >
        The client has 48 hours to confirm. Payment auto-releases after that.
      </p>
    </form>
  );
}
