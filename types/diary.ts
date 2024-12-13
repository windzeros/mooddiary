import { EmotionType } from './emotion';

export interface Diary {
  id: string;
  userId: string;
  title?: string;
  content: string;
  emotion?: EmotionType;
  createdAt: string;
  updatedAt: string;
}

export interface DiaryInput {
  title?: string;
  content: string;
}

export interface DiaryEntry {
  id: string;
  user_id: string;
  title: string;
  content: string;
  emotion?: {
    label: string;
    score: number;
  };
  created_at: string;
  updated_at: string;
}
