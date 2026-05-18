-- migration: add tags and categories support
-- purpose: enable blog post categorization and tagging
-- affected objects:
--   - public.categories
--   - public.tags
--   - public.blog_categories (junction table)
--   - public.blog_tags (junction table)
-- special considerations:
--   - many-to-many relationships via junction tables
--   - slug generation for SEO-friendly URLs
--   - RLS policies for public read, authenticated write

-- categories table
create table if not exists public.categories (
  id uuid primary key default extensions.gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint categories_name_length check (char_length(name) > 0),
  constraint categories_slug_length check (char_length(slug) > 0)
);

comment on table public.categories is 'Blog post categories for organizing content by topic.';

create index if not exists categories_slug_idx on public.categories (slug);

-- tags table
create table if not exists public.tags (
  id uuid primary key default extensions.gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint tags_name_length check (char_length(name) > 0),
  constraint tags_slug_length check (char_length(slug) > 0)
);

comment on table public.tags is 'Blog post tags for flexible content labeling.';

create index if not exists tags_slug_idx on public.tags (slug);

-- blog_categories junction table
create table if not exists public.blog_categories (
  blog_id uuid not null references public.blogs (id) on delete cascade,
  category_id uuid not null references public.categories (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (blog_id, category_id)
);

comment on table public.blog_categories is 'Many-to-many relationship between blogs and categories.';

create index if not exists blog_categories_blog_id_idx on public.blog_categories (blog_id);
create index if not exists blog_categories_category_id_idx on public.blog_categories (category_id);

-- blog_tags junction table
create table if not exists public.blog_tags (
  blog_id uuid not null references public.blogs (id) on delete cascade,
  tag_id uuid not null references public.tags (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (blog_id, tag_id)
);

comment on table public.blog_tags is 'Many-to-many relationship between blogs and tags.';

create index if not exists blog_tags_blog_id_idx on public.blog_tags (blog_id);
create index if not exists blog_tags_tag_id_idx on public.blog_tags (tag_id);

-- triggers for updated_at
create trigger categories_set_timestamp
before update on public.categories
for each row
execute function public.set_timestamp();

create trigger tags_set_timestamp
before update on public.tags
for each row
execute function public.set_timestamp();

-- RLS policies for categories
alter table public.categories enable row level security;

create policy "Anyone can read categories"
on public.categories for select
to anon, authenticated
using (true);

create policy "Authenticated users can create categories"
on public.categories for insert
to authenticated
with check (true);

create policy "Authenticated users can update categories"
on public.categories for update
to authenticated
using (true)
with check (true);

create policy "Authenticated users can delete categories"
on public.categories for delete
to authenticated
using (true);

-- RLS policies for tags
alter table public.tags enable row level security;

create policy "Anyone can read tags"
on public.tags for select
to anon, authenticated
using (true);

create policy "Authenticated users can create tags"
on public.tags for insert
to authenticated
with check (true);

create policy "Authenticated users can update tags"
on public.tags for update
to authenticated
using (true)
with check (true);

create policy "Authenticated users can delete tags"
on public.tags for delete
to authenticated
using (true);

-- RLS policies for blog_categories
alter table public.blog_categories enable row level security;

create policy "Anyone can read blog categories"
on public.blog_categories for select
to anon, authenticated
using (true);

create policy "Blog owners can insert blog categories"
on public.blog_categories for insert
to authenticated
with check (
  exists (
    select 1 from public.blogs
    where blogs.id = blog_categories.blog_id
    and blogs.user_id = (select auth.uid())
  )
);

create policy "Blog owners can update blog categories"
on public.blog_categories for update
to authenticated
using (
  exists (
    select 1 from public.blogs
    where blogs.id = blog_categories.blog_id
    and blogs.user_id = (select auth.uid())
  )
)
with check (
  exists (
    select 1 from public.blogs
    where blogs.id = blog_categories.blog_id
    and blogs.user_id = (select auth.uid())
  )
);

create policy "Blog owners can delete blog categories"
on public.blog_categories for delete
to authenticated
using (
  exists (
    select 1 from public.blogs
    where blogs.id = blog_categories.blog_id
    and blogs.user_id = (select auth.uid())
  )
);

-- RLS policies for blog_tags
alter table public.blog_tags enable row level security;

create policy "Anyone can read blog tags"
on public.blog_tags for select
to anon, authenticated
using (true);

create policy "Blog owners can insert blog tags"
on public.blog_tags for insert
to authenticated
with check (
  exists (
    select 1 from public.blogs
    where blogs.id = blog_tags.blog_id
    and blogs.user_id = (select auth.uid())
  )
);

create policy "Blog owners can update blog tags"
on public.blog_tags for update
to authenticated
using (
  exists (
    select 1 from public.blogs
    where blogs.id = blog_tags.blog_id
    and blogs.user_id = (select auth.uid())
  )
)
with check (
  exists (
    select 1 from public.blogs
    where blogs.id = blog_tags.blog_id
    and blogs.user_id = (select auth.uid())
  )
);

create policy "Blog owners can delete blog tags"
on public.blog_tags for delete
to authenticated
using (
  exists (
    select 1 from public.blogs
    where blogs.id = blog_tags.blog_id
    and blogs.user_id = (select auth.uid())
  )
);
