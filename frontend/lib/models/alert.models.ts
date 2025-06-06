import type { Timestamp } from "firebase-admin/firestore"

export interface UserAlert {
  id?: string // Firestore document ID
  userId: string
  speciesName?: string // Specific species to alert for
  location?: string // Text description of area or specific point
  radius?: number // Radius in miles/km if location is a point
  notificationType: "email" | "push" | "in-app"
  active: boolean
  createdAt: Timestamp | string
  lastTriggeredAt?: Timestamp | string
}
