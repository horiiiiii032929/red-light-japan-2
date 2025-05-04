import { Card, CardContent } from "@/components/ui/card"
import type { Shop, Media } from "@/payload-types"
import Image from "next/image"

interface ShopPageSystemsProps {
  systems: Shop['systems']
}

export function ShopPageSystems({ systems }: ShopPageSystemsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3" role="list" aria-label="Available systems">
      {systems?.map((system) => (
        <Card key={system.id} className="overflow-hidden border-0 transition-all duration-300 hover:shadow-lg group gap-1 py-0">
          <div className="aspect-[4/3] relative overflow-hidden">
            <Image
              src={typeof system.image === 'string' ? "/placeholder.svg" : system.image?.url || "/placeholder.svg"}
              alt={system.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority
            />
          </div>
          <CardContent className="p-5">
            <div className="flex items-start justify-between mb-1">
              <h3 className="font-medium text-lg tracking-tight">{system.name}</h3>
              <div className="bg-black text-white font-semibold px-3 py-1 rounded-full text-sm">￥{system.priceMin}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 