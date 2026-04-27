import {
  RennerCard,
  RennersDirectoryClient,
} from "@/components/RennersDirectoryClient";
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

export default async function BrowseRennersPage() {
  const viewer = await getViewer();
  const supabase = createClient();

  const { data: rennersData } = await supabase
    .from("users")
    .select(
      "id, display_name, first_name, last_name, show_full_last_name, city, state, rating, completed_tasks, background_verified, licensed, categories, profile_visibility, role",
    )
    .eq("role", "renner")
    .eq("profile_visibility", "public");

  const renners = ((rennersData ?? []) as RennerCard[])
    .slice()
    .sort((a, b) => {
      const sa = proximityScore(viewer?.city ?? null, viewer?.state ?? null, a);
      const sb = proximityScore(viewer?.city ?? null, viewer?.state ?? null, b);
      if (sa !== sb) return sa - sb;
      return (b.rating ?? 0) - (a.rating ?? 0);
    });

  let savedRennerIds: string[] = [];
  if (viewer && viewer.role === "client" && renners.length > 0) {
    const { data: favs } = await supabase
      .from("favorites")
      .select("renner_id")
      .eq("client_id", viewer.id)
      .in(
        "renner_id",
        renners.map((r) => r.id),
      );
    savedRennerIds = (favs ?? []).map(
      (f) => (f as { renner_id: string }).renner_id,
    );
  }

  const subtitle = viewer?.city
    ? `${renners.length} ${renners.length === 1 ? "Renner" : "Renners"}, sorted by distance from ${viewer.city}`
    : `${renners.length} ${renners.length === 1 ? "Renner" : "Renners"}`;

  return (
    <>
      <div
        style={{
          fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
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
      <RennersDirectoryClient
        renners={renners}
        viewerRole={(viewer?.role as "client" | "renner" | null) ?? null}
        viewerId={viewer?.id ?? null}
        savedRennerIds={savedRennerIds}
      />
    </>
  );
}
