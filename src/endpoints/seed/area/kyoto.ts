import type { Area } from '@/payload-types'

export const areas: Partial<Area>[] = [
  // Tier 1: Major Entertainment Districts
  { title: 'Gion', slug: 'gion', prefecture: 'kyoto', order: 1 },
  { title: 'Kawaramachi / Kiyamachi / Pontocho', slug: 'kawaramachi-kiyamachi-pontocho', prefecture: 'kyoto', order: 2 },

  // Tier 2: Central Kyoto
  { title: 'Karasuma / Omiya / Saiin', slug: 'karasuma-omiya-saiin', prefecture: 'kyoto', order: 3 },
  { title: 'Fushimi', slug: 'fushimi', prefecture: 'kyoto', order: 4 },

  // Tier 3: Eastern & Southern Kyoto
  { title: 'Yamashina', slug: 'yamashina', prefecture: 'kyoto', order: 5 },
  { title: 'Uji / Kyotanabe', slug: 'uji-kyotanabe', prefecture: 'kyoto', order: 6 },

  // Tier 4: Northern Kyoto
  { title: 'Katsura', slug: 'katsura', prefecture: 'kyoto', order: 7 },
  { title: 'Fukuchiyama / Kyotango', slug: 'fukuchiyama-kyotango', prefecture: 'kyoto', order: 8 },
]

export const areas_ja: Partial<Area>[] = [
  // 第1層：主要歓楽街
  { title: '祇園', slug: 'gion', prefecture: 'kyoto', order: 1 },
  { title: '河原町・木屋町・先斗町', slug: 'kawaramachi-kiyamachi-pontocho', prefecture: 'kyoto', order: 2 },

  // 第2層：京都市中心部
  { title: '烏丸・大宮・西院', slug: 'karasuma-omiya-saiin', prefecture: 'kyoto', order: 3 },
  { title: '伏見', slug: 'fushimi', prefecture: 'kyoto', order: 4 },

  // 第3層：京都東部・南部
  { title: '山科', slug: 'yamashina', prefecture: 'kyoto', order: 5 },
  { title: '宇治・京田辺', slug: 'uji-kyotanabe', prefecture: 'kyoto', order: 6 },

  // 第4層：京都北部
  { title: '桂', slug: 'katsura', prefecture: 'kyoto', order: 7 },
  { title: '福知山・京丹後', slug: 'fukuchiyama-kyotango', prefecture: 'kyoto', order: 8 },
]

export const areas_ko: Partial<Area>[] = [
  // 1단계：주요 유흥가
  { title: '기온', slug: 'gion', prefecture: 'kyoto', order: 1 },
  { title: '가와라마치・키야마치・폰토초', slug: 'kawaramachi-kiyamachi-pontocho', prefecture: 'kyoto', order: 2 },

  // 2단계：교토 시 중심부
  { title: '카라스마・오미야・사이인', slug: 'karasuma-omiya-saiin', prefecture: 'kyoto', order: 3 },
  { title: '후시미', slug: 'fushimi', prefecture: 'kyoto', order: 4 },

  // 3단계：교토 동부・남부
  { title: '야마시나', slug: 'yamashina', prefecture: 'kyoto', order: 5 },
  { title: '우지・교토타나베', slug: 'uji-kyotanabe', prefecture: 'kyoto', order: 6 },

  // 4단계：교토 북부
  { title: '카츠라', slug: 'katsura', prefecture: 'kyoto', order: 7 },
  { title: '후쿠치야마・교토탄고', slug: 'fukuchiyama-kyotango', prefecture: 'kyoto', order: 8 },
]

export const areas_zh: Partial<Area>[] = [
  // 第一层：主要娱乐区
  { title: '祇园', slug: 'gion', prefecture: 'kyoto', order: 1 },
  { title: '河原町・木屋町・先斗町', slug: 'kawaramachi-kiyamachi-pontocho', prefecture: 'kyoto', order: 2 },

  // 第二层：京都市中心
  { title: '乌丸・大宫・西院', slug: 'karasuma-omiya-saiin', prefecture: 'kyoto', order: 3 },
  { title: '伏见', slug: 'fushimi', prefecture: 'kyoto', order: 4 },

  // 第三层：京都东部・南部
  { title: '山科', slug: 'yamashina', prefecture: 'kyoto', order: 5 },
  { title: '宇治・京田边', slug: 'uji-kyotanabe', prefecture: 'kyoto', order: 6 },

  // 第四层：京都北部
  { title: '桂', slug: 'katsura', prefecture: 'kyoto', order: 7 },
  { title: '福知山・京丹后', slug: 'fukuchiyama-kyotango', prefecture: 'kyoto', order: 8 },
]