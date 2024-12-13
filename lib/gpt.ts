import OpenAI from 'openai';
import { EmotionType } from '@/types/emotion';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing env.OPENAI_API_KEY');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function analyzeEmotion(text: string): Promise<EmotionType> {
  const prompt = `다음 일기 내용을 분석하여 가장 주된 감정을 다음 중에서 하나만 선택해주세요: happy(행복), sad(슬픔), angry(분노), anxious(불안), neutral(중립)
응답은 감정 타입만 lowercase로 작성해주세요.

일기 내용:
${text}`;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.3,
    max_tokens: 10,
  });

  const emotion = response.choices[0].message.content?.trim().toLowerCase() as EmotionType;
  return emotion;
}
