import '../../../styles/global.css'
import type { Metadata } from 'next'

import React from 'react'

import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'
import { NextIntlClientProvider } from 'next-intl';
import { TypedLocale } from 'payload'

import { getServerSideURL } from '@/utilities/getURL'
import { AdminBar } from '@/components/AdminBar'
import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { fontMono, fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
interface Props {
  children: React.ReactNode
  params: Promise<{
    locale: TypedLocale
  }>
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
    >
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body className={cn(
        "min-h-svh bg-background font-sans antialiased",
        fontSans.variable,
        fontMono.variable
      )}>
        <Providers >
          <NextIntlClientProvider messages={messages}>
            <AdminBar
              adminBarProps={{
                preview: isEnabled,
              }} />
            <div className="flex flex-1 flex-col">
              <Header locale={locale} />
              <main className="flex flex-1 flex-col">
                {children}
              </main>
              <Footer locale={locale} />
            </div>
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
}
