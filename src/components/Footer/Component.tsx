import Link from 'next/link'
import React from 'react'

import { TypedLocale } from 'payload'
import { Logo } from '@/components/Logo/Logo'

export async function Footer({ locale }: { locale: TypedLocale }) {

  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container-wrapper py-2">
        <div className="container py-4 mx-auto sm:flex sm:items-center sm:justify-between">
          <Link href="/" className="flex items-center mb-4 sm:mb-0 space-x-3">
            <Logo className="h-12 w-12" />
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium">
            {/* {navItems.map(({ link }, i) => (
              <li key={i}>
                <CMSLink className="hover:underline me-4 md:me-6" {...link} />
              </li>
            ))} */}
          </ul>
        </div>
        <span className="block text-sm text-center">
          © {new Date().getFullYear()} <Link href="/" className="hover:underline">NIGHT LIFE JAPAN</Link>. All Rights Reserved.
        </span>
      </div>
    </footer>
  )
}
