import type { Field } from "payload";

export const staff: Field = {
  name: 'staff',
  type: 'array',
  label: {
    ja: 'スタッフ',
    en: 'Staff',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
      label: {
        ja: '名前',
        en: 'Name',
      },
    },
    {
      name: 'age',
      type: 'number',
      required: true,
      label: {
        ja: '年齢',
        en: 'Age',
      },
    },
    {
      name: 'height',
      type: 'number',
      required: true,
      label: {
        ja: '身長',
        en: 'Height',
      },
    },
    {
      name: 'cup',
      type: 'select',
      options: ['A', 'B', 'C', 'D', 'E', 'F'],
      label: {
        ja: 'カップ',
        en: 'Cup',
      },
    },
    {
      name: 'images',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      label: {
        ja: '写真',
        en: 'Images',
      },
    }
  ]
}