'use client';

import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-custom-gray-light flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-custom-gray-dark mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-8">페이지를 찾을 수 없습니다!</h2>
        <button
          onClick={() => router.push('/')}
          className="bg-custom-green-dark text-white px-6 py-3 rounded-lg hover:bg-custom-green-light hover:text-black transition-colors"
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
}