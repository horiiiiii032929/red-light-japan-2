'use client'

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Tag, ChevronUp, ChevronDown } from "lucide-react"
import { useTranslations } from "next-intl"
import type { Shop } from "@/payload-types"
import { useState } from "react"
import { toast } from "sonner"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

interface ShopPageCouponsProps {
  coupons: Shop['coupons']
}

export function ShopPageCoupons({ coupons }: ShopPageCouponsProps) {
  const t = useTranslations()
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [termsOpen, setTermsOpen] = useState<string | null>(null)

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    toast.success(t('common.copied'))
    setTimeout(() => setCopiedCode(null), 2000)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-label="Available coupons">
      {coupons?.map((coupon) => (
        <Card key={coupon.id || coupon.code} className="gap-3">
          <CardHeader className="">
            <CardTitle className="text-primary">
              <div className="flex items-center gap-2">
                <Tag className="h-5 w-5" />
                <h3 className="font-semibold text-lg">{coupon.name}</h3>
              </div>
            </CardTitle>
            <CardDescription>
              {coupon.description && (
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{coupon.description}</p>
              )}
            </CardDescription>
          </CardHeader>

          <div className="px-6">
            <div className="flex items-center justify-between bg-muted rounded-lg p-4">
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">
                  {t('shop-page.coupon-code')}
                </p>
                <p className="font-mono text-lg font-bold tracking-wider">{coupon.code}</p>
              </div>
              <Button
                onClick={() => copyToClipboard(coupon.code)}
                variant={copiedCode === coupon.code ? "default" : "outline"}
                size="sm"
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Terms and conditions */}
          {coupon.description && (
            <CardFooter>
              <Collapsible
                open={termsOpen === coupon.code}
                onOpenChange={(open) => setTermsOpen(open ? coupon.code : null)}
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-between text-xs text-muted-foreground hover:text-foreground"
                  >
                    <span>{t('shop-page.coupon-terms-and-conditions')}</span>
                    {termsOpen === coupon.code ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-2 pl-3">
                  <div className="text-xs text-muted-foreground">
                    {coupon.description}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </CardFooter>
          )}
        </Card>
      ))}
    </div>
  )
} 