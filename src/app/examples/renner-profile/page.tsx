import { RENNERS } from "../data";
import {
  Avatar,
  CategoryBadge,
  LicensedTag,
  PageTitle,
  RennerName,
  VerifiedTag,
} from "../ui";

export default function RennerProfileExample() {
  const renner = RENNERS[0]; // Marcus King

  const reviews = [
    {
      author: "Whitney P. · Compass",
      rating: 5,
      body: "Marcus is the first call I make for showings in central Denver. Punctual, professional, and the buyers always feel taken care of.",
      when: "Apr 20",
    },
    {
      author: "Avery T. · Coldwell Banker",
      rating: 5,
      body: "Hosted three back-to-back showings for me last weekend without a hitch.",
      when: "Apr 12",
    },
    {
      author: "Jordan Bennett · SERHANT.",
      rating: 4,
      body: "Solid showing. A few minutes late but kept me in the loop the whole time.",
      when: "Apr 3",
    },
  ];

  return (
    <div className="mx-auto" style={{ maxWidth: "900px" }}>
      <PageTitle eyebrow="Renner profile" title="Marcus K." />

      <div
        className="card"
        style={{
          padding: "28px",
          marginBottom: "24px",
          display: "flex",
          alignItems: "flex-start",
          gap: "20px",
        }}
      >
        <Avatar user={renner} size={64} />
        <div style={{ flex: 1 }}>
          <div
            className="flex items-center gap-2 flex-wrap"
            style={{ marginBottom: "8px" }}
          >
            <h2
              className="font-display"
              style={{ fontSize: "26px", color: "#0d0f12" }}
            >
              <RennerName renner={renner} />
            </h2>
            <VerifiedTag />
            <LicensedTag />
          </div>
          <div
            style={{
              fontFamily: "var(--font-public-sans), ui-sans-serif, system-ui",
              fontSize: "13px",
              color: "#647589",
              marginBottom: "12px",
            }}
          >
            {renner.completed_tasks} tasks completed ·{" "}
            {renner.rating.toFixed(1)}★ · {renner.city}, {renner.state}
          </div>
          <p
            style={{
              fontFamily: "var(--font-public-sans), ui-sans-serif, system-ui",
              fontSize: "14px",
              color: "#0d0f12",
              lineHeight: 1.6,
            }}
          >
            {renner.bio}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <button
            type="button"
            className="btn-dark"
            style={{ padding: "10px 16px", fontSize: "13px" }}
          >
            Invite to a task
          </button>
          <button
            type="button"
            className="btn-light"
            style={{ padding: "10px 16px", fontSize: "13px" }}
          >
            Save Renner
          </button>
        </div>
      </div>

      <div
        className="card"
        style={{ padding: "24px", marginBottom: "24px" }}
      >
        <div className="micro-label" style={{ marginBottom: "12px" }}>
          Categories
        </div>
        <div className="flex flex-wrap gap-2">
          {renner.categories.map((c) => (
            <CategoryBadge key={c}>{c}</CategoryBadge>
          ))}
        </div>
      </div>

      <h2
        className="font-display"
        style={{ fontSize: "22px", marginBottom: "16px" }}
      >
        Reviews
      </h2>
      <div className="flex flex-col gap-3">
        {reviews.map((r, i) => (
          <div key={i} className="card" style={{ padding: "20px 24px" }}>
            <div
              className="flex items-center justify-between"
              style={{ marginBottom: "8px" }}
            >
              <span
                style={{
                  fontFamily:
                    "var(--font-public-sans), ui-sans-serif, system-ui",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                {r.author}
              </span>
              <span
                style={{
                  fontFamily:
                    "var(--font-public-sans), ui-sans-serif, system-ui",
                  fontSize: "12px",
                  color: "#7d8da0",
                }}
              >
                {r.when}
              </span>
            </div>
            <div
              style={{
                fontFamily: "var(--font-public-sans), ui-sans-serif, system-ui",
                fontSize: "14px",
                color: "#0d0f12",
                marginBottom: "8px",
              }}
            >
              {"★".repeat(r.rating)}
              <span style={{ color: "#cad1d8" }}>
                {"★".repeat(5 - r.rating)}
              </span>
            </div>
            <p
              style={{
                fontFamily: "var(--font-public-sans), ui-sans-serif, system-ui",
                fontSize: "14px",
                color: "#4d5b6a",
                lineHeight: 1.6,
              }}
            >
              {r.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
