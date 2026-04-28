import { BrowseClient } from "@/components/BrowseClient";
import { createClient } from "@/lib/supabase/server";
import type { Task } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function BrowsePage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let city: string | null = null;
  if (user) {
    const { data: profile } = await supabase
      .from("users")
      .select("city")
      .eq("id", user.id)
      .maybeSingle();
    city = profile?.city ?? null;
  }

  const { data: tasksData } = await supabase
    .from("tasks")
    .select(
      "id, title, description, category, pay, pay_type, zip_code, date, task_timing_type, task_time, window_start, window_end, time_estimate, status, requires_license, posted_by, booked_runner, created_date, booked_date, started_date, marked_finished_date, completed_date, payment_status, completion_photos, completion_notes, dispute_reason, auto_release_date, unable_to_complete_reason, unable_to_complete_explanation, unable_to_complete_photo, unable_to_complete_date, safety_flag",
    )
    .eq("status", "Open")
    .order("created_date", { ascending: false });

  const tasks = (tasksData ?? []) as Task[];
  const subtitleLocation = city ? city : "your area";
  const countLabel = `${tasks.length} ${tasks.length === 1 ? "task" : "tasks"} near ${subtitleLocation}`;

  return (
    <>
      <div
        style={{
          fontFamily: "var(--font-public-sans), ui-sans-serif, system-ui",
          fontSize: "11px",
          fontWeight: 500,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "#7d8da0",
          marginBottom: "20px",
        }}
      >
        {countLabel}
      </div>
      <BrowseClient tasks={tasks} />
    </>
  );
}
