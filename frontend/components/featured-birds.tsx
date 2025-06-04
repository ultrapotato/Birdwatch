"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getFeaturedBirds } from "@/lib/api/birds"

export default function FeaturedBirds() {
  const [birds, setBirds] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBirds = async () => {
      try {
        const data = await getFeaturedBirds()
        setBirds(data)
      } catch (error) {
        console.error("Error fetching featured birds:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBirds()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden">
            <div className="h-48 bg-gray-200 animate-pulse" />
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      {birds.map((bird) => (
        <Link href={`/birds/${bird.id}`} key={bird.id} passHref>
          <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer h-full flex flex-col">
            <div className="relative h-48 overflow-hidden">
              <img
                src={bird.imageUrl || `/placeholder.svg?height=300&width=400&query=${encodeURIComponent(bird.species)}`}
                alt={bird.species}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4 flex-1">
              <h3 className="font-bold text-lg mb-1">{bird.species}</h3>
              <p className="text-sm text-muted-foreground mb-2">{bird.location}</p>
              <p className="text-sm line-clamp-3">{bird.description}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex flex-wrap gap-1">
              {bird.tags.slice(0, 3).map((tag: string) => (
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
