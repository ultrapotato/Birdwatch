"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Expand } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface Image {
  id: string
  url: string
  caption?: string
}

interface ImageGalleryProps {
  images: Image[]
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }

  const currentImage = images[currentIndex]

  if (!images || images.length === 0) {
    return (
      <div className="aspect-[16/9] bg-gray-100 flex items-center justify-center">
        <p className="text-muted-foreground">No images available</p>
      </div>
    )
  }

  if (images.length === 1) {
    return (
      <div className="relative">
        <img
          src={images[0].url || "/placeholder.svg"}
          alt={images[0].caption || "Bird image"}
          className="w-full h-auto rounded-t-md"
        />
        {images[0].caption && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-sm">{images[0].caption}</div>
        )}
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={currentImage.url || "/placeholder.svg"}
          alt={currentImage.caption || `Image ${currentIndex + 1}`}
          className="w-full h-full object-cover rounded-t-md"
        />

        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-black/30 hover:bg-black/50 text-white rounded-full"
          onClick={() => setIsDialogOpen(true)}
        >
          <Expand className="h-5 w-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full"
          onClick={goToPrevious}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full"
          onClick={goToNext}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        {currentImage.caption && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-sm">
            {currentImage.caption}
          </div>
        )}
      </div>

      <div className="flex p-2 gap-2 overflow-x-auto">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`relative cursor-pointer flex-shrink-0 w-16 h-16 ${
              index === currentIndex ? "ring-2 ring-green-600" : "opacity-70"
            }`}
            onClick={() => setCurrentIndex(index)}
          >
            <img
              src={image.url || "/placeholder.svg"}
              alt={image.caption || `Thumbnail ${index + 1}`}
              className="w-full h-full object-cover rounded-sm"
            />
          </div>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl p-0 bg-black">
          <div className="relative">
            <img
              src={currentImage.url || "/placeholder.svg"}
              alt={currentImage.caption || `Image ${currentIndex + 1}`}
              className="w-full h-auto max-h-[80vh] object-contain"
            />

            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full"
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full"
              onClick={goToNext}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            {currentImage.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4 text-sm">
                {currentImage.caption}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
