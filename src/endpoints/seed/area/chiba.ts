import type { Area } from '@/payload-types'

export const areas: Partial<Area>[] = [
  // Major Cities (Tier 1)
  { title: 'Funabashi', slug: 'funabashi', prefecture: 'chiba', order: 1 },
  { title: 'Chiba', slug: 'chiba', prefecture: 'chiba', order: 2 },
  { title: 'Ichikawa', slug: 'ichikawa', prefecture: 'chiba', order: 3 },

  // Secondary Cities (Tier 2)
  { title: 'Matsudo / Kashiwa', slug: 'matsudo-kashiwa', prefecture: 'chiba', order: 4 },
  { title: 'Urayasu / Tsudanuma', slug: 'urayasu-tsudanuma', prefecture: 'chiba', order: 5 },

  // Regional Centers (Tier 3)
  { title: 'Ichihara / Sakura', slug: 'ichihara-sakura', prefecture: 'chiba', order: 6 },
  { title: 'Narita', slug: 'narita', prefecture: 'chiba', order: 7 },
  { title: 'Kisarazu', slug: 'kisarazu', prefecture: 'chiba', order: 8 },

  // Coastal Areas (Tier 4)
  { title: 'Choshi / Kujukuri', slug: 'choshi-kujukuri', prefecture: 'chiba', order: 9 },
  { title: 'Katsuura / Kamogawa / Tateyama', slug: 'katsuura-kamogawa-tateyama', prefecture: 'chiba', order: 10 },
]

export const areas_ja: Partial<Area>[] = [
  // 主要都市（第1層）
  { title: '船橋', slug: 'funabashi', prefecture: 'chiba', order: 1 },
  { title: '千葉', slug: 'chiba', prefecture: 'chiba', order: 2 },
  { title: '市川', slug: 'ichikawa', prefecture: 'chiba', order: 3 },

  // 準主要都市（第2層）
  { title: '松戸・柏', slug: 'matsudo-kashiwa', prefecture: 'chiba', order: 4 },
  { title: '浦安・津田沼', slug: 'urayasu-tsudanuma', prefecture: 'chiba', order: 5 },

  // 地域中心都市（第3層）
  { title: '市原・佐倉', slug: 'ichihara-sakura', prefecture: 'chiba', order: 6 },
  { title: '成田', slug: 'narita', prefecture: 'chiba', order: 7 },
  { title: '木更津', slug: 'kisarazu', prefecture: 'chiba', order: 8 },

  // 沿岸地域（第4層）
  { title: '銚子・九十九里', slug: 'choshi-kujukuri', prefecture: 'chiba', order: 9 },
  { title: '勝浦・鴨川・館山', slug: 'katsuura-kamogawa-tateyama', prefecture: 'chiba', order: 10 },
]

export const areas_ko: Partial<Area>[] = [
  // 주요 도시 (1단계)
  { title: '후나바시', slug: 'funabashi', prefecture: 'chiba', order: 1 },
  { title: '치바', slug: 'chiba', prefecture: 'chiba', order: 2 },
  { title: '이치카와', slug: 'ichikawa', prefecture: 'chiba', order: 3 },

  // 준주요 도시 (2단계)
  { title: '마츠도・카시와', slug: 'matsudo-kashiwa', prefecture: 'chiba', order: 4 },
  { title: '우라야스・츠다누마', slug: 'urayasu-tsudanuma', prefecture: 'chiba', order: 5 },

  // 지역 중심 도시 (3단계)
  { title: '이치하라・사쿠라', slug: 'ichihara-sakura', prefecture: 'chiba', order: 6 },
  { title: '나리타', slug: 'narita', prefecture: 'chiba', order: 7 },
  { title: '키사라즈', slug: 'kisarazu', prefecture: 'chiba', order: 8 },

  // 연안 지역 (4단계)
  { title: '초시・구주쿠리', slug: 'choshi-kujukuri', prefecture: 'chiba', order: 9 },
  { title: '카츠우라・카모가와・타테야마', slug: 'katsuura-kamogawa-tateyama', prefecture: 'chiba', order: 10 },
]

export const areas_zh: Partial<Area>[] = [
  // 主要城市（第一层）
  { title: '船桥', slug: 'funabashi', prefecture: 'chiba', order: 1 },
  { title: '千叶', slug: 'chiba', prefecture: 'chiba', order: 2 },
  { title: '市川', slug: 'ichikawa', prefecture: 'chiba', order: 3 },

  // 准主要城市（第二层）
  { title: '松户・柏', slug: 'matsudo-kashiwa', prefecture: 'chiba', order: 4 },
  { title: '浦安・津田沼', slug: 'urayasu-tsudanuma', prefecture: 'chiba', order: 5 },

  // 地区中心城市（第三层）
  { title: '市原・佐仓', slug: 'ichihara-sakura', prefecture: 'chiba', order: 6 },
  { title: '成田', slug: 'narita', prefecture: 'chiba', order: 7 },
  { title: '木更津', slug: 'kisarazu', prefecture: 'chiba', order: 8 },

  // 沿海地区（第四层）
  { title: '铫子・九十九里', slug: 'choshi-kujukuri', prefecture: 'chiba', order: 9 },
  { title: '胜浦・鸭川・馆山', slug: 'katsuura-kamogawa-tateyama', prefecture: 'chiba', order: 10 },
]