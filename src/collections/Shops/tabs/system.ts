import type { Field } from "payload";

export const system: Field = {
  name: 'systems',
  type: 'array',
  fields: [
    { name: 'name', type: 'text', required: true, localized: true },
    { name: 'description', type: 'richText', localized: true },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'priceMin', type: 'number', required: true },
    { name: 'priceMax', type: 'number' },
  ],
}

