-- Renner initial schema
-- Run after enabling the auth schema (which Supabase provisions by default).

create extension if not exists "pgcrypto";

-- =========================================================
-- Users (extends auth.users)
-- =========================================================
create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  first_name text,
  last_name text,
  display_name text,
  phone text,
  role text check (role in ('renner', 'client')),
  city text,
  state text,
  zip text,
  bio text,
  licensed boolean default false,
  license_number text,
  license_state text,
  profile_photo text,
  categories text[] default '{}',
  completed_tasks integer default 0,
  rating numeric default 0,
  stripe_account_id text,
  stripe_onboarded boolean default false,
  background_verified boolean default false,
  background_check_date timestamptz,
  checkr_candidate_id text,
  created_at timestamptz default now()
);

-- =========================================================
-- Tasks
-- =========================================================
create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  category text,
  pay numeric,
  pay_type text check (pay_type in ('Flat rate', 'Hourly')),
  location text,
  city text,
  date timestamptz,
  time_estimate text,
  status text default 'Open' check (status in ('Open', 'Booked', 'Pending approval', 'Complete', 'Disputed', 'Closed')),
  requires_license boolean default false,
  posted_by uuid references public.users(id) on delete set null,
  booked_runner uuid references public.users(id) on delete set null,
  created_date timestamptz default now(),
  booked_date timestamptz,
  marked_finished_date timestamptz,
  completed_date timestamptz,
  payment_status text check (payment_status in ('unpaid', 'held', 'released', 'refunded', 'disputed')) default 'unpaid',
  stripe_payment_intent_id text,
  platform_fee numeric,
  completion_photo text,
  completion_notes text,
  dispute_reason text,
  auto_release_date timestamptz
);

create index if not exists tasks_status_idx on public.tasks(status);
create index if not exists tasks_posted_by_idx on public.tasks(posted_by);
create index if not exists tasks_booked_runner_idx on public.tasks(booked_runner);

-- =========================================================
-- Applications
-- =========================================================
create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  task_id uuid references public.tasks(id) on delete cascade,
  applicant_id uuid references public.users(id) on delete cascade,
  status text default 'Applied' check (status in ('Applied', 'Accepted', 'Declined')),
  message text,
  applied_date timestamptz default now()
);

create index if not exists applications_task_idx on public.applications(task_id);
create index if not exists applications_applicant_idx on public.applications(applicant_id);

-- =========================================================
-- Messages
-- =========================================================
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid references public.users(id) on delete cascade,
  recipient_id uuid references public.users(id) on delete cascade,
  task_id uuid references public.tasks(id) on delete cascade,
  body text,
  sent_date timestamptz default now(),
  is_read boolean default false
);

create index if not exists messages_task_idx on public.messages(task_id);
create index if not exists messages_sender_idx on public.messages(sender_id);
create index if not exists messages_recipient_idx on public.messages(recipient_id);

-- =========================================================
-- Disputes
-- =========================================================
create table if not exists public.disputes (
  id uuid primary key default gen_random_uuid(),
  task_id uuid references public.tasks(id) on delete cascade,
  raised_by uuid references public.users(id) on delete set null,
  against uuid references public.users(id) on delete set null,
  reason text,
  status text default 'Open' check (status in ('Open', 'Resolved - released', 'Resolved - refunded')),
  admin_notes text,
  created_date timestamptz default now(),
  resolved_date timestamptz
);

-- =========================================================
-- Reviews
-- =========================================================
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  task_id uuid references public.tasks(id) on delete cascade,
  reviewer_id uuid references public.users(id) on delete cascade,
  reviewed_user_id uuid references public.users(id) on delete cascade,
  rating integer check (rating >= 1 and rating <= 5),
  comment text,
  created_date timestamptz default now()
);

create index if not exists reviews_reviewed_user_idx on public.reviews(reviewed_user_id);

-- =========================================================
-- Row Level Security
-- =========================================================
alter table public.users enable row level security;
alter table public.tasks enable row level security;
alter table public.applications enable row level security;
alter table public.messages enable row level security;
alter table public.disputes enable row level security;
alter table public.reviews enable row level security;

-- Users: anyone authenticated can read profiles; users can update their own row.
create policy "Users are viewable by authenticated users"
  on public.users for select
  using (auth.role() = 'authenticated');

create policy "Users can insert their own row"
  on public.users for insert
  with check (auth.uid() = id);

create policy "Users can update their own row"
  on public.users for update
  using (auth.uid() = id);

-- Tasks: anyone authenticated can browse; only the poster can mutate.
create policy "Tasks are viewable by authenticated users"
  on public.tasks for select
  using (auth.role() = 'authenticated');

create policy "Clients can create tasks"
  on public.tasks for insert
  with check (auth.uid() = posted_by);

create policy "Posters or booked runners can update tasks"
  on public.tasks for update
  using (auth.uid() = posted_by or auth.uid() = booked_runner);

-- Applications: applicants and task posters can read; applicants can create.
create policy "Applications visible to applicant or task poster"
  on public.applications for select
  using (
    auth.uid() = applicant_id
    or auth.uid() in (select posted_by from public.tasks where id = task_id)
  );

create policy "Applicants can create applications"
  on public.applications for insert
  with check (auth.uid() = applicant_id);

create policy "Task posters can update applications"
  on public.applications for update
  using (auth.uid() in (select posted_by from public.tasks where id = task_id));

-- Messages: only sender or recipient can read; sender can insert.
create policy "Messages visible to sender or recipient"
  on public.messages for select
  using (auth.uid() = sender_id or auth.uid() = recipient_id);

create policy "Sender can insert messages"
  on public.messages for insert
  with check (auth.uid() = sender_id);

create policy "Recipient can mark messages read"
  on public.messages for update
  using (auth.uid() = recipient_id);

-- Disputes: visible to involved parties.
create policy "Disputes visible to involved parties"
  on public.disputes for select
  using (auth.uid() = raised_by or auth.uid() = against);

create policy "Users can raise disputes"
  on public.disputes for insert
  with check (auth.uid() = raised_by);

-- Reviews: anyone authenticated can read; reviewer can insert their own.
create policy "Reviews viewable by authenticated users"
  on public.reviews for select
  using (auth.role() = 'authenticated');

create policy "Reviewers can create reviews"
  on public.reviews for insert
  with check (auth.uid() = reviewer_id);
