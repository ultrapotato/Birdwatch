"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { MapPin, Calendar, Search, Filter, List, MapIcon, Bird } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

export default function BirdsNearbyPage() {
  const [distance, setDistance] = useState([10])
  const [location, setLocation] = useState("New York, NY")
  const [view, setView] = useState("list")

  // Hardcoded nearby birds data for demonstration
  const nearbyBirds = [
    {
      id: "1",
      species: "Northern Cardinal",
      location: "Central Park, New York",
      distance: 1.2,
      description: "Bright red male cardinal spotted near the lake. It was singing loudly from a maple tree branch.",
      imageUrl: "/placeholder.svg?height=300&width=400&query=red cardinal bird",
      tags: ["red", "songbird", "common"],
      createdAt: new Date().toISOString(),
      userName: "BirdWatcher123",
    },
    {
      id: "2",
      species: "American Robin",
      location: "Bryant Park, New York",
      distance: 1.8,
      description: "Robin pulling worms from the ground after a spring rain.",
      imageUrl: "/placeholder.svg?height=300&width=400&query=american robin bird",
      tags: ["common", "migratory", "songbird"],
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      userName: "RobinFan",
    },
    {
      id: "3",
      species: "Red-tailed Hawk",
      location: "Riverside Park, New York",
      distance: 2.5,
      description: "Hawk perched on a tall tree overlooking the Hudson River. Later seen soaring above the park.",
      imageUrl: "/placeholder.svg?height=300&width=400&query=red-tailed hawk",
      tags: ["raptor", "predator", "common"],
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      userName: "HawkSpotter",
    },
    {
      id: "4",
      species: "Yellow Warbler",
      location: "Prospect Park, Brooklyn",
      distance: 5.7,
      description: "Bright yellow warbler hopping between branches. Very active and vocal.",
      imageUrl: "/placeholder.svg?height=300&width=400&query=yellow warbler",
      tags: ["yellow", "warbler", "migratory"],
      createdAt: new Date(Date.now() - 259200000).toISOString(),
      userName: "WarblerWatcher",
    },
    {
      id: "5",
      species: "Great Blue Heron",
      location: "Jamaica Bay Wildlife Refuge, Queens",
      distance: 9.3,
      description: "Tall heron wading in shallow water, hunting for fish. Very patient and still.",
      imageUrl: "/placeholder.svg?height=300&width=400&query=great blue heron",
      tags: ["wader", "wetland", "large"],
      createdAt: new Date(Date.now() - 345600000).toISOString(),
      userName: "HeronLover",
    },
    {
      id: "6",
      species: "Black-capped Chickadee",
      location: "Inwood Hill Park, Manhattan",
      distance: 7.1,
      description: "Small chickadee calling and foraging in a mixed flock with titmice and nuthatches.",
      imageUrl: "/placeholder.svg?height=300&width=400&query=black-capped chickadee",
      tags: ["small", "forest", "common"],
      createdAt: new Date(Date.now() - 432000000).toISOString(),
      userName: "ChickadeeFan",
    },
  ]

  // Hardcoded hotspots data for demonstration
  const hotspots = [
    {
      id: "1",
      name: "Central Park",
      location: "Manhattan, New York",
      distance: 1.2,
      description: "Urban park with diverse habitats including woodlands, lakes, and meadows.",
      recentSpecies: ["Northern Cardinal", "Red-tailed Hawk", "American Robin", "Blue Jay"],
      speciesCount: 280,
      imageUrl: "/placeholder.svg?height=300&width=500&query=central park birding",
    },
    {
      id: "2",
      name: "Prospect Park",
      location: "Brooklyn, New York",
      distance: 5.7,
      description: "Large park with a lake, woodlands, and open areas that attract a variety of birds.",
      recentSpecies: ["Yellow Warbler", "Baltimore Oriole", "Wood Thrush", "Great Egret"],
      speciesCount: 250,
      imageUrl: "/placeholder.svg?height=300&width=500&query=prospect park birding",
    },
    {
      id: "3",
      name: "Jamaica Bay Wildlife Refuge",
      location: "Queens, New York",
      distance: 9.3,
      description: "Coastal wetland with salt marshes, ponds, and upland areas. Great for shorebirds and waterfowl.",
      recentSpecies: ["Great Blue Heron", "Osprey", "Glossy Ibis", "American Oystercatcher"],
      speciesCount: 330,
      imageUrl: "/placeholder.svg?height=300&width=500&query=jamaica bay wildlife refuge",
    },
  ]

  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Birds Near You</h1>
          <p className="text-muted-foreground">Discover recent bird sightings and hotspots in your area.</p>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label htmlFor="location" className="text-sm font-medium">
                  Your Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    type="text"
                    placeholder="Enter your location"
                    className="pl-8"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Distance ({distance}mi)</label>
                <Slider value={distance} onValueChange={setDistance} max={50} step={1} className="py-4" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Time Period</label>
                <Select defaultValue="week">
                  <SelectTrigger>
                    <SelectValue placeholder="Select time period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">Last 24 Hours</SelectItem>
                    <SelectItem value="week">Last 7 Days</SelectItem>
                    <SelectItem value="month">Last 30 Days</SelectItem>
                    <SelectItem value="year">Last Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Button className="bg-green-600 hover:bg-green-700">
                <Search className="mr-2 h-4 w-4" />
                Find Birds
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="sightings" className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <TabsList>
              <TabsTrigger value="sightings">
                <Bird className="h-4 w-4 mr-2" />
                Recent Sightings
              </TabsTrigger>
              <TabsTrigger value="hotspots">
                <MapPin className="h-4 w-4 mr-2" />
                Hotspots
              </TabsTrigger>
            </TabsList>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <div className="border rounded-md flex">
                <Button
                  variant={view === "list" ? "default" : "ghost"}
                  size="sm"
                  className={view === "list" ? "bg-green-600 hover:bg-green-700" : ""}
                  onClick={() => setView("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant={view === "map" ? "default" : "ghost"}
                  size="sm"
                  className={view === "map" ? "bg-green-600 hover:bg-green-700" : ""}
                  onClick={() => setView("map")}
                >
                  <MapIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <TabsContent value="sightings" className="space-y-6">
            {view === "map" ? (
              <Card>
                <CardContent className="p-0">
                  <div className="aspect-[16/9] relative bg-gray-100 rounded-md overflow-hidden">
                    <img
                      src="/placeholder.svg?height=600&width=1200&query=bird sightings map with pins in New York"
                      alt="Bird sightings map"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-gray-500">Interactive map will be implemented here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {nearbyBirds.map((bird) => (
                    <Card key={bird.id} className="overflow-hidden">
                      <div className="aspect-video relative">
                        <img
                          src={bird.imageUrl || "/placeholder.svg"}
                          alt={bird.species}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-green-600">{bird.distance} mi away</Badge>
                        </div>
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle>
                          <Link href={`/birds/${bird.id}`} className="hover:underline">
                            {bird.species}
                          </Link>
                        </CardTitle>
                        <CardDescription className="flex items-center">
                          <MapPin className="h-3.5 w-3.5 mr-1" />
                          {bird.location}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm line-clamp-2">{bird.description}</p>
                        <div className="flex items-center mt-2 text-xs text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          <span>{formatDistanceToNow(new Date(bird.createdAt), { addSuffix: true })}</span>
                          <span className="mx-1">•</span>
                          <span>by {bird.userName}</span>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <div className="flex flex-wrap gap-1">
                          {bird.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="bg-green-50">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                <div className="flex justify-center">
                  <Button variant="outline">Load More</Button>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="hotspots" className="space-y-6">
            {view === "map" ? (
              <Card>
                <CardContent className="p-0">
                  <div className="aspect-[16/9] relative bg-gray-100 rounded-md overflow-hidden">
                    <img
                      src="/placeholder.svg?height=600&width=1200&query=birding hotspots map in New York"
                      alt="Birding hotspots map"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-gray-500">Interactive map will be implemented here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {hotspots.map((hotspot) => (
                  <Card key={hotspot.id}>
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3">
                        <img
                          src={hotspot.imageUrl || "/placeholder.svg"}
                          alt={hotspot.name}
                          className="w-full h-full object-cover md:rounded-l-lg"
                        />
                      </div>
                      <div className="md:w-2/3 p-6">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-xl font-bold">{hotspot.name}</h3>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <MapPin className="h-3.5 w-3.5 mr-1" />
                              {hotspot.location} • {hotspot.distance} mi away
                            </div>
                          </div>
                          <Badge className="bg-green-600">{hotspot.speciesCount} species</Badge>
                        </div>
                        <p className="text-sm mb-4">{hotspot.description}</p>
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Recent sightings:</p>
                          <div className="flex flex-wrap gap-1">
                            {hotspot.recentSpecies.map((species, index) => (
                              <Badge key={index} variant="outline" className="bg-green-50">
                                {species}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button variant="outline">View Details</Button>
                          <Button className="bg-green-600 hover:bg-green-700">Get Directions</Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
                <div className="flex justify-center">
                  <Button variant="outline">View All Hotspots</Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Birding Tips for Your Area</CardTitle>
            <CardDescription>Make the most of your bird watching experience in New York</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-medium">Seasonal Highlights</h3>
                <p className="text-sm">
                  Spring migration (April-May) brings warblers and other songbirds through the area. Fall migration
                  (August-October) is excellent for hawks and shorebirds. Winter is good for waterfowl and irruptive
                  species like snowy owls.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Local Specialties</h3>
                <p className="text-sm">
                  Look for peregrine falcons nesting on bridges and skyscrapers, piping plovers on coastal beaches, and
                  a variety of warblers in wooded parks during migration.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Best Times</h3>
                <p className="text-sm">
                  Early morning (dawn to 10 AM) is typically best for bird activity. For urban parks, weekdays are less
                  crowded than weekends.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Local Resources</h3>
                <p className="text-sm">
                  The New York City Audubon Society offers guided walks and resources. The Jamaica Bay Wildlife Refuge
                  Visitor Center has information about local birds.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View Complete Local Guide
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
