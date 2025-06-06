import { NextResponse } from "next/server"
import { getArticleById } from "@/lib/services/article.service"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const article = await getArticleById(params.id)
    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 })
    }
    return NextResponse.json(article)
  } catch (error: any) {
    console.error(`Error fetching article ${params.id}:`, error)
    return NextResponse.json({ error: error.message || "Failed to fetch article" }, { status: 500 })
  }
}
