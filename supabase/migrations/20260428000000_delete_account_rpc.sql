-- Phase 6: provide a self-serve delete_my_account RPC.
-- Runs as the function owner so it can delete the calling user's
-- auth row regardless of RLS. Cascades through public.users (and
-- everything that cascades from public.users) clean up downstream.

create or replace function public.delete_my_account()
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
begin
  if uid is null then
    raise exception 'not authenticated';
  end if;
  delete from auth.users where id = uid;
end;
$$;

grant execute on function public.delete_my_account() to authenticated;
revoke execute on function public.delete_my_account() from anon;
