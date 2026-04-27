import Link from "next/link";

const SCENES = [
  {
    href: "/examples/my-renners",
    title: "My Renners",
    body: "Saved Renners list with names, ratings, and categories.",
  },
  {
    href: "/examples/posted-task",
    title: "Posted task",
    body: "Open task as a client sees it, with applicants.",
  },
  {
    href: "/examples/task-in-progress",
    title: "Task in progress",
    body: "Booked task with assigned Renner and timeline.",
  },
  {
    href: "/examples/completed-task",
    title: "Completed task",
    body: "Confirmation, completion photos, review prompt.",
  },
  {
    href: "/examples/renner-profile",
    title: "Renner profile",
    body: "Bio, categories, rating, badges, reviews.",
  },
  {
    href: "/examples/client-profile",
    title: "Client profile",
    body: "Company display, tasks-posted count.",
  },
  {
    href: "/examples/review-flow",
    title: "Review flow",
    body: "Leaving a star + comment review.",
  },
  {
    href: "/examples/invite-modal",
    title: "Invite-to-task modal",
    body: "Invite a saved Renner directly to a task.",
  },
  {
    href: "/examples/task-application",
    title: "Task application view",
    body: "What a Renner sees when browsing tasks.",
  },
  {
    href: "/examples/renner-dashboard",
    title: "Renner dashboard",
    body: "Active tasks, earnings, upcoming schedule.",
  },
  {
    href: "/examples/client-dashboard",
    title: "Client dashboard",
    body: "Posted, active, and past tasks.",
  },
];

export default function ExamplesIndex() {
  return (
    <div className="mx-auto" style={{ maxWidth: "1100px" }}>
      <div className="micro-label" style={{ marginBottom: "12px" }}>
        Internal preview
      </div>
      <h1
        className="font-display-tight"
        style={{
          fontSize: "48px",
          lineHeight: 1.05,
          color: "#0d0f12",
          marginBottom: "16px",
        }}
      >
        Renner <span className="headline-em">examples</span>
      </h1>
      <p
        style={{
          fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
          fontSize: "15px",
          color: "#647589",
          lineHeight: 1.65,
          marginBottom: "32px",
          maxWidth: "640px",
        }}
      >
        Populated mockups of every page and state in the app. For design
        review only — these routes do not appear in the nav and will be
        removed before launch.
      </p>

      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        }}
      >
        {SCENES.map((scene) => (
          <Link
            key={scene.href}
            href={scene.href}
            className="card ll-card"
            style={{
              padding: "20px",
              textDecoration: "none",
              color: "inherit",
              display: "block",
            }}
          >
            <h3
              className="font-display"
              style={{
                fontSize: "18px",
                color: "#0d0f12",
                marginBottom: "6px",
              }}
            >
              {scene.title}
            </h3>
            <p
              style={{
                fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
                fontSize: "13px",
                color: "#647589",
                lineHeight: 1.55,
              }}
            >
              {scene.body}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
