import { firestoreAdmin } from "@/lib/firebase/firebase-admin"
import type { BirdSighting, BirdSightingComment, BirdSpecies } from "@/lib/models/bird.models"
import type { Query } from "firebase-admin/firestore"
import { increment } from "firebase/firestore"
import { FieldValue } from "firebase-admin/firestore"

if (!firestoreAdmin) {
  console.warn("Firestore Admin is not initialized. BirdService may not function correctly.")
}

const sightingsCollection = firestoreAdmin ? firestoreAdmin.collection("sightings") : null
const speciesCollection = firestoreAdmin ? firestoreAdmin.collection("birdSpecies") : null

// --- Bird Species ---
export async function getAllBirdSpecies(): Promise<BirdSpecies[]> {
  if (!speciesCollection) throw new Error("Species collection not available.")
  const snapshot = await speciesCollection.get()
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as BirdSpecies)
}

export async function getBirdSpeciesByName(name: string): Promise<BirdSpecies | null> {
  if (!speciesCollection) throw new Error("Species collection not available.")
  const snapshot = await speciesCollection.where("speciesName", "==", name).limit(1).get()
  if (snapshot.empty) return null
  return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as BirdSpecies
}

// --- Bird Sightings ---
export async function createBirdSighting(
  sightingData: Omit<BirdSighting, "id" | "createdAt" | "likesCount">,
  userId: string,
  userName: string,
  userAvatar?: string,
): Promise<BirdSighting> {
  if (!sightingsCollection) throw new Error("Sightings collection not available.")
  const newSighting: BirdSighting = {
    ...sightingData,
    userId,
    userName,
    userAvatar: userAvatar || "",
    createdAt: new Date().toISOString(),
    likesCount: 0,
  }
  const docRef = await sightingsCollection.add(newSighting)
  return { id: docRef.id, ...newSighting }
}

export async function getBirdSightingById(id: string): Promise<BirdSighting | null> {
  if (!sightingsCollection) throw new Error("Sightings collection not available.")
  const doc = await sightingsCollection.doc(id).get()
  if (!doc.exists) return null
  return { id: doc.id, ...doc.data() } as BirdSighting
}

export async function getRecentSightings(limit = 10): Promise<BirdSighting[]> {
  if (!sightingsCollection) throw new Error("Sightings collection not available.")
  const snapshot = await sightingsCollection.orderBy("createdAt", "desc").limit(limit).get()
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as BirdSighting)
}

export async function getFeaturedBirdSightings(limit = 3): Promise<BirdSighting[]> {
  // Placeholder: Implement actual logic for "featured" (e.g., high likes, specific tags)
  if (!sightingsCollection) throw new Error("Sightings collection not available.")
  const snapshot = await sightingsCollection
    .orderBy("likesCount", "desc")
    .orderBy("createdAt", "desc")
    .limit(limit)
    .get()
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as BirdSighting)
}

export async function getUserSightings(userId: string): Promise<BirdSighting[]> {
  if (!sightingsCollection) throw new Error("Sightings collection not available.")
  const snapshot = await sightingsCollection.where("userId", "==", userId).orderBy("createdAt", "desc").get()
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as BirdSighting)
}

export async function searchBirdSightings(params: {
  query?: string
  taxonomy?: string
  location?: string
  flightPattern?: string
  tags?: string[]
  sort?: "recent" | "popular" | "rare" | "az"
}): Promise<BirdSighting[]> {
  if (!sightingsCollection) throw new Error("Sightings collection not available.")
  console.log("in hard search")
  let queryRef: Query = sightingsCollection

  if (params.query) {
    // Firestore doesn't support full-text search well. This is a basic startsWith search.
    // For better search, use Algolia or Elasticsearch.
    queryRef = queryRef.where("speciesName", ">=", params.query).where("speciesName", "<=", params.query + "\uf8ff")
    // You might want to search in tags array too, which is more complex with Firestore for partial matches.
  }
  if (params.taxonomy && params.taxonomy !== "any") {
    queryRef = queryRef.where("taxonomy", "==", params.taxonomy)
  }
  if (params.location) {
    // This would ideally be a geospatial query if coordinates are available and location is parsed.
    // For now, simple text match on location string.
    queryRef = queryRef.where("location", ">=", params.location).where("location", "<=", params.location + "\uf8ff")
  }
  if (params.flightPattern && params.flightPattern !== "any") {
    queryRef = queryRef.where("flightPattern", "==", params.flightPattern)
  }
  if (params.tags && params.tags.length > 0) {
    queryRef = queryRef.where("tags", "array-contains-any", params.tags)
  }
  // 🔽 Sorting logic
  switch (params.sort) {
    case "popular":
      queryRef = queryRef.orderBy("likesCount", "desc")
      break
    case "rare":
      queryRef = queryRef.orderBy("rarityScore", "desc")
      break
    case "az":
      queryRef = queryRef.orderBy("speciesName", "asc")
      break
    case "recent":
    default:
      queryRef = queryRef.orderBy("createdAt", "desc")
      break
  }

  const snapshot = await queryRef.limit(20).get()
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as BirdSighting)
}


export async function getSortedBirdSightings(sort: string = "recent", limit = 10): Promise<BirdSighting[]> {
  if (!sightingsCollection) throw new Error("Sightings collection not available.")
  console.log("in soft search")
  let query: Query = sightingsCollection

  switch (sort) {
    case "popular":
      query = query.orderBy("likesCount", "desc") // make sure "likes" exists and is indexed
      break
    case "rare":
      query = query.orderBy("rarityScore", "desc") // must be a numeric field
      break
    case "az":
      query = query.orderBy("speciesName", "asc")
      break
    case "recent":
    default:
      query = query.orderBy("createdAt", "desc")
  }

  const snapshot = await query.limit(limit).get()
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as BirdSighting)
}


// TODO: Implement updateBirdSighting, deleteBirdSighting
export async function deleteBirdSighting(sightingId: string, userId: string): Promise<boolean> {
  if (!sightingsCollection) throw new Error("Sightings collection not available.")

  const docRef = sightingsCollection.doc(sightingId)
  const doc = await docRef.get()

  if (!doc.exists) return false

  const sightingData = doc.data() as BirdSighting
  if (sightingData.userId !== userId) {
    // Prevent deletion by non-owners
    return false
  }

  await docRef.delete()
  return true
}

// TODO: Implement updateBirdSighting
// TODO: Implement methods for comments (addCommentToSighting, getSightingComments)

export async function addCommentToSighting(
  sightingId: string,
  comment: Omit<BirdSightingComment, "id" | "likes" | "createdAt">
): Promise<BirdSightingComment> {
  if (!sightingsCollection) throw new Error("Sightings collection not available.")

  const commentData: BirdSightingComment = {
    ...comment,
    createdAt: new Date().toISOString(),
    likes: 0,
  }

  const docRef = await sightingsCollection
    .doc(sightingId)
    .collection("comments")
    .add(commentData)

  return { id: docRef.id, ...commentData }
}

export async function getSightingComments(sightingId: string): Promise<BirdSightingComment[]> {
  if (!sightingsCollection) throw new Error("Sightings collection not available.")

  const snapshot = await sightingsCollection
    .doc(sightingId)
    .collection("comments")
    .orderBy("createdAt", "desc")
    .get()

  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as BirdSightingComment))
}

export async function incrementBirdLikeCount(id: string) {
  if (!sightingsCollection) throw new Error("Sightings collection not available.")

  const birdRef = sightingsCollection.doc(id)
  await birdRef.update({
    likes: FieldValue.increment(1)
  })
  const updatedDoc = await birdRef.get()
  return updatedDoc.data()
}

