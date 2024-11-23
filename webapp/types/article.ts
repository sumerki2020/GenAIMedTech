export interface Article {
  id: string;
  query: string;
  language: string;
  skillLevel: 'beginner' | 'professional';
  title: string;
  createdAt: string;
  results?: number;
} 