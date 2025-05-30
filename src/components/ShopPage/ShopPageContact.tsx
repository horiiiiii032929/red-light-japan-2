'use client'

import { Phone, MapPin, Train, MessageCircle, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import Link from "next/link"
import { useIsMobile } from "@/hooks/use-mobile"
import { useState } from "react"
import { toast } from "sonner"
import type { Shop } from "@/payload-types"
import { useTranslations } from "next-intl"

interface ShopPageContactProps {
  shop: Shop
}

export function ShopPageContact({ shop }: ShopPageContactProps) {
  const t = useTranslations()
  const isMobile = useIsMobile()
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setIsCopied(true)
    toast.success(t('common.copied'))
    setTimeout(() => setIsCopied(false), 2000)
  }

  const ContactButtons = () => (
    <div className="space-y-2 md:space-y-3">
      <div className="flex flex-col gap-2">
        <Button size="lg" className="h-10 text-sm md:h-11 md:text-base" asChild>
          <Link href={`tel:${shop.phoneNumber?.phoneNumber}`}>
            <Phone className="mr-1 h-3 w-3 md:mr-2 md:h-4 md:w-4" />
            {t('shop-page.phone-reservation')}
          </Link>
        </Button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center z-10">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            {t('shop-page.or-contact-via')}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <Button variant="outline" size="lg" className="h-10 text-sm md:h-11 md:text-base" asChild>
          <Link href={`https://line.me/ti/p/${shop.line?.snsId}`} target="_blank">
            Line
          </Link>
        </Button>
        <Button variant="outline" size="lg" className="h-10 text-sm md:h-11 md:text-base" asChild>
          <Link href={`weixin://dl/business/?t=${shop.weChat?.snsId}`} target="_blank">
            WeChat
          </Link>
        </Button>
        <Button variant="outline" size="lg" className="h-10 text-sm md:h-11 md:text-base" asChild>
          <Link href={`https://wa.me/${shop.whatsapp?.snsId}`} target="_blank">
            WhatsApp
          </Link>
        </Button>
      </div>
    </div>
  )

  if (isMobile) {
    return (
      <div className="fixed -bottom-5 left-0 right-0 z-50 md:relative md:z-0">
        <Card className="rounded-t-xl md:rounded-lg border-t md:border-t-0 shadow-lg md:shadow-none">
          <CardContent className="px-2 md:px-3">
            <ContactButtons />
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
          <CardContent className="px-2 md:px-3">
            <ContactButtons />
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">{t('shop-page.phone-reservation')}</h3>
            <div className="flex items-center justify-between rounded-md border p-2">
              <span className="text-sm">{shop.phoneNumber?.phoneNumber}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopy(shop.phoneNumber?.phoneNumber || '')}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Line</h3>
            <div className="flex items-center justify-between rounded-md border p-2">
              <span className="text-sm">{shop.line?.snsId}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopy(shop.line?.snsId || '')}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">WeChat</h3>
            <div className="flex items-center justify-between rounded-md border p-2">
              <span className="text-sm">{shop.weChat?.snsId}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopy(shop.weChat?.snsId || '')}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">WhatsApp</h3>
            <div className="flex items-center justify-between rounded-md border p-2">
              <span className="text-sm">{shop.whatsapp?.snsId}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopy(shop.whatsapp?.snsId || '')}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 