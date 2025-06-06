import { NextResponse } from "next/server"
import { getUserSightings as fetchUserSightingsService } from "@/lib/services/bird.service"
import { verifyFirebaseIdToken } from "@/lib/firebase/firebase-admin";

export async function GET(request: Request, { params }: { params: Promise<{ userId: string }> }) {
  try {
    // Optional: Secure this endpoint so only the user themselves or admins can access
    const resolvedParams = await params;
    const userId = resolvedParams.userId;

    const authorization = request.headers.get("Authorization");
    if (authorization) {
      const idToken = authorization.split("Bearer ")[1];
      const decodedToken = await verifyFirebaseIdToken(idToken);
      if (decodedToken.uid !== userId) {
        // Or if not an admin
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    } else {
      // Or if public access to user sightings is not allowed
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("userId : " + userId)

    const sightings = await fetchUserSightingsService(userId)
    return NextResponse.json(sightings)
  } catch (error: any) {
    console.error(`Error fetching sightings for user ${(await params).userId}:`, error)
    return NextResponse.json({ error: error.message || "Failed to fetch user sightings" }, { status: 500 })
  }
}

