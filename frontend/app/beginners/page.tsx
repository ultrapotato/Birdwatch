"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, TelescopeIcon as Binoculars, BookOpen, MapPin, Camera, Users, ArrowRight, Router } from "lucide-react"
import { useRouter } from "next/navigation"
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react"
import { Bird, CommonBird, getCommonBirds } from "@/lib/api/birds"

export default function BeginnersGuidePage() {
  // Hardcoded steps for getting started
  const router = useRouter()
  const [commonBirds, setCommonBirds] = useState<CommonBird[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCommonBirds = async () => {
      try {
        const cBirds = await getCommonBirds()
        setCommonBirds(cBirds)
      } catch (error) {
        console.error("Error fetching alerts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCommonBirds()
  })


  const steps = [
    {
      id: "1",
      title: "Choose Your Equipment",
      description: "Start with a good pair of binoculars and a field guide. You don't need expensive gear to begin.",
      icon: <Binoculars className="h-8 w-8 text-green-600" />,
      imageUrl: "https://plus.unsplash.com/premium_photo-1723737604431-38f248fc5473?q=80&w=2923&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?height=300&width=500&query=bird watching binoculars",
      tips: [
        "For beginners, 8x42 binoculars offer a good balance of magnification and field of view",
        "Look for binoculars with good eye relief if you wear glasses",
        "Consider weight if you'll be carrying them for long periods",
        "A neck strap or harness will make carrying more comfortable",
      ],
    },
    {
      id: "2",
      title: "Learn Bird Identification Basics",
      description: "Focus on size, shape, color patterns, behavior, and habitat to identify birds.",
      icon: <BookOpen className="h-8 w-8 text-green-600" />,
      imageUrl: "https://images.unsplash.com/photo-1486365227551-f3f90034a57c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?height=300&width=500&query=bird identification guide",
      tips: [
        "Start with common birds in your area",
        "Pay attention to field marks - distinctive features that help identify a species",
        "Listen to bird songs and calls - they're often the first clue to a bird's presence",
        "Notice behavior - how a bird flies, feeds, and moves can be distinctive",
      ],
    },
    {
      id: "3",
      title: "Find Birding Locations",
      description: "Explore local parks, nature reserves, and even your backyard to find birds.",
      icon: <MapPin className="h-8 w-8 text-green-600" />,
      imageUrl: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?height=300&width=500&query=birding location park",
      tips: [
        "Local parks and nature centers are great places to start",
        "Water sources like lakes, ponds, and rivers attract many bird species",
        "Use the BirdWatch app to find hotspots near you",
        "Different habitats support different birds, so visit a variety of locations",
      ],
    },
    {
      id: "4",
      title: "Document Your Sightings",
      description: "Keep track of the birds you see with notes, photos, or using the BirdWatch app.",
      icon: <Camera className="h-8 w-8 text-green-600" />,
      imageUrl: "https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?height=300&width=500&query=birdwatcher taking notes",
      tips: [
        "Note the date, location, and conditions when you spot a bird",
        "Take photos if possible, but don't let photography distract from observation",
        "Record behavior and habitat details to help with identification later",
        "Use our app to log sightings and contribute to citizen science",
      ],
    },
    {
      id: "5",
      title: "Connect with Other Birders",
      description: "Join local bird clubs, online forums, or BirdWatch community to learn from others.",
      icon: <Users className="h-8 w-8 text-green-600" />,
      imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?height=300&width=500&query=bird watching group",
      tips: [
        "Experienced birders are usually happy to share knowledge",
        "Group outings can help you find and identify more birds",
        "Local Audubon chapters offer walks and workshops",
        "Online communities provide support and identification help",
      ],
    },
  ]

  // Hardcoded recommended equipment
  const equipment = [
    {
      id: "1",
      category: "Binoculars",
      items: [
        {
          name: "Nikon Monarch 5 8x42",
          description: "Excellent mid-range binoculars with great clarity and brightness.",
          price: "$$$",
          beginner: true,
          imageUrl: "https://images.cdn.us-central1.gcp.commercetools.com/f7c8f2bb-aff1-4581-a826-1ad2527be222/Back-M5_8x42_rear_le-Qv5_JPih-large.png?height=100&width=100&query=Nikon Monarch binoculars",
        },
        {
          name: "Vortex Diamondback HD 8x42",
          description: "Great value with HD glass and wide field of view.",
          price: "$$$",
          beginner: true,
          imageUrl: "https://vortexoptics.com/media/catalog/product/v/t/vtx_bin_diamondback2_42_f_w_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=338&width=578&canvas=578:338&dpr=2%202x?height=100&width=100&query=Vortex Diamondback binoculars",
        },
        {
          name: "Celestron Nature DX 8x42",
          description: "Budget-friendly option with good optics for beginners.",
          price: "$$",
          beginner: true,
          imageUrl: "https://www.celestron.com/cdn/shop/products/71332_nature_dx_8x42_1-R_570x380@2x.jpg?v=1654808560?height=100&width=100&query=Celestron Nature binoculars",
        },
      ],
    },
    {
      id: "2",
      category: "Field Guides",
      items: [
        {
          name: "Sibley Guide to Birds",
          description: "Comprehensive guide with excellent illustrations.",
          price: "$$",
          beginner: true,
          imageUrl: "https://www.sibleyguides.com/wp-content/uploads/newBirdcover3.gif?height=100&width=100&query=Sibley Guide to Birds",
        },
        {
          name: "National Geographic Field Guide",
          description: "Detailed guide with range maps and identification tips.",
          price: "$$",
          beginner: true,
          imageUrl: "https://images.natgeomaps.com/PROD_LG_1000px/BK26218354_0_LG.jpg?height=100&width=100&query=National Geographic Bird Guide",
        },
        {
          name: "Peterson Field Guide to Birds",
          description: "Classic guide with arrows pointing to key field marks.",
          price: "$$",
          beginner: true,
          imageUrl: "https://m.media-amazon.com/images/I/51CJviNaOsL._SX342_SY445_.jpg?height=100&width=100&query=Peterson Bird Guide",
        },
      ],
    },
    {
      id: "3",
      category: "Apps",
      items: [
        {
          name: "Merlin Bird ID",
          description: "Free app that helps identify birds by answering simple questions.",
          price: "Free",
          beginner: true,
          imageUrl: "/placeholder.svg?height=100&width=100&query=Merlin Bird ID app",
        },
        {
          name: "eBird",
          description: "Record your sightings and explore hotspots.",
          price: "Free",
          beginner: true,
          imageUrl: "/placeholder.svg?height=100&width=100&query=eBird app",
        },
        {
          name: "Audubon Bird Guide",
          description: "Comprehensive field guide with photos, sounds, and range maps.",
          price: "Free",
          beginner: true,
          imageUrl: "/placeholder.svg?height=100&width=100&query=Audubon Bird Guide app",
        },
      ],
    },
  ]

  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Beginner's Guide to Bird Watching</h1>
          <p className="text-muted-foreground">Everything you need to know to start your bird watching journey.</p>
        </div>

        <div className="relative rounded-lg overflow-hidden">
          <img
            src="/placeholder.svg?height=500&width=1200&query=person bird watching with binoculars in nature"
            alt="Bird watching"
            className="w-full h-auto object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6">
            <h2 className="text-white text-2xl font-bold mb-2">Welcome to the Wonderful World of Birds</h2>
            <p className="text-white/90 mb-4 max-w-2xl">
              Bird watching is a rewarding hobby that connects you with nature and can be enjoyed anywhere, from your
              backyard to exotic locations around the world.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button className="bg-green-600 hover:bg-green-700">
                <Binoculars className="mr-2 h-4 w-4" />
                Get Started
              </Button>
              <Button variant="outline" className="bg-white/20 text-white border-white/40 hover:bg-white/30">
                Watch Tutorial
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="getting-started" className="space-y-6">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
            <TabsTrigger value="equipment">Equipment</TabsTrigger>
            <TabsTrigger value="common-birds">Common Birds</TabsTrigger>
            <TabsTrigger value="etiquette">Birding Etiquette</TabsTrigger>
          </TabsList>

          <TabsContent value="getting-started" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {steps.map((step) => (
                <Card key={step.id} className="flex flex-col">
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      {step.icon}
                      <CardTitle>{step.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="aspect-[3/2] mb-4">
                      <img
                        src={step.imageUrl || "/placeholder.svg"}
                        alt={step.title}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <p className="mb-4">{step.description}</p>
                    <div className="space-y-2">
                      <p className="font-medium">Tips:</p>
                      <ul className="space-y-1">
                        {step.tips.map((tip, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                            <span className="text-sm">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Learn More
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Your First Bird Watching Outing</CardTitle>
                <CardDescription>Follow this checklist for a successful first birding trip</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="font-medium">Before You Go:</p>
                    <ul className="space-y-1">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm">Research your destination and what birds you might see</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm">Check the weather and dress appropriately</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm">Pack binoculars, field guide, and water</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm">Download the BirdWatch app to log your sightings</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <p className="font-medium">During Your Outing:</p>
                    <ul className="space-y-1">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm">Move slowly and quietly to avoid scaring birds</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm">Listen for bird calls and songs</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm">Look at different heights - from ground to treetops</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm">Record your observations in the app or a notebook</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="equipment" className="space-y-6">
            {equipment.map((category) => (
              <Card key={category.id}>
                <CardHeader>
                  <CardTitle>{category.category}</CardTitle>
                  <CardDescription>Recommended {category.category.toLowerCase()} for bird watching</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {category.items.map((item) => (
                      <div key={item.name} className="flex space-x-4 p-4 border rounded-lg">
                        <img
                          src={item.imageUrl || "/placeholder.svg"}
                          alt={item.name}
                          className="w-16 h-16 object-contain"
                        />
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{item.name}</p>
                            <Badge variant="outline">{item.price}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                          {item.beginner && (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Beginner Friendly</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card>
              <CardHeader>
                <CardTitle>Additional Gear</CardTitle>
                <CardDescription>Other items that can enhance your birding experience</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-4 p-4 border rounded-lg">
                    <img
                      src="https://images.unsplash.com/photo-1725469065847-537973a71806?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?height=80&width=80&query=spotting scope"
                      alt="Spotting Scope"
                      className="w-16 h-16 object-contain"
                    />
                    <div>
                      <p className="font-medium">Spotting Scope</p>
                      <p className="text-sm text-muted-foreground">
                        For distant viewing of birds, especially waterfowl and shorebirds. More of an advanced purchase.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-4 border rounded-lg">
                    <img
                      src="https://images.unsplash.com/photo-1663864796948-ea1f01b84ef3?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?height=80&width=80&query=bird field notebook"
                      alt="Field Notebook"
                      className="w-16 h-16 object-contain"
                    />
                    <div>
                      <p className="font-medium">Field Notebook</p>
                      <p className="text-sm text-muted-foreground">
                        For recording observations, sketches, and notes about birds you encounter.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-4 border rounded-lg">
                    <img
                      src="https://fhfgear.com/cdn/shop/files/service-model-bino-harness_global_primary.jpg?v=1743616077&width=1300?height=80&width=80&query=binocular harness"
                      alt="Binocular Harness"
                      className="w-16 h-16 object-contain"
                    />
                    <div>
                      <p className="font-medium">Binocular Harness</p>
                      <p className="text-sm text-muted-foreground">
                        Distributes weight across shoulders for comfortable all-day birding.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-4 border rounded-lg">
                    <img
                      src="https://images.unsplash.com/photo-1624913503273-5f9c4e980dba?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmlrb24lMjBjYW1lcmF8ZW58MHx8MHx8fDA%3D?height=80&width=80&query=bird photography camera"
                      alt="Camera"
                      className="w-16 h-16 object-contain"
                    />
                    <div>
                      <p className="font-medium">Camera</p>
                      <p className="text-sm text-muted-foreground">
                        Optional for documenting sightings. A smartphone camera works for beginners.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="common-birds" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Common Birds for Beginners</CardTitle>
                <CardDescription>Start with these easy-to-identify birds that are common in many areas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {commonBirds.map((bird: { id: Key; imageUrl: any; name: string; difficulty: string; description: string; habitat: string }) => (
                    <div key={bird.id} className="border rounded-lg overflow-hidden">
                      <img
                        src={bird.imageUrl || "/placeholder.svg"}
                        alt={bird.name}
                        className="w-full aspect-square object-cover"
                      />
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold">{bird.name}</h3>
                          <Badge
                            className={`
                            ${bird.difficulty === "Easy"
                                ? "bg-green-100 text-green-800"
                                : bird.difficulty === "Medium"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }
                          `}
                          >
                            {bird.difficulty}
                          </Badge>
                        </div>
                        <p className="text-sm mb-2">{bird.description}</p>
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium">Habitat:</span> {bird.habitat}
                        </p>
                        <Button variant="link" className="p-0 h-auto mt-2 text-green-600">
                          Learn more
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View More Common Birds
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Bird Identification Tips</CardTitle>
                <CardDescription>Key features to look for when identifying birds</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Size and Shape</h3>
                      <p className="text-sm">
                        Note the overall size (compare to familiar birds like robins or crows), body shape, bill shape,
                        and tail length.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Color Pattern</h3>
                      <p className="text-sm">
                        Look for distinctive markings, wing bars, eye rings, and color patterns on the head, wings, and
                        tail.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Behavior</h3>
                      <p className="text-sm">
                        Observe how the bird moves, feeds, flies, and interacts with its environment.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Habitat</h3>
                      <p className="text-sm">
                        Different birds prefer different habitats. Note where you saw the bird (forest, field, wetland,
                        etc.).
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Sounds</h3>
                      <p className="text-sm">
                        Learn to recognize common bird songs and calls. Many birds are heard before they're seen.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Season and Range</h3>
                      <p className="text-sm">
                        Consider the time of year and whether the bird is likely to be in your region during that
                        season.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="etiquette" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Birding Ethics and Etiquette</CardTitle>
                <CardDescription>Guidelines for responsible bird watching</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-medium">Respect for Birds</h3>
                  <ul className="space-y-1">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-sm">Observe from a distance that doesn't disturb the birds</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-sm">Never approach nests or nesting areas</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-sm">
                        Limit use of recordings to attract birds, especially during breeding season
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-sm">Never pursue or chase birds for a better view</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Respect for Habitat</h3>
                  <ul className="space-y-1">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-sm">Stay on designated trails and paths</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-sm">Leave no trace - take out what you bring in</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-sm">Respect private property and obtain permission when necessary</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-sm">Support conservation efforts for bird habitats</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Respect for Other Birders</h3>
                  <ul className="space-y-1">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-sm">Keep noise to a minimum when birding in groups</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-sm">Share sightings with others when appropriate</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-sm">Be considerate with photography - don't monopolize viewing spots</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-sm">Help beginners and share your knowledge</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Reporting Rare Birds</h3>
                  <ul className="space-y-1">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-sm">Consider the potential impact of crowds on sensitive species</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-sm">
                        For very rare birds, consult with local experts before widely sharing locations
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-sm">Document rare sightings with photos when possible</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-sm">
                        Submit sightings to local bird records committees when appropriate
                      </span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="bg-green-50 rounded-lg p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="md:w-1/3">
              <img
                src="/placeholder.svg?height=300&width=300&query=bird watching community"
                alt="Bird watching community"
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div className="md:w-2/3 space-y-4">
              <h2 className="text-2xl font-bold text-green-800">Ready to Start Your Bird Watching Journey?</h2>
              <p className="text-green-700">
                Join thousands of bird enthusiasts in our community. Share sightings, learn from experts, and discover
                the joy of bird watching.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={() => router.push("/register")}
                  className="bg-green-600 hover:bg-green-700">
                  Create Free Account
                </Button>
                <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                  Join a Local Bird Walk
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
