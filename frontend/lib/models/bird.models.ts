// General information about a bird species
export interface BirdSpecies {
  id?: string // Firestore document ID
  speciesName: string
  scientificName: string
  description: string
  habitat: string
  conservationStatus: string // e.g., "Least Concern", "Endangered"
  defaultImageUrl?: string
  taxonomy?: string // e.g., "Passeriformes"
  flightPattern?: string
  size?: string // e.g., "8-9 inches"
  lifespan?: string // e.g., "3-5 years"
  diet?: string
  range?: string // Geographical range
  tags: string[]
}

export interface BirdSightingImage {
  id: string
  url: string
  caption?: string
}

export interface BirdSightingComment {
  id?: string // Firestore document ID
  userId: string
  userName: string
  userAvatar?: string
  text: string
  createdAt:  string // ISO string
  likes: number
}

export interface BirdSighting {
  id?: string // Firestore document ID
  userId: string
  userName: string
  userAvatar?: string
  speciesName: string // Could link to BirdSpecies.id if we have a separate collection
  scientificName?: string
  location: string // Text description
  coordinates?: { lat: number; lng: number } // GeoPoint
  date: string // YYYY-MM-DD
  time: string // HH:MM
  description: string
  images: BirdSightingImage[]
  tags: string[]
  habitat?: string
  behavior?: string
  taxonomy?: string
  flightPattern?: string
  conservationStatus?: string
  likesCount: number
  // comments will be a subcollection: sightings/{sightingId}/comments
  createdAt:   string // Firestore Timestamp or ISO string
  updatedAt?:   string
}
