"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { getRecentSightings } from "@/lib/api/birds"

export default function RecentSightings() {
  const [sightings, setSightings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSightings = async () => {
      try {
        const data = await getRecentSightings()
        setSightings(data)
      } catch (error) {
        console.error("Error fetching recent sightings:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSightings()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden">
            <div className="h-40 bg-gray-200 animate-pulse" />
            <CardContent className="p-4">
              <div className="h-6 bg-gray-200 animate-pulse rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {sightings.map((sighting) => (
        <Link href={`/birds/${sighting.id}`} key={sighting.id} passHref>
          <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer h-full flex flex-col">
            <div className="relative h-40 overflow-hidden">
              <img
                src={
                  sighting.imageUrl ||
                  `/placeholder.svg?height=300&width=400&query=${encodeURIComponent(sighting.species)}`
                }
                alt={sighting.species}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4 flex-1">
              <h3 className="font-bold text-lg mb-1">{sighting.species}</h3>
              <p className="text-sm text-muted-foreground mb-2">{sighting.location}</p>
              <div className="flex items-center mt-2">
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarImage src={sighting.userPhotoURL || "/placeholder.svg?height=24&width=24&query=user"} />
                  <AvatarFallback>{sighting.userName?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground">
                  {sighting.userName} • {formatDistanceToNow(new Date(sighting.createdAt), { addSuffix: true })}
                </span>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex flex-wrap gap-1">
              {sighting.tags.slice(0, 3).map((tag: string) => (
                <Badge key={tag} variant="outline" className="bg-green-50">
                  {tag}
                </Badge>
              ))}
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}
