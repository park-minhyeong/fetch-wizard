# API Wizard 테스트 프로젝트

이 프로젝트는 API Wizard 라이브러리의 기능을 테스트하고 시연하기 위한 React 애플리케이션입니다.

## 🏗️ 프로젝트 구조

```
src/_test/
├── index.html                 # HTML 엔트리 포인트
├── src/
│   ├── main.tsx              # React 애플리케이션 엔트리 포인트
│   ├── globals.css           # 전역 스타일 (Tailwind CSS)
│   ├── app/                  # 페이지 컴포넌트 (App Router 패턴)
│   │   ├── layout.tsx        # 루트 레이아웃
│   │   ├── page.tsx          # 홈 페이지
│   │   └── todos/            # Todo 관련 페이지
│   │       ├── page.tsx      # Todo 목록 페이지
│   │       └── [todoId]/     # 동적 라우팅
│   │           └── page.tsx  # Todo 상세 페이지
│   ├── components/           # 아토믹 디자인 패턴 컴포넌트
│   │   ├── atom/             # 기본 UI 컴포넌트
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Badge.tsx
│   │   │   └── Label.tsx
│   │   ├── molecule/         # 조합된 UI 컴포넌트
│   │   │   ├── FormField.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── StatusBadge.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   └── TitleBox.tsx
│   │   ├── organism/         # 도메인별 복합 컴포넌트
│   │   │   ├── TodoCard.tsx
│   │   │   ├── TodoList.tsx
│   │   │   └── TodoForm.tsx
│   │   └── template/         # 페이지 레이아웃 템플릿
│   │       ├── TodoPageTemplate.tsx
│   │       └── TodoDetailTemplate.tsx
│   ├── hooks/                # 커스텀 React 훅
│   │   ├── useTodo.ts        # Todo 관련 상태 관리
│   │   └── useRoute.ts       # 동적 라우팅 훅
│   ├── services/             # API 서비스 레이어
│   │   ├── config.ts         # API 설정
│   │   └── api/
│   │       └── todo.ts       # Todo API 서비스
│   └── interfaces/           # TypeScript 타입 정의
│       └── Todo.ts           # Todo 인터페이스
└── dist/                     # 빌드 결과물
```

## 🎨 디자인 패턴

### 1. 아토믹 디자인 패턴 (Atomic Design)

프로젝트는 **Brad Frost**의 아토믹 디자인 패턴을 기반으로 구성되어 있습니다:

#### **Atoms (원자)**
- **목적**: 재사용 가능한 기본 UI 요소
- **특징**: 도메인 로직 없음, 순수한 UI 컴포넌트
- **예시**: Button, Input, Badge, Label

#### **Molecules (분자)**
- **목적**: Atoms를 조합한 기능적 UI 그룹
- **특징**: 도메인 로직 없음, 특정 기능을 수행
- **예시**: FormField, Card, StatusBadge, LoadingSpinner

#### **Organisms (유기체)**
- **목적**: Molecules와 Atoms를 조합한 복합 컴포넌트
- **특징**: 도메인 로직 포함, 비즈니스 로직과 UI 결합
- **예시**: TodoCard, TodoList, TodoForm

#### **Templates (템플릿)**
- **목적**: 페이지 레이아웃과 구조 정의
- **특징**: 도메인 로직 포함, 페이지별 레이아웃
- **예시**: TodoPageTemplate, TodoDetailTemplate

### 2. 컴포넌트 설계 원칙

#### **단일 책임 원칙 (SRP)**
- 각 컴포넌트는 하나의 명확한 책임을 가짐
- 재사용성과 유지보수성 향상

#### **조합 우선 설계**
- 상속보다는 조합을 통한 기능 확장
- 컴포넌트 간 느슨한 결합

#### **Props 인터페이스 설계**
```typescript
// 명확한 Props 인터페이스
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "success";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}
```

### 3. 스타일링 패턴

#### **Fast-JSX CN 유틸리티**
- 복잡한 스타일링에만 `cn` 유틸리티 사용
- 간단한 스타일은 직접 Tailwind CSS 클래스 사용
- 객체 기반 스타일 정의로 가독성 향상

```typescript
// 복잡한 스타일링
const button = {
  displays: "inline-flex items-center justify-center",
  colors: "bg-blue-600 text-white",
  transitions: "transition-colors duration-200",
  states: "hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500",
};

// 간단한 스타일링
<div className="flex justify-center items-center min-h-screen">
```

### 4. 상태 관리 패턴

#### **커스텀 훅 패턴**
- 비즈니스 로직을 커스텀 훅으로 분리
- 컴포넌트와 로직의 관심사 분리

```typescript
// useTodo.ts - Todo 관련 상태 관리
export default function useTodo() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  
  const getTodos = useCallback(async () => {
    // API 호출 로직
  }, []);
  
  return { todos, loading, getTodos };
}
```

### 5. API 서비스 레이어

#### **서비스 분리 패턴**
- API 호출 로직을 별도 서비스로 분리
- 컴포넌트에서 비즈니스 로직 분리

```typescript
// services/api/todo.ts
export default {
  get: async (props?: { id: number }) => {
    // API 호출 로직
  },
  post: async (url: string, data: Partial<Todo>) => {
    // POST 요청 로직
  }
};
```

### 6. 라우팅 패턴

#### **파일 기반 라우팅**
- Next.js App Router와 유사한 구조
- 동적 라우팅 지원 (`[todoId]`)

#### **커스텀 라우팅 훅**
```typescript
// useRoute.ts - 동적 라우팅 관리
export default function useRoute() {
  const [currentRoute, setCurrentRoute] = useState('/');
  
  // 라우팅 로직
  return { currentRoute, navigate };
}
```

## 🚀 기술 스택

- **React 18**: UI 라이브러리
- **TypeScript**: 타입 안전성
- **Vite**: 빌드 도구
- **Tailwind CSS**: 스타일링
- **Fast-JSX**: 스타일 유틸리티
- **React Query**: 서버 상태 관리
- **API Wizard**: HTTP 클라이언트

## 📁 폴더별 역할

### `/app`
- **역할**: 페이지 컴포넌트 관리
- **패턴**: App Router 스타일
- **특징**: 파일 기반 라우팅

### `/components`
- **역할**: 재사용 가능한 UI 컴포넌트
- **패턴**: 아토믹 디자인
- **특징**: 계층적 구조 (atom → molecule → organism → template)

### `/hooks`
- **역할**: 커스텀 React 훅
- **패턴**: 로직 분리
- **특징**: 비즈니스 로직과 UI 분리

### `/services`
- **역할**: API 서비스 레이어
- **패턴**: 서비스 분리
- **특징**: 외부 API와의 통신 관리

### `/interfaces`
- **역할**: TypeScript 타입 정의
- **패턴**: 타입 중앙화
- **특징**: 타입 안전성 보장

## 🎯 설계 목표

1. **재사용성**: 컴포넌트의 높은 재사용성
2. **유지보수성**: 명확한 구조와 책임 분리
3. **확장성**: 새로운 기능 추가의 용이성
4. **타입 안전성**: TypeScript를 통한 타입 체크
5. **성능**: 최적화된 렌더링과 번들 크기
6. **개발자 경험**: 직관적인 구조와 명확한 네이밍

이 구조는 대규모 React 애플리케이션에서도 확장 가능하며, 팀 개발 환경에서 일관된 코드 품질을 유지할 수 있도록 설계되었습니다.
