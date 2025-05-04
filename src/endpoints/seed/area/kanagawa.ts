import type { Area } from '@/payload-types'

export const areas: Partial<Area>[] = [
  // Tier 1: Major Cities
  { title: 'Yokohama', slug: 'yokohama', prefecture: 'kanagawa', order: 1 },
  { title: 'Kawasaki', slug: 'kawasaki', prefecture: 'kanagawa', order: 2 },
  { title: 'Sagamihara', slug: 'sagamihara', prefecture: 'kanagawa', order: 3 },

  // Tier 2: Major Coastal Cities
  { title: 'Kamakura / Fujisawa', slug: 'kamakura-fujisawa', prefecture: 'kanagawa', order: 4 },
  { title: 'Yokosuka', slug: 'yokosuka', prefecture: 'kanagawa', order: 5 },

  // Tier 3: Central Kanagawa
  { title: 'Yamato / Ebina / Atsugi', slug: 'yamato-ebina-atsugi', prefecture: 'kanagawa', order: 6 },

  // Tier 4: Shonan Area
  { title: 'Zushi / Hayama / Miura', slug: 'zushi-hayama-miura', prefecture: 'kanagawa', order: 7 },

  // Tier 5: Western Kanagawa
  { title: 'Odawara / Hakone / Yugawara', slug: 'odawara-hakone-yugawara', prefecture: 'kanagawa', order: 8 },
]

export const areas_ja: Partial<Area>[] = [
  // 第1層：主要都市
  { title: '横浜', slug: 'yokohama', prefecture: 'kanagawa', order: 1 },
  { title: '川崎', slug: 'kawasaki', prefecture: 'kanagawa', order: 2 },
  { title: '相模原', slug: 'sagamihara', prefecture: 'kanagawa', order: 3 },

  // 第2層：主要沿岸都市
  { title: '鎌倉・藤沢', slug: 'kamakura-fujisawa', prefecture: 'kanagawa', order: 4 },
  { title: '横須賀', slug: 'yokosuka', prefecture: 'kanagawa', order: 5 },

  // 第3層：中央神奈川
  { title: '大和・海老名・厚木', slug: 'yamato-ebina-atsugi', prefecture: 'kanagawa', order: 6 },

  // 第4層：湘南エリア
  { title: '逗子・葉山・三浦', slug: 'zushi-hayama-miura', prefecture: 'kanagawa', order: 7 },

  // 第5層：西部神奈川
  { title: '小田原・箱根・湯河原', slug: 'odawara-hakone-yugawara', prefecture: 'kanagawa', order: 8 },
]

export const areas_ko: Partial<Area>[] = [
  // 1단계：주요 도시
  { title: '요코하마', slug: 'yokohama', prefecture: 'kanagawa', order: 1 },
  { title: '가와사키', slug: 'kawasaki', prefecture: 'kanagawa', order: 2 },
  { title: '사기미하라', slug: 'sagamihara', prefecture: 'kanagawa', order: 3 },

  // 2단계：주요 연안 도시
  { title: '가마쿠라・후지사와', slug: 'kamakura-fujisawa', prefecture: 'kanagawa', order: 4 },
  { title: '요코스카', slug: 'yokosuka', prefecture: 'kanagawa', order: 5 },

  // 3단계：중앙 가나가와
  { title: '야마토・에비나・아츠기', slug: 'yamato-ebina-atsugi', prefecture: 'kanagawa', order: 6 },

  // 4단계：쇼난 지역
  { title: '즈시・하야마・미우라', slug: 'zushi-hayama-miura', prefecture: 'kanagawa', order: 7 },

  // 5단계：서부 가나가와
  { title: '오다와라・하코네・유가와라', slug: 'odawara-hakone-yugawara', prefecture: 'kanagawa', order: 8 },
]

export const areas_zh: Partial<Area>[] = [
  // 第一层：主要城市
  { title: '横滨', slug: 'yokohama', prefecture: 'kanagawa', order: 1 },
  { title: '川崎', slug: 'kawasaki', prefecture: 'kanagawa', order: 2 },
  { title: '相模原', slug: 'sagamihara', prefecture: 'kanagawa', order: 3 },

  // 第二层：主要沿海城市
  { title: '镰仓・藤泽', slug: 'kamakura-fujisawa', prefecture: 'kanagawa', order: 4 },
  { title: '横须贺', slug: 'yokosuka', prefecture: 'kanagawa', order: 5 },

  // 第三层：中央神奈川
  { title: '大和・海老名・厚木', slug: 'yamato-ebina-atsugi', prefecture: 'kanagawa', order: 6 },

  // 第四层：湘南地区
  { title: '逗子・叶山・三浦', slug: 'zushi-hayama-miura', prefecture: 'kanagawa', order: 7 },

  // 第五层：西部神奈川
  { title: '小田原・箱根・汤河原', slug: 'odawara-hakone-yugawara', prefecture: 'kanagawa', order: 8 },
]
