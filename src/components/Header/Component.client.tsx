'use client'

import { Link } from '@/i18n/routing'
import { useParams } from 'next/navigation'
import React, { useTransition } from 'react'

// import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { useLocale } from 'next-intl'
import localization from '@/i18n/localization'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { TypedLocale } from 'payload'
import { usePathname, useRouter } from '@/i18n/routing'

import { GlobeIcon, MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

// interface HeaderClientProps {
//   header: Header
// }

export const HeaderClient = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container-wrapper">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/">
            <Logo />
          </Link>

          <nav className="flex items-center gap-1">
            <LocaleSwitcher />
            <ModeSwitcher />
          </nav>
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
  const locale = useLocale()
  const router = useRouter()
  const [, startTransition] = useTransition()
  const pathname = usePathname()
  const params = useParams()

  function onSelectChange(value: TypedLocale) {
    startTransition(() => {
      router.replace(
        //  -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        // @ts-expect-error
        { pathname, params },
        { locale: value },
      )
    })
  }

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <GlobeIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {localization.locales
            .sort((a, b) => a.label.localeCompare(b.label))
            .map((localeOption) => (
              <DropdownMenuItem
                key={localeOption.code}
                onClick={() => onSelectChange(localeOption.code as TypedLocale)}
                className={locale === localeOption.code ? "bg-accent" : ""}
              >
                {localeOption.label}
              </DropdownMenuItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
