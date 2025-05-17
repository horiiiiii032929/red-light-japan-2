import type { Field } from "payload";

export const system: Field = {
  name: 'systems',
  type: 'array',
  label: {
    ja: 'コース',
    en: 'Systems',
  },
  localized: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
      label: {
        ja: 'コース名',
        en: 'System Name',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      label: {
        ja: 'コース説明',
        en: 'System Description',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: {
        ja: '画像',
        en: 'Image',
      },
    },
    {
      name: 'priceMin',
      type: 'number',
      required: true,
      label: {
        ja: '最低価格',
        en: 'Minimum Price',
      },
    },
    {
      name: 'priceMax',
      type: 'number',
      label: {
        ja: '最高価格',
        en: 'Maximum Price',
      },
    },
  ],
}
