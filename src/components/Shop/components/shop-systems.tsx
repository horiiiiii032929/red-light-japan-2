import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Media, Shop } from "@/payload-types"
import RichText from "@/components/RichText"
import { Media as MediaComponent } from "@/components/Media"


interface ShopSystemsProps {
  systems: Shop['systems']
}

export default function ShopSystems({ systems }: ShopSystemsProps) {
  // Format price range
  const formatPrice = (min: number, max: number | null | undefined) => {
    if (!max || min === max) {
      return `¥${min.toLocaleString()}`
    }
    return `¥${min.toLocaleString()} - ¥${max.toLocaleString()}`
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {systems?.map((system) => (
        <Card key={system.id || system.name} className="pt-0 gap-2 pb-1">
          <div className="relative w-full">
            {(system.image as Media)?.url && (
              <div className="h-48 w-full overflow-hidden">
                <MediaComponent
                  resource={system.image as Media}
                  className="object-cover"
                />
              </div>
            )}
            <CardHeader className="absolute bottom-0 w-full">
              <div className="flex flex-row justify-between w-full">
                <CardTitle className="text-lg font-semibold">{system.name}</CardTitle>
                <Badge>{formatPrice(system.priceMin, system.priceMax)}</Badge>
              </div>
            </CardHeader>
          </div>
          <CardContent>
            {system.description && <RichText data={system.description} />}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
