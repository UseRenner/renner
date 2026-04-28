import { TASKS } from "../data";
import {
  Avatar,
  CategoryBadge,
  PageTitle,
  RennerName,
  StatusPill,
  VerifiedTag,
} from "../ui";

export default function CompletedTaskExample() {
  const task = TASKS[3]; // Lockbox · Complete
  const renner = task.booked_runner!;

  return (
    <div className="mx-auto" style={{ maxWidth: "780px" }}>
      <PageTitle eyebrow="Completed" title={task.title} />

      <div
        className="flex items-center gap-2 flex-wrap"
        style={{ marginBottom: "24px" }}
      >
        <CategoryBadge>{task.category}</CategoryBadge>
        <StatusPill status="Complete" />
      </div>

      <div
        className="card"
        style={{
          padding: "24px 28px",
          marginBottom: "24px",
          backgroundColor: "rgba(45,138,78,0.06)",
          borderColor: "rgba(45,138,78,0.20)",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-roboto), ui-sans-serif, system-ui",
            fontSize: "13px",
            fontWeight: 500,
            color: "#2d8a4e",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: "8px",
          }}
        >
          Confirmed · payment released
        </div>
        <h2
          className="font-display"
          style={{ fontSize: "22px", marginBottom: "8px" }}
        >
          Thanks — task complete.
        </h2>
        <p
          style={{
            fontFamily: "var(--font-roboto), ui-sans-serif, system-ui",
            fontSize: "14px",
            color: "#4d5b6a",
            lineHeight: 1.6,
          }}
        >
          $60 was released to <RennerName renner={renner} /> on Apr 22 at
          1:14 PM. Stripe payouts arrive in their account within 1–2
          business days.
        </p>
      </div>

      <div className="card" style={{ padding: "24px", marginBottom: "24px" }}>
        <h3
          className="font-display"
          style={{ fontSize: "18px", marginBottom: "12px" }}
        >
          Completion photos
        </h3>
        <div
          className="grid gap-3"
          style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
        >
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                aspectRatio: "4 / 3",
                backgroundColor: "#eaedf0",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily:
                  "var(--font-roboto), ui-sans-serif, system-ui",
                fontSize: "12px",
                color: "#7d8da0",
              }}
            >
              Photo {i}
            </div>
          ))}
        </div>
        <p
          style={{
            fontFamily: "var(--font-roboto), ui-sans-serif, system-ui",
            fontSize: "13px",
            color: "#647589",
            marginTop: "16px",
            lineHeight: 1.55,
          }}
        >
          &ldquo;Old combo box pulled, new SUPRA mounted on the rear gate
          per agent instructions. Old box returned to listing agent at the
          office.&rdquo;
        </p>
      </div>

      <div
        className="card flex items-center gap-4"
        style={{ padding: "20px 24px", marginBottom: "24px" }}
      >
        <Avatar user={renner} />
        <div style={{ flex: 1 }}>
          <div
            className="flex items-center gap-2"
            style={{ marginBottom: "2px" }}
          >
            <span
              style={{
                fontFamily: "var(--font-roboto), ui-sans-serif, system-ui",
                fontSize: "15px",
                fontWeight: 500,
              }}
            >
              <RennerName renner={renner} />
            </span>
            <VerifiedTag />
          </div>
          <div
            style={{
              fontFamily: "var(--font-roboto), ui-sans-serif, system-ui",
              fontSize: "12px",
              color: "#7d8da0",
            }}
          >
            How was the work? A quick rating helps other Clients.
          </div>
        </div>
        <button
          type="button"
          className="btn-dark"
          style={{ padding: "9px 16px" }}
        >
          Leave a review
        </button>
      </div>
    </div>
  );
}
