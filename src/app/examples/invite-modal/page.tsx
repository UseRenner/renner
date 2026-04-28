import { RENNERS } from "../data";
import { Avatar, PageTitle, RennerName, VerifiedTag } from "../ui";

export default function InviteModalExample() {
  const renner = RENNERS[1]; // Priya S.

  const myOpenTasks = [
    {
      id: "t1",
      title: "Install sign rider at 4821 Olive St",
      meta: "Today, 2:00 – 5:00 PM · $45",
    },
    {
      id: "t5",
      title: "Lockbox swap at 812 Holly St",
      meta: "Tomorrow, 9:00 AM · $60",
    },
    {
      id: "t6",
      title: "Courier signed contract to title office",
      meta: "Apr 30, 1:30 PM · $35",
    },
  ];

  return (
    <div className="mx-auto" style={{ maxWidth: "1100px" }}>
      <PageTitle eyebrow="Invite-to-task modal" title="Invite a saved Renner" />

      <p
        style={{
          fontFamily: "var(--font-source-sans), ui-sans-serif, system-ui",
          fontSize: "14px",
          color: "#647589",
          marginBottom: "32px",
          lineHeight: 1.55,
        }}
      >
        Triggered from My Renners or any profile card. Picks an open task
        and invites the saved Renner directly.
      </p>

      <div
        style={{
          backgroundColor: "rgba(13,15,18,0.55)",
          borderRadius: "16px",
          padding: "60px 40px",
          minHeight: "560px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className="card"
          style={{
            width: "100%",
            maxWidth: "560px",
            padding: "32px",
            backgroundColor: "#fbfbfc",
          }}
        >
          <div className="micro-label" style={{ marginBottom: "8px" }}>
            Invite to a task
          </div>
          <h2
            className="font-display"
            style={{ fontSize: "24px", marginBottom: "20px" }}
          >
            Pick a task for <RennerName renner={renner} />
          </h2>

          <div
            className="flex items-center gap-3"
            style={{
              backgroundColor: "#f6f7f9",
              border: "1px solid #eaedf0",
              borderRadius: "10px",
              padding: "14px 16px",
              marginBottom: "20px",
            }}
          >
            <Avatar user={renner} size={36} />
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily:
                    "var(--font-source-sans), ui-sans-serif, system-ui",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                <RennerName renner={renner} />
              </div>
              <div
                style={{
                  fontFamily:
                    "var(--font-source-sans), ui-sans-serif, system-ui",
                  fontSize: "12px",
                  color: "#647589",
                }}
              >
                {renner.completed_tasks} tasks · {renner.rating.toFixed(1)}★
              </div>
            </div>
            <VerifiedTag />
          </div>

          <div className="flex flex-col gap-2" style={{ marginBottom: "20px" }}>
            {myOpenTasks.map((t, i) => (
              <button
                key={t.id}
                type="button"
                style={{
                  textAlign: "left",
                  padding: "14px 16px",
                  border: i === 0 ? "1px solid #0d0f12" : "1px solid #cad1d8",
                  backgroundColor: i === 0 ? "#f6f7f9" : "#fbfbfc",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    fontFamily:
                      "var(--font-source-sans), ui-sans-serif, system-ui",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#0d0f12",
                    marginBottom: "2px",
                  }}
                >
                  {t.title}
                </div>
                <div
                  style={{
                    fontFamily:
                      "var(--font-source-sans), ui-sans-serif, system-ui",
                    fontSize: "12px",
                    color: "#7d8da0",
                  }}
                >
                  {t.meta}
                </div>
              </button>
            ))}
            <button
              type="button"
              style={{
                textAlign: "left",
                padding: "14px 16px",
                border: "1px dashed #cad1d8",
                borderRadius: "10px",
                backgroundColor: "#fbfbfc",
                color: "#647589",
                fontFamily:
                  "var(--font-source-sans), ui-sans-serif, system-ui",
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              + Post a new task and invite {renner.first_name}
            </button>
          </div>

          <div className="flex justify-end gap-2">
            <button type="button" className="btn-light" style={{ padding: "10px 16px" }}>
              Cancel
            </button>
            <button type="button" className="btn-dark" style={{ padding: "10px 18px" }}>
              Send invite
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
