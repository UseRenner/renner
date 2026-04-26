-- Phase 5: structured task address.
-- Replaces the freeform `property_address` field with separate
-- street/unit/city/state/zip columns so the address can be validated
-- and rendered consistently. The existing public `zip_code` column on
-- `tasks` (the one that shows on browse cards) is unchanged.

alter table public.tasks
  drop column if exists property_address,
  add column if not exists street_address text,
  add column if not exists unit text,
  add column if not exists task_city text,
  add column if not exists task_state text,
  add column if not exists task_zip text;

-- Tighten pay_type to flat-rate only. Backfill any legacy hourly rows.
update public.tasks set pay_type = 'Flat rate' where pay_type is distinct from 'Flat rate';
alter table public.tasks drop constraint if exists tasks_pay_type_check;
alter table public.tasks add constraint tasks_pay_type_check check (pay_type = 'Flat rate');
alter table public.tasks alter column pay_type set default 'Flat rate';
