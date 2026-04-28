import {
  ClientCard,
  ClientsDirectoryClient,
} from "@/components/ClientsDirectoryClient";
import { getViewer } from "@/lib/role";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

function proximityScore(
  viewerCity: string | null,
  viewerState: string | null,
  card: { city: string | null; state: string | null },
) {
  if (viewerCity && card.city && card.city === viewerCity) return 0;
  if (viewerState && card.state && card.state === viewerState) return 1;
  return 2;
}

export default async function BrowseClientsPage() {
  const viewer = await getViewer();
  const supabase = createClient();

  const { data: clientsData } = await supabase
    .from("users")
    .select(
      "id, display_name, first_name, last_name, show_full_last_name, company, city, state, created_at",
    )
    .eq("role", "client")
    .eq("profile_visibility", "public");

  const clientIds = (clientsData ?? []).map(
    (c) => (c as { id: string }).id,
  );

  let countsByClient: Record<string, number> = {};
  if (clientIds.length > 0) {
    const { data: taskRows } = await supabase
      .from("tasks")
      .select("posted_by")
      .in("posted_by", clientIds);
    countsByClient = ((taskRows ?? []) as { posted_by: string }[]).reduce<
      Record<string, number>
    >((acc, row) => {
      acc[row.posted_by] = (acc[row.posted_by] ?? 0) + 1;
      return acc;
    }, {});
  }

  const clients: ClientCard[] = ((clientsData ?? []) as Omit<
    ClientCard,
    "tasks_posted"
  >[])
    .map((c) => ({ ...c, tasks_posted: countsByClient[c.id] ?? 0 }))
    .sort((a, b) => {
      const sa = proximityScore(viewer?.city ?? null, viewer?.state ?? null, a);
      const sb = proximityScore(viewer?.city ?? null, viewer?.state ?? null, b);
      if (sa !== sb) return sa - sb;
      return b.tasks_posted - a.tasks_posted;
    });

  const subtitle = viewer?.city
    ? `${clients.length} ${clients.length === 1 ? "Client" : "Clients"}, sorted by distance from ${viewer.city}`
    : `${clients.length} ${clients.length === 1 ? "Client" : "Clients"}`;

  return (
    <>
      <div
        style={{
          fontFamily: "var(--font-roboto), ui-sans-serif, system-ui",
          fontSize: "11px",
          fontWeight: 500,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "#7d8da0",
          marginBottom: "20px",
        }}
      >
        {subtitle}
      </div>
      <ClientsDirectoryClient clients={clients} />
    </>
  );
}
