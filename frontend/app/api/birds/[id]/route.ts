import { NextResponse } from "next/server"
import { getBirdSightingById } from "@/lib/services/bird.service"

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = await context.params
    const sighting = await getBirdSightingById(id)

    if (!sighting) {
      return NextResponse.json({ error: "Sighting not found" }, { status: 404 })
    }

    return NextResponse.json(sighting)
  } catch (error: any) {
    console.error(`Error fetching sighting ${context.params.id}:`, error)
    return NextResponse.json(
      { error: error.message || "Failed to fetch sighting" },
      { status: 500 }
    )
  }
}
