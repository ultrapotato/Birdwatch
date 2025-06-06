import type { Timestamp } from "firebase-admin/firestore"

export interface ForumThread {
  id?: string // Firestore document ID
  title: string
  content: string // Markdown or HTML for the first post
  userId: string
  userName: string
  userAvatar?: string
  tags: string[]
  createdAt: Timestamp | string
  updatedAt?: Timestamp | string // Last activity
  replyCount: number
  viewCount: number
  lastReplyAt?: Timestamp | string
  lastReplyByUserId?: string
  lastReplyByUserName?: string
}

export interface ForumReply {
  id?: string // Firestore document ID
  threadId: string
  userId: string
  userName: string
  userAvatar?: string
  content: string // Markdown or HTML
  createdAt: Timestamp | string
  updatedAt?: Timestamp | string
  likesCount: number
}
