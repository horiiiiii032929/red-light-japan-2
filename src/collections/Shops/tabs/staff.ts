import type { Field } from "payload";

export const staff: Field = {
  name: 'staff',
  type: 'array',
  fields: [
    { name: 'name', type: 'text', required: true, localized: true },
    { name: 'age', type: 'number', required: true },
    { name: 'height', type: 'number', required: true },
    {
      name: 'cup',
      type: 'select',
      options: ['A', 'B', 'C', 'D', 'E', 'F'],
    },
    { name: 'images', type: 'upload', relationTo: 'media', hasMany: true }
  ]
}