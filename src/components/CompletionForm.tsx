"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const AUTO_RELEASE_HOURS = 48;
const MAX_PHOTOS = 10;

type SelectedPhoto = {
  id: string;
  file: File;
  previewUrl: string;
};

export function CompletionForm({
  taskId,
  userId,
}: {
  taskId: string;
  userId: string;
}) {
  const router = useRouter();
  const supabase = createClient();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [photos, setPhotos] = useState<SelectedPhoto[]>([]);
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      photos.forEach((p) => URL.revokeObjectURL(p.previewUrl));
    };
    // Only run on unmount; photos array changes are handled in setters.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const incoming = Array.from(e.target.files ?? []);
    if (incoming.length === 0) return;
    setError(null);

    const room = MAX_PHOTOS - photos.length;
    if (room <= 0) {
      setError(`You can upload up to ${MAX_PHOTOS} photos.`);
      e.target.value = "";
      return;
    }

    const accepted = incoming.slice(0, room).map((file) => ({
      id: `${Date.now()}-${file.name}-${Math.random().toString(36).slice(2, 8)}`,
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    if (incoming.length > room) {
      setError(`Only the first ${room} photos were added (10 photo limit).`);
    }

    setPhotos((prev) => [...prev, ...accepted]);
    e.target.value = "";
  }

  function removePhoto(id: string) {
    setPhotos((prev) => {
      const next = prev.filter((p) => p.id !== id);
      const removed = prev.find((p) => p.id === id);
      if (removed) URL.revokeObjectURL(removed.previewUrl);
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (photos.length === 0) {
      setError("Upload at least one photo of the completed work.");
      return;
    }
    setError(null);
    setSubmitting(true);

    const uploadedUrls: string[] = [];
    for (const photo of photos) {
      const ext = photo.file.name.split(".").pop() || "jpg";
      const path = `${userId}/${taskId}/${Date.now()}-${Math.random()
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
      uploadedUrls.push(publicUrl.publicUrl);
    }

    const now = new Date();
    const autoRelease = new Date(
      now.getTime() + AUTO_RELEASE_HOURS * 60 * 60 * 1000,
    );

    const { error: updateError } = await supabase
      .from("tasks")
      .update({
        status: "Pending approval",
        completion_photos: uploadedUrls,
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

  const slotsLeft = MAX_PHOTOS - photos.length;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="sr-only"
          style={{ position: "absolute", width: 1, height: 1, opacity: 0 }}
        />

        {photos.length === 0 ? (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            style={{
              display: "block",
              width: "100%",
              border: "1px dashed #cad1d8",
              borderRadius: "10px",
              padding: "40px 24px",
              textAlign: "center",
              backgroundColor: "#f6f7f9",
              cursor: "pointer",
              transition:
                "border-color 120ms ease, background-color 120ms ease",
            }}
          >
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
              Upload up to 10 photos of the completed work
            </div>
            <div
              style={{
                fontFamily:
                  "var(--font-inter), ui-sans-serif, system-ui",
                fontSize: "12px",
                color: "#7d8da0",
              }}
            >
              PNG or JPG · click to choose multiple
            </div>
          </button>
        ) : (
          <div className="flex flex-col gap-3">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
                gap: "8px",
              }}
            >
              {photos.map((p) => (
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
                    src={p.previewUrl}
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
                      top: "6px",
                      right: "6px",
                      width: "22px",
                      height: "22px",
                      borderRadius: "9999px",
                      border: "none",
                      backgroundColor: "rgba(13, 15, 18, 0.75)",
                      color: "#fbfbfc",
                      fontSize: "13px",
                      lineHeight: 1,
                      cursor: "pointer",
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div
                style={{
                  fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
                  fontSize: "12px",
                  color: "#7d8da0",
                }}
              >
                {photos.length} of {MAX_PHOTOS} photos
              </div>
              {slotsLeft > 0 && (
                <button
                  type="button"
                  className="btn-light"
                  onClick={() => fileInputRef.current?.click()}
                  style={{ padding: "8px 14px", fontSize: "13px" }}
                >
                  Add more
                </button>
              )}
            </div>
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

      <button type="submit" className="btn-dark" disabled={submitting}>
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
