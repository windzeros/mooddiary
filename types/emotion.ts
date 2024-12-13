export type EmotionType = 'happy' | 'sad' | 'angry' | 'anxious' | 'neutral';

export interface Emotion {
  type: EmotionType;
  color: string;
  icon: string;
  label: string;
}

export const emotions: Record<EmotionType, Emotion> = {
  happy: {
    type: 'happy',
    color: '#F7DF72',
    icon: 'Smile',
    label: '행복',
  },
  sad: {
    type: 'sad',
    color: '#4A90E2',
    icon: 'Frown',
    label: '슬픔',
  },
  angry: {
    type: 'angry',
    color: '#D0021B',
    icon: 'AlertTriangle',
    label: '분노',
  },
  anxious: {
    type: 'anxious',
    color: '#9B51E0',
    icon: 'AlertCircle',
    label: '불안',
  },
  neutral: {
    type: 'neutral',
    color: '#9B9B9B',
    icon: 'Meh',
    label: '중립',
  },
};
