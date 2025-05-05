import type { Field } from "payload";

export const basic: Field[] =  [
    {
      name: 'mainImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'subImages',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'nearestStation',
      type: 'text',
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
      name: 'paymentMethods',
      type: 'relationship',
      relationTo: 'payment-methods',
      admin: {
        position: 'sidebar',
      },
      hasMany: true,
    },
    {
      label: 'Contact',
      type: 'collapsible',
      admin : {
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