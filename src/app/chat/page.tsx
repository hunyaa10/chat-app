'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { botImageMap, type BotId } from '@/config/botImages';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function Chat() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const botId = searchParams.get('bot') as BotId;
  const botName = searchParams.get('name');

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    if (!botId || !botName) {
      router.push('/');
      return;
    }
    // 웰컴 메시지 추가
    setMessages([
      {
        id: 1,
        text: `안녕하세요! 저는 ${botName}입니다. 무엇을 도와드릴까요?`,
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
  }, [botId, botName]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // 사용자 메시지 추가
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // 봇 응답 (예시)
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: `${inputMessage}에 대해 말씀해 주셔서 감사합니다.`,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-custom-gray-light p-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
        {/* 헤더 */}
        <div className="flex items-center p-4 border-b">
          <button 
            onClick={() => router.push('/')}
            className="mr-4 px-3 py-1 bg-custom-gray-dark text-white rounded hover:bg-custom-gray-light hover:text-black transition-colors"
          >
            ←
          </button>
          <Image
            src={botImageMap[botId]}
            alt={botName || ''}
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="ml-3 font-bold">{botName}</span>
        </div>

        {/* 채팅 영역 */}
        <div className="h-[500px] overflow-y-auto p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.sender === 'user'
                    ? 'bg-custom-green-light'
                    : 'bg-custom-gray-light'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>

        {/* 입력 영역 */}
        <div className="border-t p-4">
          <div className="flex">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="메시지를 입력하세요..."
              className="flex-1 px-4 py-2 border rounded-l focus:outline-none focus:ring-1 focus:ring-custom-green-dark"
            />
            <button
              onClick={handleSendMessage}
              className="px-6 py-2 bg-custom-green-dark text-white rounded-r hover:bg-custom-green-light hover:text-black transition-colors"
            >
              전송
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}