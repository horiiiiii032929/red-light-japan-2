import { Badge } from "../ui/badge"
import { Tag } from "@/payload-types"

interface ShopTagsProps {
  tags: Tag[]
}

export function ShopTags({ tags }: ShopTagsProps) {
  const tagList = tags?.map((tag) => tag.title) || []

  return (
    <div className="flex flex-wrap gap-1">
      {tagList.slice(0, 5).map((tag, index) => (
        <Badge key={index} variant="secondary" className="text-xs">
          {tag}
        </Badge>
      ))}
      {tagList.length > 5 && (
        <Badge variant="secondary" className="text-xs">
          +{tagList.length - 5}
        </Badge>
      )}
    </div>
  )
} 