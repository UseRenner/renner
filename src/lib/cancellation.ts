import type { SupabaseClient } from "@supabase/supabase-js";

// Bumps the user's running cancellation count and stamps the latest
// cancellation date. RLS on `users` only allows the user to update
// their own row, so this only works when called for the active user.
export async function incrementCancellationCount(
  supabase: SupabaseClient,
  userId: string,
) {
  const { data } = await supabase
    .from("users")
    .select("cancellation_count")
    .eq("id", userId)
    .maybeSingle();
  const next = ((data?.cancellation_count as number | null) ?? 0) + 1;
  await supabase
    .from("users")
    .update({
      cancellation_count: next,
      last_cancellation_date: new Date().toISOString(),
    })
    .eq("id", userId);
}
