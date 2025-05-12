import type { Area } from '@/payload-types'

import { areas as tokyoAreas, areas_ja as tokyoAreas_ja, areas_ko as tokyoAreas_ko, areas_zh as tokyoAreas_zh } from './tokyo'
import { areas as kanagawaAreas, areas_ja as kanagawaAreas_ja, areas_ko as kanagawaAreas_ko, areas_zh as kanagawaAreas_zh } from './kanagawa'
import { areas as saitamaAreas, areas_ja as saitamaAreas_ja, areas_ko as saitamaAreas_ko, areas_zh as saitamaAreas_zh } from './saitama'
import { areas as chibaAreas, areas_ja as chibaAreas_ja, areas_ko as chibaAreas_ko, areas_zh as chibaAreas_zh } from './chiba'
import { areas as osakaAreas, areas_ja as osakaAreas_ja, areas_ko as osakaAreas_ko, areas_zh as osakaAreas_zh } from './osaka'
import { areas as kyotoAreas, areas_ja as kyotoAreas_ja, areas_ko as kyotoAreas_ko, areas_zh as kyotoAreas_zh } from './kyoto'
import { areas as hyogoAreas, areas_ja as hyogoAreas_ja, areas_ko as hyogoAreas_ko, areas_zh as hyogoAreas_zh } from './hyogo'

// Combine all areas
export const areas: Partial<Area>[] = [
    ...tokyoAreas,
    ...kanagawaAreas,
    ...saitamaAreas,
    ...chibaAreas,
    ...osakaAreas,
    ...kyotoAreas,
    ...hyogoAreas,
]

// Combine all Japanese areas
export const areas_ja: Partial<Area>[] = [
    ...tokyoAreas_ja,
    ...kanagawaAreas_ja,
    ...saitamaAreas_ja,
    ...chibaAreas_ja,
    ...osakaAreas_ja,
    ...kyotoAreas_ja,
    ...hyogoAreas_ja,
]

// Combine all Korean areas
export const areas_ko: Partial<Area>[] = [
    ...tokyoAreas_ko,
    ...kanagawaAreas_ko,
    ...saitamaAreas_ko,
    ...chibaAreas_ko,
    ...osakaAreas_ko,
    ...kyotoAreas_ko,
    ...hyogoAreas_ko,
]

// Combine all Chinese areas
export const areas_zh: Partial<Area>[] = [
    ...tokyoAreas_zh,
    ...kanagawaAreas_zh,
    ...saitamaAreas_zh,
    ...chibaAreas_zh,
    ...osakaAreas_zh,
    ...kyotoAreas_zh,
    ...hyogoAreas_zh,
] 