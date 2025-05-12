import type { Area } from '@/payload-types'

export const areas: Partial<Area>[] = [
  // Tier 1: Major Cities
  { title: 'Saitama City', slug: 'saitama-city', prefecture: 'saitama', order: 1 },
  { title: 'Kawaguchi', slug: 'kawaguchi', prefecture: 'saitama', order: 2 },
  { title: 'Kawagoe', slug: 'kawagoe', prefecture: 'saitama', order: 3 },

  // Tier 2: Major Suburban Areas
  { title: 'Koshigaya / Kasukabe', slug: 'koshigaya-kasukabe', prefecture: 'saitama', order: 4 },
  { title: 'Tokorozawa / Iruma', slug: 'tokorozawa-iruma', prefecture: 'saitama', order: 5 },
  { title: 'Kumagaya', slug: 'kumagaya', prefecture: 'saitama', order: 6 },

  // Tier 3: Central Saitama
  { title: 'Warabi / Wako', slug: 'warabi-wako', prefecture: 'saitama', order: 7 },
  { title: 'Soka / Shiki', slug: 'soka-shiki', prefecture: 'saitama', order: 8 },
  { title: 'Ageo / Konosu', slug: 'ageo-konosu', prefecture: 'saitama', order: 9 },

  // Tier 4: Northern Saitama
  { title: 'Sakado / Higashimatsuyama', slug: 'sakado-higashimatsuyama', prefecture: 'saitama', order: 10 },
  { title: 'Fukaya / Kuki', slug: 'fukaya-kuki', prefecture: 'saitama', order: 11 },
  { title: 'Chichibu / Nagatoro', slug: 'chichibu-nagatoro', prefecture: 'saitama', order: 12 },
]

export const areas_ja: Partial<Area>[] = [
  // 第1層：主要都市
  { title: 'さいたま市', slug: 'saitama-city', prefecture: 'saitama', order: 1 },
  { title: '川口', slug: 'kawaguchi', prefecture: 'saitama', order: 2 },
  { title: '川越', slug: 'kawagoe', prefecture: 'saitama', order: 3 },

  // 第2層：主要郊外都市
  { title: '越谷・春日部', slug: 'koshigaya-kasukabe', prefecture: 'saitama', order: 4 },
  { title: '所沢・入間', slug: 'tokorozawa-iruma', prefecture: 'saitama', order: 5 },
  { title: '熊谷', slug: 'kumagaya', prefecture: 'saitama', order: 6 },

  // 第3層：埼玉中央部
  { title: '蕨・和光', slug: 'warabi-wako', prefecture: 'saitama', order: 7 },
  { title: '草加・志木', slug: 'soka-shiki', prefecture: 'saitama', order: 8 },
  { title: '上尾・鴻巣', slug: 'ageo-konosu', prefecture: 'saitama', order: 9 },

  // 第4層：埼玉北部
  { title: '坂戸・東松山', slug: 'sakado-higashimatsuyama', prefecture: 'saitama', order: 10 },
  { title: '深谷・久喜', slug: 'fukaya-kuki', prefecture: 'saitama', order: 11 },
  { title: '秩父・長瀞', slug: 'chichibu-nagatoro', prefecture: 'saitama', order: 12 },
]

export const areas_ko: Partial<Area>[] = [
  // 1단계：주요 도시
  { title: '사이타마시', slug: 'saitama-city', prefecture: 'saitama', order: 1 },
  { title: '카와구치', slug: 'kawaguchi', prefecture: 'saitama', order: 2 },
  { title: '카와고에', slug: 'kawagoe', prefecture: 'saitama', order: 3 },

  // 2단계：주요 교외 도시
  { title: '코시가야・카스카베', slug: 'koshigaya-kasukabe', prefecture: 'saitama', order: 4 },
  { title: '토코로자와・이루마', slug: 'tokorozawa-iruma', prefecture: 'saitama', order: 5 },
  { title: '쿠마가야', slug: 'kumagaya', prefecture: 'saitama', order: 6 },

  // 3단계：사이타마 중앙부
  { title: '와라비・와코', slug: 'warabi-wako', prefecture: 'saitama', order: 7 },
  { title: '소카・시키', slug: 'soka-shiki', prefecture: 'saitama', order: 8 },
  { title: '아게오・코노스', slug: 'ageo-konosu', prefecture: 'saitama', order: 9 },

  // 4단계：사이타마 북부
  { title: '사카도・히가시마츠야마', slug: 'sakado-higashimatsuyama', prefecture: 'saitama', order: 10 },
  { title: '후카야・쿠키', slug: 'fukaya-kuki', prefecture: 'saitama', order: 11 },
  { title: '치치부・나가토로', slug: 'chichibu-nagatoro', prefecture: 'saitama', order: 12 },
]

export const areas_zh: Partial<Area>[] = [
  // 第一层：主要城市
  { title: '埼玉市', slug: 'saitama-city', prefecture: 'saitama', order: 1 },
  { title: '川口', slug: 'kawaguchi', prefecture: 'saitama', order: 2 },
  { title: '川越', slug: 'kawagoe', prefecture: 'saitama', order: 3 },

  // 第二层：主要郊区城市
  { title: '越谷・春日部', slug: 'koshigaya-kasukabe', prefecture: 'saitama', order: 4 },
  { title: '所泽・入间', slug: 'tokorozawa-iruma', prefecture: 'saitama', order: 5 },
  { title: '熊谷', slug: 'kumagaya', prefecture: 'saitama', order: 6 },

  // 第三层：埼玉中部
  { title: '蕨・和光', slug: 'warabi-wako', prefecture: 'saitama', order: 7 },
  { title: '草加・志木', slug: 'soka-shiki', prefecture: 'saitama', order: 8 },
  { title: '上尾・鸿巢', slug: 'ageo-konosu', prefecture: 'saitama', order: 9 },

  // 第四层：埼玉北部
  { title: '坂户・东松山', slug: 'sakado-higashimatsuyama', prefecture: 'saitama', order: 10 },
  { title: '深谷・久喜', slug: 'fukaya-kuki', prefecture: 'saitama', order: 11 },
  { title: '秩父・长瀞', slug: 'chichibu-nagatoro', prefecture: 'saitama', order: 12 },
]
