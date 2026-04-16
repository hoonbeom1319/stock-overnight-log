# Design System 규칙

이 문서는 `design-system` 개발 시 일관성을 유지하기 위한 기준 문서다.

## 1) 목표와 범위

- `design-system`은 프로젝트 전역 UI의 단일 기준(SSOT)이다.
- `app`/`views`는 문서화, 라우팅, 조립 레이어이며 컴포넌트 원천은 `design-system`에 둔다.
- 컴포넌트 분류는 카테고리 기준으로 관리하고, 카테고리 내에서 네이밍과 API 규칙을 통일한다.

## 2) 레이어 책임

### `primitive/*` (접근성 원천 레이어)

- 웹 접근성을 반영한 시맨틱 원천 컴포넌트를 제공한다.
- 키보드 인터랙션, 포커스 이동, ARIA 속성, role/label 계약을 우선으로 구현한다.
- 스타일은 최소화한다(헤드리스 또는 최소 기본 스타일).
- 도메인/서비스 맥락을 알면 안 된다.

### 카테고리 컴포넌트 (`display`, `feedback`, `input`, `navigation`, `overlay`, `surface` ...)

- `primitive`를 조합해 제품에서 쓰기 좋은 API를 제공한다.
- variant, size, tone, 레이아웃 등 시각 표현 책임을 가진다.
- 접근성 계약을 약화시키면 안 된다(`aria-*`, `ref`, `asChild` 등 전달 보장).

### `app/design-system`, `views/design-system`

- 문서 페이지와 playground 조립 용도다.
- 실제 컴포넌트 소스의 기준은 `design-system/*`다.

## 3) 의존 방향 규칙

- 허용: `design-system/<category> -> design-system/primitive -> design-system/lib`
- 금지: `primitive -> <category>` 역참조
- 금지: `app/views` 레이어에 실제 컴포넌트 원천 로직 중복 구현

## 4) 네이밍 규칙

- 파일/폴더: `kebab-case`
- 컴포넌트: `PascalCase`
- 핸들러 함수: `handle*`, 이벤트 prop: `on*`
- boolean: `is*`, `has*`, `can*`
- 오타/동의어 중복 없이 단일 이름 사용 (`dropdown-menu`처럼 정규 명칭 고정)

## 5) 컴포넌트 작성 규칙

- 모든 public 컴포넌트는 props 타입을 명시한다.
- `forwardRef`가 필요한 경우 반드시 `displayName`을 설정한다.
- class 병합은 공통 유틸(`cn`)을 사용한다.
- 기본적으로 합성 가능한 구조를 우선한다(Trigger/Content/Item 등).
- 확장 가능성을 위해 하위 primitive prop 전달을 막지 않는다.

## 6) 접근성(A11y) 필수 규칙

- 키보드 사용만으로 핵심 상호작용이 가능해야 한다.
- 포커스 이동/복귀가 명확해야 한다(특히 dialog, popover, menu).
- 상태 기반 속성을 제공한다(`aria-expanded`, `aria-controls`, `aria-selected` 등).
- 아이콘 버튼은 접근 가능한 이름(`aria-label`)을 가져야 한다.
- 색상/강조만으로 정보를 전달하지 않는다(텍스트 또는 상태 속성 병행).

## 7) 접근성 구현 우선순위 (Radix UI 기준)

- 접근성 보장을 위해 `primitive` 구현 시 Radix UI 컴포넌트를 기본 선택지로 사용한다.
- 직접 구현은 Radix UI로 충족되지 않는 요구사항에 한해 최소 범위로만 추가한다.
- 즉, "직접 구현 우선"이 아니라 "Radix UI 우선 + 필요한 부분만 커스텀" 원칙을 따른다.

예시:

- `design-system/primitive/button.tsx`: 버튼 시맨틱/role 등 접근성 기본 계약을 반영한다.
- `design-system/primitive/confirm/confirm.tsx`: 접근성이 검증된 Radix UI `Dialog`를 기반으로 구성한다.

## 8) 카테고리 운영 규칙

- 카테고리 추가/변경 시 먼저 `design-system` 구조를 확정한다.
- 문서 라우팅(`app/views`)은 이후 단계에서 동기화한다.
- 미구현 파일은 빈 파일 대신 최소 골격과 TODO를 남긴다.

예시:

```tsx
// TODO: implement component contract and accessibility behavior
export function Example() {
    return null;
}
```

## 9) 테스트/검증 기준

- 최소 단위:
  - 렌더링
  - 키보드 인터랙션
  - ARIA 속성
  - disabled/readOnly 상태
- overlay 계열은 추가로:
  - 포커스 트랩/복귀
  - ESC 닫기
  - 바깥 클릭 닫기 정책

## 10) 변경 체크리스트

컴포넌트 추가/수정 시 아래를 확인한다.

- 카테고리 위치가 적절한가?
- `primitive` 계약을 재사용하고 있는가?
- 접근성 속성과 키보드 동작이 보장되는가?
- 네이밍과 export 정책이 일관적인가?
- 문서 라우트와 컴포넌트 경로가 일치하는가?

## 11) 원칙 요약

- 접근성은 옵션이 아니라 기본값이다.
- `primitive`는 품질의 바닥선, 카테고리 컴포넌트는 제품화 계층이다.
- 먼저 `design-system`을 단단히 만들고, 이후 `app/views`를 연결한다.
