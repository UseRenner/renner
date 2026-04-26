// Pending-task buffer used to hand a partially completed task off
// from the public /post page through /signup and back to an insert.

export const PENDING_TASK_KEY = "renner.pendingTask";

export type PendingTask = {
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
  date: string | null;
  time_estimate: string | null;
  status: "Open";
  requires_license: boolean;
  payment_status: "unpaid";
};

export function savePendingTask(task: PendingTask) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(PENDING_TASK_KEY, JSON.stringify(task));
  } catch {
    // Storage may be disabled (private mode, quota). Silently no-op.
  }
}

export function readPendingTask(): PendingTask | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(PENDING_TASK_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PendingTask;
  } catch {
    return null;
  }
}

export function clearPendingTask() {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(PENDING_TASK_KEY);
  } catch {
    // ignore
  }
}
