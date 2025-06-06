import { firestoreAdmin } from "@/lib/firebase/firebase-admin"
import type { ForumThread, ForumReply } from "@/lib/models/forum.models"
import { Timestamp } from "firebase-admin/firestore"

if (!firestoreAdmin) {
  console.warn("Firestore Admin is not initialized. ForumService may not function correctly.")
}

const threadsCollection = firestoreAdmin ? firestoreAdmin.collection("forumThreads") : null
const repliesCollectionName = "replies" // Subcollection name

// --- Forum Threads ---
export async function getAllForumThreads(limit = 20): Promise<ForumThread[]> {
  if (!threadsCollection) throw new Error("Forum threads collection not available.")
  const snapshot = await threadsCollection.orderBy("lastActivityAt", "desc").limit(limit).get()
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as ForumThread)
}

export async function getForumThreadById(threadId: string): Promise<ForumThread | null> {
  if (!threadsCollection) throw new Error("Forum threads collection not available.")
  const doc = await threadsCollection.doc(threadId).get()
  if (!doc.exists) return null
  return { id: doc.id, ...doc.data() } as ForumThread
}

export async function createForumThread(
  threadData: Omit<ForumThread, "id" | "createdAt" | "lastActivityAt" | "replyCount">,
  userId: string,
  userName: string,
  userAvatar?: string,
): Promise<ForumThread> {
  if (!threadsCollection) throw new Error("Forum threads collection not available.")
  const now = new Date().toISOString()
  const newThread: ForumThread = {
    ...threadData,
    userId,
    userName,
    userAvatar: userAvatar || "",
    createdAt: now,
    lastActivityAt: now,
    replyCount: 0,
  }
  const docRef = await threadsCollection.add(newThread)
  return { id: docRef.id, ...newThread }
}

// --- Forum Replies ---
export async function getRepliesForThread(threadId: string, limit = 50): Promise<ForumReply[]> {
  if (!threadsCollection) throw new Error("Forum threads collection not available.")
  const repliesSnapshot = await threadsCollection
    .doc(threadId)
    .collection(repliesCollectionName)
    .orderBy("createdAt", "asc")
    .limit(limit)
    .get()
  return repliesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as ForumReply)
}

export async function createForumReply(
  threadId: string,
  replyData: Omit<ForumReply, "id" | "createdAt">,
  userId: string,
  userName: string,
  userAvatar?: string,
): Promise<ForumReply> {
  if (!threadsCollection) throw new Error("Forum threads collection not available.")
  const threadRef = threadsCollection.doc(threadId)
  const newReplyRef = threadRef.collection(repliesCollectionName).doc()

  const newReply: ForumReply = {
    ...replyData,
    id: newReplyRef.id,
    userId,
    userName,
    userAvatar: userAvatar || "",
    createdAt: new Date().toISOString(),
  }

  await firestoreAdmin!.runTransaction(async (transaction) => {
    transaction.set(newReplyRef, newReply)
    transaction.update(threadRef, {
      replyCount: admin.firestore.FieldValue.increment(1),
      lastActivityAt: new Date().toISOString(),
    })
  })

  return newReply
}
