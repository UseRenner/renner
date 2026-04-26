"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function RemoveFavoriteButton({
  rennerId,
  clientId,
}: {
  rennerId: string;
  clientId: string;
}) {
  const router = useRouter();
  const supabase = createClient();
  const [submitting, setSubmitting] = useState(false);

  async function handleRemove() {
    if (submitting) return;
    setSubmitting(true);
    await supabase
      .from("favorites")
      .delete()
      .eq("client_id", clientId)
      .eq("renner_id", rennerId);
    setSubmitting(false);
    router.refresh();
  }

  return (
    <button
      type="button"
      className="btn-light"
      onClick={handleRemove}
      disabled={submitting}
      style={{ flex: 1 }}
    >
      {submitting ? "Removing…" : "Remove"}
    </button>
  );
}
