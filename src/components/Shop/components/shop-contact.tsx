import { Media } from "@/payload-types"
import { Media as MediaComponent } from "@/components/Media"
import { getTranslations } from "next-intl/server"
interface ShopContactProps {
  platform: string
  qrCode?: Media
}

export default async function ShopContact({ platform, qrCode }: ShopContactProps) {
  const t = await getTranslations("shops.shop")

  return (
    <div className="flex flex-col items-center">
      {qrCode?.sizes?.square ? (
        <div className="h-32 w-32 overflow-hidden">
          <MediaComponent
            // @ts-expect-error
            resource={qrCode.sizes?.square}
            className="object-contain"
          />
        </div>
      ) : (
        <div className="flex h-32 w-32 items-center justify-center rounded-md border p-2">
          <p className="text-center text-sm text-muted-foreground">{t("noXXAvailable", { platform: 'QR' })}</p>
        </div>
      )}
      <p className="leading-7 [&:not(:first-child)]:mt-3">ID: {platform}</p>
    </div>
  )
}
