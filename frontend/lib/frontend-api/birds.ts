import type { BirdSighting, BirdSightingComment, BirdSpecies } from "@/lib/models/bird.models"
import { auth } from "@/lib/firebase/firebase" // For getting ID token

const API_BASE_URL = "/api" // Assuming Next.js API routes are at /api

async function getAuthHeaders() : Promise<Record<string, string>>{
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

export const createBirdSighting = async (sightingData: Partial<BirdSighting>): Promise<{ id: string }> => {
  const headers = await getAuthHeaders()
  if (!headers.Authorization) throw new Error("User not authenticated")

  const response = await fetch(`${API_BASE_URL}/birds`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(sightingData),
  })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || "Failed to create bird sighting")
  }
  return response.json()
}

export const getFeaturedBirds = async (): Promise<BirdSighting[]> => {
  const response = await fetch(`${API_BASE_URL}/birds/featured`)
  if (!response.ok) throw new Error("Failed to fetch featured birds")
  return response.json()
}

export const getRecentSightings = async (): Promise<BirdSighting[]> => {
  const response = await fetch(`${API_BASE_URL}/birds/recent`)
  if (!response.ok) throw new Error("Failed to fetch recent sightings")
  return response.json()
}

export const getUserSightings = async (userId: string): Promise<BirdSighting[]> => {
  // This might need a dedicated endpoint or be part of a user profile endpoint
  // For now, let's assume an endpoint like /api/users/{userId}/sightings
  const headers = await getAuthHeaders()
  const response = await fetch(`${API_BASE_URL}/users/${userId}/sightings`, { headers })
  if (!response.ok) throw new Error("Failed to fetch user sightings")
  return response.json()
}

export const deleteSighting = async (userId: string, sightingId: string): Promise<void> => {
  const headers = await getAuthHeaders()
  const response = await fetch(`${API_BASE_URL}/users/${userId}/sightings/${sightingId}`, {
    method: "DELETE",
    headers,
  })

  if (!response.ok) {

    throw new Error("Failed to delete sighting")
  }
}


export const searchBirds = async (searchParams: any): Promise<BirdSighting[]> => {
  const query = new URLSearchParams(searchParams).toString()
  console.log(query)
  const response = await fetch(`${API_BASE_URL}/birds?${query}`)
  if (!response.ok) throw new Error("Failed to search birds")
  return response.json()
}

export const getBirdDetails = async (birdId: string): Promise<BirdSighting | null> => {
  const response = await fetch(`${API_BASE_URL}/birds/${birdId}`)
  if (!response.ok) {
    if (response.status === 404) return null
    throw new Error("Failed to fetch bird details")
  }
  return response.json()
}

export const getSimilarBirds = async (birdId: string): Promise<BirdSighting[]> => {
  // Placeholder: This logic should be on the backend, e.g., /api/birds/{birdId}/similar
  // For now, returning a few recent ones as a mock
  const response = await fetch(`${API_BASE_URL}/birds/recent?limit=3`)
  if (!response.ok) throw new Error("Failed to fetch similar birds")
  return response.json()
}

// Mock for common birds, ideally this comes from a species list
export const getCommonBirds = async (): Promise<Partial<BirdSpecies>[]> => {
  // This should fetch from /api/birds/species?common=true or similar
  // Mocking for now
  return [
    {
      id: "1",
      speciesName: "Northern Cardinal",
      description: "Bright red bird...",
      habitat: "Woodlands",
      defaultImageUrl: "https://images.unsplash.com/photo-1652064239805-877a0bfcfd5c?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "2",
      speciesName: "American Robin",
      description: "Gray-brown bird...",
      habitat: "Lawns",
      defaultImageUrl: "https://images.unsplash.com/photo-1613832663019-c5fd565d6155?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ]
}

export const getNearbyBirds = async (lat: number, lon: number, radius: number): Promise<BirdSighting[]> => {
  const response = await fetch(`${API_BASE_URL}/birds/nearby?lat=${lat}&lon=${lon}&radius=${radius}`)
  if (!response.ok) throw new Error("Failed to fetch nearby birds")
  return response.json()
}

export const getAllBirds = async ({ sortBy = "recent" ,query}: { sortBy?: string, query?:string } = {}): Promise<BirdSighting[]> => {
  const queryParams = new URLSearchParams()
  queryParams.set("sort", sortBy)
  if (query) queryParams.set("query", query)
  console.log(queryParams)

  const response = await fetch(`${API_BASE_URL}/birds?${queryParams.toString()}`)
  if (!response.ok) throw new Error("Failed to fetch all birds")
  return response.json()
}

export const getBirdSightingComments = async (birdId: string): Promise<BirdSightingComment[]> => {
  const response = await fetch(`${API_BASE_URL}/birds/${birdId}/comments`)
  if (!response.ok) throw new Error("Failed to fetch nearby birds")
  return response.json()
}

export const addBirdSightingComment = async (
  birdId: string,
  comment: Omit<BirdSightingComment, "id" | "likes" | "createdAt">
): Promise<BirdSightingComment> => {
  const headers = await getAuthHeaders()
  if (!headers.Authorization) throw new Error("User not authenticated")

  const response = await fetch(`${API_BASE_URL}/birds/${birdId}/comments`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      sightingId: birdId,
      comments: comment,
    }),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || "Failed to post comment")
  }

  return response.json()
}


export const likeBirdSighting = async (id: string): Promise<any> => {
  const headers = await getAuthHeaders()
  if (!headers.Authorization) throw new Error("User not authenticated")

  const response = await fetch(`${API_BASE_URL}/birds/${id}/likes`, {
    method: "POST", // or PATCH if you prefer
    headers,
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || "Failed to like bird sighting")
  }

  return response.json()
}
