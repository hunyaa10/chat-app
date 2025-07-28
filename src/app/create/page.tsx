'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { botImages } from '@/config/botImages';
import { supabase } from '@/lib/superbase';

// 테마 타입 정의
const THEMES = [
  { id: 'coworker', name: '직장상사' },
  { id: 'friend', name: '친구' },
  { id: 'lover', name: '연인' },
  { id: 'client', name: '고객사' },
] as const;

type ThemeType = typeof THEMES[number]['id'];

export default function CreateCharacter() {
  const router = useRouter();
  const [selectedBot, setSelectedBot] = useState('');
  const [selectedTheme, setSelectedTheme] = useState<ThemeType | ''>('');
  const [botName, setBotName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 인증 상태 확인
  useEffect(() => {
    const checkAuth = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        router.replace('/');
        return;
      }

      // users 테이블에서 사용자 확인
      const { data: user, error } = await supabase
        .from('users')
        .select('id')
        .eq('id', userId)
        .single();

      if (error || !user) {
        localStorage.removeItem('userId');
        router.replace('/');
      }
    };
    checkAuth();
  }, [router]);

  const handleCreateCharacter = async () => {
    if (!selectedBot || !botName.trim() || !selectedTheme) return;

    setIsLoading(true);
    setError(null);

    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error('로그인이 필요합니다.');
      }

      // 사용자 존재 여부 한번 더 확인
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('id')
        .eq('id', userId)
        .single();

      if (userError || !user) {
        throw new Error('로그인이 필요합니다.');
      }

      const { data: chatbot, error: chatbotError } = await supabase
        .from('chatbots')
        .insert([
          {
            user_id: userId,
            name: botName.trim(),
            bot_type: selectedBot,
            theme: selectedTheme
          }
        ])
        .select()
        .single();

      if (chatbotError) {
        throw new Error('챗봇 생성에 실패했습니다.');
      }

      router.push('/mypage');
      
    } catch (err) {
      setError(err instanceof Error ? err.message : '챗봇 생성에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-custom-gray-light pt-10">
      <div className="max-w-2xl mx-auto p-10">
        {error && (
          <div className="text-red-500 text-sm text-center mb-4">
            {error}
          </div>
        )}
        
        {/* 캐릭터 선택 */}
        <div className="max-w-2xl mx-auto mb-8">
          <h3 className="text-xl mb-4 text-center">캐릭터를 선택해주세요</h3>
          <div className="grid grid-cols-4 gap-4">
            {botImages.map((bot) => (
              <div 
                key={bot.id}
                className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                  selectedBot === bot.id 
                    ? 'border-custom-green-dark scale-105' 
                    : 'border-transparent hover:border-custom-gray-dark'
                }`}
                onClick={() => setSelectedBot(bot.id)}
              >
                <Image
                  src={bot.src}
                  alt={bot.alt}
                  width={150}
                  height={150}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            ))}
          </div>
        </div>

        {/* 테마 선택 */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="grid grid-cols-2 gap-4">
            {THEMES.map((theme) => (
              <div
                key={theme.id}
                className={`cursor-pointer py-3 px-4 rounded-lg text-center transition-all ${
                  selectedTheme === theme.id
                    ? 'bg-custom-green-dark text-white'
                    : 'bg-white hover:bg-custom-gray-light'
                }`}
                onClick={() => setSelectedTheme(theme.id)}
              >
                <h4 className="font-medium">{theme.name}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* 캐릭터 이름 입력 */}
        <div className="max-w-md mx-auto mt-4 mb-8">
          <input
            type="text"
            value={botName}
            onChange={(e) => setBotName(e.target.value)}
            className="text-sm text-center w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="채팅봇 이름을 입력해주세요"
            disabled={isLoading}
          />
        </div>

        {/* 생성 버튼 */}
        <button 
          onClick={handleCreateCharacter}
          disabled={!selectedBot || !botName.trim() || !selectedTheme || isLoading}
          className={`block mx-auto mt-8 px-6 py-3 rounded text-white transition-colors ${
            selectedBot && botName.trim() && selectedTheme && !isLoading
              ? 'bg-custom-green-dark hover:bg-custom-green-light hover:text-black' 
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          {isLoading ? '생성 중...' : '채팅봇 생성'}
        </button>
      </div>
    </div>
  );
}
