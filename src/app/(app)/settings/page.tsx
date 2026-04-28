import { redirect } from "next/navigation";
import { SettingsClient } from "@/components/SettingsClient";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/signin");

  const { data: profile } = await supabase
    .from("users")
    .select(
      "id, first_name, last_name, display_name, show_full_last_name, company, phone, role, city, state, zip, bio, categories, licensed, license_number, license_state, stripe_account_id, stripe_onboarded, background_verified, background_check_date, profile_visibility",
    )
    .eq("id", user.id)
    .maybeSingle();

  return (
    <main className="pt-10 pb-20 px-6">
      <div className="mx-auto" style={{ maxWidth: "720px" }}>
        <div className="micro-label" style={{ marginBottom: "8px" }}>
          Account
        </div>
        <h1 className="page-title" style={{ marginBottom: "24px" }}>
          Settings
        </h1>

        <SettingsClient
          email={user.email ?? ""}
          profile={(profile ?? null) as any}
        />
      </div>
    </main>
  );
}
