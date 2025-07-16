# Chat App

Next.js와 Electron을 결합한 데스크톱 채팅 애플리케이션입니다.

## 시작하기

### 1. 프로젝트 클론
```bash
git clone https://github.com/hunyaa10/chat-app.git
cd chat-app
```

### 2. 의존성 설치
```bash
npm install
```

## 개발 모드 실행

### Next.js 개발 서버만 실행
```bash
npm run dev
```

### Electron과 함께 실행 (개발 모드)
```bash
npm run electron-dev
```
이 명령어는 다음 작업을 수행합니다:
- TypeScript 파일 컴파일
- Next.js 개발 서버 실행
- Electron 애플리케이션 실행

### Electron 단독 실행
```bash
npm run electron
```

## 기술 스택

- Next.js 15.4.1
- React 19.1.0
- Electron 37.2.2
- TypeScript
- TailwindCSS

## 프로젝트 구조

- `src/main.ts`: Electron 메인 프로세스
- `src/preload.ts`: Electron 프리로드 스크립트
- `app/`: Next.js 애플리케이션 코드

## 개발 환경 요구사항

- Node.js
- npm 또는 yarn
- Git
