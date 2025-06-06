import type { Timestamp } from "firebase-admin/firestore"

export interface ChatRoom {
  id?: string
  name?: string // For group chats
  userIds: string[] // Participants
  type: "peer-to-peer" | "group"
  createdAt: Timestamp | string
  lastMessageId?: string
  lastMessageText?: string
  lastMessageAt?: Timestamp | string
  lastMessageByUserId?: string
}

export interface ChatMessage {
  id?: string
  roomId: string
  userId: string
  userName: string
  userAvatar?: string
  text: string
  imageUrl?: string // If image messages are supported
  timestamp: Timestamp | string
}
