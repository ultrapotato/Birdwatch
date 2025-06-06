import type { Article } from "@/lib/models/article.models"
const API_BASE_URL = "/api"

export const getArticles = async (): Promise<Article[]> => {
  const response = await fetch(`${API_BASE_URL}/articles`)
  if (!response.ok) throw new Error("Failed to fetch articles")
  return response.json()
}

export const getArticleById = async (id: string): Promise<Article | null> => {
  const response = await fetch(`${API_BASE_URL}/articles/${id}`)
  if (!response.ok) {
    if (response.status === 404) return null
    throw new Error("Failed to fetch article details")
  }
  return response.json()
}
