import type { ForumThread, ForumReply } from "@/lib/models/forum.models"
import { auth } from "@/lib/firebase/firebase"

const API_BASE_URL = "/api/forum"

async function getAuthHeaders() {
  const user = auth.currentUser
  if (user) {
    const token = await user.getIdToken()
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }
  }
  return { "Content-Type": "application/json" }
}

export const getForumThreads = async (): Promise<ForumThread[]> => {
  const response = await fetch(`${API_BASE_URL}/threads`)
  if (!response.ok) throw new Error("Failed to fetch forum threads")
  return response.json()
}

export const createForumThread = async (threadData: Partial<ForumThread>): Promise<ForumThread> => {
  const headers = await getAuthHeaders()
  if (!headers.Authorization) throw new Error("User not authenticated")

  const response = await fetch(`${API_BASE_URL}/threads`, {
    method: "POST",
    headers,
    body: JSON.stringify(threadData),
  })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || "Failed to create forum thread")
  }
  return response.json()
}

export const getRepliesForThread = async (threadId: string): Promise<ForumReply[]> => {
  const response = await fetch(`${API_BASE_URL}/threads/${threadId}/replies`)
  if (!response.ok) throw new Error("Failed to fetch replies")
  return response.json()
}

export const createForumReply = async (threadId: string, replyData: Partial<ForumReply>): Promise<ForumReply> => {
  const headers = await getAuthHeaders()
  if (!headers.Authorization) throw new Error("User not authenticated")

  const response = await fetch(`${API_BASE_URL}/threads/${threadId}/replies`, {
    method: "POST",
    headers,
    body: JSON.stringify(replyData),
  })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || "Failed to create forum reply")
  }
  return response.json()
}
