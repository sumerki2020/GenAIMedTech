export const dynamic = 'force-static'
export const revalidate = 0

export async function GET() {
  try {
    // Placeholder data
    const mockArticles = [
      {
        "id": "1",
        "query": "machine learning tutorials",
        "title": "Search Results for: machine learning tutorials",
        "createdAt": "2024-03-15T10:30:00Z",
        "results": 156,
        "language": "en",
        "skillLevel": "beginner"
      },
      // ... other mock articles ...
    ]
    
    return Response.json(mockArticles)
  } catch (err) {
    console.error(err)
    return new Response('Error fetching article', { status: 500 })
  }
} 