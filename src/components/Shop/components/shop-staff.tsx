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
import { Media } from "@/components/Media"

interface ShopStaffProps {
  staff: Shop['staff']
}

export default async function ShopStaff({ staff }: ShopStaffProps) {
  const t = await getTranslations('shops.shop')


  return (
    <div className="flex flex-wrap gap-4">
      {staff?.map((member) => (
        <Card key={member.id || member.name} className="pt-0 gap-2 w-[300px] self-center">
          <Carousel className="w-full max-w-xs">
            <CarouselContent>
              {member.images?.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="aspect-3/4 w-full full">
                    <Media fill priority imgClassName="-z-10 object-cover w-full" resource={image} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2" variant="secondary" />
            <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2" variant="secondary" />
          </Carousel>
          <CardHeader className="text-center mb-1">
            <CardTitle className="text-lg">{member.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="secondary">
                {t("age")}: {member.age}
              </Badge>
              <Badge variant="secondary">
                {t("height")}: {member.height}
              </Badge>
              {member.cup && <Badge variant="secondary">{member.cup} cup</Badge>}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}


