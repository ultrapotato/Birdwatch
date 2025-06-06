import { firestoreAdmin } from "@/lib/firebase/firebase-admin"
import type { UserAlert } from "@/lib/models/alert.models"

if (!firestoreAdmin) {
  console.warn("Firestore Admin is not initialized. AlertService may not function correctly.")
}

const alertsCollection = firestoreAdmin ? firestoreAdmin.collection("userAlerts") : null

export async function getAlertById(alertId: string): Promise<UserAlert | null> {
  if (!alertsCollection) throw new Error("User alerts collection not available.")
  const doc = await alertsCollection.doc(alertId).get()
  if (!doc.exists) return null
  return { id: doc.id, ...doc.data() } as UserAlert
}

export async function getUserAlerts(userId: string): Promise<UserAlert[]> {
  if (!alertsCollection) throw new Error("User alerts collection not available.")
  const snapshot = await alertsCollection.where("userId", "==", userId).orderBy("createdAt", "desc").get()
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as UserAlert)
}

export async function createAlert(
  alertData: Omit<UserAlert, "id" | "createdAt" | "lastTriggeredAt">,
  userId: string, // userId from decoded token
): Promise<UserAlert> {
  if (!alertsCollection) throw new Error("User alerts collection not available.")
  const newAlertDoc: Omit<UserAlert, "id"> = {
    ...alertData,
    userId, // Ensure this is from the authenticated user
    createdAt: new Date().toISOString(),
    // active: true, // 'active' should be part of alertData from client
  }
  const docRef = await alertsCollection.add(newAlertDoc)
  return { id: docRef.id, ...newAlertDoc } as UserAlert
}

export async function updateAlert(alertId: string, updates: Partial<UserAlert>): Promise<UserAlert | null> {
  if (!alertsCollection) throw new Error("User alerts collection not available.")
  const alertRef = alertsCollection.doc(alertId)
  // Ensure critical fields are not updated directly if necessary, or handle them specifically
  const { id, userId, createdAt, ...safeUpdates } = updates
  await alertRef.update(safeUpdates)
  const updatedDoc = await alertRef.get()
  if (!updatedDoc.exists) return null
  return { id: updatedDoc.id, ...updatedDoc.data() } as UserAlert
}

export async function deleteAlert(alertId: string): Promise<void> {
  if (!alertsCollection) throw new Error("User alerts collection not available.")
  await alertsCollection.doc(alertId).delete()
}

// TODO: Logic for checking sightings against active alerts (could be a Cloud Function or scheduled job)
