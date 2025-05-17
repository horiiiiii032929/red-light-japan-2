import {
  MigrateDownArgs,
  MigrateUpArgs,
} from '@payloadcms/db-mongodb'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { CollectionSlug } from 'payload'

const collections: CollectionSlug[] = [
  'tenants',
  'users',
  'tags',
  'categories',
  'payment-methods',
  'regions',
  'prefectures',
  'areas',
  'shops',
  'media',
  'casts',
] as CollectionSlug[]

const locales = ['en', 'ja', 'ko', 'zh'] as const
type Locale = typeof locales[number]

interface ImageReference {
  id: string
  alt: string
}

interface System {
  name: string;
  description: string;
  priceMin: number;
  priceMax: number;
  duration: number;
}

interface Coupon {
  code: string;
  name: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
}

interface ShopTranslation {
  id: string;
  phoneNumber: {
    phoneNumber: string;
    phoneNumber2: string;
  };
  whatsapp: {
    snsId: string;
    qrCode: string | null;
  };
  line: {
    snsId: string;
    qrCode: string | null;
  };
  weChat: {
    snsId: string;
    qrCode: string | null;
  };
  lowestPrice: number;
  description: string;
  systems: System[];
  coupons: Coupon[];
  openHour: string;
  closeHour: string;
}

// Helper function to get exactly 2 random unique items from an array
function getTwoRandomItems<T>(array: T[]): [T, T] {
  if (array.length < 2) {
    throw new Error('Array must have at least 2 items')
  }
  const shuffled = [...array].sort(() => 0.5 - Math.random())
  return [shuffled[0]!, shuffled[1]!]
}

export async function up({ payload, req, session }: MigrateUpArgs): Promise<void> {
  payload.logger.info('Starting migration...')

  // Get the directory name using import.meta.url
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)

  // Clear existing data
  for (const collection of collections) {
    try {
      await payload.delete({
        collection,
        where: {
          id: {
            exists: true,
          },
        },
        req,
      })
    } catch (error) {
      payload.logger.error(`Error clearing collection ${collection}:`, error)
    }
  }

  // Load data from JSON files
  const dataDir = path.join(__dirname, 'data')
  const tenants = JSON.parse(fs.readFileSync(path.join(dataDir, 'tenants.json'), 'utf-8'))
  const users = JSON.parse(fs.readFileSync(path.join(dataDir, 'users.json'), 'utf-8'))
  const casts = JSON.parse(fs.readFileSync(path.join(dataDir, 'casts', 'en.json'), 'utf-8'))

  // Create ID mapping objects
  const tenantMap = new Map<string, string>()
  const userMap = new Map<string, string>()
  const tagMap = new Map<string, string>()
  const categoryMap = new Map<string, string>()
  const paymentMethodMap = new Map<string, string>()
  const regionMap = new Map<string, string>()
  const prefectureMap = new Map<string, string>()
  const areaMap = new Map<string, string>()
  const mediaMap = new Map<string, string>()

  // 1. Create tenants
  for (const tenant of tenants) {
    const createdTenant = await payload.create({
      collection: 'tenants',
      data: tenant,
      req,
    })
    tenantMap.set(tenant.slug, createdTenant.id)
  }
  payload.logger.info('Created tenants')

  // 2. Create users
  for (const user of users) {
    // Replace tenant slugs with IDs in user.tenants
    if (user.tenants) {
      user.tenants = user.tenants.map((t: any) => ({
        ...t,
        tenant: tenantMap.get(t.tenant) ?? t.tenant,
      }))
    }
    const createdUser = await payload.create({
      collection: 'users',
      data: user,
      req,
    })
    userMap.set(user.slug, createdUser.id)
  }
  payload.logger.info('Created users')

  // 2. Create categories
  const categoryFiles = fs.readdirSync(path.join(dataDir, 'categories'))
  const createdCategories: any[] = []

  // First create English categories
  const enCategories = JSON.parse(fs.readFileSync(path.join(dataDir, 'categories', 'en.json'), 'utf-8'))
  for (const category of enCategories) {
    const created = await payload.create({
      collection: 'categories',
      data: category,
      locale: 'en',
      req,
    })
    categoryMap.set(category.slug, created.id)
    createdCategories.push(created)
  }
  payload.logger.info('Created English categories')

  // Add translations for categories
  for (const locale of ['ja', 'ko', 'zh'] as const) {
    const translations = JSON.parse(fs.readFileSync(path.join(dataDir, 'categories', `${locale}.json`), 'utf-8'))
    for (let i = 0; i < translations.length; i++) {
      const category = createdCategories[i]
      if (category) {
        await payload.update({
          collection: 'categories',
          id: category.id,
          data: { title: translations[i].title },
          locale,
          req,
        })
      }
    }
  }
  payload.logger.info('Added category translations')

  // 3. Create tags
  const tagFiles = fs.readdirSync(path.join(dataDir, 'tags'))
  const createdTags: any[] = []

  // First create English tags
  const enTags = JSON.parse(fs.readFileSync(path.join(dataDir, 'tags', 'en.json'), 'utf-8'))
  for (const tag of enTags) {
    const created = await payload.create({
      collection: 'tags',
      data: tag,
      locale: 'en',
      req,
    })
    tagMap.set(tag.slug, created.id)
    createdTags.push(created)
  }
  payload.logger.info('Created English tags')

  // Add translations for tags
  for (const locale of ['ja', 'ko', 'zh'] as const) {
    const translations = JSON.parse(fs.readFileSync(path.join(dataDir, 'tags', `${locale}.json`), 'utf-8'))
    for (let i = 0; i < translations.length; i++) {
      const tag = createdTags[i]
      if (tag) {
        await payload.update({
          collection: 'tags',
          id: tag.id,
          data: { title: translations[i].title },
          locale,
          req,
        })
      }
    }
  }
  payload.logger.info('Added tag translations')

  // 4. Create payment methods
  const paymentMethodFiles = fs.readdirSync(path.join(dataDir, 'payment-methods'))
  const createdPaymentMethods: any[] = []

  // First create English payment methods
  const enPaymentMethods = JSON.parse(fs.readFileSync(path.join(dataDir, 'payment-methods', 'en.json'), 'utf-8'))
  for (const pm of enPaymentMethods) {
    const created = await payload.create({
      collection: 'payment-methods',
      data: {
        ...pm,
        tenant: tenantMap.get('default-tenant'),
      },
      locale: 'en',
      req,
    })
    paymentMethodMap.set(pm.slug, created.id)
    createdPaymentMethods.push(created)
  }
  payload.logger.info('Created English payment methods')

  // Add translations for payment methods
  for (const locale of ['ja', 'ko', 'zh'] as const) {
    const translations = JSON.parse(fs.readFileSync(path.join(dataDir, 'payment-methods', `${locale}.json`), 'utf-8'))
    for (let i = 0; i < translations.length; i++) {
      const pm = createdPaymentMethods[i]
      if (pm) {
        await payload.update({
          collection: 'payment-methods',
          id: pm.id,
          data: { title: translations[i].title },
          locale,
          req,
        })
      }
    }
  }
  payload.logger.info('Added payment method translations')

  // 5. Create regions
  const regionFiles = fs.readdirSync(path.join(dataDir, 'regions'))
  const createdRegions: any[] = []

  // First create English regions
  const enRegions = JSON.parse(fs.readFileSync(path.join(dataDir, 'regions', 'en.json'), 'utf-8'))
  for (const region of enRegions) {
    const created = await payload.create({
      collection: 'regions',
      data: region,
      locale: 'en',
      req,
    })
    regionMap.set(region.slug, created.id)
    createdRegions.push(created)
  }
  payload.logger.info('Created English regions')

  // Add translations for regions
  for (const locale of ['ja', 'ko', 'zh'] as const) {
    const translations = JSON.parse(fs.readFileSync(path.join(dataDir, 'regions', `${locale}.json`), 'utf-8'))
    for (let i = 0; i < translations.length; i++) {
      const region = createdRegions[i]
      if (region) {
        await payload.update({
          collection: 'regions',
          id: region.id,
          data: { title: translations[i].title },
          locale,
          req,
        })
      }
    }
  }
  payload.logger.info('Added region translations')

  // 6. Create prefectures
  const prefectureFiles = fs.readdirSync(path.join(dataDir, 'prefectures'))
  const createdPrefectures: any[] = []

  // First create English prefectures
  const enPrefectures = JSON.parse(fs.readFileSync(path.join(dataDir, 'prefectures', 'en.json'), 'utf-8'))
  for (const prefecture of enPrefectures) {
    // Replace region slug with ID
    const regionId = regionMap.get(prefecture.region)
    if (regionId) {
      prefecture.region = regionId
    }
    const created = await payload.create({
      collection: 'prefectures',
      data: prefecture,
      locale: 'en',
      req,
    })
    prefectureMap.set(prefecture.slug, created.id)
    createdPrefectures.push(created)
  }
  payload.logger.info('Created English prefectures')

  // Add translations for prefectures
  for (const locale of ['ja', 'ko', 'zh'] as const) {
    const translations = JSON.parse(fs.readFileSync(path.join(dataDir, 'prefectures', `${locale}.json`), 'utf-8'))
    for (let i = 0; i < translations.length; i++) {
      const prefecture = createdPrefectures[i]
      if (prefecture) {
        await payload.update({
          collection: 'prefectures',
          id: prefecture.id,
          data: { title: translations[i].title },
          locale,
          req,
        })
      }
    }
  }
  payload.logger.info('Added prefecture translations')

  // 7. Create areas
  const areaDir = path.join(dataDir, 'areas')
  const prefectureDirs = fs.readdirSync(areaDir)
  const createdAreas: any[] = []

  for (const prefectureDir of prefectureDirs) {
    // Get the prefecture ID from the prefecture map using the directory name as slug
    const prefectureId = prefectureMap.get(prefectureDir)
    if (!prefectureId) {
      payload.logger.warn(`No prefecture found for directory: ${prefectureDir}`)
      continue
    }

    // First create English areas for this prefecture
    const enAreas = JSON.parse(fs.readFileSync(path.join(areaDir, prefectureDir, 'en.json'), 'utf-8'))
    for (const area of enAreas) {
      // Ensure consistent data structure
      const areaData = {
        title: area.title,
        slug: area.slug,
        prefecture: prefectureId,
        order: area.order,
      }

      const created = await payload.create({
        collection: 'areas',
        data: areaData,
        locale: 'en',
        req,
      })
      areaMap.set(area.slug, created.id)
      createdAreas.push(created)
    }

    // Add translations for areas
    for (const locale of ['ja', 'ko', 'zh'] as const) {
      const translations = JSON.parse(fs.readFileSync(path.join(areaDir, prefectureDir, `${locale}.json`), 'utf-8'))
      for (let i = 0; i < translations.length; i++) {
        const area = createdAreas[createdAreas.length - translations.length + i]
        if (area) {
          await payload.update({
            collection: 'areas',
            id: area.id,
            data: { title: translations[i].title },
            locale,
            req,
          })
        }
      }
    }
  }
  payload.logger.info('Created areas and added translations')

  // 8. Create media
  const mediaFiles = {
    casts: fs.readdirSync(path.join(dataDir, 'media', 'casts')),
    shops: {
      main: fs.readdirSync(path.join(dataDir, 'media', 'shops', 'main')),
      system: fs.readdirSync(path.join(dataDir, 'media', 'shops', 'system')),
    },
  }

  // Create cast media
  for (const file of mediaFiles.casts) {
    const filePath = path.join(dataDir, 'media', 'casts', file)
    const media = await payload.create({
      collection: 'media',
      data: {
        alt: file.replace(/\.[^.]+$/, ''),
        tenant: tenantMap.get('default-tenant'), // Add default-tenant tenant
      },
      filePath,
      req,
    })
    mediaMap.set(file, media.id)
  }

  // Create shop media - main images
  for (const file of mediaFiles.shops.main) {
    const filePath = path.join(dataDir, 'media', 'shops', 'main', file)
    const media = await payload.create({
      collection: 'media',
      data: {
        alt: file.replace(/\.[^.]+$/, ''),
        tenant: tenantMap.get('default-tenant'), // Add default-tenant tenant
      },
      filePath,
      req,
    })
    mediaMap.set(`main/${file}`, media.id)
  }

  // Create shop media - system images
  for (const file of mediaFiles.shops.system) {
    const filePath = path.join(dataDir, 'media', 'shops', 'system', file)
    const media = await payload.create({
      collection: 'media',
      data: {
        alt: file.replace(/\.[^.]+$/, ''),
        tenant: tenantMap.get('default-tenant'), // Add default-tenant tenant
      },
      filePath,
      req,
    })
    mediaMap.set(`system/${file}`, media.id)
  }
  payload.logger.info('Created media')

  // 9. Create casts
  const createdCasts: any[] = []
  for (const cast of casts) {
    // Replace tenant slug with ID
    const tenantId = tenantMap.get(cast.tenant)
    if (tenantId) {
      cast.tenant = tenantId
    }
    // Get two random images from all cast media files
    const castMediaFiles = mediaFiles.casts
    const [image1, image2] = getTwoRandomItems(castMediaFiles)
    cast.images = [
      mediaMap.get(image1),
      mediaMap.get(image2),
    ]
    const created = await payload.create({
      collection: 'casts',
      data: {
        ...cast,
        _status: 'published',
      },
      locale: 'en',
      req,
    })
    createdCasts.push(created)
  }
  payload.logger.info('Created casts')

  // Add translations for casts
  for (const locale of ['ja', 'ko', 'zh'] as const) {
    const translations = JSON.parse(fs.readFileSync(path.join(dataDir, 'casts', `${locale}.json`), 'utf-8'))
    for (let i = 0; i < translations.length; i++) {
      const cast = createdCasts[i]
      if (cast) {
        await payload.update({
          collection: 'casts',
          id: cast.id,
          data: {
            name: translations[i].name,
            _status: 'published',
          },
          locale,
          req,
        })
      }
    }
  }
  payload.logger.info('Added cast translations')

  // 10. Create shops for each area and category using new translation files
  const shopTranslations = {
    en: JSON.parse(fs.readFileSync(path.join(dataDir, 'shops', 'en.json'), 'utf-8')),
    ja: JSON.parse(fs.readFileSync(path.join(dataDir, 'shops', 'ja.json'), 'utf-8')),
    ko: JSON.parse(fs.readFileSync(path.join(dataDir, 'shops', 'ko.json'), 'utf-8')),
    zh: JSON.parse(fs.readFileSync(path.join(dataDir, 'shops', 'zh.json'), 'utf-8')),
  };

  for (const area of createdAreas) {
    // For each shop in en.json (5 shops, one per category)
    for (const shop of shopTranslations.en) {
      // Find the category by slug
      const categoryId = categoryMap.get(shop.type);
      if (!categoryId) continue;

      // Randomly select one or two main images
      const mainImages = mediaFiles.shops.main;
      const selectedMainImages = getTwoRandomItems(mainImages).map(file => mediaMap.get(`main/${file}`));

      // Randomly select one or two casts
      const selectedCasts = getTwoRandomItems(createdCasts).map(cast => cast.id);

      // Create shop data for English
      const shopData = {
        ...shop,
        shopName: `[TEST] ${shop.shopName}`,
        area: area.id,
        type: categoryId,
        categories: [categoryId],
        paymentMethods: shop.paymentMethods?.map((slug: string) => paymentMethodMap.get(slug)).filter(Boolean),
        tags: shop.tags?.map((slug: string) => tagMap.get(slug)).filter(Boolean),
        openHour: new Date(shop.openHour),
        closeHour: new Date(shop.closeHour),
        phoneNumber: {
          phoneNumber: shop.phoneNumber.phoneNumber,
          phoneNumber2: shop.phoneNumber.phoneNumber2
        },
        whatsapp: {
          snsId: shop.whatsapp.snsId,
          qrCode: shop.whatsapp.qrCode
        },
        line: {
          snsId: shop.line.snsId,
          qrCode: shop.line.qrCode
        },
        weChat: {
          snsId: shop.weChat.snsId,
          qrCode: shop.weChat.qrCode
        },
        tenant: tenantMap.get('default-tenant'),
        images: selectedMainImages,
        casts: selectedCasts,
        lowestPrice: shop.lowestPrice,
        description: {
          root: {
            type: 'root',
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
            children: [
              {
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: shop.description,
                    type: 'text',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                type: 'paragraph',
                textFormat: 0,
                version: 1,
              },
            ],
          },
        },
        systems: shop.systems.map((system: System) => ({
          name: system.name,
          description: system.description,
          priceMin: system.priceMin,
          priceMax: system.priceMax,
          duration: system.duration
        })),
        systemDescription: {
          root: {
            type: 'root',
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
            children: [
              {
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: shop.systemDescription,
                    type: 'text',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                type: 'paragraph',
                textFormat: 0,
                version: 1,
              },
            ],
          },
        },
        coupons: shop.coupons.map((coupon: Coupon) => ({
          code: coupon.code,
          name: coupon.name,
          description: coupon.description,
          originalPrice: coupon.originalPrice,
          discountedPrice: coupon.discountedPrice
        }))
      };

      const createdShop = await payload.create({
        collection: 'shops',
        data: {
          ...shopData,
          _status: 'published',
        },
        locale: 'en',
        req,
      });

      // Add translations for ja, ko, zh
      for (const locale of ['ja', 'ko', 'zh'] as const) {
        const translation = shopTranslations[locale].find((t: ShopTranslation) => t.id === shop.id);
        if (!translation) continue;
        const updateData: any = {
          ...translation,
          shopName: `[TEST] ${translation.shopName}`,
          area: area.id,
          type: categoryId,
          categories: [categoryId],
          paymentMethods: translation.paymentMethods?.map((slug: string) => paymentMethodMap.get(slug)).filter(Boolean),
          tags: translation.tags?.map((slug: string) => tagMap.get(slug)).filter(Boolean),
          openHour: new Date(translation.openHour),
          closeHour: new Date(translation.closeHour),
          phoneNumber: {
            phoneNumber: translation.phoneNumber.phoneNumber,
            phoneNumber2: translation.phoneNumber.phoneNumber2
          },
          whatsapp: {
            snsId: translation.whatsapp.snsId,
            qrCode: translation.whatsapp.qrCode
          },
          line: {
            snsId: translation.line.snsId,
            qrCode: translation.line.qrCode
          },
          weChat: {
            snsId: translation.weChat.snsId,
            qrCode: translation.weChat.qrCode
          },
          tenant: tenantMap.get('default-tenant'),
          images: selectedMainImages,
          casts: selectedCasts,
          lowestPrice: translation.lowestPrice,
          description: {
            root: {
              type: 'root',
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  children: [
                    {
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      text: translation.description,
                      type: 'text',
                      version: 1,
                    },
                  ],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  type: 'paragraph',
                  textFormat: 0,
                  version: 1,
                },
              ],
            },
          },
          systems: translation.systems.map((system: System) => ({
            name: system.name,
            description: system.description,
            priceMin: system.priceMin,
            priceMax: system.priceMax,
            duration: system.duration
          })),
          systemDescription: {
            root: {
              type: 'root',
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  children: [
                    {
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      text: translation.systemDescription,
                      type: 'text',
                      version: 1,
                    },
                  ],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  type: 'paragraph',
                  textFormat: 0,
                  version: 1,
                },
              ],
            },
          },
          coupons: translation.coupons.map((coupon: Coupon) => ({
            code: coupon.code,
            name: coupon.name,
            description: coupon.description,
            originalPrice: coupon.originalPrice,
            discountedPrice: coupon.discountedPrice
          }))
        };
        await payload.update({
          collection: 'shops',
          id: createdShop.id,
          data: {
            ...updateData,
            _status: 'published',
          },
          locale,
          req,
        });
      }
    }
  }
  payload.logger.info('Created test shops')
}

export async function down({ payload, req, session }: MigrateDownArgs): Promise<void> {
  // Clear all seeded data
  for (const collection of collections) {
    try {
      await payload.delete({
        collection,
        where: {
          id: {
            exists: true,
          },
        },
        req,
      })
    } catch (error) {
      payload.logger.error(`Error clearing collection ${collection}:`, error)
    }
  }
}
