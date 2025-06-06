import { firestoreAdmin } from "@/lib/firebase/firebase-admin"
import type { Article } from "@/lib/models/article.models"

if (!firestoreAdmin) {
  console.warn("Firestore Admin is not initialized. ArticleService may not function correctly.")
}

const articlesCollection = firestoreAdmin ? firestoreAdmin.collection("articles") : null

export async function getAllArticles(limit = 10): Promise<Article[]> {
  if (!articlesCollection) throw new Error("Articles collection not available.")
  const snapshot = await articlesCollection.orderBy("publishedAt", "desc").limit(limit).get()
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Article)
}

export async function getArticleById(id: string): Promise<Article | null> {
  if (!articlesCollection) throw new Error("Articles collection not available.")
  const doc = await articlesCollection.doc(id).get()
  if (!doc.exists) return null
  return { id: doc.id, ...doc.data() } as Article
}

// TODO: Implement createArticle, updateArticle, deleteArticle
