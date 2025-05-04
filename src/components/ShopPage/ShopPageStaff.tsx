import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Shop, Cast, Media } from "@/payload-types"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Hash, Ruler } from "lucide-react"
import Image from "next/image"

interface ShopPageStaffProps {
  staff: Cast[]
}

export function ShopPageStaff({ staff }: ShopPageStaffProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3" role="list" aria-label="Staff members">
      {staff?.map((member: Cast) => (
        <Card key={member.id || member.name} className="relative overflow-hidden rounded-xl py-0">
          <Carousel className="w-full">
            <CarouselContent className="h-full">
              {member.images?.map((image: Media | string, index: number) => (
                <CarouselItem key={index} className="h-full">
                  <div className="relative w-full aspect-[3/4] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 opacity-80" />
                    <Image
                      src={typeof image === 'string' ? image : image.url || "/placeholder.svg"}
                      alt={`${member.name} - image ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 320px"
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {member.images && member.images.length > 1 && (
              <>
                <CarouselPrevious
                  className="absolute left-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/10 text-white"
                  variant="ghost"
                  aria-label="Previous image"
                />
                <CarouselNext
                  className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/10 text-white"
                  variant="ghost"
                  aria-label="Next image"
                />
              </>
            )}
          </Carousel>

          {/* Staff Info - Positioned at bottom */}
          <div className="absolute bottom-0 left-0 z-20 w-full p-4">
            <h3 className="text-xl font-bold tracking-tight text-white">{member.name}</h3>
            <div className="flex items-end gap-4">
              <div className="mt-2 flex items-center text-sm font-medium text-white/90">
                <Hash className="mr-1.5 h-3.5 w-3.5" />
                {member.age && <p className="text-sm font-medium text-white/90">{member.age}</p>}
              </div>
              <div className="mt-2 flex items-center text-sm font-medium text-white/90">
                <Ruler className="mr-1.5 h-3.5 w-3.5" />
                {member.height && <p className="text-sm font-medium text-white/90">{member.height}cm</p>}
              </div>
              {member.cup && (
                <Badge>
                  {member.cup}
                </Badge>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
} 