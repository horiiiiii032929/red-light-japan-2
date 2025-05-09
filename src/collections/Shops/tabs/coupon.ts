import type { Field } from "payload";

export const coupon: Field = {
  name: 'coupons',
  label: {
    ja: 'クーポン',
    en: 'Coupon',
  },
  type: 'array',
  fields: [
    {
      name: 'code',
      type: 'text',
      required: true,
      localized: true,
      label: {
        ja: 'クーポンコード',
        en: 'Coupon Code',
      },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
      label: {
        ja: 'クーポン名',
        en: 'Coupon Name',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      label: {
        ja: 'クーポン説明',
        en: 'Coupon Description',
      },
    },
    {
      name: 'validUntil',
      type: 'date',
      required: true,
      label: {
        ja: '有効期限',
        en: 'Valid Until',
      },
    },
  ],
}