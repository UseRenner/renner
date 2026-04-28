import { EmptyState } from "@/components/EmptyState";
import { FavoriteButton } from "@/components/FavoriteButton";
import { InviteToTaskButton } from "@/components/InviteToTaskButton";
import { RemoveFavoriteButton } from "@/components/RemoveFavoriteButton";
import { formatDisplayName, formatInitials } from "@/lib/displayName";
import { requireClient } from "@/lib/role";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type RennerProfile = {
  id: string;
  display_name: string | null;
  first_name: string | null;
  last_name: string | null;
  show_full_last_name: boolean | null;
  city: string | null;
  state: string | null;
  rating: number | null;
  completed_tasks: number | null;
  background_verified: boolean | null;
  licensed: boolean | null;
};

type FavoriteRow = {
  id: string;
  notes: string | null;
  created_at: string;
  renner: RennerProfile | null;
};

function nameFor(r: RennerProfile | null) {
  return formatDisplayName(r);
}

function initialsFor(r: RennerProfile | null) {
  return formatInitials(r);
}

export default async function MyRennersPage() {
  const user = await requireClient();
  const supabase = createClient();

  const { data: favoritesData } = await supabase
    .from("favorites")
    .select(
      `id, notes, created_at,
       renner:renner_id (
         id, display_name, first_name, last_name, show_full_last_name,
         city, state, rating, completed_tasks, background_verified, licensed
       )`,
    )
    .eq("client_id", user.id)
    .order("created_at", { ascending: false });

  const favorites = (favoritesData ?? []) as unknown as FavoriteRow[];

  return (
    <main className="pt-10 pb-20 px-6">
      <div className="mx-auto" style={{ maxWidth: "1100px" }}>
        <div className="micro-label" style={{ marginBottom: "8px" }}>
          {favorites.length}{" "}
          {favorites.length === 1 ? "Renner" : "Renners"} saved
        </div>
        <h1 className="page-title" style={{ marginBottom: "24px" }}>
          My <span className="headline-em">Renners</span>
        </h1>

        {favorites.length === 0 ? (
          <EmptyState message="Save Renners you want to work with again." />
        ) : (
          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            }}
          >
            {favorites.map((fav) => {
              if (!fav.renner) return null;
              const r = fav.renner;
              return (
                <div
                  key={fav.id}
                  className="card"
                  style={{ padding: "24px" }}
                >
                  <div
                    className="flex items-start gap-3"
                    style={{ marginBottom: "16px" }}
                  >
                    <div
                      className="flex items-center justify-center"
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "9999px",
                        backgroundColor: "#0d0f12",
                        color: "#fbfbfc",
                        fontFamily:
                          "var(--font-roboto), ui-sans-serif, system-ui",
                        fontSize: "14px",
                        fontWeight: 500,
                        flexShrink: 0,
                      }}
                    >
                      {initialsFor(r)}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        className="flex items-center gap-2 flex-wrap"
                        style={{ marginBottom: "4px" }}
                      >
                        <span
                          style={{
                            fontFamily:
                              "var(--font-roboto), ui-sans-serif, system-ui",
                            fontSize: "15px",
                            fontWeight: 500,
                            color: "#0d0f12",
                          }}
                        >
                          {nameFor(r)}
                        </span>
                        <FavoriteButton
                          rennerId={r.id}
                          clientId={user.id}
                          initiallySaved
                        />
                      </div>
                      <div
                        style={{
                          fontFamily:
                            "var(--font-roboto), ui-sans-serif, system-ui",
                          fontSize: "12px",
                          color: "#7d8da0",
                        }}
                      >
                        {`${r.completed_tasks ?? 0} task${
                          (r.completed_tasks ?? 0) === 1 ? "" : "s"
                        } completed  ·  ${
                          r.rating
                            ? `${Number(r.rating).toFixed(1)}★`
                            : "No ratings yet"
                        }`}
                      </div>
                    </div>
                  </div>

                  <div
                    className="flex flex-wrap gap-2"
                    style={{ marginBottom: fav.notes ? "16px" : "20px" }}
                  >
                    {r.background_verified && (
                      <SmallTag tone="green">Background verified</SmallTag>
                    )}
                    {r.licensed && <SmallTag tone="dark">Licensed</SmallTag>}
                  </div>

                  {fav.notes && (
                    <p
                      style={{
                        fontFamily:
                          "var(--font-roboto), ui-sans-serif, system-ui",
                        fontSize: "13px",
                        color: "#4d5b6a",
                        lineHeight: 1.55,
                        marginBottom: "20px",
                        backgroundColor: "#f6f7f9",
                        border: "1px solid #eaedf0",
                        borderRadius: "8px",
                        padding: "10px 12px",
                      }}
                    >
                      {fav.notes}
                    </p>
                  )}

                  <div className="flex gap-2">
                    <InviteToTaskButton
                      rennerId={r.id}
                      clientId={user.id}
                      rennerName={nameFor(r)}
                    />
                    <RemoveFavoriteButton
                      rennerId={r.id}
                      clientId={user.id}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

function SmallTag({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone: "green" | "dark";
}) {
  const palette =
    tone === "green"
      ? { background: "rgba(45,138,78,0.10)", color: "#2d8a4e" }
      : { background: "#0d0f12", color: "#fbfbfc" };
  return (
    <span
      style={{
        backgroundColor: palette.background,
        color: palette.color,
        fontFamily: "var(--font-roboto), ui-sans-serif, system-ui",
        fontSize: "10px",
        fontWeight: 500,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        padding: "3px 7px",
        borderRadius: "3px",
      }}
    >
      {children}
    </span>
  );
}
