"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "../ui/carousel"
import { cn } from "@/lib/utils"
import { Cast } from "@/payload-types"

interface CarouselDotsProps {
  className?: string
  api: CarouselApi | undefined
}

function CarouselDots({ className, api }: CarouselDotsProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!api) return
      api.scrollTo(index)
    },
    [api]
  )

  const onSelect = useCallback(() => {
    if (!api) return
    setSelectedIndex(api.selectedScrollSnap())
  }, [api])

  useEffect(() => {
    if (!api) return

    onSelect()
    api.on("select", onSelect)

    return () => {
      api.off("select", onSelect)
    }
  }, [api, onSelect])

  if (!api) return null

  return (
    <div className={cn("absolute bottom-2 left-0 right-0 flex justify-center gap-1.5", className)}>
      {Array.from({ length: api.scrollSnapList().length }).map((_, index) => (
        <button
          key={index}
          onClick={() => onDotButtonClick(index)}
          className={cn(
            "size-2 rounded-full transition-colors",
            selectedIndex === index ? "bg-white" : "bg-white/50"
          )}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  )
}

interface ShopCarouselProps {
  casts: Cast[]
}

export function ShopCarousel({ casts }: ShopCarouselProps) {
  const [api, setApi] = useState<CarouselApi>()

  return (
    <Carousel className="w-full" setApi={setApi}>
      <CarouselContent>
        {casts?.map((cast, index) => (
          <CarouselItem key={index}>
            <div className="relative w-full aspect-[3/4] overflow-hidden">
              {cast.images?.[0] && typeof cast.images[0] !== 'string' && cast.images[0].url && (
                <Image
                  src={cast.images[0].url}
                  fill
                  className="object-cover"
                  alt={cast.name}
                  sizes="(max-width: 768px) 100vw, 320px"
                />
              )}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselDots api={api} />
    </Carousel>
  )
} 