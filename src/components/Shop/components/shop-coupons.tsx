'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { useTranslations } from "next-intl"
import { Shop } from "@/payload-types"


interface ShopCouponsProps {
  coupons: Shop['coupons']
}
export default function ShopCoupons({ coupons }: ShopCouponsProps) {
  const t = useTranslations('shops.shop')

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
  }

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {coupons?.map((coupon) => (
        <Card key={coupon.id || coupon.code}>
          <CardHeader>
            <CardTitle>{coupon.name}</CardTitle>
            <CardDescription>{t("validUntil")}: {formatDate(coupon.validUntil)}</CardDescription>
          </CardHeader>
          <CardContent>
            {coupon.description && <p className="mb-4">{coupon.description}</p>}
            <div className="flex items-center justify-between rounded-md border p-2">
              <code className="font-mono text-lg font-semibold text-primary">{coupon.code}</code>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(coupon.code)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

