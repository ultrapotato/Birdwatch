import { NextResponse } from "next/server"
import { getRecentSightings } from "@/lib/services/bird.service"

export async function GET() {
  try {
    const sightings = await getRecentSightings(6) // Adjust limit as needed
    return NextResponse.json(sightings)
  } catch (error: any) {
    console.error("Error fetching recent sightings:", error)
    return NextResponse.json({ error: error.message || "Failed to fetch recent sightings" }, { status: 500 })
  }
}
