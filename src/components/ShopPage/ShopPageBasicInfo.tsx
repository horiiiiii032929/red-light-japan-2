import { MapPin, Clock, Phone, DollarSign, Info, CreditCard } from "lucide-react"
import type { PaymentMethod } from "@/payload-types"
import { formatTime } from "@/lib/format"
import { getTranslations } from "next-intl/server"
interface ShopPageBasicInfoProps {
  address: string
  openHour?: string
  closeHour?: string
  phoneNumber?: { phoneNumber: string }
  lowestPrice: number
  categoryTitle?: string[]
  paymentMethods?: (PaymentMethod | string)[]
}

export async function ShopPageBasicInfo({
  address,
  openHour,
  closeHour,
  phoneNumber,
  lowestPrice,
  categoryTitle,
  paymentMethods
}: ShopPageBasicInfoProps) {
  const t = await getTranslations()

  return (
    <div>
      <h2 className="mb-2 text-lg font-semibold md:mb-4 md:text-xl">
        {t('shop-page.basic-info')}
      </h2>
      <dl className="grid gap-2 text-xs md:text-sm sm:grid-cols-[auto_1fr] md:gap-3">
        <dt className="flex items-center font-medium">
          <MapPin className="mr-1 h-3 w-3 text-muted-foreground md:mr-2 md:h-4 md:w-4" />
          {t('shop-page.address')}
        </dt>
        <dd className="text-muted-foreground">{address}</dd>

        <dt className="flex items-center font-medium">
          <Clock className="mr-1 h-3 w-3 text-muted-foreground md:mr-2 md:h-4 md:w-4" />
          {t('shop-page.open-hours')}
        </dt>
        <dd className="text-muted-foreground">
          {openHour && closeHour ? `${formatTime(openHour)} - ${formatTime(closeHour)}` : '-'}
        </dd>

        <dt className="flex items-center font-medium">
          <Phone className="mr-1 h-3 w-3 text-muted-foreground md:mr-2 md:h-4 md:w-4" />
          {t('shop-page.phone-number')}
        </dt>
        <dd className="text-muted-foreground">{phoneNumber?.phoneNumber || '-'}</dd>

        <dt className="flex items-center font-medium">
          <DollarSign className="mr-1 h-3 w-3 text-muted-foreground md:mr-2 md:h-4 md:w-4" />
          {t('shop-page.price-range')}
        </dt>
        <dd className="text-muted-foreground">{lowestPrice} ~</dd>

        <dt className="flex items-center font-medium">
          <Info className="mr-1 h-3 w-3 text-muted-foreground md:mr-2 md:h-4 md:w-4" />
          {t('shop-page.category')}
        </dt>
        <dd className="text-muted-foreground">{categoryTitle?.join(', ') || '-'}</dd>

        <dt className="flex items-center font-medium">
          <CreditCard className="mr-1 h-3 w-3 text-muted-foreground md:mr-2 md:h-4 md:w-4" />
          {t('shop-page.payment-methods')}
        </dt>
        <dd className="text-muted-foreground">
          {paymentMethods?.map((method) =>
            typeof method === 'string' ? method : method.title
          ).join(', ') || '-'}
        </dd>
      </dl>
    </div>
  )
} 