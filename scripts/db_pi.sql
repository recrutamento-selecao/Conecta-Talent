create type public.tipo_usuario as enum (
  'Candidato',
  'Recrutador',
  'Administrador',
  'Empresa'
);

create table public.usuario (
  id_usuario uuid primary key references auth.users(id) on delete cascade,
  perfil_usuario public.tipo_usuario not null,
  data_registro timestamptz default now(),
  ativo boolean default true
);

create table public.empresa (
    id_empresa int generated always as identity primary key,
    id_usuario uuid references public.usuario(id_usuario) on delete cascade,
    razao_social varchar(255) not null,
    tipo_empresa varchar(100) not null,
    porte_empresa varchar(30) not null check (porte_empresa in ('MEI', 'ME', 'EPP', 'Médio Porte', 'Grande Porte'))
);