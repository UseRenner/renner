-- Adds the profile-visibility toggle. Default is public so the
-- existing user base stays visible in the new directories.

alter table public.users
  add column if not exists profile_visibility text default 'public'
    check (profile_visibility in ('public', 'private'));
