import Image from "next/image"
import { Calendar, MapPin, Store } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

import type { Media, News, Shop } from "@/payload-types"
import RichText from "@/components/RichText"

interface Props {
  news: News
}

export function ShopPageNewsCard({ news }: Props) {
  return (
    <Card className="w-full overflow-hidden py-1 pb-0">
      <CardContent className="p-0">
        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-row items-center gap-4">
            <Image
              src={(news.image as Media)?.url ?? ''}
              alt="News of the shop image"
              width={80}
              height={80}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex flex-col flex-1">
              <h3 className="text-xl font-bold leading-tight mb-1 line-clamp-2">{news.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                {news.subTitle}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{new Date(news.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          <div>
            {news.detail && <RichText data={news.detail} />}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
