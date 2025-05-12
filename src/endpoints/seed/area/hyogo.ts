import type { Area } from '@/payload-types'

export const areas: Partial<Area>[] = [
    // Kobe Area
    { title: 'Sannomiya', slug: 'sannomiya', prefecture: 'hyogo', order: 1 },
    { title: 'Motomachi', slug: 'motomachi', prefecture: 'hyogo', order: 2 },
    { title: 'Tarumi', slug: 'tarumi', prefecture: 'hyogo', order: 3 },

    // Hanshin Area
    { title: 'Nishinomiya / Koshien / Ashiya', slug: 'nishinomiya-koshien-ashiya', prefecture: 'hyogo', order: 4 },
    { title: 'Amagasaki', slug: 'amagasaki', prefecture: 'hyogo', order: 5 },
    { title: 'Itami', slug: 'itami', prefecture: 'hyogo', order: 6 },
    { title: 'Takarazuka', slug: 'takarazuka', prefecture: 'hyogo', order: 7 },

    // Harima Area
    { title: 'Akashi', slug: 'akashi', prefecture: 'hyogo', order: 8 },
    { title: 'Himeji', slug: 'himeji', prefecture: 'hyogo', order: 9 },
    { title: 'Ono', slug: 'ono', prefecture: 'hyogo', order: 10 },
    { title: 'Kakogawa', slug: 'kakogawa', prefecture: 'hyogo', order: 11 },
]

export const areas_ja: Partial<Area>[] = [
    // 神戸エリア
    { title: '三宮', slug: 'sannomiya', prefecture: 'hyogo', order: 1 },
    { title: '元町', slug: 'motomachi', prefecture: 'hyogo', order: 2 },
    { title: '垂水', slug: 'tarumi', prefecture: 'hyogo', order: 3 },

    // 阪神エリア
    { title: '西宮・甲子園口・芦屋', slug: 'nishinomiya-koshien-ashiya', prefecture: 'hyogo', order: 4 },
    { title: '尼崎', slug: 'amagasaki', prefecture: 'hyogo', order: 5 },
    { title: '伊丹', slug: 'itami', prefecture: 'hyogo', order: 6 },
    { title: '宝塚', slug: 'takarazuka', prefecture: 'hyogo', order: 7 },

    // 播磨エリア
    { title: '明石', slug: 'akashi', prefecture: 'hyogo', order: 8 },
    { title: '姫路', slug: 'himeji', prefecture: 'hyogo', order: 9 },
    { title: '小野', slug: 'ono', prefecture: 'hyogo', order: 10 },
    { title: '加古川', slug: 'kakogawa', prefecture: 'hyogo', order: 11 },
]

export const areas_ko: Partial<Area>[] = [
    // 고베 지역
    { title: '산노미야', slug: 'sannomiya', prefecture: 'hyogo', order: 1 },
    { title: '모토마치', slug: 'motomachi', prefecture: 'hyogo', order: 2 },
    { title: '타루미', slug: 'tarumi', prefecture: 'hyogo', order: 3 },

    // 한신 지역
    { title: '니시노미야・코시엔・아시야', slug: 'nishinomiya-koshien-ashiya', prefecture: 'hyogo', order: 4 },
    { title: '아마가사키', slug: 'amagasaki', prefecture: 'hyogo', order: 5 },
    { title: '이타미', slug: 'itami', prefecture: 'hyogo', order: 6 },
    { title: '타카라즈카', slug: 'takarazuka', prefecture: 'hyogo', order: 7 },

    // 하리마 지역
    { title: '아카시', slug: 'akashi', prefecture: 'hyogo', order: 8 },
    { title: '히메지', slug: 'himeji', prefecture: 'hyogo', order: 9 },
    { title: '오노', slug: 'ono', prefecture: 'hyogo', order: 10 },
    { title: '카코가와', slug: 'kakogawa', prefecture: 'hyogo', order: 11 },
]

export const areas_zh: Partial<Area>[] = [
    // 神户地区
    { title: '三宫', slug: 'sannomiya', prefecture: 'hyogo', order: 1 },
    { title: '元町', slug: 'motomachi', prefecture: 'hyogo', order: 2 },
    { title: '垂水', slug: 'tarumi', prefecture: 'hyogo', order: 3 },

    // 阪神地区
    { title: '西宫・甲子园口・芦屋', slug: 'nishinomiya-koshien-ashiya', prefecture: 'hyogo', order: 4 },
    { title: '尼崎', slug: 'amagasaki', prefecture: 'hyogo', order: 5 },
    { title: '伊丹', slug: 'itami', prefecture: 'hyogo', order: 6 },
    { title: '宝冢', slug: 'takarazuka', prefecture: 'hyogo', order: 7 },

    // 播磨地区
    { title: '明石', slug: 'akashi', prefecture: 'hyogo', order: 8 },
    { title: '姬路', slug: 'himeji', prefecture: 'hyogo', order: 9 },
    { title: '小野', slug: 'ono', prefecture: 'hyogo', order: 10 },
    { title: '加古川', slug: 'kakogawa', prefecture: 'hyogo', order: 11 },
]