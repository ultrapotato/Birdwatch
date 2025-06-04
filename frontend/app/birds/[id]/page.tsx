"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { formatDistanceToNow } from "date-fns"
import { MapPin, Calendar, Clock, User, MessageCircle, Share2, Bookmark, ThumbsUp, Send } from "lucide-react"
import ImageGallery from "@/components/image-gallery"
import BirdCard from "@/components/bird-card"
import { Bird, getBirdDetails, getSimilarBirds } from "@/lib/api/birds"

export default function BirdDetailPage() {
  const params = useParams()
  const birdId = params.id
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("details")
  const [comment, setComment] = useState("")
  const [bird, setBird] = useState<Bird | null>()
  const [similarBirds, setSimilarBirds] = useState<any[]>([])



  useEffect(() => {
    const fetchBird = async () => {
      try {
        const newBird = await getBirdDetails("birdId")
        setBird(newBird)

        const newSimilarBirds = await getSimilarBirds("birdId")
        setSimilarBirds(newSimilarBirds)

      } catch (error) {
        console.error("Error fetching alerts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBird()
  }, [birdId])

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!comment.trim()) return

    // In a real app, this would send the comment to the server
    console.log("Submitting comment:", comment)

    // Clear the comment field
    setComment("")
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <Link href="/birds" className="text-muted-foreground hover:text-foreground">
              Birds
            </Link>
            <span className="text-muted-foreground">/</span>
            <span>{bird?.species}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h1 className="text-3xl font-bold tracking-tight">{bird?.species}</h1>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Bookmark className="mr-2 h-4 w-4" />
                Save
              </Button>
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                <ThumbsUp className="mr-2 h-4 w-4" />
                Like
              </Button>
            </div>
          </div>
          <p className="text-muted-foreground italic">{bird?.scientificName}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-0">
                <ImageGallery images={bird?.images ?? []} />
              </CardContent>
            </Card>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="comments">Comments ({bird?.comments.length})</TabsTrigger>
                <TabsTrigger value="similar">Similar Birds</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Sighting Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Location</p>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{bird?.location}</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Date & Time</p>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{bird?.date}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{bird?.time}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm font-medium">Description</p>
                      <p>{bird?.description}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Habitat</p>
                        <p>{bird?.habitat}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Behavior</p>
                        <p>{bird?.behavior}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Taxonomy</p>
                        <p>{bird?.taxonomy}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Flight Pattern</p>
                        <p>{bird?.flightPattern}</p>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm font-medium">Conservation Status</p>
                      <p>{bird?.conservationStatus}</p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm font-medium">Tags</p>
                      <div className="flex flex-wrap gap-1">
                        {bird?.tags.map((tag: string) => (
                          <Badge key={tag} variant="outline" className="bg-green-50">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Location</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-[16/9] relative bg-gray-100 rounded-md overflow-hidden">
                      <img
                        src={`/placeholder.svg?height=400&width=800&query=map of ${encodeURIComponent(bird?.location ?? "")}`}
                        alt={`Map of ${bird?.location}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-gray-500">Interactive map will be implemented here</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="comments" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Comments</CardTitle>
                    <CardDescription>Join the discussion about this sighting</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <form onSubmit={handleSubmitComment} className="space-y-4">
                      <Textarea
                        placeholder="Add a comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                      <div className="flex justify-end">
                        <Button type="submit" disabled={!comment.trim()}>
                          <Send className="mr-2 h-4 w-4" />
                          Post Comment
                        </Button>
                      </div>
                    </form>

                    <div className="space-y-4 pt-4">
                      {bird?.comments.map((comment: any) => (
                        <div key={comment.id} className="flex space-x-4">
                          <Avatar>
                            <AvatarImage src={comment.userAvatar || "/placeholder.svg"} />
                            <AvatarFallback>{comment.userName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <span className="font-medium">{comment.userName}</span>
                                <span className="text-xs text-muted-foreground ml-2">
                                  {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                                </span>
                              </div>
                              <Button variant="ghost" size="sm">
                                <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                                {comment.likes}
                              </Button>
                            </div>
                            <p className="text-sm">{comment.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="similar" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Similar Birds</CardTitle>
                    <CardDescription>Birds that are similar to {bird?.species}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {similarBirds.map((similarBird) => (
                        <BirdCard key={similarBird.id} bird={similarBird} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Observer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={bird?.userAvatar || "/placeholder.svg"} />
                    <AvatarFallback>{bird?.userName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{bird?.userName}</p>
                    <p className="text-sm text-muted-foreground">
                      {bird?.createdAt ? (
                        <>Reported {formatDistanceToNow(new Date(bird.createdAt), { addSuffix: true })}</>
                      ) : (
                        <>Reported just now</>
                      )}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex justify-center">
                  <Button  variant="outline" className="w-full">
                    <User className="mr-2 h-4 w-4" />
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="space-y-1">
                    <ThumbsUp className="h-5 w-5 mx-auto text-green-600" />
                    <p className="text-2xl font-bold">{bird?.likes}</p>
                    <p className="text-xs text-muted-foreground">Likes</p>
                  </div>
                  <div className="space-y-1">
                    <MessageCircle className="h-5 w-5 mx-auto text-green-600" />
                    <p className="text-2xl font-bold">{bird?.comments.length}</p>
                    <p className="text-xs text-muted-foreground">Comments</p>
                  </div>
                  <div className="space-y-1">
                    <Bookmark className="h-5 w-5 mx-auto text-green-600" />
                    <p className="text-2xl font-bold">{bird?.bookmarks}</p>
                    <p className="text-xs text-muted-foreground">Saves</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Bird Facts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Diet</p>
                  <p className="text-sm">Seeds, fruits, insects, berries</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Size</p>
                  <p className="text-sm">8-9 inches (20-23 cm)</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Lifespan</p>
                  <p className="text-sm">3-5 years in the wild</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Range</p>
                  <p className="text-sm">Eastern and Central United States, Mexico</p>
                </div>
                <div className="mt-4">
                  <Link href={`/birds/guide/${bird?.species.toLowerCase().replace(/\s+/g, "-")}`} passHref>
                    <Button variant="outline" className="w-full">
                      View Full Bird Guide
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
