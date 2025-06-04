"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, Grid3X3, List, MapPin, Search } from "lucide-react"
import BirdCard from "@/components/bird-card"
import BirdListItem from "@/components/bird-list-item"
import { useEffect, useState } from "react"
import { BirdEntry, getAllBirds } from "@/lib/api/birds"

export default function BirdsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [birds, setBirds] = useState<BirdEntry[]>([])
  const [loading, setLoading] = useState(true)

  // Hardcoded birds data for demonstration

  useEffect(() => {
    const fetchBirds = async () => {
      try {
        const aBirds = await getAllBirds()
        setBirds(aBirds)
      } catch (error) {
        console.error("Error fetching alerts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBirds()
  })




  const filteredBirds = birds.filter((bird) =>
    bird.species.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bird.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bird.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Birds</h1>
          <p className="text-muted-foreground">Explore bird sightings from around the world.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search birds..." className="pl-8" />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Select defaultValue="recent">
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="rare">Rarity</SelectItem>
                <SelectItem value="az">A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="grid" className="space-y-4">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="grid">
                <Grid3X3 className="h-4 w-4 mr-2" />
                Grid
              </TabsTrigger>
              <TabsTrigger value="list">
                <List className="h-4 w-4 mr-2" />
                List
              </TabsTrigger>
              <TabsTrigger value="map">
                <MapPin className="h-4 w-4 mr-2" />
                Map
              </TabsTrigger>
            </TabsList>
            <Link href="/birds/new" passHref>
              <Button className="bg-green-600 hover:bg-green-700">Report Sighting</Button>
            </Link>
          </div>

          <TabsContent value="grid" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBirds.map((bird) => (
                <BirdCard key={bird.id} bird={bird} />
              ))}
            </div>
            <div className="flex justify-center">
              <Button variant="outline">Load More</Button>
            </div>
          </TabsContent>

          <TabsContent value="list" className="space-y-4">
            <div className="space-y-4">
              {filteredBirds.map((bird) => (
                <BirdListItem key={bird.id} bird={bird} />
              ))}
            </div>
            <div className="flex justify-center">
              <Button variant="outline">Load More</Button>
            </div>
          </TabsContent>

          <TabsContent value="map" className="space-y-4">
            <Card>
              <CardContent className="p-0">
                <div className="aspect-[16/9] relative bg-gray-100 rounded-md overflow-hidden">
                  <img
                    src="/placeholder.svg?height=600&width=1200&query=bird sightings map with pins"
                    alt="Bird sightings map"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-gray-500">Interactive map will be implemented here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredBirds.slice(0, 6).map((bird) => (
                <div key={bird.id} className="flex items-start space-x-2 p-2 border rounded-md">
                  <MapPin className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <Link href={`/birds/${bird.id}`} className="font-medium hover:underline">
                      {bird.species}
                    </Link>
                    <p className="text-sm text-muted-foreground">{bird.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
