'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { botImageMap, type BotId } from '@/config/botImages';
import { generateChatResponse } from '@/lib/gemini';

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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null); // 입력창 ref 추가

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 스크롤을 맨 아래로 이동시키는 함수
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // 입력창에 포커스를 주는 함수
  const focusInput = () => {
    inputRef.current?.focus();
  };

  // 메시지가 추가될 때마다 스크롤 이동
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 로딩이 끝나면 입력창에 포커스
  useEffect(() => {
    if (!isLoading) {
      focusInput();
    }
  }, [isLoading]);

  useEffect(() => {
    if (!botId || !botName) {
      router.push('/');
      return;
    }
    // 웰컴 메시지 추가
    setMessages([
      {
        id: 1,
        text: `안녕하세요! 저는 ${botName}입니다.`,
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
    // 초기 로드 시 입력창에 포커스
    focusInput();
  }, [botId, botName, router]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    try {
      setIsLoading(true);
      
      // 사용자 메시지 추가
      const userMessage: Message = {
        id: messages.length + 1,
        text: inputMessage,
        sender: 'user',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage]);
      setInputMessage('');

      // 로딩 메시지 추가
      const loadingMessage: Message = {
        id: messages.length + 2,
        text: '답변을 생성하고 있습니다...',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, loadingMessage]);

      // AI 응답 생성
      const response = await generateChatResponse(inputMessage);
      
      // 로딩 메시지를 실제 응답으로 교체
      setMessages(prev => 
        prev.map(msg => 
          msg.id === loadingMessage.id
            ? { ...msg, text: response }
            : msg
        )
      );

    } catch (error) {
      console.error('채팅 응답 생성 중 오류:', error);
      const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
      
      // 로딩 메시지를 에러 메시지로 교체하거나 새로운 에러 메시지 추가
      setMessages(prev => {
        const loadingMessageIndex = prev.findIndex(msg => msg.text === '답변을 생성하고 있습니다...');
        if (loadingMessageIndex !== -1) {
          return prev.map((msg, index) => 
            index === loadingMessageIndex
              ? { ...msg, text: errorMessage }
              : msg
          );
        }
        return [...prev, {
          id: messages.length + 2,
          text: errorMessage,
          sender: 'bot',
          timestamp: new Date()
        }];
      });
    } finally {
      setIsLoading(false);
    }
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
          <div ref={messagesEndRef} />
        </div>

        {/* 입력 영역 */}
        <div className="border-t p-4 bg-white">
          <div className="flex">
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
              placeholder="메시지를 입력하세요..."
              className="flex-1 px-4 py-2 border rounded-l focus:outline-none focus:ring-1 focus:ring-custom-green-dark"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading}
              className={`px-6 py-2 rounded-r transition-colors ${
                isLoading 
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-custom-green-dark text-white hover:bg-custom-green-light hover:text-black'
              }`}
            >
              {isLoading ? '응답 중...' : '전송'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}