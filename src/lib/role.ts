import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type Role = "client" | "renner";

export type Viewer = {
  id: string;
  email: string | null;
  role: Role | null;
  city: string | null;
  state: string | null;
  profile_visibility: "public" | "private" | null;
};

export function homeFor(role: Role | null | undefined) {
  return role === "client" ? "/my-tasks" : "/browse";
}

export async function getViewer(): Promise<Viewer | null> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  const { data } = await supabase
    .from("users")
    .select("id, role, city, state, profile_visibility")
    .eq("id", user.id)
    .maybeSingle();
  return {
    id: user.id,
    email: user.email ?? null,
    role: (data?.role as Role | null) ?? null,
    city: (data?.city as string | null) ?? null,
    state: (data?.state as string | null) ?? null,
    profile_visibility:
      (data?.profile_visibility as "public" | "private" | null) ?? null,
  };
}

export async function requireViewer() {
  const viewer = await getViewer();
  if (!viewer) redirect("/signin");
  return viewer;
}

export async function requireClient() {
  const viewer = await requireViewer();
  if (viewer.role && viewer.role !== "client") redirect(homeFor(viewer.role));
  return viewer;
}

export async function requireRenner() {
  const viewer = await requireViewer();
  if (viewer.role && viewer.role !== "renner") redirect(homeFor(viewer.role));
  return viewer;
}
