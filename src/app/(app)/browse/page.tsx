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
      "id, title, description, category, pay, pay_type, zip_code, date, time_estimate, status, requires_license, posted_by, booked_runner, created_date, booked_date, marked_finished_date, completed_date, payment_status, completion_photo, completion_notes, dispute_reason, auto_release_date",
    )
    .eq("status", "Open")
    .order("created_date", { ascending: false });

  const tasks = (tasksData ?? []) as Task[];

  const subtitleLocation = city ? city : "your area";
  const countLabel = `${tasks.length} ${tasks.length === 1 ? "task" : "tasks"} near ${subtitleLocation}`;

  return (
    <main className="pt-12 pb-20 px-6">
      <div className="mx-auto" style={{ maxWidth: "1100px" }}>
        <div
          style={{
            fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#7d8da0",
            marginBottom: "12px",
          }}
        >
          {countLabel}
        </div>

        <h1
          className="font-display-tight"
          style={{
            fontSize: "48px",
            lineHeight: 1.05,
            color: "#0d0f12",
            marginBottom: "32px",
          }}
        >
          Available <span className="headline-em">tasks</span>
        </h1>

        <BrowseClient tasks={tasks} />
      </div>
    </main>
  );
}
