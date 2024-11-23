import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

// This would typically come from a database
const articles: Article[] = []

export async function GET() {
  // Return the last 10 articles, sorted by date
  const recentArticles = [...articles]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 10)

  return NextResponse.json(recentArticles)
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    // Validate URL
    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      )
    }

    // Here you would typically:
    // 1. Validate the URL format
    // 2. Fetch the webpage
    // 3. Extract relevant information
    // 4. Store in a database

    const newArticle: Article = {
      id: uuidv4(),
      url,
      title: 'Article Title', // You would extract this from the webpage
      createdAt: new Date().toISOString(),
    }

    // In a real application, you would save this to a database
    articles.push(newArticle)

    return NextResponse.json(newArticle)
  } catch (error) {
    console.error('Error processing URL:', error)
    return NextResponse.json(
      { error: 'Failed to process URL' },
      { status: 500 }
    )
  }
} 