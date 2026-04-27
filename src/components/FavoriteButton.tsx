"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import { createClient } from "@/lib/supabase/client";

// The save toggle uses the Renner mark itself: an #a7b2be disc when
// unsaved, an #0d0f12 disc when saved. Slot stays #fbfbfc in both
// states, the tilt stays at 12°, and only the disc fill animates
// (150ms ease, owned by .favorite-toggle in globals.css).

export function FavoriteButton({
  rennerId,
  clientId,
  initiallySaved,
  size = 18,
}: {
  rennerId: string;
  clientId: string;
  initiallySaved: boolean;
  size?: number;
}) {
  const router = useRouter();
  const supabase = createClient();
  const [saved, setSaved] = useState(initiallySaved);
  const [submitting, setSubmitting] = useState(false);

  async function toggle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (submitting) return;
    setSubmitting(true);

    if (saved) {
      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("client_id", clientId)
        .eq("renner_id", rennerId);
      if (!error) setSaved(false);
    } else {
      const { error } = await supabase
        .from("favorites")
        .insert({ client_id: clientId, renner_id: rennerId });
      if (!error) setSaved(true);
    }

    setSubmitting(false);
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={submitting}
      aria-label={saved ? "Remove from My Renners" : "Save to My Renners"}
      title={saved ? "Saved to My Renners" : "Save to My Renners"}
      className="favorite-toggle"
      data-saved={saved ? "true" : "false"}
    >
      <Logo
        size={size}
        fill={saved ? "#0d0f12" : "#a7b2be"}
        slotColor="#fbfbfc"
      />
    </button>
  );
}
