'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { supabase } from '@/lib/superbase';

export default function Home() {
  const router = useRouter();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);  // 추가

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('username', id)
        .single();

      if (userError || !user) {
        throw new Error('아이디 또는 비밀번호가 일치하지 않습니다.');
      }

      if (user.password !== password) {
        throw new Error('아이디 또는 비밀번호가 일치하지 않습니다.');
      }

      // 로그인 성공 시 사용자 ID를 로컬 스토리지에 저장
      localStorage.setItem('userId', user.id);
      
      router.push('/mypage');
      
    } catch (err) {
      setError(err instanceof Error ? err.message : '로그인에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-custom-gray-light p-4 pt-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-center mb-2">Free Chat Bot</h1>
        <p className="text-center text-gray-600 mb-8">나만의 AI 챗봇을 만들어보세요</p>
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="text-red-500 text-sm text-center">
                {error}
              </div>
            )}
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
                disabled={isLoading}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                비밀번호
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm 
                  focus:outline-none focus:ring-2 focus:ring-custom-green-dark focus:border-transparent
                  transition-all duration-200"
                  placeholder="비밀번호를 입력하세요"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    // 눈 닫힘 아이콘
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    // 눈 열림 아이콘
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <div className="space-y-4 pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-custom-green-dark text-white py-3 px-6 rounded-xl
                hover:bg-custom-green-light hover:text-black transition-all duration-200
                transform hover:scale-[1.02] active:scale-[0.98] shadow-md
                ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isLoading ? '로그인 중...' : '로그인'}
              </button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">또는</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => router.push('/signup')}
                disabled={isLoading}
                className="w-full bg-white text-custom-gray-dark py-3 px-6 rounded-xl
                border-2 border-custom-gray-dark hover:bg-custom-gray-dark hover:text-white
                transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]
                shadow-md"
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
