import type { Field } from "payload";

export const coupon: Field = {
  name: 'coupons',
  type: 'array',
  fields: [
    { name: 'code', type: 'text', required: true, unique: true },
    { name: 'name', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    { name: 'validUntil', type: 'date', required: true },
  ],
}