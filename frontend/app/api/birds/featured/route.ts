import { NextResponse } from "next/server"
import { getFeaturedBirdSightings } from "@/lib/services/bird.service"

export async function GET() {
  try {
    const sightings = await getFeaturedBirdSightings(3)
    return NextResponse.json(sightings)
  } catch (error: any) {
    console.error("Error fetching featured birds:", error)
    return NextResponse.json({ error: error.message || "Failed to fetch featured birds" }, { status: 500 })
  }
}
