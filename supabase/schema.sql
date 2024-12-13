-- Create auth schema if it doesn't exist
create schema if not exists auth;

-- Create the users table
create table if not exists auth.users (
  id uuid not null primary key default uuid_generate_v4(),
  name text,
  email text unique,
  "emailVerified" timestamp with time zone,
  image text,
  created_at timestamp with time zone not null default current_timestamp,
  updated_at timestamp with time zone not null default current_timestamp
);

-- Create the accounts table
create table if not exists auth.accounts (
  id uuid not null primary key default uuid_generate_v4(),
  "userId" uuid not null references auth.users(id) on delete cascade,
  type text not null,
  provider text not null,
  "providerAccountId" text not null,
  refresh_token text,
  access_token text,
  expires_at bigint,
  token_type text,
  scope text,
  id_token text,
  session_state text,
  created_at timestamp with time zone not null default current_timestamp,
  updated_at timestamp with time zone not null default current_timestamp,
  unique(provider, "providerAccountId")
);

-- Create the sessions table
create table if not exists auth.sessions (
  id uuid not null primary key default uuid_generate_v4(),
  "userId" uuid not null references auth.users(id) on delete cascade,
  expires timestamp with time zone not null,
  "sessionToken" text not null unique,
  created_at timestamp with time zone not null default current_timestamp,
  updated_at timestamp with time zone not null default current_timestamp
);

-- Create the verification tokens table
create table if not exists auth.verification_tokens (
  token text not null primary key,
  identifier text not null,
  expires timestamp with time zone not null,
  created_at timestamp with time zone not null default current_timestamp,
  updated_at timestamp with time zone not null default current_timestamp
);

-- Enable Row Level Security
alter table auth.users enable row level security;
alter table auth.accounts enable row level security;
alter table auth.sessions enable row level security;
alter table auth.verification_tokens enable row level security;

-- Create policies
create policy "Users can view their own data." on auth.users
  for select using (auth.uid() = id);

create policy "Users can update their own data." on auth.users
  for update using (auth.uid() = id);

create policy "Users can view their own accounts." on auth.accounts
  for select using (auth.uid() = "userId");

create policy "Users can view their own sessions." on auth.sessions
  for select using (auth.uid() = "userId");

-- Grant permissions to authenticated users
grant usage on schema auth to authenticated;
grant all on auth.users to authenticated;
grant all on auth.accounts to authenticated;
grant all on auth.sessions to authenticated;
grant all on auth.verification_tokens to authenticated;

-- Grant permissions to anon users
grant usage on schema auth to anon;
grant select on auth.users to anon;
grant select on auth.accounts to anon;
grant select on auth.sessions to anon;
grant select on auth.verification_tokens to anon;
