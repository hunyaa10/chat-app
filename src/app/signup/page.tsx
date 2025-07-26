'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import { botImages } from '@/config/botImages';

export default function SignUp() {
  const router = useRouter();
  const [selectedBot, setSelectedBot] = useState('');
  const [botName, setBotName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateCharacter = () => {
    if (selectedBot && botName.trim() && email && password) {
      // TODO: 회원가입 및 캐릭터 생성 로직 구현
      router.push('/mypage');
    }
  };

  return (
    <div className="min-h-screen bg-custom-gray-light">
      <div className="max-w-2xl mx-auto p-10">
        <h1 className="text-2xl font-bold text-center mb-8">회원가입</h1>
        
        {/* 회원가입 폼 */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">이메일</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">비밀번호</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>
        </div>

        {/* 캐릭터 이름 입력 */}
        <div className="max-w-md mx-auto mb-8">
          <input
            type="text"
            value={botName}
            onChange={(e) => setBotName(e.target.value)}
            className="text-sm text-center w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="채팅봇 이름을 입력해주세요"
          />
        </div>

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

        {/* 생성 버튼 */}
        <button 
          onClick={handleCreateCharacter}
          disabled={!selectedBot || !botName.trim() || !email || !password}
          className={`block mx-auto mt-8 px-6 py-3 rounded text-white transition-colors ${
            selectedBot && botName.trim() && email && password
              ? 'bg-custom-gray-dark hover:bg-custom-gray-light hover:text-black' 
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          캐릭터 생성
        </button>
      </div>
    </div>
  );
}
