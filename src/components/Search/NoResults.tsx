'use client'

import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

export const NoResults = () => {
  const router = useRouter()

  const t = useTranslations('search')

  const resetFilters = () => {
    router.replace('/search')
  }

  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <div className="rounded-full bg-muted p-4 md:p-6">
        <Search className="h-8 w-8 text-muted-foreground md:h-10 md:w-10" />
      </div>
      <h2 className="mt-4 text-lg font-semibold md:text-xl">{t('noResultsFound')}</h2>
      <p className="mt-2 text-xs text-muted-foreground md:text-sm">{t('noResultsFoundDescription')}</p>
      <div className="mt-4 space-y-2 text-sm text-muted-foreground">
        <p>• {t('tryDifferentFilters')}</p>
      </div>
      <Button className="mt-4 h-10 text-sm md:mt-6" onClick={resetFilters}>
        {t('resetFilters')}
      </Button>
    </div>
  )
} 