import Link from "next/link";
import { formatInitials } from "@/lib/displayName";
import { createClient } from "@/lib/supabase/server";
import { MarketingHeader } from "./MarketingHeader";
import { NavLinks } from "./NavLinks";
import { Wordmark } from "./Wordmark";

function getInitials(
  firstName: string | null,
  lastName: string | null,
  displayName: string | null,
  email: string | null,
) {
  const initials = formatInitials({
    first_name: firstName,
    last_name: lastName,
    display_name: displayName,
  });
  if (initials !== "?") return initials;
  return (email?.[0] ?? "?").toUpperCase();
}

export async function TopNav() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return <MarketingHeader />;

  const { data: profile } = await supabase
    .from("users")
    .select("first_name, last_name, display_name, role")
    .eq("id", user.id)
    .maybeSingle();
  const initials = getInitials(
    profile?.first_name ?? null,
    profile?.last_name ?? null,
    profile?.display_name ?? null,
    user.email ?? null,
  );
  const role = (profile?.role as "renner" | "client" | null) ?? null;

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        backgroundColor: "#fbfbfc",
        borderBottom: "1px solid #dce0e5",
        padding: "16px 32px",
      }}
    >
      <div className="flex items-center justify-between gap-6 mx-auto" style={{ maxWidth: "1200px" }}>
        <Wordmark />
        <NavLinks role={role} />
        <Link
          href="/settings"
          aria-label="Account settings"
          className="avatar-link flex items-center justify-center"
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "9999px",
            backgroundColor: "#0d0f12",
            color: "#fbfbfc",
            fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
            fontSize: "12px",
            fontWeight: 500,
            letterSpacing: "0.02em",
            textDecoration: "none",
          }}
        >
          {initials}
        </Link>
      </div>
    </header>
  );
}
