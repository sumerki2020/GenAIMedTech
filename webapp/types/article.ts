export interface Article {
  id: string;
  query: string;
  language?: string;
  skillLevel?: string;
  title: string;
  createdAt: string;
  results?: number;
} 