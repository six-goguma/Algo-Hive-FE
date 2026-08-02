# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # 개발 서버 실행 (HTTPS, 프록시 포함)
pnpm build        # 타입 체크 + 프로덕션 빌드 (tsc -b && vite build)
pnpm lint         # ESLint 실행
pnpm format       # Prettier 검사
pnpm format:fix   # Prettier 자동 수정
```

## Architecture

Feature-Sliced Design(FSD)에 가까운 레이어 구조를 따른다.

```
src/
  app/        # 앱 진입점, 라우터 설정
  pages/      # 페이지별 기능 모음
  shared/     # 공통 유틸, 컴포넌트, 훅, 타입
  widgets/    # 재사용 가능한 UI 블록 (Layout, Grid, modals 등)
```

### Path Aliases

```
@app      → src/app
@pages    → src/pages
@shared   → src/shared
@widgets  → src/widgets
```

### Pages 구조 컨벤션

각 페이지 디렉토리는 다음 하위 디렉토리를 따른다:

```
pages/<page-name>/
  apis/         # API 함수 + 타입 (*.api.ts, *.type.ts)
  components/   # 페이지 전용 컴포넌트
  hooks/        # React Query 훅 (useGet*, useCreate* 등)
  ui/           # 페이지 최상위 컴포넌트
  data/         # 상수 / 목업 데이터
  schema/       # Zod 유효성 스키마 (폼이 있는 경우)
  mock/         # MSW 목업 (필요 시)
  index.ts      # 공개 API (barrel export)
```

### HTTP 클라이언트

`src/shared/lib/http-instance.ts`의 커스텀 `Http` 클래스(fetch 기반, axios 아님)를 사용한다.

두 인스턴스가 `src/shared/service/config/instance.ts`에 정의되어 있다:
- `fetchInstance` — JSON 요청 (기본)
- `multipartFetchInstance` — 파일 업로드

API 베이스는 항상 상대 경로 `/api/v1`이다. 서버 주소는 `window.location.origin`에서 가져오므로 도메인이 하드코딩되어 있지 않다(`VITE_SERVER_URL`로 덮어쓸 수 있다).

- 개발: Vite 프록시가 `/api`를 `http://localhost:8080`으로 포워딩한다.
- 배포: `https://algo.dobbymin.cloud`에서 nginx가 `/api/`를 백엔드로 넘긴다.

### 실시간 채팅

STOMP over WebSocket(`@stomp/stompjs`)을 사용한다. WebSocket 관련 함수는 `src/shared/service/config/wsinstance.ts`에 집중 관리된다 (`connectWebSocket`, `subscribeToRoom`, `sendMessage` 등).

### 상태 관리 / 폼

- 서버 상태: TanStack Query v5 (`useQuery`, `useMutation`)
- 폼: React Hook Form + Zod (`@hookform/resolvers/zod`)
- Query client: `src/shared/lib/query-client.ts`

### 프로바이더

`src/shared/providers/application-provider.tsx`에서 `QueryClientProvider` + `ChakraProvider`를 감싼다. Chakra UI v2 테마는 `src/shared/themes/`에 정의된다.

### 라우팅

React Router v6. 모든 페이지는 `<Layout>` 아래 children으로 등록된다 (`src/app/routes/router.tsx`). 경로 상수는 `src/shared/constants/RouterPath.ts`에 정의된다.

### 에디터

게시글 작성/수정에 BlockNote(`@blocknote/react`)를 사용한다.
