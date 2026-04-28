"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { US_STATES } from "@/lib/states";
import { createClient } from "@/lib/supabase/client";
import {
  LICENSE_OPTIONAL_CATEGORIES,
  LICENSE_REQUIRED_CATEGORIES,
  TASK_CATEGORIES,
} from "@/lib/types";

// Shape of the row inserted into public.tasks. Built from the form
// state and posted directly — no session buffering, no deferred auth.
type TaskPayload = {
  title: string;
  description: string;
  category: string;
  pay: number | null;
  pay_type: "Flat rate";
  zip_code: string;
  street_address: string;
  unit: string | null;
  task_city: string;
  task_state: string;
  task_zip: string;
  task_timing_type: "exact" | "window";
  task_time: string | null;
  window_start: string | null;
  window_end: string | null;
  time_estimate: string | null;
  status: "Open";
  requires_license: boolean;
  payment_status: "unpaid";
};

const ZIP_REGEX = /^\d{5}$/;

const PRESET_WINDOWS: Record<
  "Morning" | "Afternoon" | "Evening",
  { start: number; end: number; label: string }
> = {
  Morning: { start: 8, end: 12, label: "Morning (8am–12pm)" },
  Afternoon: { start: 12, end: 17, label: "Afternoon (12pm–5pm)" },
  Evening: { start: 17, end: 21, label: "Evening (5pm–9pm)" },
};

function pad(n: number) {
  return String(n).padStart(2, "0");
}
function combineDateAndTime(dateInput: string, timeInput: string) {
  // Both inputs come from <input type="date"> / <input type="time"> in
  // the user's local zone. new Date(string) interprets the combined form
  // as local time.
  const t = new Date(`${dateInput}T${timeInput}:00`);
  return Number.isNaN(t.getTime()) ? null : t;
}
function combineDateAndHour(dateInput: string, hour: number) {
  return combineDateAndTime(dateInput, `${pad(hour)}:00`);
}
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

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<string>(TASK_CATEGORIES[0]);
  const [description, setDescription] = useState("");

  // Timing
  const [timingType, setTimingType] = useState<"exact" | "window">("exact");
  const [scheduleDate, setScheduleDate] = useState("");
  const [exactTime, setExactTime] = useState("");
  const [windowChoice, setWindowChoice] = useState<
    "Morning" | "Afternoon" | "Evening" | "Custom"
  >("Morning");
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");
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

  // Authenticated route — middleware redirects signed-out users, but
  // we still verify the role here so renners get bounced back to
  // /browse instead of seeing the post form.
  useEffect(() => {
    let active = true;
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!active) return;
      if (!user) {
        router.replace("/");
        return;
      }
      setUserId(user.id);
      const { data: profile } = await supabase
        .from("users")
        .select("role")
        .eq("id", user.id)
        .maybeSingle();
      if (!active) return;
      const r = (profile?.role as "renner" | "client" | null) ?? null;
      if (r === "renner") {
        router.replace("/browse");
      }
    })();
    return () => {
      active = false;
    };
  }, [supabase, router]);

  // Hydrate prefill from URL params (?title=..., ?category=...).
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const titleParam = sp.get("title");
    const categoryParam = sp.get("category");
    if (titleParam) setTitle(titleParam);
    if (
      categoryParam &&
      (TASK_CATEGORIES as readonly string[]).includes(categoryParam)
    ) {
      setCategory(categoryParam);
    }
  }, []);

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

  function buildTaskPayload(): TaskPayload | null {
    const payNumber = pay ? Number(pay) : null;
    if (pay && Number.isNaN(payNumber)) {
      setError("Pay must be a valid number.");
      return null;
    }
    if (!ZIP_REGEX.test(zipCode)) {
      setError("Please enter a valid 5-digit zip code");
      return null;
    }
    if (!ZIP_REGEX.test(taskZip)) {
      setError(
        "Please enter a valid 5-digit zip code for the task address",
      );
      return null;
    }
    if (!streetAddress || !taskCity || !taskState) {
      setError("Please complete all required task address fields.");
      return null;
    }
    if (
      LICENSE_OPTIONAL_CATEGORIES.includes(category as never) &&
      !otherChoice
    ) {
      setError(
        "Please attest whether this task requires a licensed real estate professional.",
      );
      return null;
    }
    if (
      !LICENSE_REQUIRED_CATEGORIES.includes(category as never) &&
      !LICENSE_OPTIONAL_CATEGORIES.includes(category as never) &&
      !licenseConfirmed
    ) {
      setError(
        "Please confirm that this task does not require a licensed real estate professional.",
      );
      return null;
    }

    if (!scheduleDate) {
      setError("Please pick a date for the task.");
      return null;
    }

    let task_time: string | null = null;
    let window_start: string | null = null;
    let window_end: string | null = null;

    if (timingType === "exact") {
      if (!exactTime) {
        setError("Please pick a time for the task.");
        return null;
      }
      const t = combineDateAndTime(scheduleDate, exactTime);
      if (!t) {
        setError("That date and time isn't valid.");
        return null;
      }
      task_time = t.toISOString();
    } else {
      let startDate: Date | null;
      let endDate: Date | null;
      if (windowChoice === "Custom") {
        if (!customStart || !customEnd) {
          setError("Please set a start and end time for the window.");
          return null;
        }
        startDate = combineDateAndTime(scheduleDate, customStart);
        endDate = combineDateAndTime(scheduleDate, customEnd);
        if (!startDate || !endDate) {
          setError("That window isn't valid.");
          return null;
        }
        if (endDate.getTime() <= startDate.getTime()) {
          setError("Window end must be after window start.");
          return null;
        }
      } else {
        const preset = PRESET_WINDOWS[windowChoice];
        startDate = combineDateAndHour(scheduleDate, preset.start);
        endDate = combineDateAndHour(scheduleDate, preset.end);
      }
      window_start = startDate?.toISOString() ?? null;
      window_end = endDate?.toISOString() ?? null;
    }

    return {
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
      task_timing_type: timingType,
      task_time,
      window_start,
      window_end,
      time_estimate: timeEstimate || null,
      status: "Open",
      requires_license: requiresLicense,
      payment_status: "unpaid",
    };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!userId) return;

    const payload = buildTaskPayload();
    if (!payload) return;

    setSubmitting(true);
    const { data: inserted, error: insertError } = await supabase
      .from("tasks")
      .insert({ ...payload, posted_by: userId })
      .select("id")
      .single();
    if (insertError) {
      setError(insertError.message);
      setSubmitting(false);
      return;
    }

    const inviteRennerId = new URLSearchParams(
      window.location.search,
    ).get("invite");
    if (inviteRennerId && inserted?.id) {
      await supabase.from("applications").insert({
        task_id: inserted.id,
        applicant_id: inviteRennerId,
        status: "Invited",
      });
    }

    router.push("/my-tasks");
    router.refresh();
  }

  // Pre-auth probe; render nothing until middleware/role redirect
  // settles.
  if (!userId) return null;

  return (
    <main className="pt-10 pb-20 px-6">
      <div className="mx-auto" style={{ maxWidth: "720px" }}>
        <div className="micro-label" style={{ marginBottom: "8px" }}>
          New listing
        </div>
        <h1 className="page-title" style={{ marginBottom: "24px" }}>
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
                      "var(--font-work-sans), ui-sans-serif, system-ui",
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
                        "var(--font-work-sans), ui-sans-serif, system-ui",
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

              <TimingFields
                timingType={timingType}
                setTimingType={setTimingType}
                scheduleDate={scheduleDate}
                setScheduleDate={setScheduleDate}
                exactTime={exactTime}
                setExactTime={setExactTime}
                windowChoice={windowChoice}
                setWindowChoice={setWindowChoice}
                customStart={customStart}
                setCustomStart={setCustomStart}
                customEnd={customEnd}
                setCustomEnd={setCustomEnd}
              />

              <div>
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
                      "var(--font-work-sans), ui-sans-serif, system-ui",
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
                      "var(--font-work-sans), ui-sans-serif, system-ui",
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
                    "var(--font-work-sans), ui-sans-serif, system-ui",
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
                {submitting ? (
                  <LoadingSpinner size={18} tone="light" />
                ) : (
                  "Post task"
                )}
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
            fontFamily: "var(--font-work-sans), ui-sans-serif, system-ui",
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
            fontFamily: "var(--font-work-sans), ui-sans-serif, system-ui",
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
          backgroundColor:
            control === "checkbox" && selected ? "#0d0f12" : "#fbfbfc",
          boxSizing: "border-box",
        }}
      />
      <span
        style={{
          fontFamily: "var(--font-work-sans), ui-sans-serif, system-ui",
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

function TimingFields({
  timingType,
  setTimingType,
  scheduleDate,
  setScheduleDate,
  exactTime,
  setExactTime,
  windowChoice,
  setWindowChoice,
  customStart,
  setCustomStart,
  customEnd,
  setCustomEnd,
}: {
  timingType: "exact" | "window";
  setTimingType: (v: "exact" | "window") => void;
  scheduleDate: string;
  setScheduleDate: (v: string) => void;
  exactTime: string;
  setExactTime: (v: string) => void;
  windowChoice: "Morning" | "Afternoon" | "Evening" | "Custom";
  setWindowChoice: (
    v: "Morning" | "Afternoon" | "Evening" | "Custom",
  ) => void;
  customStart: string;
  setCustomStart: (v: string) => void;
  customEnd: string;
  setCustomEnd: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <label className="input-label">When?</label>
      <div className="grid grid-cols-2 gap-3">
        <TimingChoice
          title="Exact time"
          subtitle="Showings, meetings, arrivals."
          selected={timingType === "exact"}
          onClick={() => setTimingType("exact")}
        />
        <TimingChoice
          title="Time window"
          subtitle="Pick a span. The Renner shows up within it."
          selected={timingType === "window"}
          onClick={() => setTimingType("window")}
        />
      </div>

      <div className="flex gap-3">
        <div style={{ flex: 1 }}>
          <label className="input-label" htmlFor="scheduleDate">
            Date
          </label>
          <input
            id="scheduleDate"
            type="date"
            className="input"
            value={scheduleDate}
            onChange={(e) => setScheduleDate(e.target.value)}
            required
          />
        </div>
        {timingType === "exact" ? (
          <div style={{ flex: 1 }}>
            <label className="input-label" htmlFor="exactTime">
              Time
            </label>
            <input
              id="exactTime"
              type="time"
              className="input"
              value={exactTime}
              onChange={(e) => setExactTime(e.target.value)}
              required
            />
          </div>
        ) : (
          <div style={{ flex: 1 }}>
            <label className="input-label" htmlFor="windowChoice">
              Window
            </label>
            <select
              id="windowChoice"
              className="input"
              value={windowChoice}
              onChange={(e) =>
                setWindowChoice(
                  e.target.value as
                    | "Morning"
                    | "Afternoon"
                    | "Evening"
                    | "Custom",
                )
              }
            >
              <option value="Morning">Morning (8am–12pm)</option>
              <option value="Afternoon">Afternoon (12pm–5pm)</option>
              <option value="Evening">Evening (5pm–9pm)</option>
              <option value="Custom">Custom</option>
            </select>
          </div>
        )}
      </div>

      {timingType === "window" && windowChoice === "Custom" && (
        <div className="flex gap-3">
          <div style={{ flex: 1 }}>
            <label className="input-label" htmlFor="customStart">
              Start time
            </label>
            <input
              id="customStart"
              type="time"
              className="input"
              value={customStart}
              onChange={(e) => setCustomStart(e.target.value)}
              required
            />
          </div>
          <div style={{ flex: 1 }}>
            <label className="input-label" htmlFor="customEnd">
              End time
            </label>
            <input
              id="customEnd"
              type="time"
              className="input"
              value={customEnd}
              onChange={(e) => setCustomEnd(e.target.value)}
              required
            />
          </div>
        </div>
      )}
    </div>
  );
}

function TimingChoice({
  title,
  subtitle,
  selected,
  onClick,
}: {
  title: string;
  subtitle: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        textAlign: "left",
        border: selected ? "1px solid #0d0f12" : "1px solid #cad1d8",
        backgroundColor: selected ? "#0d0f12" : "#fbfbfc",
        color: selected ? "#fbfbfc" : "#0d0f12",
        borderRadius: "10px",
        padding: "14px 16px",
        cursor: "pointer",
        transition: "background-color 120ms ease, border-color 120ms ease",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-work-sans), ui-sans-serif, system-ui",
          fontSize: "14px",
          fontWeight: 500,
          marginBottom: "2px",
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontFamily: "var(--font-work-sans), ui-sans-serif, system-ui",
          fontSize: "12px",
          color: selected ? "#cad1d8" : "#7d8da0",
          lineHeight: 1.5,
        }}
      >
        {subtitle}
      </div>
    </button>
  );
}
