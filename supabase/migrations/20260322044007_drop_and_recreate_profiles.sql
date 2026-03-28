-- Drop existing profiles table and related objects
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user();
drop trigger if exists set_updated_at on public.profiles;
drop function if exists public.handle_updated_at();
drop table if exists public.profiles cascade;

-- Create profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  first_name text,
  avatar_url text,
  email text not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Enable Row Level Security
alter table public.profiles enable row level security;

-- Create RLS policies
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "Users can delete own profile"
  on public.profiles for delete
  using (auth.uid() = id);

-- Function to handle updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Trigger for updated_at
create trigger set_updated_at
  before update on public.profiles
  for each row execute function public.handle_updated_at();

-- Function to automatically create profile on user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to create profile when user signs up
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
