-- Replace the single completion photo column with an array column
-- so a Renner can upload multiple proof photos when marking a task
-- complete. Up to 10 URLs, enforced in the UI.

alter table public.tasks
  drop column if exists completion_photo,
  add column if not exists completion_photos text[] default '{}';
