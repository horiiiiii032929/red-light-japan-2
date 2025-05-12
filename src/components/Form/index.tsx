'use client'

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Label } from "@/components/ui/label"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

import type { Area, Category } from "@/payload-types"
import Link from "next/link"
import type { TypedLocale } from "payload"
import React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useTranslations } from 'next-intl'

interface Props {
  areas: Area[]
  categories: Category[]
  locale: TypedLocale
}

const SORT_OPTIONS = [
  { value: 'recommended', label: 'Recommended 🔥' },
  { value: 'rating', label: 'Rating' },
  { value: 'price_low', label: 'Cheapest' },
  { value: 'views', label: 'Most Viewed' },
]

const SPECIAL_TAGS = [
  'English OK',
  'New Girls',
  'Themed Cosplay',
  'VIP Service',
  'All You Can Drink',
  'Private Room',
  'Credit Card OK',
  'Foreign Card OK',
]

interface FilterState {
  prefecture: string
  city: string
  category: string
  open_now: string
  price_min: string
  price_max: string
  tags: string
  sort: string
}

// Prefecture Selector Component
const PrefectureSelector = ({
  prefecture,
  areasByPrefecture,
  onSelect
}: {
  prefecture: string
  areasByPrefecture: Record<string, Area[]>
  onSelect: (value: string) => void
}) => {
  const t = useTranslations('filter')
  return (
    <div role="group" aria-labelledby="prefecture-label" className="space-y-2">
      <Label id="prefecture-label" className="font-medium text-sm text-muted-foreground">{t('area')}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={false}
            aria-controls="prefecture-list"
            className="w-full justify-between"
          >
            {prefecture || t('selectArea', { area: '' })}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" aria-hidden="true" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder={t('selectArea', { area: '' })} />
            <CommandEmpty>{t('noResultsFound')}</CommandEmpty>
            <CommandGroup id="prefecture-list">
              {Object.keys(areasByPrefecture).map((prefecture) => (
                <CommandItem
                  key={prefecture}
                  onSelect={() => onSelect(prefecture)}
                  aria-selected={prefecture === prefecture}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      prefecture === prefecture ? "opacity-100" : "opacity-0"
                    )}
                    aria-hidden="true"
                  />
                  {prefecture}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

// City Selector Component
const CitySelector = ({
  cities,
  areas,
  onSelect
}: {
  cities: string[]
  areas: Area[]
  onSelect: (value: string) => void
}) => {
  const t = useTranslations('filter')
  return (
    <div role="group" aria-labelledby="cities-label" className="space-y-2">
      <Label id="cities-label" className="font-medium text-sm text-muted-foreground">{t('selectArea', { area: 'city' })}</Label>
      <div className="flex flex-wrap gap-2 mt-2" role="listbox" aria-multiselectable="true">
        {areas.map((area) => (
          <Badge
            key={area.id}
            variant={cities.includes(area.slug || '') ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => onSelect(area.slug || '')}
            role="option"
            aria-selected={cities.includes(area.slug || '')}
          >
            {area.title}
          </Badge>
        ))}
      </div>
    </div>
  )
}

// Category Selector Component
const CategorySelector = ({
  categories,
  selectedCategories,
  onSelect
}: {
  categories: Category[]
  selectedCategories: string[]
  onSelect: (value: string) => void
}) => {
  const t = useTranslations('filter')
  return (
    <div role="group" aria-labelledby="categories-label" className="space-y-2">
      <Label id="categories-label" className="font-medium text-sm text-muted-foreground">{t('categories')}</Label>
      <div className="flex flex-wrap gap-2" role="listbox" aria-multiselectable="true">
        {categories.map((category) => (
          <Badge
            key={category.id}
            variant={selectedCategories.includes(category.slug || '') ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => onSelect(category.slug || '')}
            role="option"
            aria-selected={selectedCategories.includes(category.slug || '')}
          >
            {category.title}
          </Badge>
        ))}
      </div>
    </div>
  )
}

// Price Range Selector Component
const PriceRangeSelector = ({
  value,
  onChange
}: {
  value: [number, number]
  onChange: (value: [number, number]) => void
}) => {
  const t = useTranslations('shops')
  return (
    <div className="space-y-4" role="group" aria-labelledby="price-range-label" >
      <Label id="price-range-label" className="font-medium text-sm text-muted-foreground">{t('price')}</Label>
      <Slider
        defaultValue={[0, 100000]}
        max={100000}
        step={1000}
        value={value}
        onValueChange={onChange}
        aria-label="Price range"
      />
      <div className="flex justify-between text-sm text-muted-foreground" aria-live="polite">
        <span>¥{value[0].toLocaleString()}</span>
        <span>¥{value[1].toLocaleString()}</span>
      </div>
    </div>
  )
}

// Tag Selector Component
const TagSelector = ({
  tags,
  selectedTags,
  onSelect
}: {
  tags: string[]
  selectedTags: string[]
  onSelect: (value: string) => void
}) => (
  <div role="group" aria-labelledby="tags-label" className="space-y-2">
    <Label id="tags-label" className="font-medium text-sm text-muted-foreground">Special Tags</Label>
    <div className="flex flex-wrap gap-2" role="listbox" aria-multiselectable="true">
      {tags.map((tag) => (
        <Badge
          key={tag}
          variant={selectedTags.includes(tag) ? "default" : "outline"}
          className="cursor-pointer whitespace-nowrap"
          onClick={() => onSelect(tag)}
          role="option"
          aria-selected={selectedTags.includes(tag)}
        >
          {tag}
        </Badge>
      ))}
    </div>
  </div>
)

// Sort Selector Component
const SortSelector = ({
  value,
  onChange
}: {
  value: string
  onChange: (value: string) => void
}) => (
  <div role="group" aria-labelledby="sort-label" className="space-y-2">
    <Label id="sort-label" className="font-medium text-sm text-muted-foreground">Sort By</Label>
    <Select
      value={value}
      onValueChange={onChange}
    >
      <SelectTrigger aria-label="Select sort order">
        <SelectValue placeholder="Select sort order" />
      </SelectTrigger>
      <SelectContent>
        {SORT_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
)

export function Form({
  areas,
  categories,
  locale
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const t = useTranslations('filter')

  // Group areas by prefecture and include order information
  const areasByPrefecture = areas.reduce((acc, area) => {
    const prefectureTitle = typeof area.prefecture === 'string' ? area.prefecture : area.prefecture.title;
    const prefectureOrder = typeof area.prefecture === 'string' ? 0 : area.prefecture.order || 0;

    if (!acc[prefectureTitle]) {
      acc[prefectureTitle] = {
        areas: [],
        order: prefectureOrder
      };
    }
    acc[prefectureTitle].areas.push(area);
    return acc;
  }, {} as Record<string, { areas: Area[], order: number }>);

  // Sort prefectures by order
  const sortedPrefectures = Object.entries(areasByPrefecture)
    .sort(([, a], [, b]) => a.order - b.order)
    .reduce((acc, [key, value]) => {
      acc[key] = value.areas;
      return acc;
    }, {} as Record<string, Area[]>);

  const [localParams, setLocalParams] = React.useState<FilterState>({
    prefecture: searchParams.get('prefecture') || '',
    city: searchParams.get('city') || '',
    category: searchParams.get('category') || '',
    open_now: searchParams.get('open_now') || '',
    price_min: searchParams.get('price_min') || '0',
    price_max: searchParams.get('price_max') || '100000',
    tags: searchParams.get('tags') || '',
    sort: searchParams.get('sort') || 'recommended'
  });

  const updateParams = (updates: Partial<FilterState>) => {
    const newParams = { ...localParams, ...updates };
    setLocalParams(newParams);

    const params = new URLSearchParams();
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      }
    });

    router.push(`/${locale}/search?${params.toString()}`);
  };

  const selectedCities = localParams.city?.split(',') || [];
  const selectedCategories = localParams.category?.split(',') || [];
  const selectedTags = localParams.tags?.split(',') || [];
  const priceRange = [
    Number(localParams.price_min) || 0,
    Number(localParams.price_max) || 20000
  ] as [number, number];

  const handleCitySelect = (city: string) => {
    const newCities = selectedCities.includes(city)
      ? selectedCities.filter(c => c !== city)
      : [...selectedCities, city];
    updateParams({ city: newCities.join(',') });
  };

  const handleCategorySelect = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    updateParams({ category: newCategories.join(',') });
  };

  const handleTagSelect = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    updateParams({ tags: newTags.join(',') });
  };

  const handlePriceRangeChange = (value: [number, number]) => {
    updateParams({
      price_min: String(value[0]),
      price_max: String(value[1])
    });
  };

  return (
    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{t('filters')}</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setLocalParams({
              prefecture: '',
              city: '',
              category: '',
              open_now: '',
              price_min: '0',
              price_max: '20000',
              tags: '',
              sort: 'recommended'
            });
            router.push(`/${locale}/search`);
          }}
        >
          {t('reset')}
        </Button>
      </div>

      <div className="space-y-6">
        {/* Location Section */}
        <section className="space-y-4">
          <div className="space-y-4">
            <PrefectureSelector
              prefecture={localParams.prefecture}
              areasByPrefecture={sortedPrefectures}
              onSelect={(prefecture) => updateParams({ prefecture })}
            />
            {localParams.prefecture && (
              <CitySelector
                cities={selectedCities}
                areas={sortedPrefectures[localParams.prefecture] || []}
                onSelect={handleCitySelect}
              />
            )}
          </div>
        </section>

        {/* Categories Section */}
        <section className="space-y-4">
          <CategorySelector
            categories={categories}
            selectedCategories={selectedCategories}
            onSelect={handleCategorySelect}
          />
        </section>

        {/* Availability Section */}
        <section className="space-y-4">
          <h3 className="font-medium text-sm text-muted-foreground">{t('filterOptions')}</h3>
          <div className="flex items-center space-x-2">
            <Switch
              id="open-now"
              checked={localParams.open_now === 'true'}
              onCheckedChange={(checked) => updateParams({ open_now: checked ? 'true' : '' })}
              aria-label="Open Now / Late-night"
            />
            <Label htmlFor="open-now">{t('filterOptions')}</Label>
          </div>
        </section>

        {/* Price Section */}
        <section className="space-y-4">
          <PriceRangeSelector
            value={priceRange}
            onChange={handlePriceRangeChange}
          />
        </section>

        {/* Special Features Section */}
        {/* <section className="space-y-4">
          <TagSelector
            tags={SPECIAL_TAGS}
            selectedTags={selectedTags}
            onSelect={handleTagSelect}
          />
        </section> */}

        {/* Sort Section */}
        {/* <section className="space-y-4">
          <SortSelector
            value={localParams.sort}
            onChange={(value) => updateParams({ sort: value })}
          />
        </section> */}
      </div>
    </form>
  )
}
