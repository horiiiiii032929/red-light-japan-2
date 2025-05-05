'use client'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useState, useTransition } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { useLocale } from 'next-intl'
import localization from '@/i18n/localization'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { TypedLocale } from 'payload'
import { usePathname, useRouter } from '@/i18n/routing'

import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

interface HeaderClientProps {
  header: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ header }) => {
  return (
    <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-wrapper">
        <div className="container flex h-14 items-center gap-2 md:gap-4">
          <Link href="/" className="mr-4 flex items-center gap-2 lg:mr-6">
            <Logo className="h-6 w-6" />
          </Link>

          <div className="ml-auto flex justify-end">
            <nav className="flex items-center gap-1">
              <LocaleSwitcher />
              <ModeSwitcher />
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

function ModeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme()

  const toggleTheme = React.useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }, [resolvedTheme, setTheme])

  return (
    <Button
      variant="ghost"
      className="group/toggle h-8 w-8 px-0"
      onClick={toggleTheme}
    >
      <SunIcon className="hidden [html.dark_&]:block" />
      <MoonIcon className="hidden [html.light_&]:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}



function LocaleSwitcher() {
  // inspired by https://github.com/amannn/next-intl/blob/main/examples/example-app-router/src/components/LocaleSwitcherSelect.tsx
  const locale = useLocale()
  const router = useRouter()
  const [, startTransition] = useTransition()
  const pathname = usePathname()
  const params = useParams()

  function onSelectChange(value: TypedLocale) {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: value },
      )
    })
  }

  return (
    <Select onValueChange={onSelectChange} value={locale} >
      <SelectTrigger className="w-auto bg-transparent gap-2 pl-0 md:pl-3 border-none">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        {localization.locales
          .sort((a, b) => a.label.localeCompare(b.label)) // Ordenar por label
          .map((locale) => (
            <SelectItem value={locale.code} key={locale.code}>
              {locale.label}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  )
}
