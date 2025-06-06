import { NextResponse } from "next/server"
import { deleteBirdSighting } from "@/lib/services/bird.service"
import { verifyFirebaseIdToken } from "@/lib/firebase/firebase-admin";

export async function DELETE(request: Request, { params }: { params: { userId: string, sightingId: string } }) {
  try {
    const authorization = request.headers.get("Authorization");
    if (authorization) {
      const idToken = authorization.split("Bearer ")[1];
      const decodedToken = await verifyFirebaseIdToken(idToken);
      if (decodedToken.uid !== params.userId) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    } else {
       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const success = await deleteBirdSighting(params.sightingId, params.userId)

    if (!success) {
      return NextResponse.json({ error: "Not found or not authorized" }, { status: 404 })
    }

    return new NextResponse(null, { status: 204 }) // No Content
  } catch (error: any) {
    console.error("Error deleting sighting:", error)
    return NextResponse.json({ error: error.message || "Failed to delete sighting" }, { status: 500 })
  }
}

