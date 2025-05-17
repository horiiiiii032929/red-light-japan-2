import '../../../styles/global.css'
import type { Metadata, Viewport } from 'next'
import React from 'react'
import { Footer } from '@/components/Footer/Component'
import { Header } from '@/components/Header/Component'
import { Providers } from '@/providers'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'
import { NextIntlClientProvider } from 'next-intl'
import { TypedLocale } from 'payload'
import { getServerSideURL } from '@/utilities/getURL'
import { AdminBar } from '@/components/AdminBar'
import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'
import { getMessages, setRequestLocale, getTranslations } from 'next-intl/server'
import { fontMono, fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { Toaster } from '@/components/ui/sonner'

interface Props {
  children: React.ReactNode
  params: Promise<{
    locale: TypedLocale
  }>
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations()

  return {
    metadataBase: new URL(getServerSideURL()),
    title: t('seo.app-title', { defaultValue: 'Nightlife Japan - Adult Entertainment Guide' }),
    description: t('seo.app-description'),
    openGraph: mergeOpenGraph({
      title: t('seo.app-title', { defaultValue: 'Nightlife Japan - Adult Entertainment Guide' }),
      description: t('seo.app-description'),
      locale: locale,
      alternateLocale: routing.locales.filter(l => l !== locale),
    }),
    // manifest: '/manifest.json',
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: '32x32' },
        { url: '/favicon.svg', type: 'image/svg+xml' }
      ],
      apple: '/apple-touch-icon.png'
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      }
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
    alternates: {
      canonical: '/',
      languages: {
        'en': '/en',
        'ja': '/ja',
        'ko': '/ko',
        'zh': '/zh',
      },
    },
    category: 'adult entertainment',
    keywords: ['nightlife', 'japan', 'red light district', 'adult entertainment', 'night clubs', 'bars', 'restaurants'],
  }
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params

  if (!routing.locales.includes(locale as any)) {
    notFound()
  }
  setRequestLocale(locale)

  const { isEnabled } = await draftMode()
  const messages = await getMessages()

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={cn(
        fontSans.variable,
        fontMono.variable
      )}
    >
      <body className={cn(
        "min-h-svh bg-background font-sans antialiased",
        "selection:bg-primary/20 selection:text-primary-foreground"
      )}>
        <Providers>
          <NextIntlClientProvider messages={messages}>
            <AdminBar
              adminBarProps={{
                preview: isEnabled,
              }}
            />
            <div className="flex min-h-svh flex-col">
              <Header locale={locale} />
              <div className="flex-1">
                {children}
              </div>
              <Footer locale={locale} />
            </div>
            <Toaster />
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  )
}
