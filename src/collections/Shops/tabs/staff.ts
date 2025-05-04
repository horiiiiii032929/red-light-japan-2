import type { Field } from "payload";

export const staff: Field = {
  name: 'casts',
  type: 'relationship',
  relationTo: 'casts',
  hasMany: true,
  maxDepth: 10
}