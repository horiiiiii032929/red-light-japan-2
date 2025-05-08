'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form as ShadForm,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useTranslations } from "next-intl"

import type { Area, Category } from "@/payload-types"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"

interface Props {
  region: string
  areaSlugs: string
  categorySlugs: string
  areas: Area[]
  categories: Category[]
}

const FormSchema = z.object({
  areas: z.array(z.string()),
  categories: z.array(z.string()),
})

export function Form({
  region,
  areas,
  categories,
  areaSlugs,
  categorySlugs,
}: Props) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      areas: areaSlugs ? areaSlugs.split('+') : [],
      categories: categorySlugs ? categorySlugs.split('+') : [],
    },
  })
  const t = useTranslations('filter');
  const router = useRouter()

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const { areas: selectedAreas, categories: selectedCategories } = data;

    let path = `/region/${region}/`;

    if (selectedAreas.length > 0) {
      path += `area/${selectedAreas.join('+')}`;
    }

    if (selectedCategories.length > 0) {
      if (selectedAreas.length > 0) {
        path += '/';
      }
      path += `category/${selectedCategories.join('+')}`;
    }

    router.push(path);
  }

  return (
    <ShadForm {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="areas"
          render={() => (
            <FormItem>
              <FormLabel className="text-base mb-2">{t('filters')}</FormLabel>

              <span className="text-sm text-muted-foreground">{t('area')}</span>
              {areas.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="areas"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-center space-x-1 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.slug || '')}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.slug || ''])
                                : field.onChange(
                                  field.value?.filter(
                                    (value) => value !== (item.slug || '')
                                  )
                                )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {item.title}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}

              <span className="text-sm text-muted-foreground mt-2">{t('categories')}</span>
              {categories.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="categories"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-center space-x-1 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.slug || '')}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.slug || ''])
                                : field.onChange(
                                  field.value?.filter(
                                    (value) => value !== (item.slug || '')
                                  )
                                )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {item.title}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          <Search className="w-4 h-4" />
          <span>
            {t("applyFilters")}
          </span>
        </Button>
      </form>
    </ShadForm>
  )
}
