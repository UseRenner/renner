-- Damage resolution: Property damage / Theft disputes carry a claim
-- amount, the Renner's counter offer (if any), the Renner's response,
-- and the photo evidence the Client uploaded with the claim.

alter table public.disputes
  add column if not exists damage_amount numeric,
  add column if not exists damage_counter_amount numeric,
  add column if not exists damage_response text check (
    damage_response in ('accepted', 'countered', 'disputed')
  ),
  add column if not exists damage_photos text[] default '{}';

-- The party named in `against` (typically the Renner) needs to be able
-- to file a response on the dispute they were named in.
drop policy if exists "Named party can respond to a dispute" on public.disputes;
create policy "Named party can respond to a dispute"
  on public.disputes for update
  using (auth.uid() = against);
