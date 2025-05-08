import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shop } from "@/payload-types"
import { getTranslations } from "next-intl/server"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface ShopStaffProps {
  staff: Shop['staff']
}

export default async function ShopStaff({ staff }: ShopStaffProps) {
  const t = await getTranslations('shops')
  const getImageUrl = (image: string | { url: string } | undefined) => {
    if (!image) return null
    return typeof image === "string" ? image : image.url
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {staff?.map((member) => (
        <Card key={member.id || member.name} className="pt-0 gap-2">
          <Carousel className="w-full max-w-xs">
            <CarouselContent>
              {member.images?.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="aspect-[3/4] w-full overflow-hidden">
                    <img
                      src={getImageUrl(image as Media) || "/placeholder.svg"}
                      alt={`${member.name}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2" />
          </Carousel>
          <CardHeader className="text-center mb-1">
            <CardTitle className="text-lg">{member.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="secondary">
                {member.age} years
              </Badge>
              <Badge variant="secondary">
                {member.height} cm
              </Badge>
              {member.cup && <Badge variant="secondary">{member.cup} cup</Badge>}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}


