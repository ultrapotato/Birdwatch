import { NextResponse } from "next/server"
import { getAllArticles } from "@/lib/services/article.service"

export async function GET() {
  try {
    const articles = await getAllArticles()
    return NextResponse.json(articles)
  } catch (error: any) {
    console.error("Error fetching articles:", error)
    return NextResponse.json({ error: error.message || "Failed to fetch articles" }, { status: 500 })
  }
}
