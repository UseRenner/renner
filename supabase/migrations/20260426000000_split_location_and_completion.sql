-- Phase 4: split task location, add completion-photo storage bucket,
-- and keep runner stats in sync via a trigger.

-- =========================================================
-- Tasks: replace `location` and `city` with `zip_code` + `property_address`
-- =========================================================
alter table public.tasks
  drop column if exists location,
  drop column if exists city,
  add column if not exists zip_code text,
  add column if not exists property_address text;

create index if not exists tasks_zip_code_idx on public.tasks(zip_code);

-- =========================================================
-- Storage bucket for task completion photos
-- =========================================================
insert into storage.buckets (id, name, public)
values ('completions', 'completions', true)
on conflict (id) do nothing;

-- Drop any prior policies of the same name so the migration is re-runnable.
drop policy if exists "Authenticated users can upload completion photos" on storage.objects;
drop policy if exists "Anyone can read completion photos" on storage.objects;

create policy "Authenticated users can upload completion photos"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'completions');

create policy "Anyone can read completion photos"
  on storage.objects for select
  using (bucket_id = 'completions');

-- =========================================================
-- Keep `users.completed_tasks` and `users.rating` in sync with reviews.
-- Runs as the function owner so it can update other users' rows
-- regardless of RLS.
-- =========================================================
create or replace function public.update_user_stats()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.users
  set
    completed_tasks = (
      select count(*)
      from public.reviews
      where reviewed_user_id = new.reviewed_user_id
    ),
    rating = (
      select coalesce(avg(rating), 0)
      from public.reviews
      where reviewed_user_id = new.reviewed_user_id
    )
  where id = new.reviewed_user_id;
  return new;
end;
$$;

drop trigger if exists update_user_stats_on_review on public.reviews;
create trigger update_user_stats_on_review
  after insert on public.reviews
  for each row execute function public.update_user_stats();
