-- Drop "Prep" as a task category. Existing rows are migrated to
-- "Other" so historical tasks remain visible. The new
-- "Host assistance" category is purely additive — it doesn't need a
-- backfill since no row references it yet.

update public.tasks
   set category = 'Other'
 where category = 'Prep';

update public.users
   set categories = (
     select array_agg(distinct case when c = 'Prep' then 'Other' else c end)
       from unnest(categories) as c
   )
 where 'Prep' = any(categories);
