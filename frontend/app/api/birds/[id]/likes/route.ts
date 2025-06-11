import { verifyFirebaseIdToken } from "@/lib/firebase/firebase-admin"
import { incrementBirdLikeCount } from "@/lib/services/bird.service"
import { NextResponse } from "next/server"

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const authorization = request.headers.get("Authorization")
    if (!authorization?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const idToken = authorization.split("Bearer ")[1]
    await verifyFirebaseIdToken(idToken)

    const updatedSighting = await incrementBirdLikeCount(params.id)
    return NextResponse.json(updatedSighting)
  } catch (error: any) {
    console.error("Error incrementing likes:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
