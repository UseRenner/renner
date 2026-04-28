-- Rename "Photos" category to "Visuals" everywhere it lives in
-- user-facing data — task rows and the categories array on each user.

update public.tasks
   set category = 'Visuals'
 where category = 'Photos';

update public.users
   set categories = array_replace(categories, 'Photos', 'Visuals')
 where 'Photos' = any(categories);
