import type { Field } from "payload";

export const coupon: Field = {
  name: 'coupons',
  type: 'array',
  fields: [
    { name: 'code', type: 'text', required: true, localized: true },
    { name: 'name', type: 'text', required: true, localized: true },
    { name: 'description', type: 'textarea', localized: true },
    { name: 'validUntil', type: 'date', required: true },
  ],
}