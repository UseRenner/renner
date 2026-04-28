export function formatPay(pay: number | null) {
  if (pay == null) return "—";
  return `$${Number(pay).toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
}

export function formatHoursLeft(target: string | null) {
  if (!target) return null;
  const ms = new Date(target).getTime() - Date.now();
  if (Number.isNaN(ms) || ms <= 0) return "any moment";
  const hours = Math.floor(ms / (1000 * 60 * 60));
  if (hours >= 1) return `${hours} hour${hours === 1 ? "" : "s"}`;
  const minutes = Math.max(1, Math.floor(ms / (1000 * 60)));
  return `${minutes} minute${minutes === 1 ? "" : "s"}`;
}

export function formatDate(value: string | null) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatRelativeDate(value: string | null) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  const diffMs = Date.now() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays <= 0) return "today";
  if (diffDays === 1) return "yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return formatDate(value);
}

// Canonical time format used everywhere times appear in the app:
// "2:00 PM" — minutes always shown, uppercase meridiem, space before
// AM/PM. Windows render as "2:00 – 5:00 PM" (start meridiem dropped
// when both ends share the same period) or "10:00 AM – 12:00 PM"
// (kept when they differ). Always en-dash with surrounding spaces;
// never "at" or "between".
function shortTime(date: Date, includeMeridiem = true) {
  const hour = date.getHours();
  const minute = date.getMinutes();
  const meridiem = hour >= 12 ? "PM" : "AM";
  const display = ((hour + 11) % 12) + 1;
  const minutes = minute.toString().padStart(2, "0");
  const time = `${display}:${minutes}`;
  return includeMeridiem ? `${time} ${meridiem}` : time;
}

function isPm(date: Date) {
  return date.getHours() >= 12;
}

export type TimingShape = {
  date: string | null;
  task_timing_type: "exact" | "window" | null;
  task_time: string | null;
  window_start: string | null;
  window_end: string | null;
};

export function formatTaskTiming(task: TimingShape): string | null {
  if (task.task_timing_type === "exact" && task.task_time) {
    const t = new Date(task.task_time);
    if (Number.isNaN(t.getTime())) return null;
    const datePart = t.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    return `${datePart}, ${shortTime(t)}`;
  }
  if (
    task.task_timing_type === "window" &&
    task.window_start &&
    task.window_end
  ) {
    const start = new Date(task.window_start);
    const end = new Date(task.window_end);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()))
      return null;
    const datePart = start.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    const sameMeridiem = isPm(start) === isPm(end);
    return `${datePart}, ${shortTime(start, !sameMeridiem)} – ${shortTime(end)}`;
  }
  return formatDate(task.date);
}

// Earliest moment a Renner can press "Start task" — 30 minutes before
// the exact time or window start. Returns null when no schedule exists,
// meaning the task can be started immediately.
export function startsAvailableAt(task: TimingShape): Date | null {
  const target =
    task.task_timing_type === "exact"
      ? task.task_time
      : task.task_timing_type === "window"
        ? task.window_start
        : null;
  if (!target) return null;
  const t = new Date(target);
  if (Number.isNaN(t.getTime())) return null;
  return new Date(t.getTime() - 30 * 60 * 1000);
}
