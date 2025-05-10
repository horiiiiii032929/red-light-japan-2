'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { useTranslations } from "next-intl"
import { Shop } from "@/payload-types"
import { useState } from "react"

interface ShopCouponsProps {
  coupons: Shop['coupons']
}

export default function ShopCoupons({ coupons }: ShopCouponsProps) {
  const t = useTranslations('shops.shop')
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2" role="list" aria-label="Available coupons">
      {coupons?.map((coupon) => (
        <Card key={coupon.id || coupon.code} role="listitem">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">{coupon.name}</CardTitle>
            <CardDescription>{t("validUntil")}: {formatDate(coupon.validUntil)}</CardDescription>
          </CardHeader>
          <CardContent>
            {coupon.description && <p className="mb-4">{coupon.description}</p>}
            <div className="flex items-center justify-between rounded-md border p-2">
              <code className="font-mono text-sm font-medium leading-none text-primary">{coupon.code}</code>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(coupon.code)}
                aria-label={`Copy coupon code ${coupon.code}`}
              >
                {copiedCode === coupon.code ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

