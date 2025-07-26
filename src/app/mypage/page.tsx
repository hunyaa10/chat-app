'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { botImageMap, type BotId } from '@/config/botImages';

interface Character {
  id: string;
  botId: BotId;
  name: string;
}

export default function MyPage() {
  const router = useRouter();
  
  // TODO: 실제 데이터로 교체
  const myCharacters: Character[] = [
    { id: '1', botId: 'm01', name: '챗봇1' },
    { id: '2', botId: 'w02', name: '챗봇2' },
  ];

  return (
    <div className="min-h-screen bg-custom-gray-light p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">내 캐릭터 목록</h1>
        <div className="space-y-4">
          {myCharacters.map((character) => (
            <div 
              key={character.id}
              className="bg-white rounded-lg p-4 flex items-center justify-between shadow-lg"
            >
              <div className="flex items-center">
                <Image
                  src={botImageMap[character.botId]}
                  alt={character.name}
                  width={60}
                  height={60}
                  className="rounded-full"
                />
                <span className="ml-4 font-bold text-lg">{character.name}</span>
              </div>
              <button
                onClick={() => router.push(`/chat?bot=${character.botId}&name=${encodeURIComponent(character.name)}`)}
                className="bg-custom-green-dark text-white p-2 rounded-full hover:bg-custom-green-light hover:text-black transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={() => router.push('/signup')}
          className="mt-8 bg-custom-gray-dark text-white py-2 px-4 rounded-md hover:bg-custom-gray-light hover:text-black transition-colors mx-auto block"
        >
          새 캐릭터 만들기
        </button>
      </div>
    </div>
  );
}
