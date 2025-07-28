'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';  // useRef 추가
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
  const messagesEndRef = useRef<HTMLDivElement>(null);  // 스크롤을 위한 ref 추가

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');

  // 스크롤을 맨 아래로 이동시키는 함수
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // 메시지가 추가될 때마다 스크롤 이동
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
    <div className="h-screen flex flex-col bg-custom-gray-light">
      <div className="h-full max-w-3xl mx-auto w-full bg-white flex flex-col">
        {/* 헤더 */}
        <div className="flex items-center px-2 py-4 border-b bg-white">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-2"
            aria-label="뒤로 가기"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
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
        <div className="flex-1 overflow-y-auto p-4">
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
          {/* 스크롤을 위한 더미 div */}
          <div ref={messagesEndRef} />
        </div>

        {/* 입력 영역 */}
        <div className="border-t p-4 bg-white">
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