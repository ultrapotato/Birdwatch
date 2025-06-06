import admin from "firebase-admin"

const serviceAccountKey = process.env.FIREBASE_ADMIN_SDK_JSON

if (!admin.apps.length) {
  if (!serviceAccountKey) {
    console.warn("Firebase Admin SDK JSON is not set. Some backend features like seeding might not work.")
  } else {
    try {
      admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(serviceAccountKey)),
      })
      console.log("Firebase Admin SDK initialized successfully.")
    } catch (error) {
      console.error("Error initializing Firebase Admin SDK:", error)
    }
  }
}

const firestoreAdmin = admin.apps.length ? admin.firestore() : null
const authAdmin = admin.apps.length ? admin.auth() : null
const storageAdmin = admin.apps.length ? admin.storage() : null

export { firestoreAdmin, authAdmin, storageAdmin, admin }

export async function verifyFirebaseIdToken(token: string) {
  if (!authAdmin) {
    throw new Error("Firebase Admin Auth is not initialized.")
  }
  try {
    const decodedToken = await authAdmin.verifyIdToken(token)
    return decodedToken
  } catch (error) {
    console.error("Error verifying Firebase ID token:", error)
    throw new Error("Invalid or expired token.")
  }
}
