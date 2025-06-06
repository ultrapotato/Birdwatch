import { NextResponse } from "next/server"
import { createForumReply, getRepliesForThread } from "@/lib/services/forum.service"
import { verifyFirebaseIdToken } from "@/lib/firebase/firebase-admin"

export async function GET(request: Request, { params }: { params: { threadId: string } }) {
  try {
    const replies = await getRepliesForThread(params.threadId)
    return NextResponse.json(replies)
  } catch (error: any) {
    console.error(`Error fetching replies for thread ${params.threadId}:`, error)
    return NextResponse.json({ error: error.message || "Failed to fetch replies" }, { status: 500 })
  }
}

export async function POST(request: Request, { params }: { params: { threadId: string } }) {
  try {
    const authorization = request.headers.get("Authorization")
    if (!authorization?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const idToken = authorization.split("Bearer ")[1]
    const decodedToken = await verifyFirebaseIdToken(idToken)

    const replyData = await request.json()
    // Validate replyData here

    const newReply = await createForumReply(
      params.threadId,
      replyData,
      decodedToken.uid,
      decodedToken.name || "Anonymous",
      decodedToken.picture,
    )
    return NextResponse.json(newReply, { status: 201 })
  } catch (error: any)
  \
    console.error("Error creating forum reply:", error)
  if (error.message === "Invalid or expired token.") {
    return NextResponse.json({ error: error.message }, { status: 403 })
  }
  return NextResponse.json({ error: error.message || "Failed to create forum reply" }, { status: 500 })
}
}
