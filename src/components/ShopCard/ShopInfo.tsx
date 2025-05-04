import { Clock, MapPin } from "lucide-react"
import { formatTime } from "@/lib/format"

interface ShopInfoProps {
  nearestStation: string
  openHour?: string
  closeHour?: string
}

export function ShopInfo({ nearestStation, openHour, closeHour }: ShopInfoProps) {
  return (
    <div className="flex flex-row gap-4 text-xs text-muted-foreground mb-auto">
      <div className="flex items-center gap-1">
        <MapPin className="mr-1.5 h-3 w-3 shrink-0" />
        <span className="line-clamp-1">{nearestStation}</span>
      </div>
      {openHour && closeHour && (
        <div className="flex items-center gap-1">
          <Clock className="mr-1.5 h-3 w-3 shrink-0" />
          <span>{formatTime(openHour)} - {formatTime(closeHour)}</span>
        </div>
      )}
    </div>
  )
} 