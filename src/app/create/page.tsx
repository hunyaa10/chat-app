'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import { botImages } from '@/config/botImages';
import { supabase } from '@/lib/superbase';

export default function CreateCharacter() {
  const router = useRouter();
  const [selectedBot, setSelectedBot] = useState('');
  const [botName, setBotName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateCharacter = async () => {
    if (!selectedBot || !botName.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      // 1. 현재 로그인한 사용자 ID를 로컬 스토리지나 세션에서 가져오기
      const currentUserId = localStorage.getItem('userId'); // 로그인 시 저장해둔 사용자 ID
      
      if (!currentUserId) {
        throw new Error('로그인이 필요합니다.');
      }

      // 2. 챗봇 생성
      const { data: chatbot, error: chatbotError } = await supabase
        .from('chatbots')
        .insert([
          {
            user_id: currentUserId,
            name: botName.trim(),
            bot_type: selectedBot
          }
        ])
        .select()
        .single();

      if (chatbotError) {
        throw new Error('챗봇 생성에 실패했습니다.');
      }

      // 3. 성공 시 마이페이지로 이동
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
        <div className="max-w-2xl mx-auto">
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
          disabled={!selectedBot || !botName.trim() || isLoading}
          className={`block mx-auto mt-8 px-6 py-3 rounded text-white transition-colors ${
            selectedBot && botName.trim() && !isLoading
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
