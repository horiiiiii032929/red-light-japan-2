import type { Area } from '@/payload-types'

export const areas: Partial<Area>[] = [
  // Tier 1: Major Entertainment Districts
  { title: 'Umeda / Kita-Shinchi', slug: 'umeda-kita-shinchi', prefecture: 'osaka', order: 1 },
  { title: 'Namba / Shinsaibashi', slug: 'namba-shinsaibashi', prefecture: 'osaka', order: 2 },
  { title: 'Nipponbashi', slug: 'nipponbashi', prefecture: 'osaka', order: 3 },

  // Tier 2: Major Business & Entertainment Areas
  { title: 'Tennoji / Abeno', slug: 'tennoji-abeno', prefecture: 'osaka', order: 4 },
  { title: 'Tsuruhashi', slug: 'tsuruhashi', prefecture: 'osaka', order: 5 },
  { title: 'Juso', slug: 'juso', prefecture: 'osaka', order: 6 },

  // Tier 3: Central Osaka
  { title: 'Nakatsu / Fukushima', slug: 'nakatsu-fukushima', prefecture: 'osaka', order: 7 },
  { title: 'Hommachi / Uehommachi', slug: 'hommachi-uehommachi', prefecture: 'osaka', order: 8 },
  { title: 'Kyobashi / Miyakojima', slug: 'kyobashi-miyakojima', prefecture: 'osaka', order: 9 },

  // Tier 4: Northern Osaka
  { title: 'Nishinakajima / Shin-Osaka / Higashimikuni', slug: 'nishinakajima-shinosaka-higashimikuni', prefecture: 'osaka', order: 10 },
  { title: 'Awaji / Kamishinjo', slug: 'awaji-kamishinjo', prefecture: 'osaka', order: 11 },
  { title: 'Himejima / Tsukamoto', slug: 'himejima-tsukamoto', prefecture: 'osaka', order: 12 },

  // Tier 5: Southern Osaka
  { title: 'Bentencho / Kujo / Taisho', slug: 'bentencho-kujo-taisho', prefecture: 'osaka', order: 13 },
  { title: 'Chidoribashi / Nishikujo', slug: 'chidoribashi-nishikujo', prefecture: 'osaka', order: 14 },
  { title: 'Hirano / Sumiyoshi', slug: 'hirano-sumiyoshi', prefecture: 'osaka', order: 15 },

  // Tier 6: Outer Osaka
  { title: 'Sakai / Sennan', slug: 'sakai-sennan', prefecture: 'osaka', order: 16 },
  { title: 'Hokusetsu', slug: 'hokusetsu', prefecture: 'osaka', order: 17 },
  { title: 'Kitakawachi / Higashi-Osaka', slug: 'kitakawachi-higashi-osaka', prefecture: 'osaka', order: 18 },
]

export const areas_ja: Partial<Area>[] = [
  // 第1層：主要歓楽街
  { title: '梅田・北新地', slug: 'umeda-kita-shinchi', prefecture: 'osaka', order: 1 },
  { title: '難波・心斎橋', slug: 'namba-shinsaibashi', prefecture: 'osaka', order: 2 },
  { title: '日本橋', slug: 'nipponbashi', prefecture: 'osaka', order: 3 },

  // 第2層：主要ビジネス・歓楽街
  { title: '天王寺・阿倍野', slug: 'tennoji-abeno', prefecture: 'osaka', order: 4 },
  { title: '鶴橋', slug: 'tsuruhashi', prefecture: 'osaka', order: 5 },
  { title: '十三', slug: 'juso', prefecture: 'osaka', order: 6 },

  // 第3層：大阪中心部
  { title: '中津・福島', slug: 'nakatsu-fukushima', prefecture: 'osaka', order: 7 },
  { title: '本町・上本町', slug: 'hommachi-uehommachi', prefecture: 'osaka', order: 8 },
  { title: '京橋・都島', slug: 'kyobashi-miyakojima', prefecture: 'osaka', order: 9 },

  // 第4層：大阪北部
  { title: '西中島・新大阪・東三国', slug: 'nishinakajima-shinosaka-higashimikuni', prefecture: 'osaka', order: 10 },
  { title: '淡路・上新庄', slug: 'awaji-kamishinjo', prefecture: 'osaka', order: 11 },
  { title: '姫島・塚本', slug: 'himejima-tsukamoto', prefecture: 'osaka', order: 12 },

  // 第5層：大阪南部
  { title: '弁天町・九条・大正', slug: 'bentencho-kujo-taisho', prefecture: 'osaka', order: 13 },
  { title: '千鳥橋・西九条', slug: 'chidoribashi-nishikujo', prefecture: 'osaka', order: 14 },
  { title: '平野・住吉', slug: 'hirano-sumiyoshi', prefecture: 'osaka', order: 15 },

  // 第6層：大阪郊外
  { title: '堺・泉南', slug: 'sakai-sennan', prefecture: 'osaka', order: 16 },
  { title: '北摂', slug: 'hokusetsu', prefecture: 'osaka', order: 17 },
  { title: '北河内・東大阪', slug: 'kitakawachi-higashi-osaka', prefecture: 'osaka', order: 18 },
]

export const areas_ko: Partial<Area>[] = [
  // 1단계：주요 유흥가
  { title: '우메다・키타신치', slug: 'umeda-kita-shinchi', prefecture: 'osaka', order: 1 },
  { title: '난바・신사이바시', slug: 'namba-shinsaibashi', prefecture: 'osaka', order: 2 },
  { title: '닛폰바시', slug: 'nipponbashi', prefecture: 'osaka', order: 3 },

  // 2단계：주요 비즈니스・유흥가
  { title: '덴노지・아베노', slug: 'tennoji-abeno', prefecture: 'osaka', order: 4 },
  { title: '츠루하시', slug: 'tsuruhashi', prefecture: 'osaka', order: 5 },
  { title: '주소', slug: 'juso', prefecture: 'osaka', order: 6 },

  // 3단계：오사카 중심부
  { title: '나카츠・후쿠시마', slug: 'nakatsu-fukushima', prefecture: 'osaka', order: 7 },
  { title: '혼마치・우에혼마치', slug: 'hommachi-uehommachi', prefecture: 'osaka', order: 8 },
  { title: '쿄바시・미야코지마', slug: 'kyobashi-miyakojima', prefecture: 'osaka', order: 9 },

  // 4단계：오사카 북부
  { title: '니시나카지마・신오사카・히가시미쿠니', slug: 'nishinakajima-shinosaka-higashimikuni', prefecture: 'osaka', order: 10 },
  { title: '아와지・카미신조', slug: 'awaji-kamishinjo', prefecture: 'osaka', order: 11 },
  { title: '히메지마・츠카모토', slug: 'himejima-tsukamoto', prefecture: 'osaka', order: 12 },

  // 5단계：오사카 남부
  { title: '벤텐초・쿠조・타이쇼', slug: 'bentencho-kujo-taisho', prefecture: 'osaka', order: 13 },
  { title: '치도리바시・니시쿠조', slug: 'chidoribashi-nishikujo', prefecture: 'osaka', order: 14 },
  { title: '히라노・스미요시', slug: 'hirano-sumiyoshi', prefecture: 'osaka', order: 15 },

  // 6단계：오사카 교외
  { title: '사카이・센난', slug: 'sakai-sennan', prefecture: 'osaka', order: 16 },
  { title: '호쿠세츠', slug: 'hokusetsu', prefecture: 'osaka', order: 17 },
  { title: '키타카와치・히가시오사카', slug: 'kitakawachi-higashi-osaka', prefecture: 'osaka', order: 18 },
]

export const areas_zh: Partial<Area>[] = [
  // 第一层：主要娱乐区
  { title: '梅田・北新地', slug: 'umeda-kita-shinchi', prefecture: 'osaka', order: 1 },
  { title: '难波・心斋桥', slug: 'namba-shinsaibashi', prefecture: 'osaka', order: 2 },
  { title: '日本桥', slug: 'nipponbashi', prefecture: 'osaka', order: 3 },

  // 第二层：主要商业・娱乐区
  { title: '天王寺・阿倍野', slug: 'tennoji-abeno', prefecture: 'osaka', order: 4 },
  { title: '鹤桥', slug: 'tsuruhashi', prefecture: 'osaka', order: 5 },
  { title: '十三', slug: 'juso', prefecture: 'osaka', order: 6 },

  // 第三层：大阪中心部
  { title: '中津・福岛', slug: 'nakatsu-fukushima', prefecture: 'osaka', order: 7 },
  { title: '本町・上本町', slug: 'hommachi-uehommachi', prefecture: 'osaka', order: 8 },
  { title: '京桥・都岛', slug: 'kyobashi-miyakojima', prefecture: 'osaka', order: 9 },

  // 第四层：大阪北部
  { title: '西中岛・新大阪・东三国', slug: 'nishinakajima-shinosaka-higashimikuni', prefecture: 'osaka', order: 10 },
  { title: '淡路・上新庄', slug: 'awaji-kamishinjo', prefecture: 'osaka', order: 11 },
  { title: '姬岛・冢本', slug: 'himejima-tsukamoto', prefecture: 'osaka', order: 12 },

  // 第五层：大阪南部
  { title: '弁天町・九条・大正', slug: 'bentencho-kujo-taisho', prefecture: 'osaka', order: 13 },
  { title: '千鸟桥・西九条', slug: 'chidoribashi-nishikujo', prefecture: 'osaka', order: 14 },
  { title: '平野・住吉', slug: 'hirano-sumiyoshi', prefecture: 'osaka', order: 15 },

  // 第六层：大阪郊区
  { title: '堺・泉南', slug: 'sakai-sennan', prefecture: 'osaka', order: 16 },
  { title: '北摄', slug: 'hokusetsu', prefecture: 'osaka', order: 17 },
  { title: '北河内・东大阪', slug: 'kitakawachi-higashi-osaka', prefecture: 'osaka', order: 18 },
]