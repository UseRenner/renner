import { RENNERS } from "../data";
import {
  Avatar,
  CategoryBadge,
  LicensedTag,
  PageTitle,
  RennerName,
  VerifiedTag,
} from "../ui";

export default function MyRennersExample() {
  return (
    <div className="mx-auto" style={{ maxWidth: "1100px" }}>
      <PageTitle eyebrow="5 Renners saved" title="My Renners" />
      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        }}
      >
        {RENNERS.map((r) => (
          <div key={r.id} className="card" style={{ padding: "24px" }}>
            <div
              className="flex items-start gap-3"
              style={{ marginBottom: "16px" }}
            >
              <Avatar user={r} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  className="flex items-center gap-2 flex-wrap"
                  style={{ marginBottom: "4px" }}
                >
                  <span
                    style={{
                      fontFamily:
                        "var(--font-work-sans), ui-sans-serif, system-ui",
                      fontSize: "15px",
                      fontWeight: 500,
                      color: "#0d0f12",
                    }}
                  >
                    <RennerName renner={r} />
                  </span>
                  <KeyIcon filled />
                </div>
                <div
                  style={{
                    fontFamily:
                      "var(--font-work-sans), ui-sans-serif, system-ui",
                    fontSize: "12px",
                    color: "#7d8da0",
                  }}
                >
                  {r.completed_tasks} tasks completed · {r.rating.toFixed(1)}
                  ★ · {r.city}, {r.state}
                </div>
              </div>
            </div>

            <div
              className="flex flex-wrap gap-2"
              style={{ marginBottom: "14px" }}
            >
              {r.background_verified && <VerifiedTag />}
              {r.licensed && <LicensedTag />}
            </div>

            <div
              className="flex flex-wrap gap-1"
              style={{ marginBottom: "16px" }}
            >
              {r.categories.slice(0, 3).map((c) => (
                <span
                  key={c}
                  style={{
                    fontFamily:
                      "var(--font-work-sans), ui-sans-serif, system-ui",
                    fontSize: "11px",
                    color: "#4d5b6a",
                    backgroundColor: "#f6f7f9",
                    border: "1px solid #eaedf0",
                    borderRadius: "999px",
                    padding: "4px 10px",
                  }}
                >
                  {c}
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                className="btn-dark"
                style={{ flex: 1, padding: "10px 14px", fontSize: "13px" }}
              >
                Invite to a task
              </button>
              <button
                type="button"
                className="btn-light"
                style={{ padding: "10px 14px", fontSize: "13px" }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <p
        style={{
          fontFamily: "var(--font-work-sans), ui-sans-serif, system-ui",
          fontSize: "12px",
          color: "#7d8da0",
          marginTop: "24px",
        }}
      >
        <CategoryBadge>Tip</CategoryBadge>{" "}
        <span style={{ marginLeft: "8px" }}>
          Tap the key icon next to a Renner&rsquo;s name on any task or
          applicant to add them here.
        </span>
      </p>
    </div>
  );
}

function KeyIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill={filled ? "#0d0f12" : "none"}
      stroke="#0d0f12"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="8" cy="14" r="4" />
      <path d="m12 14 8-8" />
      <path d="m16 6 3 3" />
    </svg>
  );
}
