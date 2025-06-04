import Image from "next/image"
import { Calendar, MapPin, Store } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

import type { Media, News, Shop } from "@/payload-types"
import { Link } from "@/i18n/routing"

interface Props {
  news: News
}

export default function NewsCard({ news }: Props) {
  return (
    <Card className="w-full overflow-hidden py-1 pb-0">
      <Link href={`/shops/${(news.shop as Shop).id}`}>
        <CardContent className="p-0">
          <div className="flex gap-4 p-4">
            <div className="relative flex-shrink-0">
              <Image
                src={(news.image as Media)?.url ?? ''}
                alt="News of the shop image"
                width={120}
                height={120}
                className="w-30 h-30 object-cover rounded-lg"
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold leading-tight mb-2 line-clamp-2">{news.title}</h3>

              <p className="text-muted-foreground text-sm leading-relaxed mb-3 line-clamp-3">
                {news.subTitle}
              </p>


              <div className="flex flex-col items-end">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  <Store className="w-3 h-3 flex-shrink-0" />
                  <span className="font-medium text-primary truncate">{(news.shop as Shop).shopName}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">{new Date(news.createdAt).toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}
