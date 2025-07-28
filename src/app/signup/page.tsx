'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignUp() {
  const router = useRouter();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 회원가입 로직 구현
    router.push('/'); // 회원가입 성공 시 홈으로 이동
  };

  return (
    <div className="min-h-screen bg-custom-gray-light">
      <div className="max-w-md mx-auto p-4">
        <h1 className="text-2xl font-bold text-center mb-8">회원가입</h1>
        
        <div className="bg-white p-4 rounded-2xl shadow-lg">
          <form onSubmit={handleSignUp} className="space-y-6">
            <div>
              <label htmlFor="id" className="block text-sm font-medium text-gray-700 mb-1">
                아이디
              </label>
              <input
                type="text"
                id="id"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm 
                focus:outline-none focus:ring-2 focus:ring-custom-green-dark focus:border-transparent
                transition-all duration-200"
                placeholder="아이디를 입력하세요"
                minLength={4}
                maxLength={20}
                pattern="^[a-zA-Z0-9]+$"
                title="영문과 숫자만 사용 가능합니다"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                비밀번호
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm 
                focus:outline-none focus:ring-2 focus:ring-custom-green-dark focus:border-transparent
                transition-all duration-200"
                placeholder="비밀번호를 입력하세요"
                minLength={6}
                required
              />
            </div>
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-custom-green-dark text-white py-3 px-6 rounded-xl
                hover:bg-custom-green-light hover:text-black transition-all duration-200
                transform hover:scale-[1.02] active:scale-[0.98] shadow-md"
              >
                회원가입
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
