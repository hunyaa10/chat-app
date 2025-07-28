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

  return (
    <div className="min-h-screen bg-custom-gray-light p-4 pt-20">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => router.push('/create')}
          className="bg-custom-green-dark text-white py-3 px-6 rounded-xl
          hover:bg-custom-green-light hover:text-black transition-all duration-200
          transform hover:scale-[1.02] active:scale-[0.98] shadow-md
          mx-auto block w-1/2 max-w-md"
        >
          새 채팅봇 만들기
        </button>
        <div className="space-y-4">
          {/* 채팅봇이 없을 때 보여줄 메시지 */}
          <div className="text-center py-10 text-gray-500">
            <p className="mb-2">아직 생성된 채팅봇이 없습니다.</p>
            <p className="text-sm">나만의 채팅봇을 만들어보세요!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
