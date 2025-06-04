"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Upload, ImageIcon } from "lucide-react"

interface ImageUploadProps {
  onImagesSelected: (files: File[]) => void
  maxImages?: number
}

export default function ImageUpload({ onImagesSelected, maxImages = 5 }: ImageUploadProps) {
  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    const files = Array.from(e.target.files)
    const newFiles = [...selectedImages, ...files].slice(0, maxImages)

    setSelectedImages(newFiles)
    onImagesSelected(newFiles)

    // Generate previews
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file))

    // Revoke old preview URLs to avoid memory leaks
    previews.forEach((url) => URL.revokeObjectURL(url))

    setPreviews(newPreviews)
  }

  const handleRemoveImage = (index: number) => {
    const newImages = [...selectedImages]
    newImages.splice(index, 1)
    setSelectedImages(newImages)
    onImagesSelected(newImages)

    // Revoke the preview URL
    URL.revokeObjectURL(previews[index])

    const newPreviews = [...previews]
    newPreviews.splice(index, 1)
    setPreviews(newPreviews)
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={handleButtonClick}
          disabled={selectedImages.length >= maxImages}
          className="w-full"
        >
          <Upload className="mr-2 h-4 w-4" />
          {selectedImages.length === 0 ? "Upload Images" : "Add More Images"}
        </Button>
        <Input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          multiple
          className="hidden"
        />
      </div>

      {selectedImages.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {previews.map((preview, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square rounded-md overflow-hidden border">
                <img
                  src={preview || "/placeholder.svg"}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}

          {Array.from({ length: maxImages - selectedImages.length }).map((_, index) => (
            <div
              key={`empty-${index}`}
              className="aspect-square rounded-md border border-dashed flex items-center justify-center cursor-pointer"
              onClick={handleButtonClick}
            >
              <ImageIcon className="h-6 w-6 text-gray-400" />
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        Upload up to {maxImages} images. Supported formats: JPG, PNG, GIF.
      </p>
    </div>
  )
}
