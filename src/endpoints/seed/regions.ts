import type { Region } from '@/payload-types'

export const regions: Partial<Region>[] = [
  {
    title: 'Kanto',
    slug: 'kanto',
    order: 1,
  },
  {
    title: 'Kansai',
    slug: 'kansai',
    order: 2,
  },
];

export const regions_ja: Partial<Region>[] = [
  {
    title: '関東',
    slug: 'kanto',
    order: 1,
  },
  {
    title: '関西',
    slug: 'kansai',
    order: 2,
  },
];

export const regions_ko: Partial<Region>[] = [
  {
    title: '간토',
    slug: 'kanto',
    order: 1,
  },
  {
    title: '간사이',
    slug: 'kansai',
    order: 2,
  },
];

export const regions_zh: Partial<Region>[] = [
  {
    title: '关东',
    slug: 'kanto',
    order: 1,
  },
  {
    title: '关西',
    slug: 'kansai',
    order: 2,
  },
];
