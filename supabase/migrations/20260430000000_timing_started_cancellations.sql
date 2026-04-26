-- Phase 8: timing options, Started + Unable-to-complete statuses,
-- cancellation tracking, and the unable-to-complete report fields.

-- =========================================================
-- Tasks: timing, in-progress lifecycle, unable-to-complete fields
-- =========================================================
alter table public.tasks
  add column if not exists task_timing_type text check (task_timing_type in ('exact', 'window')),
  add column if not exists task_time timestamptz,
  add column if not exists window_start timestamptz,
  add column if not exists window_end timestamptz,
  add column if not exists started_date timestamptz,
  add column if not exists unable_to_complete_reason text,
  add column if not exists unable_to_complete_explanation text,
  add column if not exists unable_to_complete_photo text,
  add column if not exists unable_to_complete_date timestamptz,
  add column if not exists safety_flag boolean default false;

-- Expand the status check to cover the new lifecycle states.
alter table public.tasks drop constraint if exists tasks_status_check;
alter table public.tasks add constraint tasks_status_check check (
  status in (
    'Open',
    'Booked',
    'Started',
    'Pending approval',
    'Complete',
    'Unable to complete',
    'Disputed',
    'Closed'
  )
);

-- =========================================================
-- Users: cancellation tracking
-- =========================================================
alter table public.users
  add column if not exists cancellation_count integer default 0,
  add column if not exists last_cancellation_date timestamptz;
