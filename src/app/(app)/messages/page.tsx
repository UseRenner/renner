import { redirect } from "next/navigation";
import { MessagesClient } from "@/components/MessagesClient";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function MessagesPage({
  searchParams,
}: {
  searchParams?: { with?: string; task?: string };
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/signin");

  return (
    <main className="px-6 py-8">
      <div
        className="mx-auto"
        style={{ maxWidth: "1200px", height: "calc(100vh - 160px)" }}
      >
        <MessagesClient
          userId={user.id}
          initialWith={searchParams?.with ?? null}
          initialTask={searchParams?.task ?? null}
        />
      </div>
    </main>
  );
}
