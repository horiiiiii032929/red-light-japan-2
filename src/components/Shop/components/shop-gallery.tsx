"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Expand } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Media } from "@/payload-types"

interface ShopGalleryProps {
  images: Media[] | null | undefined
  shopName: string
}

export default function ShopGallery({ images, shopName }: ShopGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [fullscreenOpen, setFullscreenOpen] = useState(false)
  const [fullscreenIndex, setFullscreenIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(false)
  const [touchStart, setTouchStart] = useState(0)

  // Combine main image and sub images for the gallery
  const allImages = images || []

  // Get the URL from the image (which could be a string or an object)
  const getImageUrl = (image: Media) => {
    return image.url
  }

  // Navigate to the next image
  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % allImages.length)
  }

  // Navigate to the previous image
  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
  }

  // Navigate to the next image in fullscreen mode
  const nextFullscreenImage = () => {
    setFullscreenIndex((prev) => (prev + 1) % allImages.length)
  }

  // Navigate to the previous image in fullscreen mode
  const prevFullscreenImage = () => {
    setFullscreenIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
  }

  // Open fullscreen with the current image
  const openFullscreen = (index: number) => {
    setFullscreenIndex(index)
    setFullscreenOpen(true)
  }

  // Handle touch start
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX)
  }

  // Handle touch move for swipe
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return

    const touchEnd = e.touches[0].clientX
    const diff = touchStart - touchEnd

    // Swipe threshold
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextImage() // Swipe left, go to next
      } else {
        prevImage() // Swipe right, go to previous
      }
      setTouchStart(0)
    }
  }

  // Auto-play functionality
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isAutoPlaying) {
      interval = setInterval(() => {
        nextImage()
      }, 3000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isAutoPlaying, currentIndex])

  return (
    <div className="relative h-full w-full" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
      {/* Main Image Carousel */}
      <div className="relative h-full w-full overflow-hidden">
        {allImages.map((image, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 h-full w-full transition-opacity duration-500",
              index === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none",
            )}
          >
            <img
              src={getImageUrl(image) || "/placeholder.svg"}
              alt={`${shopName} view ${index + 1}`}
              className="h-full w-full object-cover"
            />
          </div>
        ))}

        {/* Navigation Controls */}
        {allImages.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/20 text-white hover:bg-black/30"
              onClick={prevImage}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/20 text-white hover:bg-black/30"
              onClick={nextImage}
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}

        {/* Fullscreen Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 bg-black/20 text-white hover:bg-black/30"
          onClick={() => openFullscreen(currentIndex)}
          aria-label="View fullscreen"
        >
          <Expand className="h-5 w-5" />
        </Button>

        {/* Image Counter */}
        {allImages.length > 1 && (
          <div className="absolute bottom-2 right-2 rounded-full bg-black/50 px-2 py-1 text-xs text-white">
            {currentIndex + 1} / {allImages.length}
          </div>
        )}
      </div>

      {/* Thumbnail Indicators */}
      {allImages.length > 1 && (
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-1">
          {allImages.map((_, index) => (
            <button
              key={index}
              className={cn(
                "h-1.5 w-6 rounded-full transition-all",
                index === currentIndex ? "bg-white" : "bg-white/50 hover:bg-white/80",
              )}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Fullscreen Gallery Dialog */}
      <Dialog open={fullscreenOpen} onOpenChange={setFullscreenOpen}>
        <DialogContent className="max-w-5xl">
          <DialogHeader>
            <DialogTitle>{shopName}</DialogTitle>
          </DialogHeader>
          <div className="relative h-[70vh] w-full">
            <img
              src={getImageUrl(allImages[fullscreenIndex]) || "/placeholder.svg"}
              alt={`${shopName} gallery view ${fullscreenIndex + 1}`}
              className="h-full w-full object-contain"
            />

            {allImages.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/20 text-white hover:bg-black/30"
                  onClick={prevFullscreenImage}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/20 text-white hover:bg-black/30"
                  onClick={nextFullscreenImage}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}

            {/* Fullscreen Image Counter */}
            <div className="absolute bottom-2 right-2 rounded-full bg-black/50 px-2 py-1 text-xs text-white">
              {fullscreenIndex + 1} / {allImages.length}
            </div>
          </div>

          {/* Fullscreen Thumbnails */}
          <div className="flex justify-center space-x-2 overflow-x-auto pb-2">
            {allImages.map((image, index) => (
              <div
                key={index}
                className={cn(
                  "h-16 w-16 cursor-pointer overflow-hidden rounded-md border-2",
                  index === fullscreenIndex ? "border-rose-500" : "border-transparent hover:border-rose-200",
                )}
                onClick={() => setFullscreenIndex(index)}
              >
                <img
                  src={getImageUrl(image) || "/placeholder.svg"}
                  alt={`${shopName} thumbnail ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
