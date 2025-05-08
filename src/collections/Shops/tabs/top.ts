import type { Field } from "payload";

export const top: Field[] = [
  {
    name: 'message',
    type: 'textarea',
  },
  {
    name: 'bannerImage',
    type: 'upload',
    relationTo: 'media',
  },
  {
    name: 'lowestPrice',
    type: 'number',
    required: true,
  }
]