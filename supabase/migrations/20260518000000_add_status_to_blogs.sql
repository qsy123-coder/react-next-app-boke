-- migration: add status field to blogs table
-- purpose: support draft/published workflow for blog posts
-- affected objects:
--   - public.blogs (new column: status)
--   - rls policies: update public read policies to only expose published posts
-- special considerations:
--   - existing rows default to 'draft' to avoid unintended public exposure
--   - authenticated owners can still read their own drafts via the existing owner policy

-- add status column; existing rows become 'draft' by default
alter table public.blogs
  add column if not exists status text not null default 'draft'
  constraint blogs_status_check check (status in ('draft', 'published'));

comment on column public.blogs.status is 'Publication status: draft (owner-only) or published (public).';

-- index for efficient status filtering on the public feed
create index if not exists blogs_status_idx on public.blogs (status);

-- replace the old catch-all public read policies with status-aware ones
drop policy if exists "Anon can read blogs" on public.blogs;
drop policy if exists "Authenticated can read blogs publicly" on public.blogs;

-- anon users only see published posts
create policy "Anon can read published blogs"
on public.blogs
for select
to anon
using (status = 'published');

-- authenticated users see published posts OR their own drafts
create policy "Authenticated can read published or own blogs"
on public.blogs
for select
to authenticated
using (status = 'published' or (select auth.uid()) = user_id);
