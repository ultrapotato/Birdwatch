import type { UserAlert } from "@/lib/models/alert.models"
import { auth } from "@/lib/firebase/firebase" // Assuming firebase client is initialized here

const API_BASE_URL = "/api/alerts"

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

export const getUserAlerts = async (): Promise<UserAlert[]> => {
  const headers = await getAuthHeaders()
  const response = await fetch(API_BASE_URL, { headers })
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.error || "Failed to fetch user alerts")
  }
  return response.json()
}

export const createAlert = async (
  alertData: Partial<Omit<UserAlert, "id" | "userId" | "createdAt">>,
): Promise<UserAlert> => {
  const headers = await getAuthHeaders()
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers,
    body: JSON.stringify(alertData),
  })
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.error || "Failed to create alert")
  }
  return response.json()
}

export const updateAlert = async (alertId: string, updates: Partial<UserAlert>): Promise<UserAlert> => {
  const headers = await getAuthHeaders()
  const response = await fetch(`${API_BASE_URL}/${alertId}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(updates),
  })
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.error || "Failed to update alert")
  }
  return response.json()
}

export const deleteAlert = async (alertId: string): Promise<{ message: string }> => {
  const headers = await getAuthHeaders()
  const response = await fetch(`${API_BASE_URL}/${alertId}`, {
    method: "DELETE",
    headers,
  })
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.error || "Failed to delete alert")
  }
  return response.json()
}
