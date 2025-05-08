import { Card } from "../ui/card";
import { Clock } from "lucide-react";
import { BadgeJapaneseYen } from "lucide-react";
import { CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { CreditCard } from "lucide-react";
import { Shop, Media } from "@/payload-types";

interface Props {
  shop: Shop
}

interface ImageType {
  id: number;
  src: string;
  alt: string;
}

export function ShopCard({ shop }: Props) {
  const getImageUrl = (image: string | Media | null | undefined): string => {
    if (!image) return "/placeholder.svg";
    if (typeof image === "string") return image;
    return image.url || "/placeholder.svg";
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-3">
        <div className="relative h-9 w-9">
          <AspectRatio ratio={1 / 1} className="bg-muted">
            <Image
              src={getImageUrl(shop.logo)}
              alt={`${shop.shopName} logo`}
              fill
              className="rounded-md object-cover"
            />
          </AspectRatio>
        </div>
        <div className="flex flex-col gap-1">
          <CardTitle>{shop.shopName}</CardTitle>
          <CardDescription>{shop.message || "No message available"}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 md:flex-row">
        <ImageGallery
          images={shop.images?.map((img, i) => ({
            id: i,
            src: getImageUrl(img),
            alt: `${shop.shopName} image ${i + 1}`,
          })) || []}
        />

        <div className="md:w-2/3 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-row gap-2 items-center bg-muted p-2 rounded-md">
              <BadgeJapaneseYen className="w-4 h-4" />
              <div>
                <span className="text-sm text-muted-foreground">Lowest Price</span>
                <p>¥{shop.lowestPrice.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex flex-row gap-2 items-center bg-muted p-2 rounded-md">
              <Clock className="w-4 h-4" />
              <div>
                <span className="text-sm text-muted-foreground">Hours</span>
                <p>{shop.openHour} - {shop.closeHour}</p>
              </div>
            </div>
          </div>

          {shop.bannerImage && (
            <div className="relative w-full">
              <AspectRatio ratio={4 / 1} className="bg-muted">
                <Image
                  src={getImageUrl(shop.bannerImage)}
                  alt={`${shop.shopName} banner`}
                  fill
                  className="rounded-md object-cover"
                />
              </AspectRatio>
            </div>
          )}

          <ScrollArea className="h-25">
            <p className="whitespace-pre-wrap">
              {typeof shop.description === 'string'
                ? shop.description
                : 'No description available.'}
            </p>
          </ScrollArea>

          {shop.paymentMethods && shop.paymentMethods.length > 0 && (
            <div className="flex flex-row gap-2 items-center justify-end">
              <CreditCard className="w-4 h-4 text-muted-foreground" />
              <div>
                <span>{shop.paymentMethods.join(", ")}</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

const ImageGallery = ({ images }: { images: ImageType[] }) => {
  const imageStyles = {
    container: "relative w-26 md:w-full ",
    aspectRatio: "bg-muted",
    image: "rounded-md object-cover hover:scale-105 transition-transform",
  };

  return (
    <ScrollArea className="w-full md:w-1/3">
      <div className="flex gap-3 flex-nowrap md:grid md:grid-cols-3 md:gap-2">
        {images.slice(0, 6).map((image) => (
          <div key={image.id} className={`${imageStyles.container} flex-none md:flex-auto`}>
            <AspectRatio ratio={3 / 4} className={imageStyles.aspectRatio}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className={imageStyles.image}
              />
            </AspectRatio>
          </div>
        ))}
      </div>

      <ScrollBar orientation="horizontal" className="md:hidden" />
    </ScrollArea>
  );
};