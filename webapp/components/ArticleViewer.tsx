'use client'

import { Article } from '@/types/article'
import ReactMarkdown from 'react-markdown'

export default function ArticleViewer({ article }: { article: Article }) {
  if (!article) return null

  return (
    <div className="prose max-w-none">
      <h1>{article.query}</h1>
      <div className="flex gap-2 text-sm text-gray-600">
        <span>Language: {article.language}</span>
        <span>•</span>
        <span>Level: {article.skillLevel}</span>
        <span>•</span>
        <span>Created: {new Date(article.createdAt).toLocaleDateString()}</span>
      </div>
      
      <div className="mt-6">
        <ReactMarkdown>{article.content}</ReactMarkdown>
      </div>
    </div>
  )
} 