"use client"

import React, { useState, useEffect } from "react"
import { Expand } from "lucide-react"
import { type CarouselApi } from "@/components/ui/carousel"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Media } from "@/components/Media"
import type { Media as MediaType } from "@/payload-types"
import { Progress } from "@/components/ui/progress"

interface ShopGalleryProps {
  images: MediaType[] | null | undefined
  shopName: string
}

export default function ShopGallery({ images, shopName }: ShopGalleryProps) {
  const [fullscreenOpen, setFullscreenOpen] = useState(false)
  const [fullscreenIndex, setFullscreenIndex] = useState(0)
  const [_, setMainIndex] = useState(0)
  const [mainProgress, setMainProgress] = useState(0)
  const [mainApi, setMainApi] = useState<CarouselApi>()
  const [dialogApi, setDialogApi] = useState<CarouselApi>()

  // Combine main image and sub images for the gallery
  const allImages = images || []

  // Open fullscreen with the current image
  const openFullscreen = (index: number) => {
    setFullscreenIndex(index)
    setFullscreenOpen(true)
  }

  // Main carousel autoplay and progress
  useEffect(() => {
    if (!mainApi) return

    let startTime = Date.now()
    const duration = 6000 // 6 seconds

    const updateProgress = () => {
      const elapsed = Date.now() - startTime
      const newProgress = Math.min(100, (elapsed / duration) * 100)
      setMainProgress(newProgress)

      if (newProgress < 100) {
        requestAnimationFrame(updateProgress)
      }
    }

    const autoplay = setInterval(() => {
      mainApi.scrollNext()
      startTime = Date.now()
      setMainProgress(0)
      requestAnimationFrame(updateProgress)
    }, duration)

    mainApi.on("select", () => {
      setMainIndex(mainApi.selectedScrollSnap())
      startTime = Date.now()
      setMainProgress(0)
      requestAnimationFrame(updateProgress)
    })

    // Start initial progress
    requestAnimationFrame(updateProgress)

    return () => {
      clearInterval(autoplay)
    }
  }, [mainApi])

  // Dialog carousel sync
  useEffect(() => {
    if (!dialogApi) return

    dialogApi.on("select", () => {
      setFullscreenIndex(dialogApi.selectedScrollSnap())
    })
  }, [dialogApi])

  if (!allImages.length) return null

  return (
    <div className="relative w-full">
      {/* Main Image Carousel */}
      <Carousel
        className="w-full"
        opts={{
          loop: true,
          align: "start",
        }}
        setApi={setMainApi}
      >
        <CarouselContent>
          {allImages.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative w-full">
                <Media
                  // @ts-expect-error
                  resource={image.sizes.hero}
                  imgClassName="object-cover"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 bg-black/40 text-white hover:bg-black/60 transition-colors"
                  onClick={() => openFullscreen(index)}
                >
                  <Expand className="h-5 w-5" />
                </Button>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {allImages.length > 1 && (
          <>
            <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 hidden sm:flex bg-black/20" variant="ghost" />
            <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 hidden sm:flex bg-black/20" variant="ghost" />
            <div className="absolute bottom-5 -translate-y-1/2 left-1/2 -translate-x-1/2">
              <Progress
                value={mainProgress}
                className="h-2 w-60"
              />
            </div>
          </>
        )}
      </Carousel>

      {/* Fullscreen Gallery Dialog */}
      <Dialog open={fullscreenOpen} onOpenChange={setFullscreenOpen}>
        <DialogContent className="h-[90vh] w-5xl bg-black/95">
          <DialogHeader className="px-6 pt-6">
            <DialogTitle className="text-white text-xl md:text-2xl">{shopName}</DialogTitle>
          </DialogHeader>
          <div className="relative w-full">
            <Carousel
              className="w-full"
              setApi={setDialogApi}
              opts={{
                loop: true,
                startIndex: fullscreenIndex,
                dragFree: true, // Optional: Allows free dragging for better UX
              }}
            >
              <CarouselContent >
                {allImages.map((image, index) => (
                  <CarouselItem key={index}>
                    <Media
                      // @ts-expect-error
                      resource={image.sizes.hero}
                      alt={`Shop image ${index + 1}`}
                      imgClassName="object-cover"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              {allImages.length > 1 && (
                <>
                  <CarouselPrevious
                    className="absolute left-2 top-1/2 -translate-y-1/2 hidden sm:flex bg-black/40 hover:bg-black/60 transition-colors shadow-md"
                    variant="ghost"
                    aria-label="Previous image"
                  />
                  <CarouselNext
                    className="absolute right-2 top-1/2 -translate-y-1/2 hidden sm:flex bg-black/40 hover:bg-black/60 transition-colors shadow-md"
                    variant="ghost"
                    aria-label="Next image"
                  />
                </>
              )}
            </Carousel>
          </div>

          {/* Fullscreen Thumbnails */}
          <div className="border-t border-white/10 bg-black/50">
            <div className="flex gap-3 p-4 overflow-x-auto scrollbar-thin">
              {allImages.map((image, index) => (
                <div
                  key={index}
                  className={cn(
                    "relative h-34 flex-shrink-0 cursor-pointer overflow-hidden hover:scale-105 transition-all aspect-square",
                    index === fullscreenIndex && "border-white"
                  )}
                  onClick={() => {
                    setFullscreenIndex(index);
                    dialogApi?.scrollTo(index);
                  }}
                  aria-label={`Select image ${index + 1}`}
                >
                  <Media
                    // @ts-expect-error
                    resource={image.sizes?.thumbnail}
                    imgClassName=" object-cover"
                    alt={`Thumbnail image ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
