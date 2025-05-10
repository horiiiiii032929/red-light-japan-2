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
import { User as UserIcon } from "lucide-react";
import { formatTime } from "@/lib/format";
interface Props {
  shop: Shop
}

export async function ShopCard({ shop }: Props) {
  const t = await getTranslations('shops')

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="relative h-17 w-17">
          {shop.logo && <Media
            // @ts-expect-error
            resource={shop.logo?.sizes?.logo}
            className="-z-10 object-cover"
          />}
        </div>
        <div className="flex flex-col gap-2">
          <Link href={`/shops/${shop.id}`}>
            <CardTitle className="text-2xl font-semibold text-primary underline underline-offset-4">{shop.shopName}</CardTitle>
          </Link >
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
            {
              shop.nearestStation && (
                <>
                  <span>•</span>
                  <Badge variant="outline">{shop.nearestStation}</Badge>
                </>
              )
            }
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 md:flex-row">
        <ImageGallery
          staffs={shop.staff as NonNullable<Shop['staff']>}
        />

        <div className="md:w-2/3 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="flex flex-row gap-3 items-center bg-muted p-2 rounded-md">
              <BadgeJapaneseYen className="w-4 h-4" />
              <div>
                <span className="text-sm text-muted-foreground">{t("lowestPrice")}</span>
                <p>¥{shop.lowestPrice.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex flex-row gap-3 items-center bg-muted p-2 rounded-md">
              <Clock className="w-4 h-4" />
              <div>
                <span className="text-sm text-muted-foreground">{t("hours")}</span>
                <p>{formatTime(shop.openHour)} - {formatTime(shop.closeHour)}</p>
              </div>
            </div>
          </div>

          {shop.bannerImage && (
            <div className="relative w-full overflow-hidden object-cover">
              <Media
                // @ts-expect-error
                resource={shop.bannerImage?.sizes?.banner}
                alt="Shop Banner"
                className="object-cover object-center"
              />
            </div>
          )}
          <ScrollArea className="h-24">
            <p className="whitespace-pre-wrap">
              {typeof shop.message === 'string'
                ? shop.message
                : 'No description available.'}
            </p>
          </ScrollArea>

          <div className="flex flex-row gap-2 items-center justify-end">
            <CreditCard className="w-4 h-4 text-muted-foreground" />
            {shop.paymentMethods && shop.paymentMethods.length > 0 && (
              <div>
                <span>{shop.paymentMethods.map((method) => (method as PaymentMethod).title).join(", ")}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card >

  )
}

const ImageGallery = ({ staffs }: { staffs: NonNullable<Shop['staff']> }) => {
  // Extract all images from staff
  const allImages = staffs?.flatMap((staff) => staff.images || []) || [];

  const displayItems = Array.from({ length: 6 }, (_, index) => ({
    image: allImages[index] || null,
    key: index,
  }));

  return (
    <section aria-label="Staff Image Gallery" className="w-full md:w-1/3">
      <ScrollArea className="w-full">
        <div className="flex gap-2 overflow-x-auto md:grid md:grid-cols-3 md:overflow-visible ">
          {displayItems.map(({ image, key }, index) => (
            <div
              key={key}
              className="flex-none w-40 aspect-[3/4] md:w-full hover:scale-105 duration-300"
            >
              {image ? (
                <Media
                  // @ts-expect-error
                  resource={image.sizes.portrait}
                  pictureClassName="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center" aria-hidden="true" >
                  <UserIcon className="w-10 h-10" />
                </div>
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