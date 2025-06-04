"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { getUserSightings } from "@/lib/api/birds"
import { Edit, Trash2 } from "lucide-react"

interface UserSightingsProps {
  userId: string
}

export default function UserSightings({ userId }: UserSightingsProps) {
  const [sightings, setSightings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSightings = async () => {
      try {
        const data = await getUserSightings(userId)
        setSightings(data)
      } catch (error) {
        console.error("Error fetching user sightings:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSightings()
  }, [userId])

  if (loading) {
    return <div className="text-center py-4">Loading your sightings...</div>
  }

  if (sightings.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground mb-4">You haven&apos;t reported any bird sightings yet.</p>
        <Link href="/birds/new" passHref>
          <Button className="bg-green-600 hover:bg-green-700">Report Your First Sighting</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {sightings.map((sighting) => (
        <Card key={sighting.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{sighting.species}</CardTitle>
              <div className="flex space-x-1">
                <Link href={`/birds/edit/${sighting.id}`} passHref>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="flex flex-col space-y-1">
              <p className="text-sm text-muted-foreground">
                {sighting.location} • {sighting.date} {sighting.time}
              </p>
              <p className="text-sm line-clamp-2">{sighting.description}</p>
            </div>
          </CardContent>
          <CardFooter className="pt-0 flex flex-wrap gap-1">
            {sighting.tags.slice(0, 3).map((tag: string) => (
              <Badge key={tag} variant="outline" className="bg-green-50">
                {tag}
              </Badge>
            ))}
            <div className="ml-auto text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(sighting.createdAt), { addSuffix: true })}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
