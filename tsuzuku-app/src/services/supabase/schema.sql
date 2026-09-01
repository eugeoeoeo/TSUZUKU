-- ============================================================
-- TSUZUKU — PostgreSQL / Supabase Production Database Schema
-- Complete relational model with RLS policies, indexes, and triggers
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================================
-- 1. USERS & PROFILES
-- ============================================================
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  display_name text,
  avatar_url text,
  current_level text default 'N5' check (current_level in ('N5', 'N4', 'N3', 'N2', 'N1')),
  current_unit_id text default 'n5-u1-hiragana',
  current_lesson_id text default 'n5-l1-hiragana-vowels',
  daily_goal_minutes integer default 15,
  xp integer default 0,
  total_study_minutes integer default 0,
  streak integer default 0,
  longest_streak integer default 0,
  last_active_date date,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================
-- 2. USER SETTINGS
-- ============================================================
create table if not exists public.user_settings (
  user_id uuid references public.profiles(id) on delete cascade primary key,
  furigana_mode text default 'hover' check (furigana_mode in ('always', 'hover', 'click', 'never')),
  sound_enabled boolean default true,
  ambient_sound_enabled boolean default false,
  reduced_motion boolean default false,
  max_daily_reviews integer default 50,
  show_romaji boolean default false,
  ui_language text default 'en',
  theme text default 'dark',
  updated_at timestamptz default now()
);

-- ============================================================
-- 3. CURRICULUM DEFINITIONS
-- ============================================================
create table if not exists public.units (
  id text primary key,
  level_id text not null check (level_id in ('N5', 'N4', 'N3', 'N2', 'N1')),
  order_index integer not null,
  title text not null,
  title_jp text not null,
  description text not null,
  prerequisite_unit_ids text[] default '{}',
  estimated_hours numeric(4, 1) default 3.0,
  tags text[] default '{}',
  created_at timestamptz default now()
);

create table if not exists public.lessons (
  id text primary key,
  unit_id text references public.units(id) on delete cascade,
  order_index integer not null,
  title text not null,
  title_jp text not null,
  objectives text[] default '{}',
  estimated_minutes integer default 15,
  steps jsonb not null default '[]'::jsonb,
  concept_ids text[] default '{}',
  vocabulary_ids text[] default '{}',
  grammar_ids text[] default '{}',
  kanji_ids text[] default '{}',
  created_at timestamptz default now()
);

-- ============================================================
-- 4. LEXICAL ENTITIES (VOCABULARY, KANJI, GRAMMAR)
-- ============================================================
create table if not exists public.vocabulary (
  id text primary key,
  japanese text not null,
  kana text not null,
  kanji text,
  romaji text not null,
  english text not null,
  part_of_speech text not null,
  jlpt_level text not null check (jlpt_level in ('N5', 'N4', 'N3', 'N2', 'N1')),
  frequency integer,
  tags text[] default '{}',
  examples jsonb default '[]'::jsonb,
  conjugations jsonb,
  notes text,
  created_at timestamptz default now()
);

create table if not exists public.kanji (
  id text primary key,
  character text not null unique,
  meanings text[] not null,
  onyomi text[] default '{}',
  kunyomi text[] default '{}',
  stroke_count integer not null,
  radicals jsonb default '[]'::jsonb,
  mnemonic text,
  jlpt_level text not null check (jlpt_level in ('N5', 'N4', 'N3', 'N2', 'N1')),
  frequency integer,
  vocabulary_examples jsonb default '[]'::jsonb,
  created_at timestamptz default now()
);

create table if not exists public.grammar_points (
  id text primary key,
  name text not null,
  name_en text not null,
  jlpt_level text not null check (jlpt_level in ('N5', 'N4', 'N3', 'N2', 'N1')),
  meaning text not null,
  detailed_meaning text not null,
  formation jsonb default '[]'::jsonb,
  attachment_rules jsonb default '[]'::jsonb,
  politeness text default 'neutral',
  examples jsonb default '[]'::jsonb,
  common_mistakes jsonb default '[]'::jsonb,
  contrast_grammar jsonb default '[]'::jsonb,
  tags text[] default '{}',
  created_at timestamptz default now()
);

-- ============================================================
-- 5. FSRS SPACED REPETITION CARDS
-- ============================================================
create table if not exists public.srs_cards (
  id text primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  item_id text not null,
  item_type text not null check (item_type in ('vocabulary', 'kanji', 'grammar', 'kana', 'sentence')),
  stability numeric(10, 4) not null default 1.0,
  difficulty numeric(10, 4) not null default 5.0,
  elapsed_days integer default 0,
  scheduled_days integer default 0,
  reps integer default 0,
  lapses integer default 0,
  state smallint default 0 check (state in (0, 1, 2, 3)), -- 0=New, 1=Learning, 2=Review, 3=Relearning
  mastery_level text default 'new' check (mastery_level in ('new', 'learning', 'familiar', 'mastered', 'retained')),
  last_review timestamptz,
  next_review timestamptz not null default now(),
  recognition_score integer default 0,
  recall_score integer default 0,
  production_score integer default 0,
  listening_score integer default 0,
  error_types text[] default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================
-- 6. REVIEW SESSIONS & ACTIVITY LOGS
-- ============================================================
create table if not exists public.review_logs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  card_id text references public.srs_cards(id) on delete cascade not null,
  confidence smallint not null check (confidence in (1, 2, 3, 4)),
  is_correct boolean not null,
  response_time_ms integer default 0,
  reviewed_at timestamptz default now()
);

create table if not exists public.daily_activity (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  date date not null,
  minutes_studied integer default 0,
  lessons_completed integer default 0,
  reviews_done integer default 0,
  new_items_learned integer default 0,
  xp_earned integer default 0,
  unique (user_id, date)
);

create table if not exists public.lesson_progress (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  lesson_id text references public.lessons(id) on delete cascade not null,
  completed boolean default false,
  completed_at timestamptz,
  unique (user_id, lesson_id)
);

-- ============================================================
-- 7. INDEXES FOR PERFORMANCE
-- ============================================================
create index if not exists idx_srs_cards_due on public.srs_cards(user_id, next_review);
create index if not exists idx_srs_cards_item on public.srs_cards(user_id, item_id);
create index if not exists idx_daily_activity_date on public.daily_activity(user_id, date);
create index if not exists idx_vocabulary_jlpt on public.vocabulary(jlpt_level);
create index if not exists idx_kanji_jlpt on public.kanji(jlpt_level);
create index if not exists idx_grammar_jlpt on public.grammar_points(jlpt_level);

-- ============================================================
-- 8. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================
alter table public.profiles enable row level security;
alter table public.user_settings enable row level security;
alter table public.srs_cards enable row level security;
alter table public.review_logs enable row level security;
alter table public.daily_activity enable row level security;
alter table public.lesson_progress enable row level security;

-- Profiles: user can only view/modify their own
create policy "Users can read own profile" on public.profiles
  for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

-- Settings: user can only view/modify own settings
create policy "Users can manage own settings" on public.user_settings
  for all using (auth.uid() = user_id);

-- SRS Cards: user can only view/modify own cards
create policy "Users can manage own SRS cards" on public.srs_cards
  for all using (auth.uid() = user_id);

-- Review logs: user can insert/read own logs
create policy "Users can manage own review logs" on public.review_logs
  for all using (auth.uid() = user_id);

-- Daily activity: user can view/update own activity
create policy "Users can manage own activity" on public.daily_activity
  for all using (auth.uid() = user_id);

-- Lesson progress: user can view/update own progress
create policy "Users can manage own lesson progress" on public.lesson_progress
  for all using (auth.uid() = user_id);
