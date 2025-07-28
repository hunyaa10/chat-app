// src/components/Header.tsx
'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 로그인 상태 확인 함수
  const checkLoginStatus = () => {
    const userId = localStorage.getItem('userId');
    setIsLoggedIn(!!userId);
    // 로그인이 필요한 페이지에서 로그인 상태가 아니면 홈으로 리다이렉트
    if (!userId && (pathname === '/mypage' || pathname === '/create')) {
      router.push('/');
    }
  };

  useEffect(() => {
    // 컴포넌트 마운트 시 로그인 상태 확인
    checkLoginStatus();

    // 로컬 스토리지 변경 이벤트 리스너 추가
    const handleStorageChange = () => {
      checkLoginStatus();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // 페이지 포커스될 때마다 로그인 상태 확인
    const handleFocus = () => {
      checkLoginStatus();
    };
    
    window.addEventListener('focus', handleFocus);

    // 클린업 함수
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [pathname, router]);

  // 홈페이지와 채팅 페이지에서는 헤더 숨김
  if (pathname === '/' || pathname === '/chat') {
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

  // 홈 버튼 클릭 핸들러
  const handleHomeClick = () => {
    if (isLoggedIn) {
      router.push('/mypage');
    } else {
      router.push('/');
    }
  };

  // 로그아웃 핸들러
  const handleLogout = () => {
    try {
      localStorage.removeItem('userId');
      setIsLoggedIn(false);
      router.push('/');
      console.log('로그아웃 성공');
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
    }
  };

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-2 h-14">
        <div className="h-full flex items-center justify-between">
          {/* 왼쪽 - 마이페이지에서는 로그아웃, 다른 페이지에서는 뒤로가기 */}
          {pathname === '/mypage' && isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="로그아웃"
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
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                />
              </svg>
            </button>
          ) : (
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
          )}

          {/* 중앙 - 페이지 제목 */}
          <h1 className="text-lg font-bold absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {getPageTitle()}
          </h1>

          {/* 오른쪽 - 홈 버튼 */}
          <button
            onClick={handleHomeClick}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label={isLoggedIn ? "마이페이지로 가기" : "홈으로 가기"}
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