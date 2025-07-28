'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { botImageMap, type BotId } from '@/config/botImages';
import { supabase } from '@/lib/superbase';

interface Chatbot {
  id: string;
  name: string;
  bot_type: BotId;
  created_at: string;
}

export default function MyPage() {
  const router = useRouter();
  const [chatbots, setChatbots] = useState<Chatbot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChatbots = async () => {
      try {
        // 로컬 스토리지에서 사용자 ID 가져오기
        const userId = localStorage.getItem('userId');
        if (!userId) {
          router.push('/');
          return;
        }

        // 사용자의 채팅봇 목록 가져오기
        const { data: chatbotsData, error: chatbotsError } = await supabase
          .from('chatbots')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false });

        if (chatbotsError) {
          throw chatbotsError;
        }

        setChatbots(chatbotsData || []);
      } catch (err) {
        setError('채팅봇 목록을 불러오는데 실패했습니다.');
        console.error('Error fetching chatbots:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChatbots();
  }, [router]);

  return (
    <div className="min-h-screen bg-custom-gray-light p-4 pt-20">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => router.push('/create')}
          className="bg-custom-green-dark text-white py-3 px-6 rounded-xl
          hover:bg-custom-green-light hover:text-black transition-all duration-200
          transform hover:scale-[1.02] active:scale-[0.98] shadow-md
          mx-auto block w-1/2 max-w-md mb-8"
        >
          새 채팅봇 만들기
        </button>

        {error && (
          <div className="text-red-500 text-sm text-center mb-4">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-10">
            <p className="text-gray-500">채팅봇 목록을 불러오는 중...</p>
          </div>
        ) : chatbots.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <p className="mb-2">아직 생성된 채팅봇이 없습니다.</p>
            <p className="text-sm">나만의 채팅봇을 만들어보세요!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {chatbots.map((chatbot) => (
              <div 
                key={chatbot.id}
                className="bg-white rounded-lg p-4 flex items-center justify-between shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center">
                  <Image
                    src={botImageMap[chatbot.bot_type]}
                    alt={chatbot.name}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div className="ml-4">
                    <h3 className="font-bold text-lg">{chatbot.name}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(chatbot.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => router.push(`/chat?bot=${chatbot.bot_type}&name=${encodeURIComponent(chatbot.name)}`)}
                  className="bg-custom-green-dark text-white p-2 rounded-full hover:bg-custom-green-light hover:text-black transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
