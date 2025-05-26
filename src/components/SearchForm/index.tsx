'use client'

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { Check, ChevronsUpDown, MapPinned, Shapes, Sunset, Coins, Tags } from "lucide-react"
import { cn } from "@/lib/utils"

import type { Area, Category, Tag } from "@/payload-types"
import React from "react"
import { useRouter } from "@/i18n/routing"
import { useSearchParams } from "next/navigation"
import { useTranslations } from 'next-intl'
import { Separator } from "@/components/ui/separator"

interface Props {
  areas: Area[]
  categories: Category[]
  tags: Tag[]
  onSubmit?: () => void
}

interface FilterState {
  prefecture: string
  area: string
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
  const t = useTranslations()
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')

  return (
    <div role="group" aria-labelledby="prefecture-label" className="space-y-2">
      <Label id="prefecture-label" className="font-medium text-sm text-muted-foreground">
        <MapPinned className="w-4 h-4" />
        {t('filters.area')}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {prefecture || t('filters.areaPlaceholder')}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder={t('filters.areaPlaceholder')} className="h-9" />
            <CommandList>
              <CommandEmpty>{t('filters.noResultsFound')}</CommandEmpty>
              <CommandGroup>
                {Object.keys(areasByPrefecture).map((prefecture) => (
                  <CommandItem
                    key={prefecture}
                    value={prefecture}
                    onSelect={(currentValue) => {
                      onSelect(currentValue)
                      setValue(currentValue === value ? "" : currentValue)
                      setOpen(false)
                    }}
                  >
                    {prefecture}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === prefecture ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

// City Selector Component
const AreaSelector = ({
  selectedAreas,
  areas,
  onSelect
}: {
  selectedAreas: string[]
  areas: Area[]
  onSelect: (value: string) => void
}) => {
  return (
    <div role="group" aria-labelledby="cities-label" className="space-y-2">
      <div className="flex flex-wrap gap-2 mt-2" role="listbox" aria-multiselectable="true">
        {areas.map((area) => (
          <Badge
            key={area.id}
            variant={selectedAreas.includes(area.slug || '') ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => onSelect(area.slug || '')}
            role="option"
            aria-selected={selectedAreas.includes(area.slug || '')}
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
  const t = useTranslations()
  return (
    <div role="group" aria-labelledby="categories-label" className="space-y-2">
      <Label id="categories-label" className="font-medium text-sm text-muted-foreground">
        <Shapes className="w-4 h-4" />
        {t('filters.categories')}
      </Label>
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
  const t = useTranslations()
  return (
    <div className="space-y-4" role="group" aria-labelledby="price-range-label" >
      <Label id="price-range-label" className="font-medium text-sm text-muted-foreground">
        <Coins className="w-4 h-4" />
        {t('filters.price')}
      </Label>
      <Slider
        defaultValue={[0, 100000]}
        max={100000}
        step={1000}
        value={value}
        onValueChange={onChange}
        aria-label={t('price')}
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
  tags: Tag[]
  selectedTags: string[]
  onSelect: (value: string) => void
}) => {
  const t = useTranslations()
  return (
    <div role="group" aria-labelledby="tags-label" className="space-y-2">
      <Label id="tags-label" className="font-medium text-sm text-muted-foreground">
        <Tags className="w-4 h-4" />
        {t('filters.tags')}
      </Label>
      <div className="flex flex-wrap gap-2" role="listbox" aria-multiselectable="true">
        {tags.map((tag) => (
          <Badge
            key={tag.id}
            variant={selectedTags.includes(tag.slug || '') ? "default" : "outline"}
            className="cursor-pointer whitespace-nowrap"
            onClick={() => onSelect(tag.slug || '')}
            role="option"
            aria-selected={selectedTags.includes(tag.slug || '')}
          >
            {tag.title}
          </Badge>
        ))}
      </div>
    </div>
  )
}

export function Form({
  areas,
  categories,
  tags,
  onSubmit
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const t = useTranslations()

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
    area: searchParams.get('area') || '',
    category: searchParams.get('category') || '',
    open_now: searchParams.get('open_now') || '',
    price_min: searchParams.get('price_min') || '0',
    price_max: searchParams.get('price_max') || '100000',
    tags: searchParams.get('tags') || '',
    sort: searchParams.get('sort') || 'recommended'
  });

  const updateLocalParams = (updates: Partial<FilterState>) => {
    setLocalParams(prev => ({ ...prev, ...updates }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    Object.entries(localParams).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      }
    });
    router.push(`/search?${params.toString()}`);
    onSubmit?.();
  };

  const selectedAreas = localParams.area?.split(',') || [];
  const selectedCategories = localParams.category?.split(',') || [];
  const selectedTags = localParams.tags?.split(',') || [];
  const priceRange = [
    Number(localParams.price_min) || 0,
    Number(localParams.price_max) || 100000
  ] as [number, number];

  const handleAreaSelect = (area: string) => {
    const newAreas = selectedAreas.includes(area)
      ? selectedAreas.filter(a => a !== area)
      : [...selectedAreas, area];
    updateLocalParams({ area: newAreas.join(',') });
  };

  const handleCategorySelect = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    updateLocalParams({ category: newCategories.join(',') });
  };

  const handleTagSelect = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    updateLocalParams({ tags: newTags.join(',') });
  };

  const handlePriceRangeChange = (value: [number, number]) => {
    updateLocalParams({
      price_min: String(value[0]),
      price_max: String(value[1])
    });
  };

  return (
    <form id="filter-form" onSubmit={handleSubmit}>
      <div className="space-y-6">
        {/* Location Section */}
        <section className="space-y-4">
          <div className="space-y-4">
            <PrefectureSelector
              prefecture={localParams.prefecture}
              areasByPrefecture={sortedPrefectures}
              onSelect={(prefecture) => updateLocalParams({ prefecture })}
            />
            {localParams.prefecture && (
              <AreaSelector
                selectedAreas={selectedAreas}
                areas={sortedPrefectures[localParams.prefecture] || []}
                onSelect={handleAreaSelect}
              />
            )}
          </div>
        </section>

        <Separator className="my-4" />

        {/* Categories Section */}
        <section className="space-y-4">
          <CategorySelector
            categories={categories}
            selectedCategories={selectedCategories}
            onSelect={handleCategorySelect}
          />
        </section>

        <Separator className="my-4" />

        {/* Availability Section */}
        <section className="space-y-4">
          <h3 className="font-medium text-sm text-muted-foreground flex items-center gap-2">
            <Sunset className="w-4 h-4" />
            {t('filters.availability')}
          </h3>
          <div className="flex items-center space-x-2">
            <Switch
              id="open-now"
              checked={localParams.open_now === 'true'}
              onCheckedChange={(checked) => updateLocalParams({ open_now: checked ? 'true' : '' })}
              aria-label={t('openNow')}
            />
            <Label htmlFor="open-now">{t('filters.openNow')}</Label>
          </div>
        </section>

        <Separator className="my-4" />

        {/* Price Section */}
        <section className="space-y-4">
          <PriceRangeSelector
            value={priceRange}
            onChange={handlePriceRangeChange}
          />
        </section>

        {/* Special Features Section */}
        <section className="space-y-4">
          <TagSelector
            tags={tags}
            selectedTags={selectedTags}
            onSelect={handleTagSelect}
          />
        </section>
      </div>
    </form>
  )
}