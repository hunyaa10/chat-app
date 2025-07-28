// src/components/Header.tsx
'use client';

import { useRouter, usePathname } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  // 홈페이지에서는 헤더 자체를 숨김
  if (pathname === '/') {
    return null;
  }

  // 현재 경로에 따른 페이지 제목 설정
  const getPageTitle = () => {
    switch (pathname) {
      case '/mypage':
        return '내 채팅봇';
      case '/chat':
        return '채팅';
      case '/signup':
        return '회원가입';
      case '/create':
        return '새 채팅봇 만들기';
      default:
        return '';
    }
  };

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-2 h-14">
        <div className="h-full flex items-center justify-between">
          {/* 왼쪽 - 뒤로가기 버튼 */}
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="뒤로 가기"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* 중앙 - 페이지 제목 */}
          <h1 className="text-lg font-bold absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {getPageTitle()}
          </h1>

          {/* 오른쪽 - 홈 버튼 */}
          <button
            onClick={() => router.push('/')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="홈으로 가기"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}