import type { Article } from "@/lib/models/article.models"
import { auth } from "@/lib/firebase/firebase"
const API_BASE_URL = "/api"

async function getAuthHeaders() {
  const user = auth.currentUser
  if (user) {
    const token = await user.getIdToken()
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }
  }
  throw new Error("User not authenticated for alert operations")
}

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


export const createArticle = async (articleData: any): Promise<{ id: string }> => {
  const headers = await getAuthHeaders()
  const res = await fetch("/api/articles", {
    method: "POST",
    headers,
    body: JSON.stringify(articleData),
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.error || "Failed to create article")
  }

  return res.json()
}
