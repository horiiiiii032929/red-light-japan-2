import type { Field } from "payload";
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const detail: Field[] = [
  { 
    name: 'address', 
    type: 'text', 
    required: true 
  },
  { 
    name: 'detailDescription', 
    type: 'richText', 
    required: true ,   
    editor: lexicalEditor({})
  },
  {
    name: 'location',
    type: 'point',
  },
  { 
    name: 'nearestStationDescription', 
    type: 'text' 
  },
  { 
    name: 'tags', 
    type: 'text', 
    required: true 
  },
]