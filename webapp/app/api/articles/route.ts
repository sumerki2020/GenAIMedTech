import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { Article } from '@/types/article'

// Sample data
const searches: Article[] = [
  {
    id: '1',
    query: 'machine learning tutorials',
    title: 'Search Results for: machine learning tutorials',
    createdAt: '2024-03-15T10:30:00Z',
    results: 156
  },
  {
    id: '2',
    query: 'javascript best practices',
    title: 'Search Results for: javascript best practices',
    createdAt: '2024-03-14T15:45:00Z',
    results: 89
  },
  {
    id: '3',
    query: 'react hooks examples',
    title: 'Search Results for: react hooks examples',
    createdAt: '2024-03-13T09:20:00Z',
    results: 234
  },
  {
    id: '4',
    query: 'nextjs deployment',
    title: 'Search Results for: nextjs deployment',
    createdAt: '2024-03-12T14:15:00Z',
    results: 67
  },
  {
    id: '5',
    query: 'typescript tips',
    title: 'Search Results for: typescript tips',
    createdAt: '2024-03-11T11:00:00Z',
    results: 123
  }
]

export async function GET() {
  const sortedSearches = [...searches].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
  
  return NextResponse.json(sortedSearches)
} 

export async function POST(request: NextRequest) {
  try {
    const { query, language, skillLevel } = await request.json()

    if (!query || query.trim().length < 3) {
      return NextResponse.json(
        { error: 'Query must be at least 3 characters long' },
        { status: 400 }
      )
    }

    const newSearch: Article = {
      id: uuidv4(),
      query: query.trim(),
      language,
      skillLevel,
      title: `Search Results for: ${query.trim()} (${language.toUpperCase()} - ${skillLevel})`,
      createdAt: new Date().toISOString(),
      results: Math.floor(Math.random() * 200) + 1
    }

    return NextResponse.json(newSearch)
  } catch (error) {
    console.error('Error processing query:', error)
    return NextResponse.json(
      { error: 'Failed to process query' },
      { status: 500 }
    )
  }
} 