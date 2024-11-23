'use client'
import { useState, useEffect } from 'react'
import { Article } from '@/types/article'
import { languages, type LanguageCode, type SkillLevel } from '@/constants/languages'

export default function Home() {
  const [formData, setFormData] = useState({
    query: '',
    language: 'en' as LanguageCode,
    skillLevel: 'beginner' as SkillLevel
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.query.trim()) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/process-query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to process query')
      }

      setFormData(prev => ({ ...prev, query: '' }))
    } catch (err) {
      setError('Failed to process query. Please try again.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Search Form */}
        <div className="bg-white p-6 shadow">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Query Input */}
            <div>
              <input
                id="query"
                type="text"
                value={formData.query}
                onChange={(e) => setFormData(prev => ({ ...prev, query: e.target.value }))}
                placeholder="Enter your search query..."
                className="w-full p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                minLength={3}
              />
            </div>

            {/* Language Selection */}
            <div>
              <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
                Language
              </label>
              <select
                id="language"
                value={formData.language}
                onChange={(e) => setFormData(prev => ({ ...prev, language: e.target.value as LanguageCode }))}
                className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                {languages.map(({ code, name, flag }) => (
                  <option key={code} value={code}>
                    {flag} {name}
                  </option>
                ))}
              </select>
            </div>

            {/* Skill Level Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Skill Level
              </label>
              <div className="flex gap-6">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="skillLevel"
                    value="beginner"
                    checked={formData.skillLevel === 'beginner'}
                    onChange={(e) => setFormData(prev => ({ ...prev, skillLevel: e.target.value as SkillLevel }))}
                    className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2">Beginner</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="skillLevel"
                    value="professional"
                    checked={formData.skillLevel === 'professional'}
                    onChange={(e) => setFormData(prev => ({ ...prev, skillLevel: e.target.value as SkillLevel }))}
                    className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2">Professional</span>
                </label>
              </div>
            </div>

            {error && <p className="text-red-500">{error}</p>}
            
            <button
              type="submit"
              disabled={isLoading || formData.query.trim().length < 3}
              className="w-full bg-blue-500 text-white py-3 px-6 hover:bg-blue-600 disabled:bg-blue-300 transition"
            >
              {isLoading ? 'Processing...' : 'Generate article'}
            </button>
          </form>
        </div>

        {/* Search History */}
        <SearchHistory />
      </div>
    </main>
  )
}

function SearchHistory() {
  const [searches, setSearches] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchSearches()
  }, [])

  const fetchSearches = async () => {
    try {
      const response = await fetch('/api/articles')
      if (!response.ok) throw new Error('Failed to fetch searches')
      const data = await response.json()
      setSearches(data)
    } catch (error) {
      console.error('Error fetching searches:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="bg-white p-6 shadow">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 w-1/4"></div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2 py-4">
              <div className="h-4 bg-gray-200 w-3/4"></div>
              <div className="h-3 bg-gray-200 w-1/4"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white p-6 shadow">
      <h2 className="text-xl font-bold mb-4">Recent Searches</h2>
      {searches.length === 0 ? (
        <p className="text-gray-500">No searches yet.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {searches.map((search) => (
            <li key={search.id} className="py-4 hover:bg-gray-50">
              <div className="block">
                <h3 className="font-semibold text-lg text-gray-900">
                  {search.query}
                </h3>
                <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                  <span>
                    {languages.find(l => l.code === search.language)?.flag} 
                    {languages.find(l => l.code === search.language)?.name}
                  </span>
                  <span>•</span>
                  <span className="capitalize">{search.skillLevel}</span>
                  <span>•</span>
                  <span>
                    {new Date(search.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  {search.results && (
                    <>
                      <span>•</span>
                      <span>{search.results} results</span>
                    </>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
} 