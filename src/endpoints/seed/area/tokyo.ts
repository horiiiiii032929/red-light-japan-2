import type { Area } from '@/payload-types'

export const areas: Partial<Area>[] = [
  // Tier 1: Major Entertainment Districts
  { title: 'Shinjuku', slug: 'shinjuku', prefecture: 'tokyo', order: 1 },
  { title: 'Shibuya / Ebisu', slug: 'shibuya-ebisu', prefecture: 'tokyo', order: 2 },
  { title: 'Ikebukuro', slug: 'ikebukuro', prefecture: 'tokyo', order: 3 },
  { title: 'Roppongi / Akasaka', slug: 'roppongi-akasaka', prefecture: 'tokyo', order: 4 },

  // Tier 2: Major Business & Shopping Districts
  { title: 'Ginza / Shimbashi', slug: 'ginza-shimbashi', prefecture: 'tokyo', order: 5 },
  { title: 'Tokyo / Nihonbashi', slug: 'tokyo-nihonbashi', prefecture: 'tokyo', order: 6 },
  { title: 'Omotesando / Aoyama', slug: 'omotesando-aoyama', prefecture: 'tokyo', order: 7 },
  { title: 'Akihabara / Kanda', slug: 'akihabara-kanda', prefecture: 'tokyo', order: 8 },

  // Tier 3: Central Tokyo
  { title: 'Yotsuya / Ichigaya / Iidabashi', slug: 'yotsuya-ichigaya-iidabashi', prefecture: 'tokyo', order: 9 },
  { title: 'Ueno / Asakusa', slug: 'ueno-asakusa', prefecture: 'tokyo', order: 10 },
  { title: 'Kinshicho / Ryogoku', slug: 'kinshicho-ryogoku', prefecture: 'tokyo', order: 11 },
  { title: 'Hamamatsucho / Shinagawa', slug: 'hamamatsucho-shinagawa', prefecture: 'tokyo', order: 12 },

  // Tier 4: Western Tokyo
  { title: 'Meguro / Gotanda', slug: 'meguro-gotanda', prefecture: 'tokyo', order: 13 },
  { title: 'Nakano / Kichijoji', slug: 'nakano-kichijoji', prefecture: 'tokyo', order: 14 },
  { title: 'Shibuya Line Area', slug: 'shibuya-line', prefecture: 'tokyo', order: 15 },
  { title: 'Keio / Odakyu Line Area', slug: 'keio-odakyu-line', prefecture: 'tokyo', order: 16 },

  // Tier 5: Northern Tokyo
  { title: 'Itabashi / Otsuka', slug: 'itabashi-otsuka', prefecture: 'tokyo', order: 17 },
  { title: 'Sugamo / Komagome', slug: 'sugamo-komagome', prefecture: 'tokyo', order: 18 },
  { title: 'Senju / Ayase', slug: 'senju-ayase', prefecture: 'tokyo', order: 19 },
  { title: 'Seibu Line Area', slug: 'seibu-line', prefecture: 'tokyo', order: 20 },

  // Tier 6: Eastern Tokyo
  { title: 'Kasai / Koto', slug: 'kasai-koto', prefecture: 'tokyo', order: 21 },
  { title: 'Oi / Kamata', slug: 'oi-kamata', prefecture: 'tokyo', order: 22 },
  { title: 'Nippori / Katsushika', slug: 'nippori-katsushika', prefecture: 'tokyo', order: 23 },
  { title: 'Tobu Line Area', slug: 'tobu-line', prefecture: 'tokyo', order: 24 },

  // Tier 7: Outer Tokyo
  { title: 'Tachikawa / Hachioji', slug: 'tachikawa-hachioji', prefecture: 'tokyo', order: 25 },
  { title: 'Machida / Tama', slug: 'machida-tama', prefecture: 'tokyo', order: 26 },
  { title: 'Chofu / Fuchu', slug: 'chofu-fuchu', prefecture: 'tokyo', order: 27 },
  { title: 'Nishitokyo / Koganei', slug: 'nishitokyo-koganei', prefecture: 'tokyo', order: 28 },
]

export const areas_ja: Partial<Area>[] = [
  // 第1層：主要歓楽街
  { title: '新宿', slug: 'shinjuku', prefecture: 'tokyo', order: 1 },
  { title: '渋谷・恵比寿', slug: 'shibuya-ebisu', prefecture: 'tokyo', order: 2 },
  { title: '池袋', slug: 'ikebukuro', prefecture: 'tokyo', order: 3 },
  { title: '六本木・赤坂', slug: 'roppongi-akasaka', prefecture: 'tokyo', order: 4 },

  // 第2層：主要ビジネス・ショッピング街
  { title: '銀座・新橋', slug: 'ginza-shimbashi', prefecture: 'tokyo', order: 5 },
  { title: '東京・日本橋', slug: 'tokyo-nihonbashi', prefecture: 'tokyo', order: 6 },
  { title: '表参道・青山', slug: 'omotesando-aoyama', prefecture: 'tokyo', order: 7 },
  { title: '秋葉原・神田', slug: 'akihabara-kanda', prefecture: 'tokyo', order: 8 },

  // 第3層：東京中心部
  { title: '四谷・市ヶ谷・飯田橋', slug: 'yotsuya-ichigaya-iidabashi', prefecture: 'tokyo', order: 9 },
  { title: '上野・浅草', slug: 'ueno-asakusa', prefecture: 'tokyo', order: 10 },
  { title: '錦糸町・両国', slug: 'kinshicho-ryogoku', prefecture: 'tokyo', order: 11 },
  { title: '浜松町・品川', slug: 'hamamatsucho-shinagawa', prefecture: 'tokyo', order: 12 },

  // 第4層：東京西部
  { title: '目黒・五反田', slug: 'meguro-gotanda', prefecture: 'tokyo', order: 13 },
  { title: '中野・吉祥寺', slug: 'nakano-kichijoji', prefecture: 'tokyo', order: 14 },
  { title: '渋谷線沿線', slug: 'shibuya-line', prefecture: 'tokyo', order: 15 },
  { title: '京王・小田急線沿線', slug: 'keio-odakyu-line', prefecture: 'tokyo', order: 16 },

  // 第5層：東京北部
  { title: '板橋・大塚', slug: 'itabashi-otsuka', prefecture: 'tokyo', order: 17 },
  { title: '巣鴨・駒込', slug: 'sugamo-komagome', prefecture: 'tokyo', order: 18 },
  { title: '千住・綾瀬', slug: 'senju-ayase', prefecture: 'tokyo', order: 19 },
  { title: '西武線沿線', slug: 'seibu-line', prefecture: 'tokyo', order: 20 },

  // 第6層：東京東部
  { title: '葛西・江東', slug: 'kasai-koto', prefecture: 'tokyo', order: 21 },
  { title: '大井・蒲田', slug: 'oi-kamata', prefecture: 'tokyo', order: 22 },
  { title: '日暮里・葛飾', slug: 'nippori-katsushika', prefecture: 'tokyo', order: 23 },
  { title: '東武線沿線', slug: 'tobu-line', prefecture: 'tokyo', order: 24 },

  // 第7層：東京郊外
  { title: '立川・八王子', slug: 'tachikawa-hachioji', prefecture: 'tokyo', order: 25 },
  { title: '町田・多摩', slug: 'machida-tama', prefecture: 'tokyo', order: 26 },
  { title: '調布・府中', slug: 'chofu-fuchu', prefecture: 'tokyo', order: 27 },
  { title: '西東京・小金井', slug: 'nishitokyo-koganei', prefecture: 'tokyo', order: 28 },
]

export const areas_ko: Partial<Area>[] = [
  // 1단계：주요 유흥가
  { title: '신주쿠', slug: 'shinjuku', prefecture: 'tokyo', order: 1 },
  { title: '시부야・에비스', slug: 'shibuya-ebisu', prefecture: 'tokyo', order: 2 },
  { title: '이케부쿠로', slug: 'ikebukuro', prefecture: 'tokyo', order: 3 },
  { title: '롯폰기・아카사카', slug: 'roppongi-akasaka', prefecture: 'tokyo', order: 4 },

  // 2단계：주요 비즈니스・쇼핑가
  { title: '긴자・신바시', slug: 'ginza-shimbashi', prefecture: 'tokyo', order: 5 },
  { title: '도쿄・니혼바시', slug: 'tokyo-nihonbashi', prefecture: 'tokyo', order: 6 },
  { title: '오모테산도・아오야마', slug: 'omotesando-aoyama', prefecture: 'tokyo', order: 7 },
  { title: '아키하바라・칸다', slug: 'akihabara-kanda', prefecture: 'tokyo', order: 8 },

  // 3단계：도쿄 중심부
  { title: '요츠야・이치가야・이이다바시', slug: 'yotsuya-ichigaya-iidabashi', prefecture: 'tokyo', order: 9 },
  { title: '우에노・아사쿠사', slug: 'ueno-asakusa', prefecture: 'tokyo', order: 10 },
  { title: '긴시초・료고쿠', slug: 'kinshicho-ryogoku', prefecture: 'tokyo', order: 11 },
  { title: '하마마츠초・시나가와', slug: 'hamamatsucho-shinagawa', prefecture: 'tokyo', order: 12 },

  // 4단계：도쿄 서부
  { title: '메구로・고탄다', slug: 'meguro-gotanda', prefecture: 'tokyo', order: 13 },
  { title: '나카노・키치조지', slug: 'nakano-kichijoji', prefecture: 'tokyo', order: 14 },
  { title: '시부야선 연선', slug: 'shibuya-line', prefecture: 'tokyo', order: 15 },
  { title: '케이오・오다큐선 연선', slug: 'keio-odakyu-line', prefecture: 'tokyo', order: 16 },

  // 5단계：도쿄 북부
  { title: '이타바시・오츠카', slug: 'itabashi-otsuka', prefecture: 'tokyo', order: 17 },
  { title: '스가모・코마고메', slug: 'sugamo-komagome', prefecture: 'tokyo', order: 18 },
  { title: '센주・아야세', slug: 'senju-ayase', prefecture: 'tokyo', order: 19 },
  { title: '세이부선 연선', slug: 'seibu-line', prefecture: 'tokyo', order: 20 },

  // 6단계：도쿄 동부
  { title: '카사이・코토', slug: 'kasai-koto', prefecture: 'tokyo', order: 21 },
  { title: '오이・카마타', slug: 'oi-kamata', prefecture: 'tokyo', order: 22 },
  { title: '닛포리・카츠시카', slug: 'nippori-katsushika', prefecture: 'tokyo', order: 23 },
  { title: '토부선 연선', slug: 'tobu-line', prefecture: 'tokyo', order: 24 },

  // 7단계：도쿄 교외
  { title: '타치카와・하치오지', slug: 'tachikawa-hachioji', prefecture: 'tokyo', order: 25 },
  { title: '마치다・타마', slug: 'machida-tama', prefecture: 'tokyo', order: 26 },
  { title: '쵸후・후추', slug: 'chofu-fuchu', prefecture: 'tokyo', order: 27 },
  { title: '니시토쿄・코가네이', slug: 'nishitokyo-koganei', prefecture: 'tokyo', order: 28 },
]

export const areas_zh: Partial<Area>[] = [
  // 第一层：主要娱乐区
  { title: '新宿', slug: 'shinjuku', prefecture: 'tokyo', order: 1 },
  { title: '涩谷・惠比寿', slug: 'shibuya-ebisu', prefecture: 'tokyo', order: 2 },
  { title: '池袋', slug: 'ikebukuro', prefecture: 'tokyo', order: 3 },
  { title: '六本木・赤坂', slug: 'roppongi-akasaka', prefecture: 'tokyo', order: 4 },

  // 第二层：主要商业・购物区
  { title: '银座・新桥', slug: 'ginza-shimbashi', prefecture: 'tokyo', order: 5 },
  { title: '东京・日本桥', slug: 'tokyo-nihonbashi', prefecture: 'tokyo', order: 6 },
  { title: '表参道・青山', slug: 'omotesando-aoyama', prefecture: 'tokyo', order: 7 },
  { title: '秋叶原・神田', slug: 'akihabara-kanda', prefecture: 'tokyo', order: 8 },

  // 第三层：东京中心部
  { title: '四谷・市谷・饭田桥', slug: 'yotsuya-ichigaya-iidabashi', prefecture: 'tokyo', order: 9 },
  { title: '上野・浅草', slug: 'ueno-asakusa', prefecture: 'tokyo', order: 10 },
  { title: '锦系町・两国', slug: 'kinshicho-ryogoku', prefecture: 'tokyo', order: 11 },
  { title: '滨松町・品川', slug: 'hamamatsucho-shinagawa', prefecture: 'tokyo', order: 12 },

  // 第四层：东京西部
  { title: '目黑・五反田', slug: 'meguro-gotanda', prefecture: 'tokyo', order: 13 },
  { title: '中野・吉祥寺', slug: 'nakano-kichijoji', prefecture: 'tokyo', order: 14 },
  { title: '涩谷线沿线', slug: 'shibuya-line', prefecture: 'tokyo', order: 15 },
  { title: '京王・小田急线沿线', slug: 'keio-odakyu-line', prefecture: 'tokyo', order: 16 },

  // 第五层：东京北部
  { title: '板桥・大冢', slug: 'itabashi-otsuka', prefecture: 'tokyo', order: 17 },
  { title: '巢鸭・驹込', slug: 'sugamo-komagome', prefecture: 'tokyo', order: 18 },
  { title: '千住・绫濑', slug: 'senju-ayase', prefecture: 'tokyo', order: 19 },
  { title: '西武线沿线', slug: 'seibu-line', prefecture: 'tokyo', order: 20 },

  // 第六层：东京东部
  { title: '葛西・江东', slug: 'kasai-koto', prefecture: 'tokyo', order: 21 },
  { title: '大井・蒲田', slug: 'oi-kamata', prefecture: 'tokyo', order: 22 },
  { title: '日暮里・葛饰', slug: 'nippori-katsushika', prefecture: 'tokyo', order: 23 },
  { title: '东武线沿线', slug: 'tobu-line', prefecture: 'tokyo', order: 24 },

  // 第七层：东京郊区
  { title: '立川・八王子', slug: 'tachikawa-hachioji', prefecture: 'tokyo', order: 25 },
  { title: '町田・多摩', slug: 'machida-tama', prefecture: 'tokyo', order: 26 },
  { title: '调布・府中', slug: 'chofu-fuchu', prefecture: 'tokyo', order: 27 },
  { title: '西东京・小金井', slug: 'nishitokyo-koganei', prefecture: 'tokyo', order: 28 },
]
