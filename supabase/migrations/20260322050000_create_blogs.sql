-- migration: create blogs table and blog-related helpers
-- purpose: add a user-owned blogs table with automatic slug generation,
--   updated_at maintenance, indexes for RLS/query performance, and row-level security
-- affected objects:
--   - public.blogs
--   - public.slugify(text)
--   - public.set_timestamp()
--   - public.set_blog_slug()
-- special considerations:
--   - slug values are generated in a trigger to keep app code simple
--   - user_id and slug are indexed following Supabase Postgres best practices
--   - RLS uses (select auth.uid()) for better performance on large tables

create extension if not exists pgcrypto;

create or replace function public.slugify(input text)
returns text
language sql
security invoker
set search_path = ''
immutable
as $$
  select trim(both '-' from regexp_replace(lower(coalesce(input, '')), '[^a-z0-9]+', '-', 'g'));
$$;

create or replace function public.set_timestamp()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create or replace function public.set_blog_slug()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
declare
  base_slug text;
  candidate_slug text;
  suffix integer := 1;
begin
  base_slug := public.slugify(new.title);

  if base_slug = '' then
    base_slug := encode(extensions.gen_random_bytes(6), 'hex');
  end if;

  candidate_slug := base_slug;

  while exists (
    select 1
    from public.blogs
    where public.blogs.slug = candidate_slug
      and public.blogs.id <> coalesce(new.id, extensions.gen_random_uuid())
  ) loop
    suffix := suffix + 1;
    candidate_slug := base_slug || '-' || suffix;
  end loop;

  new.slug := candidate_slug;
  return new;
end;
$$;

create table if not exists public.blogs (
  id uuid primary key default extensions.gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null,
  slug text not null unique,
  subtitle text,
  image text,
  content text not null,
  author text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint blogs_title_length check (char_length(title) > 0),
  constraint blogs_slug_length check (char_length(slug) > 0)
);

comment on table public.blogs is 'Stores blog posts created and managed by authenticated users.';

create index if not exists blogs_user_id_idx on public.blogs (user_id);
create index if not exists blogs_slug_idx on public.blogs (slug);
create index if not exists blogs_created_at_idx on public.blogs (created_at desc);

create trigger blogs_set_timestamp
before update on public.blogs
for each row
execute function public.set_timestamp();

create trigger blogs_set_slug
before insert or update of title on public.blogs
for each row
execute function public.set_blog_slug();

alter table public.blogs enable row level security;

create policy "Users can read own blogs"
on public.blogs
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Users can insert own blogs"
on public.blogs
for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "Users can update own blogs"
on public.blogs
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "Users can delete own blogs"
on public.blogs
for delete
to authenticated
using ((select auth.uid()) = user_id);

create policy "Anon can read blogs"
on public.blogs
for select
to anon
using (true);

create policy "Authenticated can read blogs publicly"
on public.blogs
for select
to authenticated
using (true);
