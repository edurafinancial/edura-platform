-- Edura Financial — student progress schema
--
-- Run this in the Supabase SQL editor (Dashboard > SQL Editor > New query).
-- Every table is protected by Row Level Security: a student can only ever read
-- or write their own rows, which is what makes shipping the anon key safe.

-- ---------------------------------------------------------------- modules ---
create table if not exists public.module_progress (
  user_id       uuid        not null references auth.users (id) on delete cascade,
  module_id     text        not null,
  slides_viewed integer     not null default 0,
  total_slides  integer     not null default 0,
  quiz_score    integer,
  completed     boolean     not null default false,
  completed_at  timestamptz,
  updated_at    timestamptz not null default now(),
  primary key (user_id, module_id)
);

alter table public.module_progress enable row level security;

drop policy if exists "own module progress" on public.module_progress;
create policy "own module progress"
  on public.module_progress
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ------------------------------------------------------------------- exam ---
create table if not exists public.exam_results (
  user_id    uuid        primary key references auth.users (id) on delete cascade,
  attempts   integer     not null default 0,
  best_score integer     not null default 0,
  last_score integer,
  passed     boolean     not null default false,
  updated_at timestamptz not null default now()
);

alter table public.exam_results enable row level security;

drop policy if exists "own exam results" on public.exam_results;
create policy "own exam results"
  on public.exam_results
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- --------------------------------------------------------------- activity ---
-- One row per day the student did something; the day-streak is derived from it.
create table if not exists public.activity_days (
  user_id uuid not null references auth.users (id) on delete cascade,
  day     date not null,
  primary key (user_id, day)
);

alter table public.activity_days enable row level security;

drop policy if exists "own activity days" on public.activity_days;
create policy "own activity days"
  on public.activity_days
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
