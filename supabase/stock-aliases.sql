create table if not exists public.stock_aliases (
  code text primary key check (code ~ '^[0-9]{6}$'),
  name_ko text not null,
  market text not null check (market in ('KOSPI', 'KOSDAQ')),
  source text not null default 'manual',
  updated_at timestamptz not null default now()
);

create index if not exists idx_stock_aliases_name_ko
on public.stock_aliases (name_ko);

alter table public.stock_aliases enable row level security;

drop policy if exists "stock_aliases read for all" on public.stock_aliases;
create policy "stock_aliases read for all"
on public.stock_aliases
for select
to anon, authenticated
using (true);

-- 운영에서는 관리자만 write 허용 권장
-- 필요 시 아래 권한을 관리자 role에만 부여하세요.
-- grant insert, update, delete on table public.stock_aliases to authenticated;

-- 예시 데이터
insert into public.stock_aliases (code, name_ko, market, source)
values
  ('125490', '한라캐스트', 'KOSDAQ', 'manual')
on conflict (code) do update
set
  name_ko = excluded.name_ko,
  market = excluded.market,
  source = excluded.source,
  updated_at = now();
