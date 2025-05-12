import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'


import { TypedLocale } from 'payload'

export async function Header({ locale }: { locale: TypedLocale }) {
  return <HeaderClient />
}
