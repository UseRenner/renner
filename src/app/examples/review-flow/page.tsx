import { TASKS } from "../data";
import { Avatar, PageTitle, RennerName, VerifiedTag } from "../ui";

export default function ReviewFlowExample() {
  const task = TASKS[3];
  const renner = task.booked_runner!;

  return (
    <div className="mx-auto" style={{ maxWidth: "640px" }}>
      <PageTitle eyebrow="Leave a review" title="Rate your Renner" />

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
              fontSize: "13px",
              color: "#647589",
            }}
          >
            {task.title} · {task.date_label}
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: "28px" }}>
        <label
          className="input-label"
          style={{ display: "block", marginBottom: "8px" }}
        >
          Rating
        </label>
        <div
          className="flex gap-2"
          style={{ marginBottom: "20px" }}
          aria-hidden
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <span
              key={n}
              style={{
                fontSize: "32px",
                color: n <= 5 ? "#0d0f12" : "#cad1d8",
                lineHeight: 1,
              }}
            >
              ★
            </span>
          ))}
        </div>

        <label className="input-label" htmlFor="comment">
          Comment <span style={{ color: "#7d8da0", fontWeight: 400 }}>(optional)</span>
        </label>
        <textarea
          id="comment"
          className="input"
          style={{ minHeight: "120px", resize: "vertical" }}
          defaultValue={
            "Showed up early, swapped the lockbox cleanly, photos were sent within 5 minutes of finishing. Great work."
          }
        />

        <div className="flex justify-end gap-2" style={{ marginTop: "20px" }}>
          <button
            type="button"
            className="btn-light"
            style={{ padding: "10px 16px" }}
          >
            Skip
          </button>
          <button
            type="button"
            className="btn-dark"
            style={{ padding: "10px 18px" }}
          >
            Submit review
          </button>
        </div>
      </div>
    </div>
  );
}
