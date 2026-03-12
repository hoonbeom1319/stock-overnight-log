# stock-overnight-log

국내 주식 시간외 단일가 매수 후 익일 매도 전략을 기록/검증하기 위한 웹 프로젝트입니다.

## Tech Stack

- Next.js (App Router)
- Tailwind CSS (dark mode)
- Zustand
- Radix UI
- TanStack Query
- Supabase (PostgreSQL, 저장/목록 조회)

## FSD 구조

```txt
app
application
views
└─ home
widgets
└─ trading-log-list
entities
└─ trading-log
features
└─ trading-log-input
shared
├─ api
│  └─ supabase
├─ lib
└─ ui
```

## 로컬 실행

```bash
npm install
npm run dev
```

## Supabase 처음 설정하기

Supabase를 처음 쓰는 기준으로 가장 최소한의 설정만 정리합니다.

### 1) 프로젝트 생성

- [Supabase Dashboard](https://supabase.com/dashboard)에서 `New project` 생성
- 지역은 가까운 리전으로 선택 (예: Northeast Asia)

### 2) API 키 확인

- Dashboard > Project Settings > API 진입
- 아래 값 2개를 복사
    - `Project URL`
    - `anon public` key

### 2-1) Auth 설정 확인 (이메일 로그인)

- Dashboard > Authentication > Providers
- `Email` provider 활성화 확인
- 초기 개발 단계에서는 `Confirm email`을 잠시 꺼두면 테스트가 빠릅니다.
- 운영 전환 시에는 `Confirm email`을 다시 켜고, SMTP 설정도 함께 구성하세요.

### 3) 환경 변수 설정

루트에 `.env.local` 파일을 만들고 아래처럼 입력:

```bash
NEXT_PUBLIC_SUPABASE_URL=복사한_Project_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=복사한_anon_public_key
```

### 4) 테이블 생성 (SQL Editor)

Dashboard > SQL Editor에서 아래 SQL 실행:

```sql
create extension if not exists "pgcrypto";

create table if not exists public.trading_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  trade_date date not null,
  stock_name text not null,
  buy_price numeric not null,
  next_high numeric not null,
  next_low numeric not null,
  next_close numeric not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_trading_logs_user_created_at
on public.trading_logs (user_id, created_at desc);
```

이미 기존 테이블을 만들어둔 상태라면 아래를 먼저 실행하세요:

```sql
alter table public.trading_logs
add column if not exists user_id uuid references auth.users(id) on delete cascade;

delete from public.trading_logs
where user_id is null;

alter table public.trading_logs
alter column user_id set default auth.uid();

alter table public.trading_logs
alter column user_id set not null;
```

### 5) Row Level Security (프로덕션 권장 설정)

아래 정책은 `authenticated` 사용자만 접근하고, 본인 데이터만 읽기/쓰기할 수 있게 제한합니다.

```sql
alter table public.trading_logs enable row level security;
alter table public.trading_logs force row level security;

revoke all on table public.trading_logs from anon;

grant usage on schema public to authenticated;
grant select, insert, update, delete on table public.trading_logs to authenticated;

drop policy if exists "users can read own trading_logs" on public.trading_logs;
create policy "users can read own trading_logs"
on public.trading_logs
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "users can insert own trading_logs" on public.trading_logs;
create policy "users can insert own trading_logs"
on public.trading_logs
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "users can update own trading_logs" on public.trading_logs;
create policy "users can update own trading_logs"
on public.trading_logs
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "users can delete own trading_logs" on public.trading_logs;
create policy "users can delete own trading_logs"
on public.trading_logs
for delete
to authenticated
using (auth.uid() = user_id);
```

> 중요: 위 설정은 Supabase Auth 로그인 전제입니다.  
> 즉, 앱에서 로그인되지 않은 상태에서는 `insert/select`가 실패하는 것이 정상입니다.

## 현재 구현 상태

- 날짜 + 종목명 입력 후 조회 UI 제공
- 종목명 입력 중 자동완성 추천 목록 제공 (클릭 선택 지원)
- 조회 버튼 클릭 시 서버 라우트(`/api/market-price`)에서 Yahoo Finance 기반 시세 조회
- 종목 입력은 한글명 또는 종목코드 6자리(예: `005930`)를 지원하며, 검색 실패 시 종목코드 입력을 권장
- 조회 결과를 Supabase `trading_logs`에 저장
- 저장된 기록을 하단 리스트에 렌더링
- 휴장일/비거래일 등으로 익일 데이터가 없으면 조회 실패 메시지 반환
