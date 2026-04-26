// Best-effort client-side helper that fires admin alerts via the
// /api/notify route. Never throws — the user flow takes precedence.

export type AdminNotifyEvent =
  | { event: "dispute_filed"; disputeId: string }
  | { event: "dispute_escalated"; disputeId: string; explanation?: string }
  | { event: "safety_flag"; taskId: string }
  | { event: "cancellation_threshold"; userId: string; count: number };

export async function notifyAdmin(payload: AdminNotifyEvent): Promise<void> {
  try {
    await fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    });
  } catch {
    // intentionally swallowed
  }
}
