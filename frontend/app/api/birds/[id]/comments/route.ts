import { NextResponse } from "next/server"
import { addCommentToSighting, getSightingComments } from "@/lib/services/bird.service"
import { verifyFirebaseIdToken } from "@/lib/firebase/firebase-admin"

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = await context.params
    const comments = await getSightingComments(id)
    return NextResponse.json(comments)
  } catch (error: any) {
    console.error(`Error fetching comments for sighting ${context.params.id}:`, error)
    return NextResponse.json(
      { error: error.message || "Failed to fetch comments" },
      { status: 500 }
    )
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

    const { sightingId, comments } = await request.json()

    if (decodedToken.uid !== comments.userId) {
      return NextResponse.json({ error: "User mismatch" }, { status: 403 })
    }

    const newComment = await addCommentToSighting(sightingId, comments)

    return NextResponse.json(newComment, { status: 201 })
  } catch (error: any) {
    console.error("Error posting comment:", error)

    if (error.message === "Invalid or expired token.") {
      return NextResponse.json({ error: error.message }, { status: 403 })
    }

    return NextResponse.json(
      { error: error.message || "Failed to post comment" },
      { status: 500 }
    )
  }
}
