import Link from "next/link";
import { getViewer } from "@/lib/role";

// Conversion CTA for the bottom of signed-out interior pages
// (terms, privacy, acceptable-use). Returns null when a viewer is
// signed in — they're not the conversion target.
//
// Defaults are the generic "get started" pairing: Sign up (primary
// dark) and Become a Renner (secondary light). Pages that want a
// single, focused button can pass `secondary={null}`.

type Action = { label: string; href: string };

export async function MarketingCTA({
  heading = "Ready to get started?",
  primary = { label: "Sign up", href: "/signup" },
  secondary = { label: "Become a Renner", href: "/signup" } as Action | null,
}: {
  heading?: string;
  primary?: Action;
  secondary?: Action | null;
}) {
  const viewer = await getViewer();
  if (viewer) return null;

  return (
    <section
      style={{
        padding: "120px 32px",
        backgroundColor: "#fbfbfc",
        borderTop: "1px solid #eaedf0",
      }}
    >
      <div
        className="mx-auto"
        style={{
          maxWidth: "780px",
          textAlign: "center",
        }}
      >
        <h2
          className="font-display-tight"
          style={{
            fontSize: "clamp(36px, 5vw, 56px)",
            lineHeight: 1.05,
            color: "#0d0f12",
            marginBottom: "32px",
          }}
        >
          {heading}
        </h2>
        <div className="flex justify-center gap-3 flex-wrap">
          <Link
            href={primary.href}
            className="btn-dark"
            style={{
              width: "auto",
              padding: "13px 28px",
              textDecoration: "none",
            }}
          >
            {primary.label}
          </Link>
          {secondary && (
            <Link
              href={secondary.href}
              className="btn-light"
              style={{
                width: "auto",
                padding: "13px 28px",
                textDecoration: "none",
              }}
            >
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
