'use client'

import { useState, useEffect } from 'react'
import { Article } from '@/types/article'

const articlesData = [
  {
    "id": "1",
    "query": "machine learning tutorials",
    "title": "Search Results for: machine learning tutorials",
    "createdAt": "2024-03-15T10:30:00Z",
    "results": 156,
    "language": "en",
    "skillLevel": "beginner"
  },
  {
    "id": "2",
    "query": "javascript best practices",
    "title": "Search Results for: javascript best practices",
    "createdAt": "2024-03-14T15:45:00Z",
    "results": 89,
    "language": "en",
    "skillLevel": "beginner"
  },
  // ... other articles
]

export default function ArticleViewer({ id }: { id: string }) {
  const [article, setArticle] = useState<Article | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const article = articlesData.find(a => a.id === id)
    if (article) {
      setArticle(article)
    } else {
      setError('Article not found')
    }
  }, [id])

  if (error) return <div>Error: {error}</div>
  if (!article) return <div>Loading...</div>

  return (
    <div>
      <h1>{article.title}</h1>
      <p>Query: {article.query}</p>
      {article.language && <p>Language: {article.language}</p>}
      {article.skillLevel && <p>Skill Level: {article.skillLevel}</p>}
      <p>Created: {new Date(article.createdAt).toLocaleDateString()}</p>
      <p>Results: {article.results}</p>
    </div>
  )
} 