import { NextResponse } from "next/server"
import { createForumThread, getAllForumThreads } from "@/lib/services/forum.service"
import { verifyFirebaseIdToken } from "@/lib/firebase/firebase-admin"

export async function GET() {
  try {
    const threads = await getAllForumThreads()
    return NextResponse.json(threads)
  } catch (error: any) {
    console.error("Error fetching forum threads:", error)
    return NextResponse.json({ error: error.message || "Failed to fetch forum threads" }, { status: 500 })
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

    const threadData = await request.json()
    // Validate threadData here

    const newThread = await createForumThread(
      threadData,
      decodedToken.uid,
      decodedToken.name || "Anonymous",
      decodedToken.picture,
    )
    return NextResponse.json(newThread, { status: 201 })
  } catch (error: any) {
    console.error("Error creating forum thread:", error)
    if (error.message === "Invalid or expired token.") {
      return NextResponse.json({ error: error.message }, { status: 403 })
    }
    return NextResponse.json({ error: error.message || "Failed to create forum thread" }, { status: 500 })
  }
}
