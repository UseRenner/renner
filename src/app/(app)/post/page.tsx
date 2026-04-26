"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { US_STATES } from "@/lib/states";
import { createClient } from "@/lib/supabase/client";
import {
  LICENSE_OPTIONAL_CATEGORIES,
  LICENSE_REQUIRED_CATEGORIES,
  TASK_CATEGORIES,
} from "@/lib/types";

const ZIP_REGEX = /^\d{5}$/;
const KEYWORD_TRIGGERS = [
  "show",
  "showing",
  "open house",
  "represent",
  "negotiate",
  "buyer tour",
];

function hasShowingKeyword(text: string) {
  const lower = text.toLowerCase();
  return KEYWORD_TRIGGERS.some((kw) =>
    new RegExp(`\\b${kw.replace(/\s+/g, "\\s+")}\\b`).test(lower),
  );
}

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
  const [zipCode, setZipCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [unit, setUnit] = useState("");
  const [taskCity, setTaskCity] = useState("");
  const [taskState, setTaskState] = useState("");
  const [taskZip, setTaskZip] = useState("");

  const [licenseConfirmed, setLicenseConfirmed] = useState(false);
  const [otherChoice, setOtherChoice] = useState<"required" | "not_required" | "">("");
  const [warningDismissed, setWarningDismissed] = useState(false);

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

  useEffect(() => {
    setLicenseConfirmed(false);
    setOtherChoice("");
    setWarningDismissed(false);
  }, [category]);

  const requiresLicense = useMemo(() => {
    if (LICENSE_REQUIRED_CATEGORIES.includes(category as never)) return true;
    if (LICENSE_OPTIONAL_CATEGORIES.includes(category as never))
      return otherChoice === "required";
    return false;
  }, [category, otherChoice]);

  const showWarning =
    !LICENSE_REQUIRED_CATEGORIES.includes(category as never) &&
    !warningDismissed &&
    hasShowingKeyword(`${title} ${description}`);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!userId) return;
    setError(null);

    const payNumber = pay ? Number(pay) : null;
    if (pay && Number.isNaN(payNumber)) {
      setError("Pay must be a valid number.");
      return;
    }

    if (!ZIP_REGEX.test(zipCode)) {
      setError("Please enter a valid 5-digit zip code");
      return;
    }
    if (!ZIP_REGEX.test(taskZip)) {
      setError("Please enter a valid 5-digit zip code for the task address");
      return;
    }
    if (!streetAddress || !taskCity || !taskState) {
      setError("Please complete all required task address fields.");
      return;
    }

    if (
      LICENSE_OPTIONAL_CATEGORIES.includes(category as never) &&
      !otherChoice
    ) {
      setError(
        "Please attest whether this task requires a licensed real estate professional.",
      );
      return;
    }
    if (
      !LICENSE_REQUIRED_CATEGORIES.includes(category as never) &&
      !LICENSE_OPTIONAL_CATEGORIES.includes(category as never) &&
      !licenseConfirmed
    ) {
      setError(
        "Please confirm that this task does not require a licensed real estate professional.",
      );
      return;
    }

    setSubmitting(true);
    const { error: insertError } = await supabase.from("tasks").insert({
      title,
      description,
      category,
      pay: payNumber,
      pay_type: "Flat rate",
      zip_code: zipCode,
      street_address: streetAddress,
      unit: unit || null,
      task_city: taskCity,
      task_state: taskState,
      task_zip: taskZip,
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
        <div className="micro-label" style={{ marginBottom: "12px" }}>
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
                <p
                  style={{
                    fontFamily:
                      "var(--font-inter), ui-sans-serif, system-ui",
                    fontSize: "12px",
                    color: "#7d8da0",
                    marginTop: "6px",
                  }}
                >
                  Showing and Open house tasks require a licensed Renner.
                </p>
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

              {showWarning && (
                <div
                  style={{
                    backgroundColor: "rgba(234, 179, 8, 0.10)",
                    border: "1px solid rgba(234, 179, 8, 0.45)",
                    borderRadius: "10px",
                    padding: "14px 16px",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                  }}
                >
                  <span
                    style={{
                      fontFamily:
                        "var(--font-inter), ui-sans-serif, system-ui",
                      fontSize: "13px",
                      color: "#7a5b09",
                      lineHeight: 1.6,
                      flex: 1,
                    }}
                  >
                    Your description may involve showing-related activity. If
                    this task involves showing property to buyers or hosting an
                    open house, please select the Showing or Open House
                    category to ensure a licensed Renner is assigned.
                  </span>
                  <button
                    type="button"
                    onClick={() => setWarningDismissed(true)}
                    aria-label="Dismiss warning"
                    style={{
                      background: "none",
                      border: "none",
                      color: "#7a5b09",
                      fontSize: "16px",
                      cursor: "pointer",
                      lineHeight: 1,
                      padding: "0 2px",
                    }}
                  >
                    ×
                  </button>
                </div>
              )}

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

              <div>
                <label className="input-label" htmlFor="pay">
                  Pay amount (flat rate)
                </label>
                <input
                  id="pay"
                  type="number"
                  min="0"
                  step="1"
                  className="input"
                  placeholder="$"
                  value={pay}
                  onChange={(e) => setPay(e.target.value)}
                />
              </div>

              <div>
                <label className="input-label" htmlFor="zipCode">
                  Zip code
                </label>
                <input
                  id="zipCode"
                  className="input"
                  value={zipCode}
                  onChange={(e) =>
                    setZipCode(e.target.value.replace(/\D/g, "").slice(0, 5))
                  }
                  inputMode="numeric"
                  maxLength={5}
                  required
                />
              </div>

              <div>
                <div
                  style={{
                    fontFamily:
                      "var(--font-inter), ui-sans-serif, system-ui",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#0d0f12",
                  }}
                >
                  Task address
                </div>
                <div
                  style={{
                    fontFamily:
                      "var(--font-inter), ui-sans-serif, system-ui",
                    fontSize: "12px",
                    color: "#7d8da0",
                    marginTop: "2px",
                    marginBottom: "12px",
                  }}
                >
                  Only shared with your booked Renner.
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex gap-3">
                    <div style={{ flex: 2 }}>
                      <label className="input-label" htmlFor="streetAddress">
                        Street address
                      </label>
                      <input
                        id="streetAddress"
                        className="input"
                        value={streetAddress}
                        onChange={(e) => setStreetAddress(e.target.value)}
                        required
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label className="input-label" htmlFor="unit">
                        Unit / Suite
                      </label>
                      <input
                        id="unit"
                        className="input"
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div style={{ flex: 2 }}>
                      <label className="input-label" htmlFor="taskCity">
                        City
                      </label>
                      <input
                        id="taskCity"
                        className="input"
                        value={taskCity}
                        onChange={(e) => setTaskCity(e.target.value)}
                        required
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label className="input-label" htmlFor="taskState">
                        State
                      </label>
                      <select
                        id="taskState"
                        className="input"
                        value={taskState}
                        onChange={(e) => setTaskState(e.target.value)}
                        required
                      >
                        <option value="" disabled>
                          —
                        </option>
                        {US_STATES.map(([code, name]) => (
                          <option key={code} value={code}>
                            {code} — {name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div style={{ flex: 1 }}>
                      <label className="input-label" htmlFor="taskZip">
                        Zip code
                      </label>
                      <input
                        id="taskZip"
                        className="input"
                        value={taskZip}
                        onChange={(e) =>
                          setTaskZip(
                            e.target.value.replace(/\D/g, "").slice(0, 5),
                          )
                        }
                        inputMode="numeric"
                        maxLength={5}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <LicenseAttestation
                category={category}
                licenseConfirmed={licenseConfirmed}
                setLicenseConfirmed={setLicenseConfirmed}
                otherChoice={otherChoice}
                setOtherChoice={setOtherChoice}
              />

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
                Your card will be charged when you book a Renner. Funds are
                held by Stripe and released only when you confirm the task is
                complete.
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

function LicenseAttestation({
  category,
  licenseConfirmed,
  setLicenseConfirmed,
  otherChoice,
  setOtherChoice,
}: {
  category: string;
  licenseConfirmed: boolean;
  setLicenseConfirmed: (v: boolean) => void;
  otherChoice: "required" | "not_required" | "";
  setOtherChoice: (v: "required" | "not_required") => void;
}) {
  if (LICENSE_REQUIRED_CATEGORIES.includes(category as never)) {
    return (
      <div
        style={{
          border: "1px solid #cad1d8",
          borderRadius: "10px",
          padding: "14px 16px",
          backgroundColor: "#f6f7f9",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
            fontSize: "13px",
            fontWeight: 500,
            color: "#0d0f12",
            marginBottom: "4px",
          }}
        >
          This task requires a licensed Renner
        </div>
        <div
          style={{
            fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
            fontSize: "12px",
            color: "#647589",
            lineHeight: 1.6,
          }}
        >
          Only verified license holders can apply.
        </div>
      </div>
    );
  }

  if (LICENSE_OPTIONAL_CATEGORIES.includes(category as never)) {
    return (
      <div className="flex flex-col gap-2">
        <AttestationRow
          selected={otherChoice === "required"}
          onClick={() => setOtherChoice("required")}
          control="radio"
          text="I attest that this task requires a licensed real estate professional"
        />
        <AttestationRow
          selected={otherChoice === "not_required"}
          onClick={() => setOtherChoice("not_required")}
          control="radio"
          text="I attest that this task does not require a licensed real estate professional"
        />
      </div>
    );
  }

  return (
    <AttestationRow
      selected={licenseConfirmed}
      onClick={() => setLicenseConfirmed(!licenseConfirmed)}
      control="checkbox"
      text="I confirm that this task does not require a licensed real estate professional to perform."
    />
  );
}

function AttestationRow({
  selected,
  onClick,
  control,
  text,
}: {
  selected: boolean;
  onClick: () => void;
  control: "radio" | "checkbox";
  text: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        textAlign: "left",
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
        border: selected ? "1px solid #0d0f12" : "1px solid #cad1d8",
        backgroundColor: selected ? "#f6f7f9" : "#fbfbfc",
        borderRadius: "10px",
        padding: "14px 16px",
        cursor: "pointer",
        width: "100%",
        transition: "border-color 120ms ease, background-color 120ms ease",
      }}
    >
      <span
        aria-hidden
        style={{
          width: "16px",
          height: "16px",
          flexShrink: 0,
          marginTop: "2px",
          borderRadius: control === "radio" ? "9999px" : "3px",
          border: selected ? "5px solid #0d0f12" : "1.5px solid #a7b2be",
          backgroundColor: control === "checkbox" && selected ? "#0d0f12" : "#fbfbfc",
          boxSizing: "border-box",
        }}
      />
      <span
        style={{
          fontFamily: "var(--font-inter), ui-sans-serif, system-ui",
          fontSize: "14px",
          color: "#0d0f12",
          lineHeight: 1.55,
        }}
      >
        {text}
      </span>
    </button>
  );
}
