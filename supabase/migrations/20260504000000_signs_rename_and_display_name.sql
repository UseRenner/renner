-- 1. Rename "Sign work" category to "Signs" everywhere it lives in
--    user-facing data (existing tasks, the categories array on each user).
update public.tasks
   set category = 'Signs'
 where category = 'Sign work';

update public.users
   set categories = array_replace(categories, 'Sign work', 'Signs')
 where 'Sign work' = any(categories);

-- 2. Display-name presentation columns. We keep `display_name` for
--    backward compatibility but it is now generated from first/last
--    name. `show_full_last_name` controls whether the public name
--    renders as "Marcus K." (default) or "Marcus King".
alter table public.users
  add column if not exists show_full_last_name boolean default false;

-- 3. Optional company/firm name shown after the personal name on
--    client-side surfaces. NULL = no company.
alter table public.users
  add column if not exists company text;
