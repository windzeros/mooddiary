# MoodDiary PRD (Product Requirements Document)

## 프로젝트 개요

### 프로젝트명
MoodDiary

### 목표
사용자가 매일 작성하는 일기를 날짜별로 손쉽게 관리하고, 작성한 일기 내용을 GPT를 활용하여 감정을 자동 분류한 뒤, 해당 감정에 맞는 색상과 아이콘으로 직관적 피드백을 제공하는 간단한 온라인 일기장 서비스.

### 핵심 컨셉
- **단순한 UI**: 최소한의 인터페이스 요소로 직관적 사용성 제공
- **감정 분석 연동**: OpenAI GPT API로 일기 내용을 분석, 감정 상태(행복, 슬픔, 분노, 불안, 중립) 자동 분류
- **비주얼 피드백**: 감정마다 지정된 색상/아이콘을 통해 일기 리스트에서 직관적으로 분위기 파악

### MVP 목표
- 사용자 인증(이메일/비밀번호, GitHub OAuth)
- 일기 작성/조회/수정/삭제
- GPT 감정 분석 연동 및 UI 반영
- Supabase를 통한 안정적이고 신속한 데이터베이스 연동

## 유저 플로우

### 회원가입/로그인
- 이메일/비밀번호 기반 계정 생성 또는 GitHub OAuth를 통한 간편 로그인
- NextAuth.js로 인증 세션 관리

### 일기 작성
- 메인 화면 상단 또는 플로팅 버튼으로 "새 일기 작성" 기능 제공
- 날짜(자동), 제목(선택), 내용(필수) 입력 후 저장
- 저장 시 백엔드에서 GPT API 호출하여 감정 분석 → Supabase DB에 결과 반영

### 일기 리스트 조회
- 로그인 후 메인 페이지 진입 시, 날짜 순으로 정렬된 일기 목록 노출
- 각 일기 항목은 감정 상태에 따른 색상 테마 및 아이콘 표시

### 일기 상세 보기
- 특정 일기를 클릭하면 상세 페이지로 이동
- 감정 상태 아이콘 및 색상 표시, 전체 내용 확인 가능

### 일기 수정/삭제
- 상세 페이지 또는 리스트 뷰 항목에서 옵션 메뉴를 통해 수정/삭제 가능
- 수정 시 내용 업데이트 후 다시 감정 분석 진행

### 감정 분석 프로세스
1. 일기 생성/수정 시 백엔드 로직에서 GPT API 호출
2. 응답으로 감정 상태(행복, 슬픔, 분노, 불안, 중립) 수신
3. 해당 감정 상태를 Supabase DB에 저장
4. 프론트는 해당 감정 상태를 기반으로 UI 반영

## 핵심 기능

### 일기 CRUD 기능
- 일기 작성 (제목, 내용)
- 일기 리스트 조회 (날짜순)
- 일기 상세 조회
- 일기 수정 및 삭제

### 감정 분석 기능(GPT API 연동)
- 일기 내용 분석 → 감정(행복/슬픔/분노/불안/중립) 추출
- 감정 정보 DB 저장 및 프론트에 반환

### 감정 기반 시각적 피드백
감정 상태별 색상 코드 & 아이콘 매핑:
- 행복(Happy): `#F7DF72` / 아이콘: Smile
- 슬픔(Sad): `#4A90E2` / 아이콘: Frown
- 분노(Angry): `#D0021B` / 아이콘: AlertTriangle 또는 Flame
- 불안(Anxious): `#9B51E0` / 아이콘: AlertCircle
- 중립(Neutral): `#9B9B9B` / 아이콘: Meh

### 인증
- NextAuth.js + Supabase Auth 연동
- 이메일/비밀번호 계정 및 GitHub OAuth 로그인 지원

### 반응형 UI & 간결한 디자인
- TailwindCSS를 이용한 반응형 레이아웃
- ShadCN UI 컴포넌트로 일관된 디자인 경험 제공

## 기술 스택

### 프론트엔드
- **Next.js (App Router)**: 서버 사이드 렌더링(SSR), 파일 기반 라우팅
- **ShadCN UI**: 직관적 컴포넌트 세트 활용
- **TailwindCSS**: Utility-first 스타일링
- **React Query / SWR**: 데이터 페칭 최적화
- **Lucide Icons**: 감정별 아이콘 렌더링

### 백엔드 & 데이터베이스
- **Next.js API Routes**: 일기 CRUD, 감정 분석 요청 처리
- **Supabase**: Postgres 기반 DB + 인증 관리
- **NextAuth.js**: 세션 관리, OAuth 통합
- **OpenAI GPT API**: 감정 분석 AI 연동

### 인프라 & 배포
- **Vercel**: Next.js 애플리케이션 배포
- **Supabase**: 데이터베이스 및 인증 호스팅
- **GitHub Actions**: CI/CD 구축

### 개발 생산성 도구
- **ESLint, Prettier**: 코드 품질 관리
- **GitHub Actions**: 빌드 및 테스트 자동화

## 개발 체크리스트

### 1단계: 프로젝트 초기 설정
- [x] Next.js 프로젝트 생성
- [x] TailwindCSS, ShadCN UI 설정
- [x] 기본 디렉토리 구조 설정
- [x] ESLint, Prettier 설정

### 2단계: 인증 기능 구현
- [x] NextAuth.js 설정
- [x] Supabase 연동
- [x] 로그인/회원가입 UI 구현
- [x] GitHub OAuth 연동
- [x] 로그인/로그아웃 기능 구현

### 3단계: 일기 CRUD 기능
- [ ] Supabase 데이터베이스 스키마 설계
- [ ] 일기 작성 페이지 구현
- [ ] 일기 목록 페이지 구현
- [ ] 일기 상세 페이지 구현
- [ ] 일기 수정/삭제 기능 구현

### 4단계: GPT 감정 분석 통합
- [ ] OpenAI API 설정
- [ ] 감정 분석 API 엔드포인트 구현
- [ ] 감정 분석 결과 저장 구현
- [ ] 감정 기반 UI 요소 구현 (색상, 아이콘)

### 5단계: UI/UX 개선
- [ ] 반응형 디자인 최적화
- [ ] 로딩 상태 및 에러 처리
- [ ] 애니메이션 및 전환 효과
- [ ] 접근성 개선

### 6단계: 테스트 및 배포
- [ ] 단위 테스트 작성
- [ ] E2E 테스트 작성
- [ ] Vercel 배포 설정
- [ ] 성능 최적화

### 현재 진행 상황
- 작업 시작: 2024-12-13
- 현재 단계: 1단계 - 프로젝트 설정 및 기본 구조

## MVP 이후 개선사항

### 감정 분석 정교화
- 감정 범주 확대 및 사용자별 맞춤 분석 기능
- 감정 분석 결과의 정확도 개선 (프롬프트 엔지니어링, 파인튜닝)

### 검색 및 필터링 기능
- 날짜, 감정, 키워드 기반 검색
- 감정별 통계 및 시각화

### 모바일 앱 확장
- PWA 완성도 향상 또는 React Native로 앱 출시 검토

## 파일 구조

```
mood-diary/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx         # 로그인 페이지
│   │   ├── register/
│   │   │   └── page.tsx         # 회원가입 페이지
│   │   └── layout.tsx           # 인증 페이지 레이아웃
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/   # NextAuth.js 설정
│   │   ├── diary/
│   │   │   ├── create.ts        # 일기 생성 API
│   │   │   ├── update.ts        # 일기 수정 API
│   │   │   ├── delete.ts        # 일기 삭제 API
│   │   │   └── [id].ts          # 일기 조회 API
│   │   └── emotion/
│   │       └── analyze.ts       # GPT 감정 분석 API
│   ├── diary/
│   │   ├── [id]/
│   │   │   └── page.tsx         # 일기 상세 페이지
│   │   ├── create/
│   │   │   └── page.tsx         # 일기 작성 페이지
│   │   └── edit/
│   │       └── [id]/
│   │           └── page.tsx     # 일기 수정 페이지
│   ├── fonts/                   # Geist 폰트 파일
│   ├── favicon.ico
│   ├── globals.css             # 전역 스타일
│   ├── layout.tsx              # 루트 레이아웃
│   └── page.tsx                # 메인 페이지 (일기 목록)
├── components/
│   ├── auth/
│   │   ├── login-form.tsx
│   │   └── register-form.tsx
│   ├── diary/
│   │   ├── diary-card.tsx      # 일기 카드 컴포넌트
│   │   ├── diary-form.tsx      # 일기 작성/수정 폼
│   │   └── diary-list.tsx      # 일기 목록 컴포넌트
│   ├── ui/                     # ShadCN UI 컴포넌트
│   └── layout/
│       ├── header.tsx
│       └── footer.tsx
├── lib/
│   ├── auth.ts                 # 인증 관련 유틸리티
│   ├── db.ts                   # Supabase 클라이언트
│   ├── gpt.ts                  # OpenAI GPT 클라이언트
│   └── utils.ts                # 공통 유틸리티 함수
├── types/
│   ├── diary.ts                # 일기 관련 타입 정의
│   └── emotion.ts              # 감정 관련 타입 정의
├── styles/
│   └── emotion-colors.ts       # 감정별 색상 정의
├── config/
│   └── site.ts                 # 사이트 설정
└── public/
    └── icons/                  # 감정 아이콘 등 에셋
```

## 주요 디렉토리 설명

### app/
Next.js 13+ App Router 구조를 따르는 페이지 및 API 라우트

### components/
재사용 가능한 React 컴포넌트들을 기능별로 구분하여 저장

### lib/
데이터베이스, 인증, API 클라이언트 등 핵심 유틸리티 모음

### types/
TypeScript 타입 정의 파일들

### styles/
감정별 색상 등 스타일 관련 상수 정의

### config/
사이트 전반의 설정값들을 관리

### public/
정적 에셋 파일들 (아이콘, 이미지 등)
