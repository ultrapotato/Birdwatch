export interface UserProfile {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
  // Add any app-specific user preferences here
  bio?: string
  location?: string
  createdAt: string // ISO string
}
