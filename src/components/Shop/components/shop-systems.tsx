import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Media, Shop } from "@/payload-types"
import RichText from "@/components/RichText"


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
          {(system.image as Media)?.url && (
            <div className="h-48 w-full overflow-hidden">
              <img
                src={(system.image as Media).url || "/placeholder.svg"}
                alt={system.name}
                className="h-full w-full object-cover"
              />
            </div>
          )}
          <CardHeader>
            <div className="flex justify-between flex-wrap gap-3">
              <CardTitle>{system.name}</CardTitle>
              <Badge>{formatPrice(system.priceMin, system.priceMax)}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            {system.description && <RichText data={system.description} />}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
