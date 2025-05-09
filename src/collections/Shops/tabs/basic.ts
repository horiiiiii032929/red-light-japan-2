import type { Field } from "payload";
import { EXPERIMENTAL_TableFeature, FixedToolbarFeature, InlineToolbarFeature, lexicalEditor, UploadFeature } from '@payloadcms/richtext-lexical'

export const basic: Field[] = [
  {
    type: 'row',
    fields: [
      {
        name: 'logo',
        type: 'upload',
        relationTo: 'media',
        hasMany: false,
      },
      {
        name: 'images',
        type: 'upload',
        relationTo: 'media',
        hasMany: true,
      },
    ]
  },
  {
    name: 'description',
    type: 'richText',
    required: true,
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          UploadFeature(),
        ]
      },
    })
  },
  {
    type: 'row',
    fields: [
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
        hasMany: false
      },
      {
        name: 'paymentMethods',
        type: 'relationship',
        relationTo: 'payment-methods',
        hasMany: true,
      },
    ]
  },
  {
    name: 'nearestStation',
    type: 'text',
    required: true,
  },
  {
    name: 'address',
    type: 'text',
    required: true
  },
  {
    name: 'location',
    type: 'point',
  },
  {
    name: 'tags',
    type: 'text',
    required: true
  },
  {
    type: 'row',
    fields: [
      {
        name: 'openHour',
        type: 'date',
        admin: {
          date: {
            pickerAppearance: 'timeOnly',
            displayFormat: 'h:mm',
          },
        },
        required: true,
      },
      {
        name: 'closeHour',
        type: 'date',
        admin: {
          date: {
            pickerAppearance: 'timeOnly',
            displayFormat: 'h:mm',
          },
        },
        required: true,
      },
    ]
  },
  {
    label: 'Contact',
    type: 'collapsible',
    admin: {
      initCollapsed: true,
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'phoneNumber',
            type: 'group',
            fields: [
              { name: 'phoneNumber', type: 'text', required: true },
              { name: 'phoneNumber2', type: 'text' },
            ],
            admin: {
              width: '50%',
            }
          },
          {
            name: 'line',
            type: 'group',
            fields: [
              { name: 'platform', type: 'text', required: true },
              { name: 'qrCode', type: 'upload', relationTo: 'media' },
            ],
            admin: {
              width: '50%',
            }
          },
          {
            name: 'weChat',
            type: 'group',
            fields: [
              { name: 'platform', type: 'text', required: true },
              { name: 'qrCode', type: 'upload', relationTo: 'media' },
            ],
            admin: {
              width: '50%',
            }
          },
          {
            name: 'whatsapp',
            type: 'group',
            fields: [
              { name: 'platform', type: 'text', required: true },
              { name: 'qrCode', type: 'upload', relationTo: 'media' },
            ],
            admin: {
              width: '50%',
            }
          },
        ]
      }
    ]
  },
]