import { Card } from "../ui/card";
import { Clock } from "lucide-react";
import { BadgeJapaneseYen } from "lucide-react";
import { CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { CreditCard } from "lucide-react";
import { Shop, PaymentMethod, Area, Category } from "@/payload-types";
import { getTranslations } from "next-intl/server";
import { Media } from "@/components/Media";
import Link from "next/link";
import { Badge } from "../ui/badge";

interface Props {
  shop: Shop
}

export async function ShopCard({ shop }: Props) {
  const t = await getTranslations('shops')

  const formatTime = (date: string) => {
    const dateObj = new Date(date)
    const hours = dateObj.getHours()
    const minutes = dateObj.getMinutes()
    return `${hours}:${minutes.toString().padStart(2, '0')}`
  };

  return (
    <Link href={`/shops/${shop.id}`}>
      <Card>
        <CardHeader className="flex flex-row items-center gap-3">
          <div className="relative h-15 w-15 aspect-square">
            <Media
              resource={shop.logo}
              fill
              className="-z-10 rounded-md object-cover"
            />
          </div>
          <div className="flex flex-col gap-1">
            <CardTitle className="text-xl font-semibold">{shop.shopName}</CardTitle>
            <CardDescription className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <div className="flex flex-wrap gap-1">
                {shop.categories && (shop.categories as Category[]).map((category: Category, index) => (
                  <Badge key={category.id} variant="secondary">
                    {category.title}
                  </Badge>
                ))}
              </div>
              {shop.area && (
                <>
                  <span>•</span>
                  <Badge variant="outline">{(shop.area as Area).title}</Badge>
                </>
              )}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 md:flex-row">
          <ImageGallery
            staffs={shop.staff as NonNullable<Shop['staff']>}
          />

          <div className="md:w-2/3 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="flex flex-row gap-2 items-center bg-muted p-2 rounded-md">
                <BadgeJapaneseYen className="w-4 h-4" />
                <div>
                  <span className="text-sm text-muted-foreground">{t("lowestPrice")}</span>
                  <p>¥{shop.lowestPrice.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex flex-row gap-2 items-center bg-muted p-2 rounded-md">
                <Clock className="w-4 h-4" />
                <div>
                  <span className="text-sm text-muted-foreground">{t("hours")}</span>
                  <p>{formatTime(shop.openHour)} - {formatTime(shop.closeHour)}</p>
                </div>
              </div>
            </div>

            {shop.bannerImage && (
              <div className="relative w-full overflow-hidden object-cover">
                <div className="aspect-[16/5] md:aspect-[21/5] object-cover overflow-hidden">
                  <Media
                    resource={shop.bannerImage}
                    priority
                    alt="Shop Banner"
                    className="object-cover object-center"
                  />
                </div>
              </div>
            )}
            <ScrollArea className="h-36">
              <p className="whitespace-pre-wrap">
                {typeof shop.message === 'string'
                  ? shop.message
                  : 'No description available.'}
              </p>
            </ScrollArea>

            {shop.paymentMethods && shop.paymentMethods.length > 0 && (
              <div className="flex flex-row gap-2 items-center justify-end">
                <CreditCard className="w-4 h-4 text-muted-foreground" />
                <div>
                  <span>{shop.paymentMethods.map((method) => (method as PaymentMethod).title).join(", ")}</span>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card >
    </Link >
  )
}

const ImageGallery = ({ staffs }: { staffs: NonNullable<Shop['staff']> }) => {
  // Extract all images from staff
  const allImages = staffs?.flatMap((staff) => staff.images || []) || [];

  // Create an array of 6 items, using placeholders if needed
  const displayItems = Array.from({ length: 6 }, (_, index) => ({
    image: allImages[index] || null,
    key: index,
  }));

  return (
    <section aria-label="Staff Image Gallery" className="w-full md:w-1/3">
      <ScrollArea className="w-full">
        <div className="flex gap-3 flex-nowrap md:grid md:grid-cols-3 md:gap-3">
          {displayItems.map(({ image, key }, index) => (
            <div
              key={key}
              className="relative flex-shrink-0 w-40 md:w-full aspect-[3/4] rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 md:hover:scale-110"
            >
              {image ? (
                <Media
                  resource={image}
                  fill
                  pictureClassName="w-full h-full"
                  imgClassName="object-cover object-center"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 rounded-lg" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="mt-2 md:hidden" />
      </ScrollArea>
    </section>
  );
};

export default ImageGallery;