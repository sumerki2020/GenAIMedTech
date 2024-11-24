export interface Article {
  id: string;
  query: string;
  language?: string;
  skillLevel?: string;
  title: string;
  content: string;
  createdAt: string;
  results?: number;
} 