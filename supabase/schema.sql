-- =============================================================
-- Pulso: esquema inicial (perfiles y roles)
-- Correr completo en Supabase -> SQL Editor -> New query -> Run
-- =============================================================

-- 1. Tabla de perfiles: un registro por cada usuario de Supabase Auth
create table if not exists public.profiles (
  id         uuid primary key references auth.users (id) on delete cascade,
  nombre     text,
  email      text,
  rol        text not null default 'vendedor' check (rol in ('vendedor', 'gerente')),
  creado_en  timestamptz not null default now()
);

-- 2. Función auxiliar: ¿el usuario actual es gerente?
--    (security definer evita que las políticas se llamen a sí mismas en bucle)
create or replace function public.es_gerente()
returns boolean
language sql
security definer
set search_path = ''
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and rol = 'gerente'
  );
$$;

-- 3. Seguridad a nivel de fila (RLS)
alter table public.profiles enable row level security;

drop policy if exists "cada uno ve su perfil" on public.profiles;
create policy "cada uno ve su perfil"
  on public.profiles for select
  to authenticated
  using (id = auth.uid());

drop policy if exists "el gerente ve a todos" on public.profiles;
create policy "el gerente ve a todos"
  on public.profiles for select
  to authenticated
  using (public.es_gerente());

-- No hay política de update/insert/delete para usuarios:
-- nadie puede cambiarse el rol desde la app. Los roles se asignan
-- desde el panel de Supabase (Table Editor).

-- 4. Crear el perfil automáticamente cuando se da de alta un usuario
create or replace function public.crear_perfil()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, email, nombre)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'nombre', split_part(new.email, '@', 1))
  );
  return new;
end;
$$;

drop trigger if exists al_crear_usuario on auth.users;
create trigger al_crear_usuario
  after insert on auth.users
  for each row execute function public.crear_perfil();
