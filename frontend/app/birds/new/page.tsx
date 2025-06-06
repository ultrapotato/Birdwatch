"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import ImageUpload from "@/components/image-upload"
import { useFirebase } from "@/lib/firebase/firebase-provider"
import { createBirdSighting } from "@/lib/frontend-api/birds"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function NewBirdPage() {
  const { user, userLoading } = useFirebase()

  const [submitting, setSubmitting] = useState(false)
  const [images, setImages] = useState<File[]>([])
  const router = useRouter()
  const { toast } = useToast()

  // Form state
  const [formData, setFormData] = useState({
    species: "",
    location: "",
    date: "",
    time: "",
    description: "",
    taxonomy: "",
    flightPattern: "",
    tags: "",
    
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      toast({
        title: "Please sign in",
        description: "You have to be signed in to report a sighting.",
        variant: "destructive",
      })
      return
    }

    const storage = getStorage();
    console.log("got here!")

    const uploadedImages = await Promise.all(
      images.map(async (image, index) => {
        const storageRef = ref(storage, `sightings/${user.uid}/${Date.now()}-${image.name}`);
        await uploadBytes(storageRef, image);
        const downloadURL = await getDownloadURL(storageRef);

        return {
          id: `img-${index}`,
          url: downloadURL,
          caption: image.name,
        };
      })
    );


    setSubmitting(true)

    const sightingPayload = {
      speciesName: formData.species,
      location: formData.location,
      date: formData.date,
      time: formData.time,
      description: formData.description,
      taxonomy: formData.taxonomy,
      flightPattern: formData.flightPattern,
      tags: formData.tags.split(" ").filter((tag) => tag.trim() !== ""),
      images: uploadedImages,
      // Placeholder URL, actual upload needed
      // coordinates: {} // TODO: Add coordinates if available
    }

    try {
      await createBirdSighting(sightingPayload)

      toast({
        title: "Sighting reported",
        description: "Your bird sighting has been successfully reported.",
      })

      router.push("/dashboard")
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit sighting",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Report Bird Sighting</h1>

        <Card>
          <CardHeader>
            <CardTitle>New Bird Sighting</CardTitle>
            <CardDescription>Fill out the form below to report a new bird sighting.</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="species">Bird Species</Label>
                  <Input
                    id="species"
                    name="species"
                    placeholder="e.g., American Robin"
                    value={formData.species}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taxonomy">Taxonomy</Label>
                  <Select
                    onValueChange={(value) => handleSelectChange("taxonomy", value)}
                    defaultValue={formData.taxonomy}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select taxonomy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="passeriformes">Passeriformes (Perching Birds)</SelectItem>
                      <SelectItem value="falconiformes">Falconiformes (Falcons)</SelectItem>
                      <SelectItem value="strigiformes">Strigiformes (Owls)</SelectItem>
                      <SelectItem value="anseriformes">Anseriformes (Waterfowl)</SelectItem>
                      <SelectItem value="galliformes">Galliformes (Game Birds)</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="e.g., Central Park, New York"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="flightPattern">Flight Pattern</Label>
                  <Select
                    onValueChange={(value) => handleSelectChange("flightPattern", value)}
                    defaultValue={formData.flightPattern}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select flight pattern" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="direct">Direct Flight</SelectItem>
                      <SelectItem value="undulating">Undulating</SelectItem>
                      <SelectItem value="soaring">Soaring</SelectItem>
                      <SelectItem value="hovering">Hovering</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" name="date" type="date" value={formData.date} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input id="time" name="time" type="time" value={formData.time} onChange={handleChange} required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe the bird and the sighting..."
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags (separated by spaces)</Label>
                <Input
                  id="tags"
                  name="tags"
                  placeholder="e.g., red breast migratory songbird"
                  value={formData.tags}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label>Images</Label>
                <ImageUpload onImagesSelected={setImages} maxImages={5} />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={submitting}>
                {submitting ? "Submitting..." : "Submit Sighting"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
