"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { TASK_CATEGORIES } from "@/lib/types";

export default function PostTaskPage() {
  const router = useRouter();
  const supabase = createClient();

  const [userId, setUserId] = useState<string | null>(null);
  const [role, setRole] = useState<"renner" | "client" | null>(null);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<string>(TASK_CATEGORIES[0]);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [timeEstimate, setTimeEstimate] = useState("");
  const [pay, setPay] = useState("");
  const [payType, setPayType] = useState<"Flat rate" | "Hourly">("Flat rate");
  const [location, setLocation] = useState("");
  const [requiresLicense, setRequiresLicense] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!active) return;
      if (!user) {
        router.replace("/signin");
        return;
      }
      setUserId(user.id);

      const { data: profile } = await supabase
        .from("users")
        .select("role")
        .eq("id", user.id)
        .maybeSingle();
      if (!active) return;
      setRole((profile?.role as "renner" | "client" | null) ?? null);
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [router, supabase]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!userId) return;
    setError(null);
    setSubmitting(true);

    const payNumber = pay ? Number(pay) : null;
    if (pay && Number.isNaN(payNumber)) {
      setError("Pay must be a valid number.");
      setSubmitting(false);
      return;
    }

    const { error: insertError } = await supabase.from("tasks").insert({
      title,
      description,
      category,
      pay: payNumber,
      pay_type: payType,
      location,
      date: date ? new Date(date).toISOString() : null,
      time_estimate: timeEstimate || null,
      status: "Open",
      requires_license: requiresLicense,
      posted_by: userId,
      payment_status: "unpaid",
    });

    if (insertError) {
      setError(insertError.message);
      setSubmitting(false);
      return;
    }

    router.push("/my-tasks");
    router.refresh();
  }

  if (loading) {
    return (
      <main className="pt-16 pb-20 px-6">
        <p
          className="mx-auto"
          style={{
            maxWidth: "720px",
            color: "#647589",
            fontSize: "14px",
          }}
        >
          Loading…
        </p>
      </main>
    );
  }

  if (role && role !== "client") {
    return (
      <main className="pt-16 pb-20 px-6">
        <div className="mx-auto" style={{ maxWidth: "720px" }}>
          <h1
            className="font-display-tight"
            style={{
              fontSize: "40px",
              color: "#0d0f12",
              marginBottom: "12px",
            }}
          >
            Only clients can post tasks
          </h1>
          <p style={{ color: "#647589", fontSize: "15px" }}>
            Your account is set up as a Renner. Switch to a client account to
            post a task.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-12 pb-20 px-6">
      <div className="mx-auto" style={{ maxWidth: "720px" }}>
        <div
          className="micro-label"
          style={{ marginBottom: "12px" }}
        >
          New listing
        </div>
        <h1
          className="font-display-tight"
          style={{
            fontSize: "48px",
            lineHeight: 1.05,
            color: "#0d0f12",
            marginBottom: "32px",
          }}
        >
          Post a <span className="headline-em">task</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="card" style={{ padding: "32px" }}>
            <div className="flex flex-col gap-5">
              <div>
                <label className="input-label" htmlFor="title">
                  Task title
                </label>
                <input
                  id="title"
                  className="input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="input-label" htmlFor="category">
                  Category
                </label>
                <select
                  id="category"
                  className="input"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {TASK_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="input-label" htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  className="input"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{ minHeight: "120px", resize: "vertical" }}
                />
              </div>

              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="input-label" htmlFor="date">
                    Date
                  </label>
                  <input
                    id="date"
                    type="date"
                    className="input"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div className="flex-1">
                  <label className="input-label" htmlFor="timeEstimate">
                    Time estimate
                  </label>
                  <input
                    id="timeEstimate"
                    className="input"
                    placeholder="e.g. 1–2 hours"
                    value={timeEstimate}
                    onChange={(e) => setTimeEstimate(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="input-label" htmlFor="pay">
                    Pay amount
                  </label>
                  <input
                    id="pay"
                    type="number"
                    min="0"
                    step="1"
                    className="input"
                    value={pay}
                    onChange={(e) => setPay(e.target.value)}
                  />
                </div>
                <div className="flex-1">
                  <label className="input-label" htmlFor="payType">
                    Pay type
                  </label>
                  <select
                    id="payType"
                    className="input"
                    value={payType}
                    onChange={(e) =>
                      setPayType(e.target.value as "Flat rate" | "Hourly")
                    }
                  >
                    <option value="Flat rate">Flat rate</option>
                    <option value="Hourly">Hourly</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="input-label" htmlFor="location">
                  Location
                </label>
                <input
                  id="location"
                  className="input"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <label
                className="flex items-start gap-3"
                style={{ cursor: "pointer", marginTop: "4px" }}
              >
                <input
                  type="checkbox"
                  checked={requiresLicense}
                  onChange={(e) => setRequiresLicense(e.target.checked)}
                  style={{
                    marginTop: "3px",
                    width: "16px",
                    height: "16px",
                    accentColor: "#0d0f12",
                  }}
                />
                <span>
                  <span
                    style={{
                      fontFamily:
                        "var(--font-inter), ui-sans-serif, system-ui",
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#0d0f12",
                      display: "block",
                    }}
                  >
                    Requires a real estate license
                  </span>
                  <span
                    style={{
                      fontFamily:
                        "var(--font-inter), ui-sans-serif, system-ui",
                      fontSize: "12px",
                      color: "#7d8da0",
                      lineHeight: 1.5,
                      display: "block",
                      marginTop: "2px",
                    }}
                  >
                    Check this if the task involves showing property or any
                    activity requiring a real estate license.
                  </span>
                </span>
              </label>

              <p
                style={{
                  fontFamily:
                    "var(--font-inter), ui-sans-serif, system-ui",
                  fontSize: "12px",
                  color: "#647589",
                  lineHeight: 1.6,
                  backgroundColor: "#f6f7f9",
                  border: "1px solid #eaedf0",
                  borderRadius: "10px",
                  padding: "14px 16px",
                }}
              >
                Your card will be charged when you book a runner. Funds are
                held by Stripe and released only when you approve the
                completed work.
              </p>

              {error && (
                <p style={{ color: "#c0392b", fontSize: "13px" }}>{error}</p>
              )}

              <button
                type="submit"
                className="btn-dark"
                disabled={submitting}
                style={{ marginTop: "4px" }}
              >
                {submitting ? "Posting…" : "Post task"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
