"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, TelescopeIcon as Binoculars, Users, TrendingUp } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ExplorePage() {
  const router = useRouter()
  // Hardcoded hotspots data for demonstration

  const hotspots = [
    {
      id: "1",
      name: "Central Park",
      location: "New York, NY",
      description: "One of the best urban birding locations in the world, with over 280 species recorded.",
      imageUrl: "/placeholder.svg?height=300&width=500&query=central park birding",
      speciesCount: 280,
      recentSpecies: ["Northern Cardinal", "Red-tailed Hawk", "American Robin", "Blue Jay"],
      activity: "High",
    },
    {
      id: "2",
      name: "Point Reyes National Seashore",
      location: "Marin County, CA",
      description:
        "Diverse habitats including coastal beaches, estuaries, and forests support a wide variety of birds.",
      imageUrl: "/placeholder.svg?height=300&width=500&query=point reyes birding",
      speciesCount: 490,
      recentSpecies: ["Snowy Plover", "Peregrine Falcon", "Tufted Puffin", "Black Oystercatcher"],
      activity: "Medium",
    },
    {
      id: "3",
      name: "Everglades National Park",
      location: "Florida",
      description: "Vast wetlands providing habitat for numerous wading birds and other species.",
      imageUrl: "/placeholder.svg?height=300&width=500&query=everglades birds",
      speciesCount: 360,
      recentSpecies: ["Roseate Spoonbill", "Wood Stork", "Great Blue Heron", "Anhinga"],
      activity: "High",
    },
    {
      id: "4",
      name: "Cape May",
      location: "New Jersey",
      description: "World-famous migration hotspot, especially during fall migration.",
      imageUrl: "/placeholder.svg?height=300&width=500&query=cape may birding",
      speciesCount: 430,
      recentSpecies: ["Black-throated Blue Warbler", "Blackburnian Warbler", "Piping Plover", "American Oystercatcher"],
      activity: "Very High",
    },
    {
      id: "5",
      name: "Magee Marsh",
      location: "Oak Harbor, OH",
      description: "Known as the 'Warbler Capital of the World' during spring migration.",
      imageUrl: "/placeholder.svg?height=300&width=500&query=magee marsh warblers",
      speciesCount: 320,
      recentSpecies: [
        "Blackburnian Warbler",
        "Prothonotary Warbler",
        "American Redstart",
        "Black-throated Green Warbler",
      ],
      activity: "Medium",
    },
    {
      id: "6",
      name: "Monterey Bay",
      location: "California",
      description: "Prime location for pelagic birding with excellent opportunities to see seabirds.",
      imageUrl: "/placeholder.svg?height=300&width=500&query=monterey bay seabirds",
      speciesCount: 380,
      recentSpecies: ["Black-footed Albatross", "Sooty Shearwater", "Common Murre", "Rhinoceros Auklet"],
      activity: "Medium",
    },
  ]

  // Hardcoded events data for demonstration
  const events = [
    {
      id: "1",
      name: "Spring Migration Bird Walk",
      location: "Central Park, New York, NY",
      date: "2023-05-20",
      time: "7:00 AM - 10:00 AM",
      description: "Join experienced guides to observe spring migrants in Central Park.",
      organizer: "NYC Audubon",
      attendees: 18,
      imageUrl: "/placeholder.svg?height=200&width=400&query=bird watching group",
    },
    {
      id: "2",
      name: "Shorebird Identification Workshop",
      location: "Jamaica Bay Wildlife Refuge, Queens, NY",
      date: "2023-05-27",
      time: "8:30 AM - 12:00 PM",
      description: "Learn to identify confusing shorebirds with expert guidance.",
      organizer: "Queens Bird Club",
      attendees: 12,
      imageUrl: "/placeholder.svg?height=200&width=400&query=shorebird identification",
    },
    {
      id: "3",
      name: "Owl Prowl Night Hike",
      location: "Great Swamp National Wildlife Refuge, NJ",
      date: "2023-06-03",
      time: "8:00 PM - 10:00 PM",
      description: "Evening walk to listen for and possibly spot owls in their natural habitat.",
      organizer: "NJ Audubon",
      attendees: 15,
      imageUrl: "/placeholder.svg?height=200&width=400&query=owl night hike",
    },
  ]

  // Hardcoded trending species data for demonstration
  const trendingSpecies = [
    {
      id: "1",
      species: "Painted Bunting",
      location: "Central Park, New York, NY",
      date: "2023-05-15",
      rarity: "Rare",
      imageUrl: "/placeholder.svg?height=100&width=100&query=painted bunting",
      reportCount: 24,
    },
    {
      id: "2",
      species: "Snowy Owl",
      location: "Jones Beach, Long Island, NY",
      date: "2023-05-14",
      rarity: "Rare",
      imageUrl: "/placeholder.svg?height=100&width=100&query=snowy owl",
      reportCount: 18,
    },
    {
      id: "3",
      species: "Prothonotary Warbler",
      location: "Prospect Park, Brooklyn, NY",
      date: "2023-05-16",
      rarity: "Uncommon",
      imageUrl: "/placeholder.svg?height=100&width=100&query=prothonotary warbler",
      reportCount: 15,
    },
    {
      id: "4",
      species: "Evening Grosbeak",
      location: "Bear Mountain State Park, NY",
      date: "2023-05-13",
      rarity: "Uncommon",
      imageUrl: "/placeholder.svg?height=100&width=100&query=evening grosbeak",
      reportCount: 12,
    },
    {
      id: "5",
      species: "Cerulean Warbler",
      location: "Sterling Forest State Park, NY",
      date: "2023-05-15",
      rarity: "Uncommon",
      imageUrl: "/placeholder.svg?height=100&width=100&query=cerulean warbler",
      reportCount: 10,
    },
  ]

  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Explore</h1>
          <p className="text-muted-foreground">Discover birding hotspots, events, and trending sightings.</p>
        </div>

        <div className="aspect-[21/9] relative rounded-lg overflow-hidden">
          <img
            src="/placeholder.svg?height=600&width=1400&query=interactive birding map with hotspots"
            alt="Birding map"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
            <h2 className="text-white text-2xl font-bold mb-2">Find Birding Hotspots Near You</h2>
            <p className="text-white/90 mb-4 max-w-2xl">
              Explore the best locations for bird watching based on recent sightings, species diversity, and community
              recommendations.
            </p>
            <Button onClick={() => router.push("/birds-nearby")}
              className="bg-green-600 hover:bg-green-700 w-fit">
              <MapPin className="mr-2 h-4 w-4" />
              Find Nearby Hotspots
            </Button>
          </div>
        </div>

        <Tabs defaultValue="hotspots" className="space-y-6">
          <TabsList>
            <TabsTrigger value="hotspots">
              <MapPin className="h-4 w-4 mr-2" />
              Hotspots
            </TabsTrigger>
            <TabsTrigger value="events">
              <Calendar className="h-4 w-4 mr-2" />
              Events
            </TabsTrigger>
            <TabsTrigger value="trending">
              <TrendingUp className="h-4 w-4 mr-2" />
              Trending
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hotspots" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotspots.map((hotspot) => (
                <Card key={hotspot.id} className="overflow-hidden">
                  <div className="aspect-video relative">
                    <img
                      src={hotspot.imageUrl || "/placeholder.svg"}
                      alt={hotspot.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge
                        className={`
                        ${hotspot.activity === "Very High"
                            ? "bg-red-500"
                            : hotspot.activity === "High"
                              ? "bg-orange-500"
                              : hotspot.activity === "Medium"
                                ? "bg-yellow-500"
                                : "bg-blue-500"
                          }
                      `}
                      >
                        {hotspot.activity} Activity
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle>{hotspot.name}</CardTitle>
                    <CardDescription className="flex items-center">
                      <MapPin className="h-3.5 w-3.5 mr-1" />
                      {hotspot.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm mb-2">{hotspot.description}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Binoculars className="h-3.5 w-3.5 mr-1" />
                      <span>{hotspot.speciesCount} species recorded</span>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm font-medium mb-1">Recent sightings:</p>
                      <div className="flex flex-wrap gap-1">
                        {hotspot.recentSpecies.map((species, index) => (
                          <Badge key={index} variant="outline" className="bg-green-50">
                            {species}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View Hotspot
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="flex justify-center">
              <Button variant="outline">View All Hotspots</Button>
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <Card key={event.id} className="overflow-hidden">
                  <div className="aspect-[2/1]">
                    <img
                      src={event.imageUrl || "/placeholder.svg"}
                      alt={event.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle>{event.name}</CardTitle>
                    <CardDescription className="flex items-center">
                      <MapPin className="h-3.5 w-3.5 mr-1" />
                      {event.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2 space-y-2">
                    <div className="flex items-center text-sm">
                      <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                      <span>
                        {event.date}, {event.time}
                      </span>
                    </div>
                    <p className="text-sm">{event.description}</p>
                    <div className="flex items-center text-sm">
                      <Users className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                      <span>
                        {event.attendees} attending • Organized by {event.organizer}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      Details
                    </Button>
                    <Button className="flex-1 bg-green-600 hover:bg-green-700">RSVP</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="flex justify-center">
              <Button variant="outline">View All Events</Button>
            </div>
          </TabsContent>

          <TabsContent value="trending" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Trending Sightings</CardTitle>
                <CardDescription>Rare and notable birds recently reported in your area</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trendingSpecies.map((species) => (
                    <Link href={`/birds/search?species=${encodeURIComponent(species.species)}`} key={species.id}>
                      <div className="flex items-center space-x-4 p-2 rounded-md hover:bg-gray-50 transition-colors">
                        <img
                          src={species.imageUrl || "/placeholder.svg"}
                          alt={species.species}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium truncate">{species.species}</p>
                            <Badge
                              className={`
                              ${species.rarity === "Rare"
                                  ? "bg-red-500"
                                  : species.rarity === "Uncommon"
                                    ? "bg-orange-500"
                                    : "bg-blue-500"
                                }
                            `}
                            >
                              {species.rarity}
                            </Badge>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span className="truncate">{species.location}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{species.reportCount}</p>
                          <p className="text-xs text-muted-foreground">reports</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Migration Activity</CardTitle>
                  <CardDescription>Current bird migration patterns in your region</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-[4/3] relative bg-gray-100 rounded-md overflow-hidden">
                    <img
                      src="/placeholder.svg?height=300&width=400&query=bird migration map radar"
                      alt="Migration radar"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-gray-500">Migration radar visualization</p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-medium">Current Migration Status:</p>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "65%" }}></div>
                      </div>
                      <span className="ml-2 text-sm font-medium">65%</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Spring migration is in full swing. Warblers, thrushes, and other neotropical migrants are moving
                      through the region.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Seasonal Highlights</CardTitle>
                  <CardDescription>Birds to look for this season</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <img
                        src="/placeholder.svg?height=80&width=80&query=scarlet tanager"
                        alt="Scarlet Tanager"
                        className="w-16 h-16 rounded-md object-cover"
                      />
                      <div>
                        <p className="font-medium">Scarlet Tanager</p>
                        <p className="text-sm text-muted-foreground">
                          Look for this brilliant red bird with black wings in deciduous forests during May.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <img
                        src="/placeholder.svg?height=80&width=80&query=blackburnian warbler"
                        alt="Blackburnian Warbler"
                        className="w-16 h-16 rounded-md object-cover"
                      />
                      <div>
                        <p className="font-medium">Blackburnian Warbler</p>
                        <p className="text-sm text-muted-foreground">
                          This "firethroat" warbler can be found in mixed forests, especially in the canopy.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <img
                        src="/placeholder.svg?height=80&width=80&query=baltimore oriole"
                        alt="Baltimore Oriole"
                        className="w-16 h-16 rounded-md object-cover"
                      />
                      <div>
                        <p className="font-medium">Baltimore Oriole</p>
                        <p className="text-sm text-muted-foreground">
                          Listen for their flute-like song in open woodlands and suburban areas.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
