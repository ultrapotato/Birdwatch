import type { Timestamp } from "firebase-admin/firestore"

export interface Hotspot {
  id?: string
  name: string
  location: string // Text description
  coordinates: { lat: number; lng: number } // GeoPoint
  description: string
  imageUrl?: string
  speciesCount: number // Approximate or known count
  recentSpecies: string[] // Array of species names
  activityLevel: "Low" | "Medium" | "High" | "Very High"
  lastVisited?: Timestamp | string // For user-specific data if needed
  notes?: string
}
