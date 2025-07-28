import { GoogleGenerativeAI } from '@google/generative-ai';
import { PROMPT_TYPES, getPromptByType } from './prompts';

// Google AI 모델 초기화
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY!);

// 채팅 모델 생성
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// 채팅 인스턴스 생성
const chat = model.startChat({
  generationConfig: {
    temperature: 0.9,
    maxOutputTokens: 2048,
  },
});

export const generateChatResponse = async (message: string): Promise<string> => {
  if (!process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY) {
    throw new Error('API 키가 설정되지 않았습니다.');
  }

  try {
    // 스트레스 해소 프롬프트 가져오기
    const systemPrompt = getPromptByType(PROMPT_TYPES.STRESS_RELIEF);
    
    // 시스템 프롬프트와 사용자 메시지 결합
    const fullPrompt = `${systemPrompt}\n\n사용자: ${message}\n\n응답:`;
    
    // 응답 생성
    const result = await chat.sendMessage(fullPrompt);
    const response = await result.response;
    const text = response.text();
    
    if (!text) {
      throw new Error('응답이 비어있습니다.');
    }

    return text;
  } catch (error) {
    console.error('Gemini API 오류:', error);
    if (error instanceof Error) {
      // 더 자세한 에러 메시지 표시
      if (error.message.includes('models/gemini-2.0-flash is not found')) {
        return '죄송합니다. API 설정에 문제가 있습니다. 잠시 후 다시 시도해주세요.';
      }
      if (error.message.includes('INVALID_ARGUMENT')) {
        return '죄송합니다. 입력하신 메시지를 처리할 수 없습니다. 다른 방식으로 말씀해 주세요.';
      }
      return `죄송합니다. 오류가 발생했습니다: ${error.message}`;
    }
    return "죄송합니다. 알 수 없는 오류가 발생했습니다.";
  }
}; 