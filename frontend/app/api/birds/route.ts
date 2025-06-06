import { NextResponse } from "next/server"
import { createBirdSighting, getRecentSightings, getSortedBirdSightings, searchBirdSightings } from "@/lib/services/bird.service"
import { verifyFirebaseIdToken } from "@/lib/firebase/firebase-admin"

// GET recent sightings or search
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("query")
  const taxonomy = searchParams.get("taxonomy") || undefined
  const location = searchParams.get("location") || undefined
  const flightPattern = searchParams.get("flightPattern") || undefined
  const sortParam = searchParams.get("sort")
  const allowedSorts = ["recent", "popular", "rare", "az"] as const
  const sort = allowedSorts.includes(sortParam as any)
    ? (sortParam as typeof allowedSorts[number])
    : "recent"

  try {
    if (query || taxonomy || location || flightPattern) {
      console.log("falling forth")

      const searchResults = await searchBirdSightings({ query: query || undefined, taxonomy, location, flightPattern, sort })
      return NextResponse.json(searchResults)
    } else {
      console.log(query)
      console.log("falling back")
      const sightings = await getSortedBirdSightings(sort, 10) // Default to 10 recent sightings
      return NextResponse.json(sightings)
    }
  } catch (error: any) {
    console.error("Error fetching birds:", error)
    return NextResponse.json({ error: error.message || "Failed to fetch birds" }, { status: 500 })
  }
}

// POST a new bird sighting
export async function POST(request: Request) {
  try {
    const authorization = request.headers.get("Authorization")
    if (!authorization?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const idToken = authorization.split("Bearer ")[1]
    const decodedToken = await verifyFirebaseIdToken(idToken)

    const sightingData = await request.json()
    // Validate sightingData here

    const newSighting = await createBirdSighting(
      sightingData,
      decodedToken.uid,
      decodedToken.name || "Anonymous",
      decodedToken.picture,
    )
    return NextResponse.json(newSighting, { status: 201 })
  } catch (error: any) {
    console.error("Error creating bird sighting:", error)
    if (error.message === "Invalid or expired token.") {
      return NextResponse.json({ error: error.message }, { status: 403 })
    }
    return NextResponse.json({ error: error.message || "Failed to create bird sighting" }, { status: 500 })
  }
}
