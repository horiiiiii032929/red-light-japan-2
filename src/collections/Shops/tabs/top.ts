import type { Field } from "payload";

export const top: Field[] = [
  { 
    name: 'logo', 
    type: 'upload', 
    relationTo: 'media' 
  },
  {
    name: 'name',
    type: 'text',
    required: true,
  },
  {
    name: 'categories',
    type: 'relationship',
    relationTo: 'categories',
    hasMany: true,
  },
  {
    name: 'area',
    type: 'relationship',
    relationTo: 'areas',
  },
  {
    name: 'message',
    type: 'textarea',
  },
  {
    name: 'bannerImage',
    type: 'upload',
    relationTo: 'media',
  }
]