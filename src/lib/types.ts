export type TaskStatus =
  | "Open"
  | "Booked"
  | "Pending approval"
  | "Complete"
  | "Disputed"
  | "Closed";

export type PaymentStatus =
  | "unpaid"
  | "held"
  | "released"
  | "refunded"
  | "disputed";

export type TaskCategory =
  | "Sign work"
  | "Lockbox"
  | "Courier"
  | "Prep"
  | "Photos"
  | "Property access"
  | "Guest access"
  | "Showing"
  | "Open house"
  | "Other";

export const TASK_CATEGORIES: TaskCategory[] = [
  "Sign work",
  "Lockbox",
  "Courier",
  "Prep",
  "Photos",
  "Property access",
  "Guest access",
  "Showing",
  "Open house",
  "Other",
];

export const LICENSE_REQUIRED_CATEGORIES: TaskCategory[] = [
  "Showing",
  "Open house",
];

export const LICENSE_OPTIONAL_CATEGORIES: TaskCategory[] = ["Other"];

export interface Task {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  pay: number | null;
  pay_type: "Flat rate" | null;
  zip_code: string | null;
  street_address: string | null;
  unit: string | null;
  task_city: string | null;
  task_state: string | null;
  task_zip: string | null;
  date: string | null;
  time_estimate: string | null;
  status: TaskStatus;
  requires_license: boolean;
  posted_by: string | null;
  booked_runner: string | null;
  created_date: string;
  booked_date: string | null;
  marked_finished_date: string | null;
  completed_date: string | null;
  payment_status: PaymentStatus | null;
  completion_photos: string[] | null;
  completion_notes: string | null;
  dispute_reason: string | null;
  auto_release_date: string | null;
}

export interface UserProfile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  display_name: string | null;
  role: "renner" | "client" | null;
  city: string | null;
  state: string | null;
  licensed: boolean;
  categories: string[] | null;
}
