import { NextResponse } from "next/server"
import { getBirdSightingById } from "@/lib/services/bird.service"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const sighting = await getBirdSightingById(params.id)
    if (!sighting) {
      return NextResponse.json({ error: "Sighting not found" }, { status: 404 })
    }
    return NextResponse.json(sighting)
  } catch (error: any) {
    console.error(`Error fetching sighting ${params.id}:`, error)
    return NextResponse.json({ error: error.message || "Failed to fetch sighting" }, { status: 500 })
  }
}