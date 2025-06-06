import { NextResponse } from "next/server"
import { updateAlert, deleteAlert, getAlertById } from "@/lib/services/alert.service"
import { verifyFirebaseIdToken } from "@/lib/firebase/firebase-admin"
import type { UserAlert } from "@/lib/models/alert.models"

interface AlertParams {
  params: {
    alertId: string
  }
}

// Helper to check ownership
async function authorizeOwner(alertId: string, userId: string): Promise<UserAlert | null> {
  const alert = await getAlertById(alertId)
  if (!alert) {
    return null
  }
  if (alert.userId !== userId) {
    throw new Error("User not authorized to modify this alert.")
  }
  return alert
}

export async function PUT(request: Request, { params }: AlertParams) {
  const { alertId } = params
  try {
    const authorization = request.headers.get("Authorization")
    if (!authorization?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const idToken = authorization.split("Bearer ")[1]
    const decodedToken = await verifyFirebaseIdToken(idToken)

    await authorizeOwner(alertId, decodedToken.uid) // Throws if not owner or alert not found

    const updates = (await request.json()) as Partial<UserAlert>
    // Basic validation: ensure no critical fields like userId are changed via this route
    if (updates.userId || updates.id || updates.createdAt) {
      return NextResponse.json({ error: "Cannot update restricted fields." }, { status: 400 })
    }

    const updatedAlert = await updateAlert(alertId, updates)
    if (!updatedAlert) {
      return NextResponse.json({ error: "Alert not found or update failed" }, { status: 404 })
    }
    return NextResponse.json(updatedAlert)
  } catch (error: any) {
    console.error(`Error updating alert ${alertId}:`, error)
    if (error.message === "Invalid or expired token.") {
      return NextResponse.json({ error: error.message }, { status: 403 })
    }
    if (error.message === "User not authorized to modify this alert.") {
      return NextResponse.json({ error: error.message }, { status: 403 })
    }
    return NextResponse.json({ error: error.message || "Failed to update alert" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: AlertParams) {
  const { alertId } = params
  try {
    const authorization = request.headers.get("Authorization")
    if (!authorization?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const idToken = authorization.split("Bearer ")[1]
    const decodedToken = await verifyFirebaseIdToken(idToken)

    await authorizeOwner(alertId, decodedToken.uid) // Throws if not owner or alert not found

    await deleteAlert(alertId)
    return NextResponse.json({ message: "Alert deleted successfully" }, { status: 200 })
  } catch (error: any) {
    console.error(`Error deleting alert ${alertId}:`, error)
    if (error.message === "Invalid or expired token.") {
      return NextResponse.json({ error: error.message }, { status: 403 })
    }
    if (error.message === "User not authorized to modify this alert.") {
      return NextResponse.json({ error: error.message }, { status: 403 })
    }
    return NextResponse.json({ error: error.message || "Failed to delete alert" }, { status: 500 })
  }
}
