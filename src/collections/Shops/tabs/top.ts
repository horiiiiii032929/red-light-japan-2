import type { Field } from "payload";

export const top: Field[] = [
  {
    name: 'message',
    type: 'textarea',
    localized: true,
    label: {
      ja: 'メッセージ',
      en: 'Message',
    },

  },
  {
    name: 'bannerImage',
    type: 'upload',
    relationTo: 'media',
    label: {
      ja: 'バナー画像',
      en: 'Banner Image',
    },
  },
  {
    name: 'lowestPrice',
    type: 'number',
    required: true,
    label: {
      ja: '最低価格',
      en: 'Lowest Price',
    },
  }
]