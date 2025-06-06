import { NextResponse } from "next/server"
import { createAlert, getUserAlerts } from "@/lib/services/alert.service"
import { verifyFirebaseIdToken } from "@/lib/firebase/firebase-admin"

export async function GET(request: Request) {
  try {
    const authorization = request.headers.get("Authorization")
    if (!authorization?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const idToken = authorization.split("Bearer ")[1]
    const decodedToken = await verifyFirebaseIdToken(idToken)

    const alerts = await getUserAlerts(decodedToken.uid)
    return NextResponse.json(alerts)
  } catch (error: any) {
    console.error("Error fetching user alerts:", error)
    if (error.message === "Invalid or expired token.") {
      return NextResponse.json({ error: error.message }, { status: 403 })
    }
    return NextResponse.json({ error: error.message || "Failed to fetch user alerts" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const authorization = request.headers.get("Authorization")
    if (!authorization?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const idToken = authorization.split("Bearer ")[1]
    const decodedToken = await verifyFirebaseIdToken(idToken)

    const alertData = await request.json()
    // Validate alertData here

    const newAlert = await createAlert(alertData, decodedToken.uid)
    return NextResponse.json(newAlert, { status: 201 })
  } catch (error: any) {
    console.error("Error creating alert:", error)
    if (error.message === "Invalid or expired token.") {
      return NextResponse.json({ error: error.message }, { status: 403 })
    }
    return NextResponse.json({ error: error.message || "Failed to create alert" }, { status: 500 })
  }
}
