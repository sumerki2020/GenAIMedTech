'use client'
import { useState, useEffect } from 'react'
import { Article } from '@/types/article'

export default function Home() {
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/process-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })

      if (!response.ok) {
        throw new Error('Failed to process URL')
      }

      // Reset form and refresh articles
      setUrl('')
    } catch (err) {
      setError('Failed to process URL. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Search Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Process New URL</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter URL to process..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 disabled:bg-blue-300 transition"
            >
              {isLoading ? 'Processing...' : 'Process URL'}
            </button>
          </form>
        </div>

        {/* Articles List */}
        <ArticlesList />
      </div>
    </main>
  )
}

// Separate component for articles list
function ArticlesList() {
  const [articles, setArticles] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    try {
      const response = await fetch('/api/articles')
      if (!response.ok) throw new Error('Failed to fetch articles')
      const data = await response.json()
      setArticles(data)
    } catch (error) {
      console.error('Error fetching articles:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <div className="text-center">Loading articles...</div>
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Recent Articles</h2>
      {articles.length === 0 ? (
        <p className="text-gray-500">No articles processed yet.</p>
      ) : (
        <ul className="space-y-4">
          {articles.map((article) => (
            <li key={article.id} className="border-b pb-4 last:border-b-0">
              <a 
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500"
              >
                <h3 className="font-semibold">{article.title}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(article.createdAt).toLocaleDateString()}
                </p>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
} 