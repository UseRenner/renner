-- Favorites table backing the My Renners feature, plus the new
-- Invited status for application invitations.

create table if not exists public.favorites (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.users(id) on delete cascade,
  renner_id uuid references public.users(id) on delete cascade,
  created_at timestamptz default now(),
  notes text,
  unique (client_id, renner_id)
);

create index if not exists favorites_client_idx on public.favorites(client_id);
create index if not exists favorites_renner_idx on public.favorites(renner_id);

alter table public.favorites enable row level security;

drop policy if exists "Clients can read own favorites" on public.favorites;
create policy "Clients can read own favorites"
  on public.favorites for select
  using (auth.uid() = client_id);

drop policy if exists "Clients can insert own favorites" on public.favorites;
create policy "Clients can insert own favorites"
  on public.favorites for insert
  with check (auth.uid() = client_id);

drop policy if exists "Clients can update own favorites" on public.favorites;
create policy "Clients can update own favorites"
  on public.favorites for update
  using (auth.uid() = client_id);

drop policy if exists "Clients can delete own favorites" on public.favorites;
create policy "Clients can delete own favorites"
  on public.favorites for delete
  using (auth.uid() = client_id);

-- Allow client invitations alongside Renner-initiated applications.
alter table public.applications drop constraint if exists applications_status_check;
alter table public.applications add constraint applications_status_check check (
  status in ('Applied', 'Invited', 'Accepted', 'Declined')
);
