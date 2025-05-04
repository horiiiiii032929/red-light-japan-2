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
    name: 'lowestPrice',
    type: 'number',
    required: true,
    label: {
      ja: '最低価格',
      en: 'Lowest Price',
    },
  }
]